# Virtual snow plum redesign design

## Context

The blog already uses the light-only `踏雪寻梅` visual language: snow white
surfaces, cold blue-white depth, graphite text, thin icy borders, and one
restrained plum-red accent.

The current implementation still depends on `src/assets/snow-plum-hero.png` for
several large atmospheric backgrounds. That image reads as realistic or
photo-like, which no longer matches the desired direction. The redesign should
keep the same theme while replacing those large repeated photo backgrounds with
a virtual visual system and visible falling snow.

## Approved Direction

The approved scope is option B:

- Replace large repeated background uses of `snow-plum-hero.png`.
- Keep existing article thumbnail images for now.
- Keep the blog writing-focused and static by default.

The approved visual direction is:

- `冰玻璃层景`: a virtual frosted-glass snow field.
- `中雪`: visible falling snow with enough presence to register, but not enough
  to compete with reading.
- Technical approach: CSS virtual background plus a React/canvas snow island.

## Goals

- Remove the real-photo feel from the main atmospheric backgrounds.
- Preserve the existing `踏雪寻梅` theme and light-only palette.
- Add a falling-snow layer that feels calm, cold, and deliberate.
- Keep the site readable, fast, and deployable as a GitHub Pages static site.
- Keep the implementation narrowly scoped and easy to remove or tune later.

## Non-goals

This redesign will not add:

- New blog features.
- Comments.
- Search.
- Analytics.
- Newsletter forms.
- Dark mode.
- Portfolio sections.
- A full article-thumbnail redesign.
- New content model fields.

## Scope

Replace the photo-like atmospheric background in these areas:

- Home hero background.
- Inline capsule image style.
- Stacking article cards.
- Footer CTA background.
- About page visual panel.
- Fallback large background treatment that currently points at
  `snow-plum-hero.png`.

Leave these areas unchanged:

- Per-post thumbnail assets used by article cards and archive rows.
- Blog content collection schema.
- Post sorting, tag routes, RSS, sitemap, and article rendering.

## Architecture

Most pages remain static Astro output. The redesign adds one decorative client
island for falling snow and keeps it independent from blog data.

Expected units:

- CSS virtual scene:
  - Replaces `url("../assets/snow-plum-hero.png")` in large atmospheric
    backgrounds.
  - Uses layered gradients, translucent panels, subtle icy borders, line-drawn
    plum branches, and restrained plum-red dots.
  - Can be reused across hero, footer, about, stack cards, and inline capsules
    with intensity modifiers.
- `SnowfallCanvas` React island:
  - Renders `canvas` snow particles.
  - Is mounted as decorative UI only.
  - Does not read blog content or route data.
  - Uses `aria-hidden` and `pointer-events: none`.
- Layout integration:
  - Mount the snow island where it can cover the atmospheric sections without
    interfering with content.
  - Keep text, links, nav, and buttons above the decorative layer.
  - Preserve existing Astro page structure and route-aware links.

## Visual Design

The virtual scene should read as a cold, modern, non-photographic interpretation
of `踏雪寻梅`.

Core elements:

- A cold white to blue-white base.
- Frosted-glass planes with subtle inner highlights.
- Fine graphite branch lines.
- A small number of plum-red blossoms or dots.
- Soft snow-field light and faint grain.
- Thin icy borders instead of heavy cards or shadows.

Section behavior:

- Home hero:
  - Shows the most complete ice-glass scene.
  - Uses medium falling snow.
  - Keeps the title, subtitle, and CTAs clearly readable.
- Footer CTA:
  - Uses a weaker version of the same virtual scene.
  - Snow should not distract from CTA buttons.
- About image:
  - Uses the static virtual scene.
  - It does not need its own canvas animation.
- Stack cards:
  - Use light frosted-glass texture and plum accents.
  - Do not mount a canvas per card.
- Inline image capsule:
  - Becomes a small abstract ice-glass/plum capsule.
  - It no longer crops the old hero image.

## Snow Motion

The falling snow should be calm and readable:

- Medium density by default.
- Multiple particle sizes and opacities.
- Slow vertical fall with slight diagonal drift.
- Device-pixel-ratio aware rendering, capped for performance.
- Fewer particles on mobile viewports.
- Pause when the page is hidden.
- Recalculate canvas size on resize.

The animation must not:

- Block pointer events.
- Cover text at high opacity.
- Create a storm effect.
- Run when reduced motion is requested.
- Add layout shift.

## Accessibility

- The snow canvas is decorative and must be `aria-hidden`.
- The canvas must not receive focus.
- The canvas must use `pointer-events: none`.
- `prefers-reduced-motion: reduce` disables animated snow.
- Static CSS background remains visible when animation is disabled.
- Text contrast must remain acceptable over every atmospheric section.
- Focus states on links and buttons remain visible above the decorative layer.

## Error Handling

The snow island should fail closed:

- If `window` is unavailable, do nothing.
- If `canvas.getContext("2d")` fails, do nothing.
- If reduced motion is enabled, do not start `requestAnimationFrame`.
- If the page becomes hidden, pause animation.
- If resize events fire frequently, keep recalculation bounded and particle
  counts capped.

The page must remain usable even if the snow island never hydrates.

## Testing

Validation should include:

- `pnpm run check`.
- `pnpm run build`.
- Local review at `http://localhost:4321/blog/`.
- Desktop visual review of:
  - Home hero.
  - Footer CTA.
  - About page visual panel.
  - Stack-card section.
  - Inline image capsule.
- Mobile visual review to ensure:
  - Header remains usable.
  - Hero title and buttons are not covered.
  - Snow density is lower and does not feel heavy.
- Reduced-motion review:
  - Animated snow stops.
  - Static virtual background remains visible.
- Regression check:
  - Article thumbnails remain unchanged.
  - `/posts/`, `/tags/`, article detail pages, RSS, and sitemap build
    normally.

## Implementation Boundaries

Keep the implementation focused:

- Use the existing Astro + React setup.
- Do not add a new animation dependency.
- Do not migrate styling systems.
- Do not replace article thumbnail assets.
- Do not add business logic to the snow island.
- Do not change content frontmatter or route helpers.

## Open Decisions

No open product decisions remain for this scope. Fine tuning particle count,
opacity, and section-specific intensity can happen during implementation and
browser review as long as the result stays within the approved `中雪` direction.
