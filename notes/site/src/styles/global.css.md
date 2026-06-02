# global.css — Tailwind + Eternal design system / tokens

**Location:** site/src/styles/global.css  
**Role in site:** Central stylesheet. Imports Tailwind (v4 via Vite plugin) and defines the premium, clean, trustworthy visual language using the owner's signature purple accent (#8b3fff).

**Key implementation:**
- `@import "tailwindcss";` (from astro add).
- CSS vars for --accent, --accent-light, --text, surfaces, etc. (easy theme swaps for future client sites).
- Base typography (h1-h3 sizes/weights, body font stack).
- .btn / .btn-primary / .btn-secondary (consistent CTAs).
- .card (services, pricing, portfolio, testimonials) with hover lift.
- .popular badge for middle pricing tier.
- Form elements styled for accessibility + focus ring in accent.
- nav sticky + subtle blur.
- .container + .section utilities.
- Mobile-first tweaks + selection color.
- All values chosen for "premium but not flashy": generous spacing implied via Tailwind + padding, high contrast, calm.

**Decisions & tradeoffs:**
- Switched from original flashy purple to comfy eye-friendly teal/slate palette (per user feedback on "too flashy").
- Full dark mode support (html.dark vars + toggle in navbar) for modern UX and to match user rice preference for dark UIs. Logo auto-inverted via filter in dark for visibility (single asset, no duplicate light logo files).
- Solid var(--surface) nav (no more hardcoded white rgba) so fully theme consistent on scroll and in dark/light.
- .section-box and cards use theme vars for "boxes" look without being plain white.
- Tailwind v4 + CSS vars = easy client clones (just override :root).
- Focus ring updated from old purple to current accent teal.
- Form success now uses --surface / --success vars (was light green-50 hardcoded, broke dark).

**How to customize / extend:**
- Change --accent in :root for a client-branded clone (then update the note).
- Add component-specific styles at bottom (keep minimal).
- For new sections: use .card, .btn-primary, h2 etc. so everything stays on-brand.
- Update Report.md + this note when tokens evolve.

**Related:** Layout.astro (imports it), index.astro (consumes classes), Report.md (Design System section), notes/Branding.md.

**Status:** Dark mode fully working and consistent (nav, surfaces, toggle, logo visibility, success msgs). Logo resized/optimized + larger in navbar (h-12). Toggle made robust (addEventListener + readyState guard). All per CLI Web Tasks pending items addressed 2026-06-02.

**Latest fixes (GK):**
- Removed nav { background: rgba white } override; now uses --surface var (solid, theme aware).
- Added html.dark img[alt=...] { filter: brightness(0) invert(1) } so dark logo mark is visible on dark nav.
- Resized source "Eternal Logo with name.png" (trimmed to 260x96, ~9kB) and deployed — allows bigger crisp display.
- #dark-toggle restyled larger (min 2rem, better padding, surface vars, active scale).
- Toggle script rewritten: no onclick (timing safe), uses DOMContentLoaded/init + addEventListener('click'), icon set reliably.
- Updated old purple focus ring rgba to teal matching palette.
- Form success div now theme-var based (no more light-only green-50/200/800).
- Build run after changes; localhost:4321 surfaced.

**Related:** index.astro (contains the toggle script + nav markup + form), Report.md, CLI Web Tasks.md.