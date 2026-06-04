# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here (Netlify builds the `site/` dir).

**Current site status:** One-page Astro + Tailwind site is complete, build-clean. All prior feedback incorporated. Form now has proper Netlify AJAX success handler (fixed 2026-06-03). `cd "site" && npm run build` produces ready `dist/`.

**Goal of this document:** Every action **you** must take is a `- [ ]` checkbox.  
After a group of steps: use the **Checkpoint** and reply with last # + output + what you see on screen. This keeps us exactly in sync.

---

## Current Status (2026-06-03, after your latest edits + agent verification)

**Your latest update in this note:**
- "all records set Please check everything is okay. :[[eternalwebsite.com (DNS Records) 2.csv]] Should I now delete all records on namecheap?"
- Fresh digs (you pasted + verified here):
  ```
  dig eternalwebsite.com A +short
  98.84.224.111
  18.208.88.157

  dig @dns1.p05.nsone.net eternalwebsite.com A +short
  18.208.88.157
  98.84.224.111

  dig www.eternalwebsite.com A +short
  98.84.224.111
  18.208.88.157

  dig eternalwebsite.com MX +short
  10 mx2.privateemail.com.
  10 mx1.privateemail.com.
  ```
- Attached: `eternalwebsite.com (DNS Records) 2.csv` + previous images (including the form submit result image `Pasted image 20260603212029.png` which shows Netlify "Page not found").

**Live verification (terminal right now):**
- NS: correct (dns1-4.p05.nsone.net — fully delegated to Netlify)
- A @ / www: Netlify anycast IPs (98.84.224.111 + 18.208.88.157) — web good
- MX: correct (mx1 + mx2.privateemail.com)
- https://eternalwebsite.com : HTTP/2 200, serves correct content ("Built to Endure. Designed to Perform." + full site, X logo square etc.)
- Preview netlify.app: also good
- SRV / some email aux records: **not resolving** (see below)
- DMARC, DKIM, mail. CNAME, SPF: resolve correctly

**From CSV 2 (and prior):**
- Web records (@ + www): NETLIFY — correct (your earlier cleanup of bad www CNAME + any A 198 succeeded)
- Email records you added: many have **malformed names** (e.g. "eternalwebsite.com.eternalwebsite.com" for MX in older export; SRVs like "_autodiscover._TCP._autodiscover._tcp.eternalwebsite.com", duplicated path TXT for caldavs etc.). That's why some aux records (SRV) don't resolve even though MX does.
- The form test image you attached was the 404 "Page not found" (not the success div) — because native form POST navigated after Netlify processed it. **Code fix applied** (see below).

**Root causes for remaining issues:**
1. Malformed record names in Netlify DNS for SRV (and historically others) — must delete + re-add with correct short Name values.
2. Form submit UX: now fixed in source (AJAX handler added so success div shows instead of 404/navigation).
3. Namecheap side: with custom NS, old records there are inert, but clean them + confirm no forwarding/parking active.

**Immediate next (in order):**
1. Fix the broken SRV (and any remaining mangled) records in Netlify DNS (section 1).
2. Forms notification UI + test the (now-fixed) form submit on preview (section 2). This can be done immediately.
3. Namecheap cleanup + forwarding check (section 3) — answer to your question is below.
4. Report checkpoint after each: last # + fresh digs (include SRV ones) + what custom domain + preview show + Netlify Forms list screenshot + whether test email arrived.

**Answer to your question "Should I now delete all records on namecheap?"**
**Yes — clean them up.**  
Since NS is fully delegated to Netlify (confirmed), Namecheap's DNS records for eternalwebsite.com are no longer used by the internet. The old A records (main + ftp/cpanel/webmail etc pointing to 198.54.119.206) and any leftover can be deleted in Namecheap Advanced DNS to avoid confusion.  
Separately: on the main Namecheap "Manage eternalwebsite.com" page (not just Advanced DNS), look for and disable any "URL Forwarding", "Redirect", "Parking", or "For Sale" setting if present (these can sometimes still affect even with custom NS).  
Email records (MX etc.) live in Netlify now — no need to keep duplicates at Namecheap.

---

## 1. Fix Malformed DNS Records in Netlify (SRV + any dups with wrong names)

From your CSV 2: the SRV records (and some path TXT) are registered under mangled full names instead of the proper short labels. MX etc. mostly resolved because they were added with apex names, but SRVs are broken.

**In Netlify:**
- Go to your site → Domain management (left) → click eternalwebsite.com → DNS records

