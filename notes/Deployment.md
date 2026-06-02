# Deployment — Publish eternalwebsite.com from GitHub

**Source of truth:** GitHub repo `Inurath/eternal-website` (main branch). All deploys pull from there.

**Current site status (2026-06-02 GK publish prep):** One-page Astro static site complete, themed, all feedback from CLI Web Tasks addressed (hero phrase "Built to Endure. Designed to Perform.", X/IG/FB footer squares, international positioning, team language only, pricing 1297/2197/3497 + optional $49/mo, Netlify Forms-ready contact form, clean build). Build: `npm run build` in `site/` produces `dist/`. Verified clean, ~17-20kB index.html.

**Recommended hosting:** Netlify (free tier perfect for this: custom domain, HTTPS, form handling, instant deploys from GH, previews). Vercel is close second. cPanel static upload is fallback (since domain parking page exists on Namecheap).

## 1. Netlify (Primary — Recommended)

### Connect from GitHub
1. Go to https://app.netlify.com (sign up / log in with GitHub).
2. "Add new site" → "Import an existing project".
3. Choose GitHub → authorize if needed → select `Inurath/eternal-website` repo.
4. **Important settings (because site/ is a subdir of the repo root):**
   - Base directory: `site`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - (Node version: default or 22+ fine; package has engines >=22.12)
5. Click Deploy. First build runs from the GH main commit.
6. Site gets a random Netlify URL like `https://random-name.netlify.app` — test it.

### Custom Domain (eternalwebsite.com)
1. In Netlify site dashboard → Domain management → "Add custom domain".
2. Enter `eternalwebsite.com` (and `www.eternalwebsite.com`).
3. Netlify will guide DNS:
   - **Preferred (easy):** Change nameservers at Namecheap to Netlify's (they provide 2-4 NS records like `dns1.p07.nsone.net` etc.). This moves the whole domain to Netlify DNS.
   - **Alternative (keep Namecheap DNS):** Add CNAME for `www` → your-netlify-subdomain.netlify.app , and for apex (eternalwebsite.com) use ALIAS/ANAME or A records to Netlify's load balancer IPs (Netlify shows the exact values; usually 4 A records like 75.2.x.x etc. or use their "Apex record" helper).
4. Once DNS propagates (minutes to hours, check with `dig eternalwebsite.com` or whatsmy dns.net), Netlify auto provisions Let's Encrypt HTTPS (green lock).
5. In Netlify, set the primary domain, and enable "Redirects" or "Branch deploys" as needed. Add redirect rule for www → apex or vice-versa if desired (in _redirects file or UI).

**After domain live:** Update any hard-coded URLs if needed (currently uses relative + og:url points to eternalwebsite.com).

### Netlify Forms (the contact form)
- The form in `index.astro` already has `data-netlify="true" name="contact"`, hidden `form-name`, and honeypot. Netlify detects it on build/deploy.
- Submissions appear in Netlify UI → Forms tab (with spam filtering).
- **Configure notifications:** In Forms settings for this form → "Notification settings" → add email `info@eternalwebsite.com` (or the Private Email address). Netlify will forward submissions.
- Test: After deploy + custom domain, fill the form on live site → check Netlify dashboard + your email (may have slight delay).
- Honeypot catches bots. Native HTML5 validation + required attrs included.
- If you want more advanced (e.g. success page, Zapier), see Netlify docs.

**_redirects for SPA-ish or nice 404 (optional):** Create `site/public/_redirects` with:
```
/*    /index.html   200
```
(Netlify copies public/ to root of deploy.)

## 2. Vercel (Alternative)

Similar flow:
- Import GitHub repo in https://vercel.com
- Root directory: `site`
- Build command: `npm run build`
- Output directory: `dist`
- Then add custom domain in project settings (Vercel also handles DNS + certs nicely for Namecheap).
- Forms: Use Formspree or Resend + API route (or keep mailto / upgrade later). Vercel has no built-in forms like Netlify.

## 3. cPanel / Namecheap Hosting Fallback (Static Upload)

