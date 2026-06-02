# ServiceCard.astro — Reusable service tile

**Location:** site/src/components/ServiceCard.astro  
**Role:** Simple presentational card for the Services grid. Takes icon (emoji for v1), title, desc. Uses .card from global.css.

**Why component:** DRY for 6 services, easy to clone/swap data for client projects, consistent styling.

**Decisions:** Kept ultra-simple (no JS, no slots beyond props). Icon as string (emoji or future icon name). h3 + p for semantics.

**Customization:** Change the .card class or add hover states in global.css. For icon system later, pass an icon component or SVG path.

**Related:** index.astro (uses in grid), data/services.ts (source of truth), global.css.

**Status:** Scaffolded. Will be used immediately in index refactor.