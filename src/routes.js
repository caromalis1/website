export const ROUTES = {
  home: '/',
  storytellingLab: '/storytelling-lab',
  about: '/about'
};

export const NAV_ITEMS = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.storytellingLab, label: 'Storytelling Lab' },
  { href: ROUTES.about, label: 'Sobre mi' }
];

export const normalizeRoutePath = (path) => {
  const normalizedPath = path || ROUTES.home;

  if (normalizedPath !== ROUTES.home && normalizedPath.endsWith('/')) {
    return normalizedPath.slice(0, -1);
  }

  return normalizedPath;
};

export const getCurrentRoute = () => normalizeRoutePath(window.location.pathname);

export const normalizeLegacyHashRoute = () => {
  if (window.location.hash.startsWith('#/')) {
    window.history.replaceState(null, '', normalizeRoutePath(window.location.hash.slice(1)));
  }
};
