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
- Purple accent directly from user's rice (#8b3fff) for personal brand consistency across the agency site and desktop.
- Light surface-2 bg for most of page (trustworthy, easy reading); white cards for content.
- No dark mode v1 (keeps focus; can add later if clients want).
- Tailwind v4 + CSS vars over heavy custom = fast, purge-friendly, maintainable for clones.
- Form styles support the mailto fallback + future real handler.

**How to customize / extend:**
- Change --accent in :root for a client-branded clone (then update the note).
- Add component-specific styles at bottom (keep minimal).
- For new sections: use .card, .btn-primary, h2 etc. so everything stays on-brand.
- Update Report.md + this note when tokens evolve.

**Related:** Layout.astro (imports it), index.astro (consumes classes), Report.md (Design System section), notes/Branding.md.

**Status:** Scaffold + initial theme complete. Polish (more components, responsive fine-tuning) in later todos.