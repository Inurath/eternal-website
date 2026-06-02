# Eternal Website — Project Report & Second Brain

> This file is maintained by GK (Grok Build) and CC (Claude Code). Read at the start of any web dev / agency work session. Mirrors the structure and rigor of `~/Obsidian/CLI Core/CLI Reports.md`.

**Domain:** eternalwebsite.com (Namecheap Private Email + parking page currently)  
**Business:** Premium one-page website design service for small local businesses. Clean, professional, trustworthy, fast, responsive. Flagship project for the website agency (user's main objective behind the entire desktop rice + dual-CLI setup).  
**Vault:** `/home/randy/Documents/Eternal Website/` (new Obsidian vault + git repo home for all web dev).  
**Current status (2026-06-02):** Planning complete + approved. Research started. Scaffolding + build not yet begun. First GK session executing the only pending item from CLI Tasks.md.

---

## Project Overview & Requirements (from CLI Tasks.md)

**Exact pending task (source of truth):**
- Build a complete, modern, one-page business website (Eternal Website) for web dev service targeting small local businesses (eternalwebsite.com). Clean/professional/trustworthy design, fast, responsive. Full dual-CLI project tracking in Obsidian + GitHub repo push.
- Sections: Hero + CTA, Services, Portfolio (placeholders), 3-tier Pricing, About, Contact form.
- Requirements: premium but not flashy; document every file as note in this vault + this Report.md (like CLI Reports). Treat this as your second brain / main vault for all coding, web designing, websites. Use Obsidian tools/references constantly. GK does majority of heavy lifting/coding; CC reviews the entire thing. User mostly opens VS Code to review finals. Do summary of all work on this report. Push to GitHub. Research competitor sites. CC + GK collab.

**Why this exists:** The entire Hyprland/AGS/Waybar/theme/Thunderbird/dotfiles/dual-CLI rice was built to support the website agency business. This is the first real deliverable.

**Non-goals (v1):** No blog, no multi-page, no client portal, no ecom. Strictly the specified one-pager. No physical user actions required.

---

## Session Log — 2026-06-02 (GK: Startup + Planning + Initial Research)

**Startup checklist followed (per ~/.grok/AGENTS.md + global rules):**
- Read `~/Obsidian/CLI Core/CLI Reports.md`, `CLI Tasks.md`, `CLI TODO.md`.
- Confirmed: only pending in CLI Tasks is this Eternal project (email client work was previous completed item; Rofi/AGS/Waybar polish done; GK tutorial + done-sound + audio pill etc. closed).
- Read Business Email Setup note (Thunderbird primary for admin@eternalwebsite.com, keyring, servers mail.privateemail.com 993/465, AGS launcher tile).
- Read approved plan.md (this session's plan file in ~/.grok/sessions/...).
- Listed Eternal vault: only .obsidian/ (Encore theme, no content, no .git). Confirmed clean slate.
- todo_write created with 14+ trackable items.

**Actions this session:**
- Entered plan mode (as recommended in prior Reports for this ambitious task). Explored codebase (ags current rice for context + Obsidian structure), read all relevant notes, used web_search + web_fetch for domain status + competitor examples.
- Created this Report.md + AGENTS.md (project-specific rules).
- Created `notes/Competitors.md` with deep analysis of 3+ live one-pagers (Plumbing Gurus, Mazzey Law, Riggs Art) + patterns from Awwwards/Webflow/Framer/Wix research. Extracted actionable takeaways for trust, CTA placement, process, local proof, pricing transparency.
- Pricing research: one-page premium ~$1k–$3k range (2025-2026 data). Draft tiers $1,497 / $2,497 / $3,997 (or $997 starter) with flat-fee emphasis. User can adjust.
- Proposed full site flow + tone in plan (documented here too).
- No code changes yet (plan mode until approval; now approved per exit).

**Research summary (key inputs for build):**
- eternalwebsite.com: Namecheap parking (cPanel ready, no site). Email live.
- Competitors emphasize: immediate phone/quote CTA in hero, scannable services (icons + 1-line), local + mission about, named testimonials with specifics, clear process or vision (builds trust), flat/project pricing messaging, full contact (address/phone/email + form), outcome language ("turn spaces into experiences").
- For Eternal: Niche to "small local businesses", trustworthy/calm/confident tone, "timeless / built to last", purple #8b3fff accent (user brand), Florida local (Bradenton/Sarasota), 3 clear tiers, portfolio placeholders with results, process steps.
- See full `notes/Competitors.md` + citations from web tools.

**Design decisions so far (will expand in build logs):**
- Tech: Astro + Tailwind + TS (per prior Web Dev Guide summary in Reports). Static, minimal, future-proof for agency clones. Rejected pure vanilla CDN for maintainability.
- Branding: #8b3fff accent + light variant (ties to rice + "Eternal" timeless purple). Clean professional (light bg preferred for trustworthy local biz, generous whitespace, strong sans typography).
- Structure: site/ subdir for Astro (root for notes/Report/AGENTS). Companion notes/ for every source file.
- Form v1: JS UX + mailto fallback to admin@ (Thunderbird). Easy upgrade path.
- GitHub: Inurath/eternal-website (public for portfolio proof). MCP tools + local git.
- Documentation: Strict — every file + this Report updated live. Second brain ready for CC handoff + future client sites.
- Verification: Build + local serve + manual + optional subagent check-work before close.

**Files created this session (in Eternal vault):**
- `AGENTS.md` — project rules, startup, workflow, handoff protocol, tech, reuse of global skills/MCP/todo/plan_mode.
- `Report.md` (this file) — initial structure + log.
- `notes/Competitors.md` — research + takeaways.
- Dirs: `notes/`, `site/` (empty scaffold pending).

**No rice changes.** AGS/hypr/waybar etc. untouched (current workspace provided reference only). dotfiles-sync will be run at true end of work.

**Handoff / status:** Planning approved. Ready for scaffold + build. GK will do heavy lifting per spec. CC review loops planned (via review skill + explicit handoff sections). User: open VS Code on this dir when skeleton ready.

**Next immediate:** Mark research complete in todo, scaffold Astro in site/, begin implementing sections + notes in parallel with docs.

**End of this turn note:** All per "do all tasks possible without asking user to execute". Will continue in follow-ups until closeout checklist satisfied (Tasks marked, Reports updated, dotfiles save, user review instruction given, GH pushed, etc.).

### Scaffold step (2026-06-02, continued)
- Ran `npm create astro@latest . -- --yes` inside `site/` (basics template + TS present).
- `npx astro add tailwind --yes` (v4 + Vite plugin).
- Updated Layout.astro: proper Eternal title/description, imported global.css, professional meta.
- Overhauled global.css: full Tailwind + custom design tokens (purple #8b3fff accent + light, surfaces, .btn, .card, .popular, forms, nav, container, responsive). Clean professional base (no flash, high readability).
- Replaced index.astro with complete one-pager skeleton: sticky nav (Eternal + links + CTA), Hero with CTAs + local badges, trust row, Services (6 cards), Pricing (3 tiers with popular), Work (4 cards), About (local bio), Contact form (mailto admin@ + fields), footer.
- Replaced default site/README.md with project-specific (points to vault Report/AGENTS, quick commands, agent rules).
- Created companion notes for Layout.astro, global.css, index.astro (purpose, decisions, customization, relations).
- Verified: `npm run dev` clean on 4321, accents purple, sections present/scroll, form functional (mailto), `npm run build` succeeds with no errors.
- No default Welcome used; skeleton is now the site.

**Current state:** Scaffold + basic full-structure one-pager complete and themed. Ready for content/components extraction + real copy in next todos. All changes documented per rules.

### Content + Components step (continued same session)
- Created `src/data/` (services.ts, pricing.ts, portfolio.ts, testimonials.ts) — single source of truth, easy clone for future clients. Populated with realistic offerings + local flavor from competitor research.
- Created reusable components: ServiceCard.astro, PricingCard.astro (with popular support), PortfolioCard.astro. Each with companion notes.
- Refactored index.astro to import + render real data + cards (services grid, pricing tiers with popular, portfolio, new testimonials row from research learnings, about, contact).
- Created per-data-file notes.
- Site now feels like a real (if still placeholder-content) premium one-pager.
- Build + dev verified clean. Purple theme, cards, CTAs all working.
- All per "document every file" rule + immediate Report update.

**Progress:** Hero/navbar + services + pricing + portfolio + about + contact + testimonials implemented with data. Form now has JS-enhanced mailto (prefills subject/body nicely, shows success confirmation). Looks trustworthy and on-brand. All documented.

**Polish (same session):** Added basic OG meta to Layout for sharing/SEO. Build verified clean (15kB index.html — excellent size). Responsive grids + nav hiding on mobile already in place. a11y basics (labels, required, semantic h1-h3, alt on icons via aria-hidden where decorative) good. Can run Lighthouse in verification step.

---

## Hardware / Environment (for reference — this machine builds the sites)
See main `~/Obsidian/CLI Core/CLI Reports.md` (Arch/Hypr/AGS/Waybar/Kitty/node/npm/VS Code installed in prior web-dev sessions). VS Code extensions (Astro, Tailwind, Prettier, GitLens) available. Thunderbird for business email.

---

## Design System & Branding
- **Accent:** #8b3fff (user signature, "Eternal" timeless feel) + light #a86fff.
- **Palette (draft):** Clean light bg (#fafafa or white), dark text (#111 or #1a1a2e), surface cards with subtle shadow or border, purple for CTAs/highlights. Professional trustworthy (not dark gaming rice).
- **Typography:** System sans or Inter (via fontsource if bundle size allows). Large readable headings, good hierarchy, generous line-height.
- **Logo:** Text "Eternal" (or minimal SVG mark later). Tagline: "Timeless websites for local businesses."
- **Tone:** Professional, calm, confident, benefit-focused. Short paragraphs. "Your business deserves a site that feels as solid as the work you do."
- **Local:** Bradenton / Sarasota FL area references (from weather 34207, 941 area code in notes).
- **Full details:** See `notes/Branding.md` (to be created on first visual build).

---

## Competitor Research
See `notes/Competitors.md` (Plumbing Gurus, Mazzey Law, Riggs Art + broader patterns). Key excerpts + implications already in planning log above. Will be referenced in Content.md and during copy implementation.

**Citations example (when used in final Report text):** Use render render_inline_citation with citation_id is 4 right after sentence. (From tool results like [web:4].)

---

## Content & Copy
**To be drafted in `notes/Content.md` during hero/services implementation.**
- All headlines, subheads, service descriptions, pricing features, about bio, testimonials (realistic local small-biz owners), form labels, footer.
- Pricing rationale (flat fee, 30-day tweaks included, etc.).
- Portfolio placeholders: 4 examples (e.g. Local Café, Boutique Law Practice, Contractor/Plumber, Family Clinic or similar from FGCC experience) with fake "results" like "+40% inquiries", "professional online presence that wins trust".

---

## Pricing
**Draft tiers (research-backed, user-adjustable):**
- Starter: $997–$1,497 — basic one-pager, responsive, simple form, launch.
- Professional (popular): $2,497 — + custom design, portfolio section, SEO basics, 2 rounds revisions, 30-day support.
- Premium: $3,497+ — + everything, priority, extended support, analytics setup, future page add-ons credit.

Emphasize "project fee, no surprises" vs hourly. Annual maintenance option to be added in notes/Pricing.md.

See plan for sources (one-page $1k-3k premium range common in 2026 data).

---

## Technical Decisions & Architecture
**Stack:** Astro (SSG) + Tailwind (integration) + TypeScript. Minimal. Static dist/. See plan for init commands + why (matches guide, maintainable for agency, fast).

**File layout (proposed + evolving):**
- Root: Report.md, AGENTS.md, notes/ (Competitors.md, Content.md, Pricing.md, Branding.md, Deployment.md, per-file notes), README.md.
- site/: Astro project (src/pages/index.astro, src/components/*, src/data/* for easy client swaps, public/, astro.config, etc.).
- .git at root (or site/? root for whole second brain).

**Companion docs convention:** Every `site/src/...` file gets `notes/site/src/... .md` (or sidecar). Covers purpose, decisions, customization.

**Form v1:** Client-side validation + success UX. Submit does mailto:admin@eternalwebsite.com?subject=...&body=... or posts to Formspree (key in .env later). Prominent "or email me directly".

**Hosting/Deploy:** Netlify or Vercel (free custom domain, forms, previews). cPanel static upload fallback. Full steps in notes/Deployment.md + Report updates. Domain DNS change is user physical (Namecheap panel).

**SEO/Perf:** Built-in Astro sitemap + meta, OG tags, LocalBusiness JSON-LD, semantic, responsive images. Target Lighthouse 95+ (static + Tailwind purge helps).

**Git:** Root or site/. .gitignore standard (node_modules, dist, .astro, .env). Conventional commits.

**MCP GitHub:** Will use grok_com_github__create_repository + push for remote.

---

## File Manifest (Living)
(Will be updated as files are added. Links to notes where they exist.)

**Root / notes:**
- Report.md (this)
- AGENTS.md
- notes/Competitors.md (done)
- (notes/Content.md, Pricing.md, Branding.md, Deployment.md, Roadmap.md — pending)
- Per-file notes (pending scaffold)

**site/ (pending scaffold + build):**
- astro.config.mjs + tailwind config
- package.json
- src/pages/index.astro (main one-pager)
- src/components/ (Navbar, Hero, ServiceCard, PricingTier, PortfolioCard, ContactForm, etc.)
- src/layouts/Base.astro
- src/data/ (services.ts, pricing.ts, portfolio.ts, testimonials.ts)
- public/ (favicon, og-image)
- dist/ (build, gitignored)
- .gitignore, README.md

**GitHub:** Inurath/eternal-website (pending create/push)

**Cross-links in main vault:** Pending closeout (Home.md, CLI Tasks/Reports, Commands.md).

---

## Verification & Quality
See plan for 11-step end-to-end + success criteria (build, manual sections, Lighthouse, a11y, docs completeness, git/GH, main-vault updates, user VS Code review, dotfiles save, closeout checklist).

Will run after each milestone + full at end. Use subagents (check-work, review) where helpful. Grim for any desktop preview if needed; primarily Vivaldi + DevTools.

**Current (planning):** Plan approved. No code yet. Domain parking confirmed, research solid.

---

## Risks, Open Items, Scope Guardrails
- Scope: One-pager only. Any v2 (multi-page, blog) goes to Roadmap + new CLI Tasks item.
- Documentation debt: Never edit source without note + Report update.
- User input gates: Tagline, exact prices, specific portfolio examples, phone number in site, hosting final choice. Will use ask_user_question or note in Report.
- No rice breakage.
- Physical: None (DNS later if user wants).

**Open questions (from plan, to resolve with user or reasonable defaults):**
- Exact tagline / business name phrasing.
- Final price points.
- Public repo? Specific portfolio clients to highlight (restaurants/law/clinics)?
- Real phone in contact now?
- Hosting preference.

---

## Handoff Notes for CC (and Future GK)
**Current state:** Planning + research complete (Competitors.md written, Report/AGENTS initialized, plan approved). Awaiting scaffold (next todo). GK will drive build + docs.

**For CC:** When GK pauses (e.g. after hero+services skeleton), read this Report + notes/ + open the site/ in VS Code. Run review skill on key files or whole if wanted. Focus on: design quality (premium trustworthy?), copy clarity, code cleanliness/maintainability for agency reuse, accessibility. Add findings here or in main CLI Core so we can iterate. Use the AGENTS.md rules.

**Prepared for:** Parallel work (e.g. one on content, one on components via subagents), full review loops, client site cloning from this base later.

---

## Next Steps (from current todo)
- Complete research (mark done).
- Scaffold Astro + purple theme in site/.
- Implement sections iteratively (hero/navbar → services/pricing → rest), writing notes + Report updates **immediately** after each.
- Git + GH create/push.
- Polish + verify.
- Closeout (Tasks/Reports/main vault updates + dotfiles save + user review instruction).
- Handoff.

**End of session action:** Will run `dotfiles-sync save` when real work (not just planning) completes. This log will be expanded in future turns.

---
*All work follows global AGENTS.md, the approved plan.md for this session, and project AGENTS.md. GK full control, no unnecessary user prompts.*