import './App.css';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Storytelling from './pages/Storytelling';
import Contact from './pages/Contact';

function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Micro-interactions: magnetic buttons, tilt cards, scroll parallax
  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    if (!prefersReduced) {
      // Magnetic
      const initMagnetic = () => {
        const elements = Array.from(document.querySelectorAll('[data-magnetic]'));
        const fns = [];
        elements.forEach((el) => {
          const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
            const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
            const max = 8;
            el.style.setProperty('--mx', `${dx * max}px`);
            el.style.setProperty('--my', `${dy * max}px`);
          };
          const onLeave = () => {
            el.style.setProperty('--mx', '0px');
            el.style.setProperty('--my', '0px');
          };
          el.addEventListener('mousemove', onMove);
          el.addEventListener('mouseleave', onLeave);
          fns.push(() => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
          });
        });
        return () => fns.forEach((fn) => fn());
      };

      // Tilt
      const initTilt = () => {
        const elements = Array.from(document.querySelectorAll('[data-tilt]'));
        const fns = [];
        elements.forEach((el) => {
          const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            const maxDeg = 6;
            const rx = (-py * maxDeg).toFixed(2);
            const ry = (px * maxDeg).toFixed(2);
            el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
          };
          const onLeave = () => {
            el.style.transform = '';
          };
          el.addEventListener('mousemove', onMove);
          el.addEventListener('mouseleave', onLeave);
          fns.push(() => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
          });
        });
        return () => fns.forEach((fn) => fn());
      };

      // Parallax
      const initParallax = () => {
        const elements = Array.from(document.querySelectorAll('[data-parallax]'));
        const onScroll = () => {
          const y = window.scrollY || window.pageYOffset;
          elements.forEach((el) => {
            const factor = parseFloat(el.getAttribute('data-parallax')) || 0.2;
            el.style.transform = `translate3d(0, ${y * factor}px, 0)`;
          });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
      };

      cleanups.push(initMagnetic());
      cleanups.push(initTilt());
      cleanups.push(initParallax());
    }

    return () => {
      cleanups.forEach((fn) => fn && fn());
    };
  }, [route]);

  const renderRoute = () => {
    switch (route) {
      case '/storytelling':
        return <Storytelling />;
      case '/contact':
        return <Contact />;
      case '/':
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <header className="site-header">
        <a href="#/" className="brand">Socials by Caro</a>
        <nav className="nav">
          <a href="#/" className="nav-link" data-magnetic>Home</a>
          <a href="#/storytelling" className="nav-link" data-magnetic>Storytelling</a>
          <a href="#/contact" className="nav-link" data-magnetic>Contact</a>
        </nav>
      </header>
      {renderRoute()}
      <footer className="site-footer">
        <div className="inner">
          <small>© {new Date().getFullYear()} Socials by Caro</small>
          <nav className="nav">
            <a href="#/storytelling" className="nav-link" data-magnetic>Work</a>
            <a href="#/contact" className="nav-link" data-magnetic>Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
