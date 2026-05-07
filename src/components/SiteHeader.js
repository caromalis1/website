import { useEffect, useState } from 'react';
import Logo from './Logo';
import { NAV_ITEMS, ROUTES } from '../routes';
import './SiteHeader.css';

export default function SiteHeader({
  logoSublabel = 'Storytelling Lab',
  contentFadeRgb = '246, 241, 240'
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    return () => window.removeEventListener('scroll', updateHeaderState);
  }, []);

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="site-header-inner">
          <a href={ROUTES.home} className="brand" aria-label="Socials by Caro">
            <Logo label="Caro Malis" sublabel={logoSublabel} />
          </a>
          <nav className="nav site-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a href={item.href} className="nav-link" key={item.href}>
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
