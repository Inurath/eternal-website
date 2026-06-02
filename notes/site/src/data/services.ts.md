# services.ts — Content source for Services section

**Location:** site/src/data/services.ts  
**Role:** Single source of truth for the 6 services. Imported by index.astro and rendered via ServiceCard.

**Why separate data:** Makes client clones trivial (just swap the array) and keeps content out of components for easy editing / future CMS.

**Related:** ServiceCard.astro, index.astro, notes/Competitors.md (services inspired by direct + scannable patterns).

**Status:** Populated with realistic offerings from research. Update copy in Content.md later.