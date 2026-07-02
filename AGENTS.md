# AGENTS.md

## Project

Next.js 16 (App Router) site for the "I Congreso Internacional de Derecho · Popayán 2026" conference.

## Package manager

Use **pnpm** (pnpm-lock.yaml is the source of truth; README mentions others but pnpm is canonical).

## Commands

```
pnpm dev       # dev server on localhost:3000
pnpm build     # production build
pnpm start     # serve production build
pnpm lint      # ESLint 9 diagnostics (flat config)
```

There is no typecheck script, but TypeScript strict mode is on. Run `npx tsc --noEmit` to typecheck manually.

## Architecture

- `app/` — Next.js App Router (layout.tsx, page.tsx, globals.css)
- `congreso-derecho-2026.html` — standalone HTML prototype (734 lines). This is the **design reference** that the Next.js app should implement. It contains the full visual spec: tokens, components, theming, and content for the conference landing page. Treat this file as the spec; the current `app/` code is the default create-next-app boilerplate to be replaced.
- `public/` — static assets from the template (may be replaced with congress-specific assets)
- `@/*` path alias maps to the project root (tsconfig.json)

## Stack

- **Tailwind CSS v4** with `@tailwindcss/postcss` plugin. Uses `@import "tailwindcss"` and `@theme` syntax (not the old tailwind.config). PostCSS config at `postcss.config.mjs`.
- **ESLint 9** flat config (`eslint.config.mjs`) with `eslint-config-next` core-web-vitals and TypeScript rules. Global ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`.
- **TypeScript 5**, strict mode, bundler module resolution.
- **Geist** and **Geist Mono** fonts via `next/font/google`. Already wired in layout.tsx as CSS variables `--font-geist-sans` and `--font-geist-mono`.
