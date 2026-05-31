# Conventions

- Global design tokens live in `src/index.css` under `:root`; prefer tokens over scattered repeated colors/radii/type values.
- Page CSS owns page-specific systems. Storytelling Lab has strict scoped tokens in `.lab` inside `src/pages/TheLab.css`; keep Lab edits aligned with those tokens and remove unused selectors when replacing sections.
- Shared header/footer styling is in `src/components/SiteHeader.css` and `SiteFooter.css`; avoid per-page hacks unless passed through existing props/custom properties.
- Typography: headings use `--heading-font` (`Libre Caslon Text`), body/UI copy uses `--paragraph-font` / `--body-font` (`IBM Plex Sans`). Lab copy should remain 14px+.
- Visual direction from AGENTS: restrained editorial look, small radii, thin borders, no nested cards, no decorative gradients/orbs. Storytelling Lab specifically preserves warm off-white, olive/pink/burgundy/pale-green/cream/black band language unless redesigned intentionally.