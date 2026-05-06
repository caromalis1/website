import './App.css';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import TheLab from './pages/TheLab';
import { getCurrentRoute, normalizeLegacyHashRoute, normalizeRoutePath, ROUTES } from './routes';

function App() {
  const [route, setRoute] = useState(() => {
    normalizeLegacyHashRoute();
    return getCurrentRoute();
  });

  useEffect(() => {
    const onPopState = () => setRoute(getCurrentRoute());

    const onDocumentClick = (event) => {
      const link = event.target instanceof Element
        ? event.target.closest('a[href]')
        : null;

      if (
        !link ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target ||
        link.hasAttribute('download')
      ) {
        return;
      }

      const url = new URL(link.href, window.location.origin);
      const isSameOrigin = url.origin === window.location.origin;
      const isAnchorOnly = link.getAttribute('href')?.startsWith('#');

      if (!isSameOrigin || isAnchorOnly) {
        return;
      }

      event.preventDefault();

      const nextPath = normalizeRoutePath(url.pathname);
      const currentPath = normalizeRoutePath(window.location.pathname);

      if (nextPath !== currentPath || url.search !== window.location.search) {
        window.history.pushState(null, '', `${nextPath}${url.search}${url.hash}`);
        setRoute(nextPath);
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
      case ROUTES.storytellingLab:
        return <TheLab />;
      default:
        return <Home />;
    }
  };
  return (
    <div className="App">
      {renderRoute()}
    </div>
  );
}

export default App;
