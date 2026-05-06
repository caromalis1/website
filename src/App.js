import './App.css';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import TheLab from './pages/TheLab';

const getCurrentRoute = () => window.location.pathname || '/';

const normalizeLegacyHashRoute = () => {
  if (window.location.hash.startsWith('#/')) {
    window.history.replaceState(null, '', window.location.hash.slice(1));
  }
};

function App() {
  const [route, setRoute] = useState(() => {
    normalizeLegacyHashRoute();
    return getCurrentRoute();
  });

  useEffect(() => {
    const onPopState = () => setRoute(getCurrentRoute());

    const onDocumentClick = (event) => {
      const link = event.target.closest('a[href]');

      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const url = new URL(link.href, window.location.origin);
      const isSameOrigin = url.origin === window.location.origin;
      const isAnchorOnly = link.getAttribute('href')?.startsWith('#');

      if (!isSameOrigin || isAnchorOnly) {
        return;
      }

      event.preventDefault();

      if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
        window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
        setRoute(url.pathname || '/');
      }
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onDocumentClick);

    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();
    const frameId = window.requestAnimationFrame(resetScroll);
    const timeoutId = window.setTimeout(resetScroll, 80);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [route]);

  const renderRoute = () => {
    switch (route) {
      case '/storytelling-lab':
        return <TheLab />;
      default:
        return <Home />;
    }
  };
  const isStorytellingLabRoute = route === '/storytelling-lab';

  return (
    <div className="App">
      {renderRoute()}
      {!isStorytellingLabRoute && (
        <footer className="site-footer">
          <div className="inner">
            <small>© {new Date().getFullYear()} Socials by Caro</small>
            <nav className="nav">
              <a href="/" className="nav-link">Home</a>
              <a href="/storytelling-lab" className="nav-link">Storytelling Lab</a>
            </nav>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