If you prefer to keep everything on Namecheap (domain + email + hosting):
1. In `site/`: `npm run build`
2. The `dist/` folder is the static site (index.html + _astro/ + images/ + logos etc.).
3. Use File Manager or FTP/SFTP (or FileZilla) to upload the **contents of dist/** into the `public_html/` (or `www/`) folder on cPanel for eternalwebsite.com.
4. For domain: if parking page was active, disable it or point the addon/subdomain to the folder.
5. HTTPS: enable AutoSSL or install free cert in cPanel.
6. Form: will fall back to mailto (or manually set up Formspree by adding `action="https://formspree.io/f/YOUR_KEY"` + `method="POST"` to the form, remove data-netlify attrs, and test).

**Downsides vs Netlify:** No automatic deploys from git (you re-build + re-upload on changes), no built-in forms, manual SSL/DNS, slower CDN usually.

## 4. Form Handling Options Summary (v1 ready)

| Option       | Setup Effort | Pros                              | Cons                          | Recommended For |
|--------------|--------------|-----------------------------------|-------------------------------|-----------------|
| Netlify Forms (current attrs) | Low (UI config) | Free, spam filter, dashboard, email forward to info@ | Tied to Netlify host | Primary (easiest) |
| Formspree    | Low (free key) | Works on any host (Netlify/cPanel/GH Pages) | 50/mo submissions free tier | If not on Netlify |
| mailto (fallback) | Zero | Works immediately, uses your Thunderbird | UX poor on mobile (no client or ugly), no server capture | Local dev / backup only |
| Custom (Resend + edge fn) | Medium | Full control, branded emails | Overkill for v1, costs | Later if volume grows |

Current code supports Netlify out of box + direct email link always visible.

## 5. Post-Deploy Polish / Verification

- Run Lighthouse (DevTools or web.dev/measure) on live URL: target 95+ perf/accessibility (static + Tailwind helps; images are small).
- Test form end-to-end on custom domain.
- Test dark mode, mobile nav, all CTAs, pricing cards, portfolio images load.
- Update OG image later: add a real hero/preview image to public/ and set `og:image` + twitter card in Layout.astro (see Report for plan).
- Add sitemap: `npx astro add sitemap` (updates astro.config + generates /sitemap-index.xml on build).
- robots.txt: add `site/public/robots.txt` with `Sitemap: https://eternalwebsite.com/sitemap-index.xml` + Allow.
- Analytics (optional): Plausible or Umami self-hosted lightweight; or Netlify Analytics paid.
- GitHub: keep pushing to main; Netlify auto-deploys on push (enable in UI if not).

## 6. DNS / Namecheap Specific Notes

- Current: eternalwebsite.com has Namecheap parking page + Private Email (IMAP/SMTP mail.privateemail.com) configured (see Business Email Setup note in main vault).
- When switching to Netlify nameservers: email continues to work (Namecheap Private Email is separate from web hosting; DNS for MX records will be handled by Netlify if you add them, or keep email DNS and only web records).
- Test email still works after DNS change.
- If using CNAME/A records only (no full NS change): MX for email stay at Namecheap, web points to Netlify.
- Propagation: use https://dnschecker.org or `dig +short eternalwebsite.com`

## 7. Rollback / Multi-Env

- Netlify: previous deploys are one-click rollback in dashboard.
- Git: tag releases or use branches + preview deploys (Netlify does this for PRs automatically).
- Always test with `npm run preview` locally before pushing.

## 8. Future (v2+)

- Multi-page site or blog → new Astro pages + client sites cloned from this template (data/ swap + rebrand).
- Real booking/calendar integration.
- Client portal / login.
- See Report.md "Roadmap" + notes/Roadmap.md (to be created).

**Agent notes:** After any deploy change, update this file + Report.md + run build locally + test. User reviews final in VS Code or live URL. Push git. Update main CLI logs.

This document + the GH repo + `site/` source = everything needed to publish and maintain from "git push" to live custom domain.

*Created during GK "read your notes and do your tasks" session to close the publish readiness item in CLI Web Tasks.*