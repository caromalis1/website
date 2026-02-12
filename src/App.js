import './App.css';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import TheLab from './pages/TheLab';


function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/');

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
  const isStorytellingLabRoute = route === '/storytelling-lab';

  return (
    <div className="App">
      {renderRoute()}
      {!isStorytellingLabRoute && (
        <footer className="site-footer">
          <div className="inner">
            <small>© {new Date().getFullYear()} Socials by Caro</small>
            <nav className="nav">
              <a href="#/" className="nav-link">Home</a>
              <a href="#/storytelling-lab" className="nav-link">Storytelling Lab</a>
            </nav>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
