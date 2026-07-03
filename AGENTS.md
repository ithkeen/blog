# Contributor Notes

## Commands

- Install: `pnpm install`
- Develop: `pnpm run dev`
- Type and content validation: `pnpm run check`
- Production build: `pnpm run build`
- Preview built site: `pnpm run preview`

The site is configured as a GitHub Pages project site under `/blog/`. Use `http://localhost:4321/blog/` during local review.

## GitHub and Sandbox Notes

- In the managed sandbox, `gh auth status` can incorrectly report that the GitHub token is invalid because the sandbox cannot access the host keyring. Before asking the user to re-authenticate, rerun `gh auth status` with elevated permissions outside the sandbox.
- Git operations that contact GitHub can also fail in the sandbox with network or SSH errors such as `Operation not permitted`. If the same action is required for the task, retry it with elevated permissions instead of treating it as an authentication failure.
- If the GitHub connector returns `403 Resource not accessible by integration` when creating a PR, fall back to `gh pr create` with elevated permissions. The connector may not have write access even when the local GitHub CLI is authenticated.

## Project Shape

- Blog content lives in `src/content/blog/`.
- Shared content helpers live in `src/lib/posts.ts`.
- Route-aware link helpers live in `src/lib/site.ts`.
- Static Astro pages should stay static by default.
- Home page motion is isolated in React islands under `src/components/islands/`.

## Design Constraints

Keep the MVP writing-focused. Do not add comments, analytics, newsletter forms, full-text search, dark mode, dashboards, or portfolio sections unless explicitly requested.

The visual language is light-only「踏雪寻梅」: snow white, cold blue-white surfaces, graphite text, thin icy borders, and one restrained plum-red accent.