**Delete the bad ones (do these first):**
- [ ] Delete every record whose name contains double domain or extra prefixes (e.g. anything ending `.eternalwebsite.com.eternalwebsite.com`, or SRV names like `_autodiscover._TCP._autodiscover._tcp.eternalwebsite.com`, `_caldav._TCP._caldav._tcp...` etc.)
- [ ] Delete duplicate path TXT entries (you have multiple for _caldavs etc.)
- [ ] If any old hosting SPF ("v=spf1 +a +mx +ip4:198...") remains, delete it.

**Re-add with correct short names (use "Add new record" — for SRV the form has separate Service/Protocol/ fields; put only the prefix in Name where shown):**

**MX (apex):**
- [ ] Name: `@` (or leave blank / eternalwebsite.com per UI)   Type: MX   Priority: 10   Value: `mx1.privateemail.com`
- [ ] Name: `@`   MX   10   `mx2.privateemail.com`

**CNAME:**
- [ ] Name: `mail`   CNAME   `privateemail.com`

**TXT SPF (privateemail only):**
- [ ] Name: `@`   TXT   `v=spf1 include:spf.privateemail.com ~all`

**TXT DMARC:**
- [ ] Name: `_dmarc`   TXT   `v=DMARC1; p=none;`

**TXT DKIM (paste the full p=... from your CSV/image):**
- [ ] Name: `default._domainkey`   TXT   `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6tg/wRTcqJcCu4um3PN/PHlzZ7tR/w6+M/9KLzyLV8DBjbuFHFsSVnBKNSXYcnSMjJunj+ieqp6BRfOXsXlz/nfGP8VXzaig71/Of7ASUIjjfTzGuoYXeDCFx8EOU/rDQJWfUc4Rp0jA9vParnWsDkrfTYisEofSQ4d0ChWdQmdRc80P7QNiOJV7KuLojWwAd...` (full from image/CSV 2)

**SRV (5 records — Name field gets the `_service._proto` only; use the split inputs in Netlify add form if present):**
- [ ] Name: `_autodiscover._tcp`   SRV   Priority 0, Weight 0, Port 443, Target: `cpanelemalldiscovery.cpanel.net`
- [ ] Name: `_caldav._tcp`        SRV   0 0 2079 `eternalwebsite.com`
- [ ] Name: `_caldavs._tcp`       SRV   0 0 2080 `eternalwebsite.com`
- [ ] Name: `_carddav._tcp`       SRV   0 0 2079 `eternalwebsite.com`
- [ ] Name: `_carddavs._tcp`      SRV   0 0 2080 `eternalwebsite.com`

**Path TXT (for the caldav/carddav SRVs — short names):**
- [ ] Name: `_caldav._tcp`     TXT   `path=/`
- [ ] Name: `_caldavs._tcp`    TXT   `path=/`
- [ ] Name: `_carddav._tcp`    TXT   `path=/`
- [ ] Name: `_carddavs._tcp`   TXT   `path=/`

**Checkpoint (after this section):**  
Last checkbox #.  
Run and paste:
```
dig eternalwebsite.com MX +short
dig mail.eternalwebsite.com CNAME +short
dig _autodiscover._tcp.eternalwebsite.com SRV +short
dig _caldav._tcp.eternalwebsite.com SRV +short
dig _dmarc.eternalwebsite.com TXT +short
dig default._domainkey.eternalwebsite.com TXT +short
```
Send a test email to info@eternalwebsite.com — does it arrive? Any new CSV export or Netlify DNS list screenshot.

---

## 2. Set Up Netlify Forms Notification + Test Form (now with working success UI)

The form code (in source) is correct + now has the AJAX handler so submit shows the inline "Thanks!" div instead of navigating to 404.

You can configure notification + test on the **preview** right now (`https://eternalwebsite.netlify.app`). Custom domain not required for this step.

- [ ] Netlify dashboard → click your site (eternalwebsite)
- [ ] Left sidebar: **Forms** (or Site configuration → Notifications → Form submission notifications)
- [ ] You should see the "contact" form listed (it registers from the built HTML)
- [ ] Click "Add notification" → Email
- [ ] Recipient: `info@eternalwebsite.com`
- [ ] Save / enable.

