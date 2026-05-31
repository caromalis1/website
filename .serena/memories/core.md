# Core

- Create React App single-page site rooted at `src/App.js`; local router uses History API and `src/routes.js` rather than React Router.
- Main pages: home in `src/pages/Home.js` + `Home.css`; Storytelling Lab in `src/pages/TheLab.js` + page-scoped `TheLab.css`.
- Shared chrome lives in `src/components`: `SiteHeader`, `SiteFooter`, `Logo`.
- Public image assets are under `public/img`; referenced from React/CSS with absolute public paths like `/img/1-Header.png`.
- Read `mem:tech_stack` for build/runtime tooling, `mem:conventions` for styling/design constraints, and `mem:task_completion` before finishing code changes.