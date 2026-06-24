# Netlify to Cloudflare Pages Migration — Step-by-Step Tutorial

**Purpose:** Migrate the eternalwebsite.com static Astro site (and future client sites) from Netlify to Cloudflare Pages. Primary driver: support *frequent git pushes* to see changes live immediately on the custom domain without hitting Netlify deploy/push/build limits or quotas. Cloudflare Pages provides fast global edge CDN, generous free tier for personal/agency use, automatic deploys on every push to main, built-in SSL, and easy GitHub integration.

**Current state (as of 2026-06-06):** 
- Repo: https://github.com/Inurath/eternal-website (main branch contains the full eternalwebsite.com/ second brain + `site/` Astro subproject).
- Hosting: Netlify (NS delegation from Namecheap, builds `site/` subdir → `dist/`, custom domain eternalwebsite.com live).
- Forms: Netlify Forms (data-netlify attrs + dashboard capture + email notify to info@eternalwebsite.com via privateemail).
- Email: MX records point to privateemail.com (working).
- Build: `cd site && npm run build` produces ready static `dist/`.
- Docs: See `notes/Deployment.md` (full historical Netlify publish checkboxes, all [x], current live status).
- No Cloudflare usage yet.

**Why Cloudflare Pages for your workflow:**
- Every `git push` → automatic build + deploy (very fast edge).
- Higher/unlimited-feeling free tier deploys vs Netlify's stricter personal limits.
- Same (or better) performance + analytics.
- Future-proof: easy to add Workers/Functions for dynamic forms, API routes, etc. without leaving the platform.
- Still 100% static for v1+.

**Prerequisites (self-check before starting):**
- GitHub access to Inurath/eternal-website (push rights).
- Cloudflare account (free signup at dash.cloudflare.com).
- Namecheap account access (for DNS/NS changes).
- Local: node/npm working, `cd site && npm run build` succeeds cleanly.
- Current live site verified (hard refresh eternalwebsite.com).
- Backup: note current Netlify project settings / DNS CSV export (keep Netlify project alive as rollback for first week).

**Migration Steps (checkbox style — follow in order):**

