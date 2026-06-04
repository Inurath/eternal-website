# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here (Netlify builds the `site/` dir).

**Current site status (v1 complete):** One-page Astro + Tailwind site is live on eternalwebsite.com. All prior feedback + deploy steps done. Form has Netlify AJAX success handler. Email (MX + notifications) working. DNS fully migrated (Namecheap cleaned). **Favicon updated to Eternal brand icon** (this session). `cd "site" && npm run build` produces ready `dist/`.

**Goal of this document (now historical):** Every action you had to take was a `- [ ]` checkbox. Checkpoints used for sync. Now closed.

---

## v1 Publish — ALL DONE (2026-06-03)

**Your latest update in this note:**
- "all done pls check ![[eternalwebsite.com (DNS Records) 3.csv]] also note .eternalwebsite.com gets added after names im not adding it fyi"

**User confirmation:** "all done and working"

**Final verification (terminal + your marks + prior checkpoints):**
- NS: Netlify (p05.nsone.net) — delegated.
- A @ / www: Netlify IPs (18.208.88.157 + 98.84.224.111) — site live.
- MX: mx1 + mx2.privateemail.com — email receiving.
- mail. CNAME: privateemail.com.
- DMARC / DKIM / SPF: present and resolving.
- SRV (autodiscover/caldav/carddav): queries return empty in current digs (records in Netlify CSV 3 still show under mangled full names like _autodiscover._TCP._autodiscover._tcp... — common when Name field included extra during add; you noted the .eternalwebsite.com suffix behavior). Core email + web work; these are auxiliary for email client auto-config (optional for basic use).
- https://eternalwebsite.com : HTTP/2 200, full correct content ("Built to Endure. Designed to Perform." + hero, services, pricing, portfolio with results, contact form, social squares, etc.). Green lock.
- Forms: All [x] — notification to info@eternalwebsite.com added in Netlify UI; test submits show inline success thanks div (thanks to AJAX handler), appear in Netlify Forms dashboard, and email notifications arrive in inbox.
- Namecheap: All [x] per your work — old A records (198.54...) + service subdomains deleted, forwarding/parking/redirects disabled/removed, NS left as Netlify.
- All Final Checks [x] by you.

**Favicon fix (this session, per your report):** Browser tab was still showing default Astro icon (you attached tab screenshot with "Eternal Website | Premi..." + Astro mark). 
- eternal-logo.png (the square brand "page icon" / mark) is now the source.
- Generated proper favicon.ico (multi-resolution 16/32/48 from the logo) + favicon.png (512x512).
- Updated Layout.astro <head>: now links to /favicon.ico + /favicon.png (removed default Astro svg link).
- Build clean. Pushed to GH — Netlify will serve the Eternal icon on next deploy (or trigger manual "Deploy site" in Netlify UI). Local preview (`npm run dev` or built dist) will also show it.
- This makes the tab icon match the page/brand icon you wanted.

**Live site is fully operational from GitHub source on Netlify:**
- Web + custom domain
- Business email (MX + SPF/DKIM/DMARC via privateemail)
- Contact form captures + emails you
- Brand favicon
- All from your eternal-website repo (no cPanel hosting needed)

**CSV 3 note:** The export still lists some SRV under mangled names (and you confirmed you didn't type the full domain). If the aux SRV records are needed for email clients (e.g. Thunderbird calendar/contacts auto-discover), we may need to clean/re-add them with exactly the short `_service._proto` in the Name/Service fields in Netlify DNS. Core functionality (receiving mail + forms) is confirmed working by you.

---

## Summary of Completed Steps (all marked [x] + confirmed)

**1. DNS / Email records in Netlify** (after your cleanups + re-adds from CSV/images):
- Web: NETLIFY records for @ + www (old 198 A + bad CNAMEs removed).
- Email: MX, mail CNAME, SPF (privateemail only), DMARC, DKIM added with correct short names.
- SRV + path TXT: attempted per instructions (you marked; CSV 3 reflects current state in zone).

**2. Netlify Forms:**
- "contact" form registered from build.
- Email notification set to info@eternalwebsite.com.
- Test submits: success UI visible, captured in dashboard, emails delivered.

**3. Namecheap side:**
- Forwarding/redirect/parking cleared.
- Old A records (web + all cpanel/ftp/webmail/autodiscover etc. to 198.54.119.206) deleted.
- NS remain Netlify (no change).

**Final Checks:** All [x] — digs, site loads correctly, form end-to-end, test email arrives, etc.

**Source / form handler:** Prior fix for inline success (no more 404 on submit) was already in + pushed.

---

## Next / Maintenance (optional)

- If you want the SRV records (caldav/carddav/autodiscover) working for email client discovery: reply with current Netlify DNS list (or new CSV) and we can give exact delete + re-add steps using short names only.
- Favicon: after this push lands on Netlify (check Deploys tab or wait ~1-2 min after push), hard-refresh the tab (or incognito) — should show the Eternal logo mark instead of Astro.
- Further changes: edit in `site/`, `npm run build`, commit/push — Netlify auto-deploys.
- Trigger manual deploy in Netlify if needed for immediate favicon/forms update.
- Analytics / extra OG image / sitemap: can add later (astro.config has site: 'https://eternalwebsite.com'; `npx astro add sitemap` ready).

---

**v1 closed.** Site + email + forms live and working from GitHub on Netlify + your domain. All checkboxes from the guide completed. Favicon updated as requested. Update this note with any future notes or "v1 live since [date]".

(Old historical bloat, repeated instructions, "start here" lists, prior "immediate next" that no longer apply, and mixed status paragraphs from the multi-day DNS/forms troubleshooting have been removed in prior cleanups + this final pass. The note now serves as the completed record + quick reference for what was done and optional follow-ups.)

**Source of truth remains the GH repo + this vault (Report + notes).** 

To re-open the local dev: `cd "site" && npm run dev` (shows http://localhost:4321/ in terminal as usual).