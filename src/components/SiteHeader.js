import { useEffect, useState } from 'react';
import Logo from './Logo';
import { NAV_ITEMS, ROUTES } from '../routes';
import './SiteHeader.css';

export default function SiteHeader({
  logoSublabel = 'Storytelling Lab',
  contentFadeRgb = '246, 241, 240'
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    return () => window.removeEventListener('scroll', updateHeaderState);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 760) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}>
        <div className="site-header-inner">
          <a href={ROUTES.home} className="brand" aria-label="Socials by Caro" onClick={() => setIsMenuOpen(false)}>
            <Logo label="Caro Malis" sublabel={logoSublabel} />
          </a>
          <button
            className="site-menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-nav"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <nav className="nav site-nav" id="site-mobile-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a href={item.href} className="nav-link" key={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <div
        className={`site-header-content-fade${isScrolled ? ' is-visible' : ''}`}
        style={{ '--site-header-fade-rgb': contentFadeRgb }}
        aria-hidden="true"
      />
      <div className="site-header-spacer" aria-hidden="true" />
    </>
  );
}