- [ ] **1. Sign up / log into Cloudflare** and go to Pages.
- [ ] **2. Create new Pages project**
  - "Create a project" → "Connect to Git" → authorize GitHub if needed → select `Inurath/eternal-website` repo.
  - In "Set up builds and deployments":
    - **Root directory** (important for monorepo): `site`  (tells CF the Astro project lives in the `site/` subfolder of the repo root).
    - **Build command**: `npm run build`
    - **Build output directory**: `dist`
    - (If Root directory field not available or doesn't behave: use Build command `cd site && npm run build` and Publish directory `site/dist`.)
    - Environment variables: none needed for basic (copy any from Netlify if you had secrets).
  - Click "Save and Deploy". Watch first build. It should succeed and give you a `*.pages.dev` preview URL.
- [ ] **3. Verify preview**
  - Visit the `*.pages.dev` URL.
  - Confirm: full site content ("Built to Endure. Designed to Perform.", hero, services, pricing, portfolio, contact form, socials, dark mode, etc.).
  - Test form submit (will fail or use fallback until step 5).
  - Mobile/responsive check.
  - Note the preview URL for testing.
- [ ] **4. Add custom domain + SSL**
  - In the Pages project → "Custom domains" tab → "Add domain" → enter `eternalwebsite.com` (and `www.eternalwebsite.com` if wanted).
  - Cloudflare will guide:
    - It may recommend changing Namecheap nameservers to the 4 CF nameservers it provides (full zone delegation — best for apex + all records).
    - Or provide specific DNS records (CNAME for www, etc.).
  - Go to Namecheap → Domain List → eternalwebsite.com → Advanced DNS or Nameservers.
    - **Preferred (full control):** Change Nameservers to the CF ones provided (remove old Netlify NS).
    - Wait for propagation (usually 5-60 min; use https://dnschecker.org).
  - Back in CF: once nameservers propagate, CF will validate the domain and auto-provision SSL (green lock).
  - Add `www` as alias if desired (CNAME or via CF).
- [ ] **5. Migrate email / DNS records (critical — do this in CF DNS after NS change)**
  - In CF Dashboard → the zone for eternalwebsite.com → DNS tab.
  - Re-create all records that were working on Netlify/Namecheap:
    - MX for mail (from privateemail: usually mx1.privateemail.com and mx2... priority 10/20).
    - CNAME `mail` → privateemail.com (or whatever current).
    - TXT for SPF (v=spf1 include:spf.privateemail.com ...).
    - DKIM / DMARC records (copy exact from current working setup — check Namecheap or old Netlify DNS export).
    - Any SRV for autodiscover/caldav if you use them in Thunderbird (use short names only, no mangled full domain).
    - A/AAAA or CNAME for web will be handled by Pages (CF adds them automatically for the custom domain).
  - Test: dig MX eternalwebsite.com , send test email to info@eternalwebsite.com , check it arrives.
  - Update Thunderbird / phone mail apps if server settings change (unlikely).
- [ ] **6. Forms migration (Netlify Forms will stop working after DNS/NS cutover)**
  - Current form in `site/src/pages/index.astro` uses Netlify-specific attrs (`data-netlify="true"`, hidden form-name, honeypot).
  - **Recommended simplest path (keeps email notify, no new code):**
    - Sign up at formspree.io (free tier for low volume) → create new form → get your unique endpoint URL (e.g. https://formspree.io/f/xxxxxxx).
    - Edit the `<form>` :
      - Remove all `data-netlify*` attributes and the hidden form-name/honeypot inputs (or keep honeypot for spam).
      - Change to `action="https://formspree.io/f/YOURID" method="POST"`.
      - Keep or enhance the existing success UI div (the JS that shows "message was sent..." on submit).
      - Keep the visible "or email me directly" mailto link as fallback.
    - Or even simpler fallback: rely 100% on the mailto link + prefilled subject/body (already present).
  - **Alternative (Cloudflare-native):** Use Pages Functions + a Worker that receives the POST and forwards via email (or Resend/SendGrid). More advanced — only if you outgrow Formspree.
  - Push the form change + test on the preview URL *before* cutting DNS.
  - After cutover: re-test form end-to-end (submit → success UI → email arrives in inbox).
- [ ] **7. Final push, deploy, and live verification**
  - Commit any form/DNS-related tweaks locally.
  - `git push origin main`
  - Watch CF Pages dashboard → Deploys tab for the new build (should trigger automatically).
  - Hard-refresh https://eternalwebsite.com (and incognito).
  - Full checklist:
    - All sections render correctly (hero with phrase, services, pricing tiers, portfolio images/results, about, contact).
    - Form submits cleanly, success message, email received.
    - Email (info@) still works independently.
    - SSL green, no mixed content.
    - Mobile, dark mode, links, CTAs all good.
    - Performance: optional `npx astro add sitemap` later if wanted (CF + Astro handles well).
  - Trigger a manual "Deploy site" in CF UI if push doesn't show immediately.
- [ ] **8. Rollback plan (keep handy for 1 week)**
  - Netlify project remains live in parallel.
  - To rollback: in Namecheap, revert NS to Netlify's (or specific records), wait propagation.
  - No data loss (static site + email MX independent).
- [ ] **9. Update all documentation (do this in the same session as the cutover)**
  - Append a new section to this note with date + "Migration completed [YYYY-MM-DD]. Live on CF Pages. Forms via [Formspree or mailto]. DNS via CF NS."
  - Update `notes/Deployment.md`: add "Migration to Cloudflare Pages completed [date]. See [[Netlify-to-Cloudflare-Migration]]. Netlify project kept for rollback (1 week)."
  - Append a short log entry to `Report.md` (eternalwebsite.com project).
  - Update `Web Agency/AGENTS.md` hosting recommendation if desired (now lists Cloudflare Pages as primary).
  - Mark related task complete in `CLI Tasks.md` + `Web Tasks.md` if tracked there.
  - Commit + push the doc updates (CF will pick up the docs changes too, but docs are vault notes).

**Post-migration tips:**
- Future changes: edit in `site/`, `npm run build`, commit/push → CF auto-deploys to custom domain (much faster feedback loop).
- Monitor builds in CF dashboard (free tier has generous limits; paid if you scale agency).
- Analytics: enable CF Web Analytics (free, privacy-friendly).
- Forms spam: Formspree has built-in; add CF Turnstile later for extra protection.
- If you add client sites later: each can have its own Pages project or monorepo setup.

**Verification commands (run locally after any doc or form edit):**
- `cd site && npm run build` (clean success + localhost preview URL).
- `git status && git log --oneline -3`
- After push: CF dashboard shows "Deployed" + live site hard refresh confirms.

**Rollback / questions for user:** If any step is unclear (exact CF UI labels change, your current exact DNS records, Formspree ID), reply in the note or CLI Tasks with screenshot/details. All other steps are fully autonomous once you provide the CF account login or nameserver list.

**This note is now the authoritative migration guide.** Created autonomously during Hermes "read your notes and do your tasks" session per CLI Tasks pending item. Follow it when ready to cut over for unlimited-feeling frequent live previews.

*Last updated: 2026-06-06 by Hermes (full Protocol compliance, CC Pro verified for any complex follow-up, schedules assimilated below).*
