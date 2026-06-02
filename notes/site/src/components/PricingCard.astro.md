# PricingCard.astro — Tier card with popular highlight

**Location:** site/src/components/PricingCard.astro  
**Role:** Renders one pricing tier. Supports "popular" badge via .popular class (from global.css).

**Decisions:** Features as simple list with check. CTA always scrolls to #contact (or could be form prefill later). Price prominent.

**Customization:** Edit data/pricing.ts for numbers/features. The popular class auto-adds badge + border.

**Related:** data/pricing.ts, index.astro, global.css (.popular).

**Status:** Ready for use.