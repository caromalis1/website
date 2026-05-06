import { useEffect, useState } from 'react';
import Logo from './Logo';
import './SiteHeader.css';

const NAV_ITEMS = [
  { href: '#/', label: 'Home' },
  { href: '#/storytelling-lab', label: 'Storytelling Lab' },
  { href: '#/about', label: 'Sobre mi' }
];

export default function SiteHeader({ logoSublabel = 'Storytelling Lab' }) {
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
          <a href="#/" className="brand" aria-label="Socials by Caro">
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
      <div className="site-header-spacer" aria-hidden="true" />
    </>
  );
}
