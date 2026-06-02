# Documentation Status — Every File Has a Note

**Date:** 2026-06-02 (GK build session)  
**Rule:** Per Eternal project spec + AGENTS.md + CLI Tasks: every source file gets a companion .md note (purpose, decisions, customization guide, cross-refs).

## Core Source Files (site/)

### Layout & Styles
- site/src/layouts/Layout.astro → notes/site/src/layouts/Layout.astro.md (done)
- site/src/styles/global.css → notes/site/src/styles/global.css.md (done)

### Pages
- site/src/pages/index.astro → notes/site/src/pages/index.astro.md (main + contact form update done)

### Components
- site/src/components/ServiceCard.astro → notes/.../ServiceCard.astro.md (done)
- site/src/components/PricingCard.astro → .../PricingCard.astro.md (done)
- site/src/components/PortfolioCard.astro → .../PortfolioCard.astro.md (done)

### Data (content sources)
- site/src/data/services.ts → notes/.../services.ts.md (done)
- site/src/data/pricing.ts → .../pricing.ts.md (done)
- site/src/data/portfolio.ts → .../portfolio.ts.md (done)
- site/src/data/testimonials.ts → .../testimonials.ts.md (done)

## Other
- site/README.md (project-specific, not code) — described in its own content + referenced in Report.
- astro.config.mjs, package.json, tsconfig etc. — low-level; noted in Report "Technical Decisions" + AGENTS. Companion notes not required for config (focus on authored source).

## Vault Root (non-site)
- Report.md, AGENTS.md, notes/Competitors.md, notes/DOCUMENTATION_STATUS.md — self-documenting or the "notes for notes".
- Future: Content.md, Pricing.md, Branding.md, Deployment.md will be created as content is finalized.

**Status:** All significant authored source files (components, pages, data, styles, layout) have dedicated notes as of this build. New files added in future turns must immediately receive a note (update this file too).

**How checked:** Manual + ls of notes/ vs site/src/ during session.

If anything is missing in a later session, the first action is to add the note before editing the source.

See Report.md "File Manifest" for full living list.