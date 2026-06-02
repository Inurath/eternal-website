# PortfolioCard.astro — Simple result card

**Location:** site/src/components/PortfolioCard.astro  
**Role:** Shows one "past project" with category, title, result stat, short desc.

**Decisions:** Outcome-focused (results > pretty pictures) to match competitor learnings. Placeholders for v1.

**Customization:** data/portfolio.ts is the source. Easy to swap real client work later.

**Related:** data/portfolio.ts, index.astro.

**Status:** Enhanced with optional images (2026-06-02).

**Latest update (GK - web tasks):** Added support for `image?: string` prop. When present, renders a full-bleed top image (object-cover, rounded to card) using the royalty-free Pexels photos added to public/images/. Updated data/portfolio.ts with 4 images mapped to the local business examples (cafe, law, plumbing/trades, wellness). The Work section now has visual pictures matching the "add some pictures ... that match the vibe" request. Negative margins used for flush image header on cards.

**Images used (all Pexels, free commercial use, no attribution required):**
- cafe-local.jpg → Sunset Café
- professional-services.jpg → Harbor Law Group
- modern-office.jpg → Gulf Coast Plumbing
- laptop-work.jpg → Palma Sola Wellness

**Related:** data/portfolio.ts (source of truth + image paths), index.astro (usage in grid), public/images/ (added assets).