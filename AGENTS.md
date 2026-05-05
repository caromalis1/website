# Agent Notes

## Storytelling Lab Design Language

The Storytelling Lab page uses a page-scoped design system in `src/pages/TheLab.css`. Keep edits aligned with that system instead of adding new one-off values.

- Treat the `.lab` token block in `TheLab.css` as the source of truth for Lab colors, radii, type sizes, line heights, control heights, and shell widths.
- Add or adjust shared tokens there when changing repeated values. Do not scatter raw font sizes, pill radii, section backgrounds, or repeated colors through individual section rules.
- Keep rendered section styles close to the JSX that still exists. Remove unused Lab selectors when sections are deleted or replaced, rather than leaving old design systems underneath newer overrides.
- Keep the Lab type scale at 14px or above. The current recurring text tokens are body, copy, and fact; add a named 14px+ token first if the page needs another recurring size.
- Paragraph copy uses `--paragraph-font`, currently IBM Plex Sans. Keep headings in the editorial serif and UI labels/actions in the body/UI sans unless the design language changes.
- Keep body-like copy readable on desktop. Prefer normal letter spacing for small Inter text; only use tighter letter spacing where the editorial serif headings need it.
- Preserve the quiet editorial look from the desktop mockups: warm off-white background, olive thread/path elements, soft pink pills, burgundy primary actions, pale green Lab panel, cream section controls, and black testimonial band.
- Keep section transitions intentional. Shared background sections should flow on `--lab-bg`; shaped or waved transitions should match the adjacent section color through tokens.
- Cards and panels should stay restrained: small radii, thin borders, no nested cards, and no decorative gradients/orbs.
- The long illustrated thread path in the second section is an intentional storytelling element. Do not replace it with a generic divider or simplified path unless the design language is updated.
- After significant CSS edits, run `npm run build` and visually check `#/storytelling-lab` at desktop and mobile widths for overflow, text overlap, and section transition seams.
