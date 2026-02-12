import './App.css';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import TheLab from './pages/TheLab';


function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/');
  const isStorytellingLabRoute = route === '/storytelling-lab';

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderRoute = () => {
    switch (route) {
      case '/storytelling-lab':
        return <TheLab />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {isStorytellingLabRoute && (
        <header className="site-header">
          <div className="site-header-inner">
            <a href="#/" className="brand" aria-label="Socials by Caro">
              LOGO AQUÍ
            </a>
            <nav className="nav site-nav" aria-label="Primary">
              <a href="#/" className="nav-link">Home</a>
              <a href="#/storytelling-lab" className="nav-link">Storytelling Lab</a>
              <a href="#/about" className="nav-link">Sobre mi</a>
            </nav>
            <div className="header-actions">
              <a href="#/get-started" className="header-button header-button--primary">Empieza aquí</a>
            </div>
          </div>
        </header>
      )}
      {renderRoute()}
      <footer className="site-footer">
        <div className="inner">
          <small>© {new Date().getFullYear()} Socials by Caro</small>
          <nav className="nav">
            <a href="#/" className="nav-link">Home</a>
            <a href="#/storytelling-lab" className="nav-link">Storytelling Lab</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