**Test the form (do this after the DNS section or now):**
- [ ] Open https://eternalwebsite.netlify.app (incognito recommended)
- [ ] Fill the contact form completely (name, business, email, message) → click "Send inquiry"
- [ ] You should now see the green success message on the page (the div we have): "Thanks! Your message was sent..."
- [ ] (The old 404 you saw should no longer happen thanks to the handler fix in latest source.)
- [ ] Back in Netlify → Forms tab: the new submission should appear listed (with the fields you entered).
- [ ] Check info@ inbox (Thunderbird or Namecheap webmail): you should receive the notification email from Netlify (may take a minute; check spam).

**If submit still doesn't show success or no capture:**
- Make sure you have the latest source on the deployed Netlify site (see "Source updates" note below).
- Check browser console for errors.
- Rebuild locally (`npm run build` in site/) and confirm the handler script is in the dist/index.html.

**Checkpoint:** Did you add the info@ email notification? (yes + exact path you clicked). After test submit on preview: did the thanks div appear on page? Did the submission show in Netlify Forms list? Did email arrive in inbox?

---

## 3. Namecheap Cleanup (per your question) + Forwarding Check

- [ ] In Namecheap, go to Domain List → Manage eternalwebsite.com
- [ ] Check the main domain overview page (not Advanced DNS) for any "URL Forwarding", "Redirect Domain", "Parking", or similar section. Disable / delete any active forwarding or parking if present.
- [ ] Go to Advanced DNS tab.
- [ ] Delete all the old A records (the ones pointing to 198.54.119.206 for @ and all the service subdomains like cpanel, webmail, ftp, autodiscover, whm, etc. — you had a full list/screenshot of them).
- [ ] You can also delete any other records that are now duplicated in Netlify (MX, CNAMEs, TXT, SRV, DMARC, DKIM) — they are not active anyway.
- [ ] Leave the Nameservers as the 4 Netlify p05.nsone.net ones (do not change back).

**After cleanup:**
- [ ] Re-run the 4 main digs from earlier + the SRV ones.
- [ ] Confirm https://eternalwebsite.com still loads the full site (no change expected).

**Checkpoint:** "Namecheap cleaned" + describe what forwarding/redirect setting you found (or "none") + what A records you deleted + fresh dig outputs if anything changed.

---

## Source Updates (Form Fix) + Redeploy

- Form success handler was added to `site/src/pages/index.astro` (AJAX fetch + show #form-success). Build clean.
- Companion note updated.
- This change is committed + pushed with this session (see Report.md).
- Netlify will auto-deploy on push to main (or trigger manual deploy in Netlify UI → Deploys → Trigger deploy).
- Once redeployed, the preview + custom domain will have the working form success.

(If you are editing locally in the vault: open `site/` in VS Code, the fix is already here.)

---

## Final Checks (when DNS email good + forms capturing + site live + email works)

- [ ] All digs good: A = Netlify IPs, MX present + correct, SRV for autodiscover/caldav/carddav resolve, DMARC/DKIM/SPF good.
- [ ] https://eternalwebsite.com (and www.) loads full correct site in browser (incognito): hero phrase, services, pricing tiers, portfolio, contact form, X/IG/FB squares, dark toggle, green padlock. No parking/LiteSpeed/404.
- [ ] Form submit on **custom domain** (after redeploy) shows the thanks message inline, appears in Netlify Forms, and emails info@.
- [ ] Test email to info@eternalwebsite.com arrives in inbox.
- [ ] (Optional) https://dnschecker.org for eternalwebsite.com (A + MX + SRV views) — all green.

If anything fails after a step: reply with the checkpoint format + last # + exact dig output + description/screenshot of the screen + what browser shows on the domain.

Once everything passes: site + email + forms are live from your GitHub on Netlify. Update this note with "ALL DONE [date]" + final checkpoint and we're closed on v1 publish.

---

**Old / bloat removed in this cleanup pass (per your "delete all that is not necessary anymore"):**  
Previous long "Current Status" history paragraphs, repeated MX/CNAME lists, outdated "you marked [x] this round", old Pre-Checks / Section 1/2/3/4/5/6/7 with mixed past states and "reply with..." instructions that no longer match reality, verbose "Once Web is Working" / agent notes, duplicate blocks. Kept only actionable current checkboxes + the exact latest user input + verified status + direct answer to your Namecheap question. Focused on the 3 remaining real issues (malformed SRV names, form success UX now fixed in code, Namecheap cleanup).

**Next for you:** Start with Section 1 (fix the SRV names using the list above + your CSV 2 as data source). Then do Section 2 forms notification + test (preview first). Then the Namecheap cleanup you asked about. Report at each checkpoint.

Live site is already serving the website on the domain. We're just finishing the email DNS hygiene + forms notifications + tests.
