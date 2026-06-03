# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here.

**Current site status:** One-page Astro + Tailwind site is complete, build-clean, all previous feedback incorporated (main phrase "Built to Endure. Designed to Perform.", your X logo filling the square, IG/FB visuals, international only, team language, pricing 1297/2197/3497 + optional $49/mo, Netlify Forms-ready contact form, etc.). `cd "site" && npm run build` produces a ready `dist/` folder.

**Goal of this document:** Every single action **you** must take is a checkbox `- [ ]`.  
After you finish a group of steps you will have clear "Checkpoint" boxes.  
**If you get stuck:** Reply with the exact last checkbox number you checked + what you see on screen / error / dig output. This way I know precisely where you are and what to tell you next. No guessing.

---

## Current Status (2026-06-03)

**Latest from your edits (this check):**
- You marked the full Netlify cleanup steps in section 1 as [x] (Domain management, delete the bad www CNAME + any A 198 hunt, Save, ran the test commands).
- Pasted your test output after the [x] (still 198.54 A for @/www even @nsone + empty MX).
- Attached fresh Netlify export: "here are the records on Netlify ![[eternalwebsite.com (DNS Records) 1.csv]]" (and the other .csv).

(Older context like the initial A-list question, forwarding "i dont know", SRV "more fields?", DMARC _, previous Netlify png, "still ready to go", "im lost/credentials", "forms dont work" etc. was from prior edits — the note is now trimmed to current action only. Older replies/images kept only as source for the email values.)

**From the CSV (key problems to fix next):**
- Web: @ + www = NETLIFY (correct, no A 198 in zone — your deletes in 1 succeeded).
- Email: many records have wrong names ("eternalwebsite.com.eternalwebsite.com" for MX etc, mangled SRV names). Old hosting SPF also present in one export. This is why MX dig empty.

**Fresh verification (terminal, matches your pasted test):**
- NS correct (4x p05.nsone.net).
- A @/www: 198.54.119.206 (even direct @nsone).
- MX: none.
- Custom domain: still LiteSpeed parking.
- Preview: good, hero "Built to Endure. Designed to Perform." + full site.

**Root cause now:** Netlify zone itself looks good for web (NETLIFY present, no bad A/CNAME from your CSV). Persistent 198 + broken email = either slow propagation/delegation or (most likely) Namecheap "URL Forwarding/Redirect/Parking" active on the main domain page (bypasses your NS + zone). Plus the name errors on email records you added.

**Immediate next (in order):**
1. (You marked cleanup [x]) Re-check Netlify list (or re-export CSV) confirms only the 2 NETLIFY for web. If custom domain still 198 after 10-30 min + re-dig @nsone, go to main Namecheap "Manage eternalwebsite.com" page and disable any Forwarding/Redirect/Parking/"For Sale".
2. Fix email record *names* in Netlify (section 2 below): delete the bad full-name versions from your CSV, re-add with short correct names (use the fix list + your images/CSV data). Re-test dig MX.
3. Set Forms notification (section 3) + test submit on preview now.
4. Report checkpoint (last # + fresh 4 digs + what custom domain + preview show in browser).

---

## 1. Clean Up Netlify DNS Records (Do This First — Authoritative Zone)

(You marked all steps [x] this round + provided CSV export.) Your CSV now shows clean NETLIFY for @ + www (no A 198) — the bad www CNAME to bare from earlier screenshots was the main leftover. Web records in Netlify zone look correct. Persistent 198 in public digs is outside the zone (Namecheap forwarding or propagation).

- [x] Netlify → your site → Domain management (left sidebar) → click eternalwebsite.com
- [x] DNS records list (or "Manage DNS records"):
  - Delete the **www CNAME** record that points to value "eternalwebsite.com" (the non-NETLIFY one, shown first in your 20260602213000.png). Keep the two NETLIFY records (@ and www).
  - Filter or scroll for Type A. Delete **any A record** for Name "@" / "eternalwebsite.com" with value 198.54.119.206 (use "Download records" if list is long; it may not have been in the portion you screenshotted).
  - Delete any other leftover A for subdomains (ftp., cpanel. etc.) if present.
- [x] Save. Changes are usually instant or <5 min.
- [x] Test with these commands (copy-paste output back here):

```
dig eternalwebsite.com A +short
dig @dns1.p05.nsone.net eternalwebsite.com A +short
dig www.eternalwebsite.com A +short
dig eternalwebsite.com MX +short
```

(You ran the test after your [x] marks — result still 198 A / empty MX, see Current Status + CSV analysis above. Re-run after any fixes below.)

**Checkpoint (reply after this section):** Last checkbox # completed. The 4 dig outputs above. What does https://eternalwebsite.com show in your browser (incognito) right now? (e.g. "still parking 'Your website is ready to go!'" or "hero 'Built to Endure...' + form + X logo + green lock"). Same for the preview URL. Any new Netlify DNS screenshot or CSV after edits.

---

## 2. Add / Finish Email Records in Netlify (MX + mail. + SPF + DKIM + DMARC + 5 SRV + path TXTs)

**Critical fix from your latest CSV export:** The records you added (many now [x]) have wrong/duplicated names (e.g. "eternalwebsite.com.eternalwebsite.com" for MX/DKIM/_dmarc, and mangled SRV names with extra prefixes). That's why MX dig is empty. Delete the bad ones and re-add with **short correct names** (use "@" or leave name for apex; "mail", "_dmarc", "default._domainkey", "_autodiscover._tcp" etc for subs — do not type the full domain into the Name field).

Use your exact latest images 20260602210111.png + 20260602210124.png + the CSV values as source. Copy the data parts precisely, but fix the names.

In Netlify DNS editor for the domain: first delete the bad full-name versions, then "Add new record" for each with correct names.

**Fix malformed names (do this now — from your CSV):**
- [ ] In Netlify DNS list, delete every record whose name ends with ".eternalwebsite.com.eternalwebsite.com" (the MX, mail, TXT SPF/DKIM/_dmarc ones, and any bad SRV with double prefixes like _autodiscover._TCP._autodiscover...).
- [ ] Also delete the old hosting SPF if present ("v=spf1 +a +mx +ip4:198... web-hosting").
- [ ] Re-add the good ones with proper short names (examples below, using data from your images/CSV). For apex records use Name: @ (or blank/eternalwebsite.com per UI). For subs use the exact prefix only.

**MX (apex):**
- [ ] Name: @   MX 10 mx1.privateemail.com
- [ ] Name: @   MX 10 mx2.privateemail.com

**CNAME:**
- [ ] Name: mail   CNAME privateemail.com

**TXT SPF (only the privateemail one):**
- [ ] Name: @   TXT v=spf1 include:spf.privateemail.com ~all

**TXT DMARC:**
- [ ] Name: _dmarc   TXT v=DMARC1; p=none;

**TXT DKIM:**
- [ ] Name: default._domainkey   TXT v=DKIM1; k=rsa; p=[full from image/CSV]

**SRV (use the split fields in the add form, Name = the _service._proto part only):**
Use the 5 from images + your 20260603113311.png form example. Correct names (no extras):
1. Name: _autodiscover._tcp   (Service _autodiscover, Protocol _tcp, Priority 0, Weight 0, Port 443, Target cpanelemalldiscovery.cpanel.net)
2. Name: _caldav._tcp   ( ... Port 2079, Target eternalwebsite.com)
3. Name: _caldavs._tcp   ( ... Port 2080, Target eternalwebsite.com)
4. Name: _carddav._tcp   ( ... Port 2079, Target eternalwebsite.com)
5. Name: _carddavs._tcp   ( ... Port 2080, Target eternalwebsite.com)

**Extra path TXT (same short names as the caldav/carddav SRVs):**
- [ ] Name: _caldav._tcp   TXT path=/
- [ ] Name: _caldavs._tcp   TXT path=/
- [ ] Name: _carddav._tcp   TXT path=/
- [ ] Name: _carddavs._tcp   TXT path=/

You had some path [x] already — re-check after the name fixes.

**Checkpoint:** Which records added/confirmed with correct names? Paste: `dig eternalwebsite.com MX +short` and `dig mail.eternalwebsite.com CNAME +short`. Send a test email to info@eternalwebsite.com — does it arrive in your Thunderbird / Private Email inbox?

**MX:**
- [x] @ (or eternalwebsite.com)   MX   10   mx1.privateemail.com
- [x] @ (or eternalwebsite.com)   MX   10   mx2.privateemail.com

**CNAME:**
- [x] mail   CNAME   privateemail.com

**TXT SPF (only the privateemail one; remove the old long hosting SPF with 198.54 ips if present):**
- [x] @   TXT   v=spf1 include:spf.privateemail.com ~all

---

**CSV reference (your latest export):** ![[eternalwebsite.com (DNS Records) 1.csv]] (and the other .csv) — use alongside the images for exact values when re-adding.

## 3. Set Up Netlify Forms Notification (the one you couldn't find) + Test Forms

The form code is already correct for Netlify (data-netlify="true", name="contact", hidden form-name input, honeypot). Submissions will be captured in the dashboard and can email you.

You can set the notification + test **now on the preview** (https://eternalwebsite.netlify.app) — custom domain not required yet.

- [ ] Netlify dashboard → click your site (eternalwebsite)
- [ ] Left sidebar: click **Forms** (if missing: Site configuration → Notifications → Form submission notifications)
- [ ] You should see the "contact" form listed.
- [ ] Click "Add notification" (or the notifications area) → Email
- [ ] Recipient: info@eternalwebsite.com
- [ ] Save / turn on.

**Test right now:**
- [ ] Open https://eternalwebsite.netlify.app (incognito)
- [ ] Fill the contact form completely (name/business/email + message) → Submit "Send inquiry"
- [ ] You should see the success message in the page.
- [ ] Back in Netlify → Forms: the submission should appear (with all fields you entered).
- [ ] Check info@ inbox (Thunderbird or Namecheap webmail): you should get the form notification email from Netlify.

**If forms "dont work":** Notification must be added first (above). Test on preview first. Check Netlify Forms list for entries (even if no email arrives — check spam). Once custom domain resolves, re-test there.

**Checkpoint:** Did you locate Forms / notifications and add the info@ email? (yes/no + exact clicks/path you used). After preview test submit: did it show in Netlify Forms? Did the email arrive?

---

## Final Checks (when digs + site + email + forms all good)

- [ ] Digs: A returns Netlify IPs (not 198), MX records present.
- [ ] https://eternalwebsite.com (and www) in browser: full correct site loads (hero "Built to Endure...", services, pricing, portfolio, form, X/IG/FB squares, dark mode, green padlock). No parking/LiteSpeed.
- [ ] Form submit on custom domain works end-to-end (Netlify capture + email to inbox).
- [ ] Test email to info@eternalwebsite.com arrives.
- [ ] (Optional) https://dnschecker.org eternalwebsite.com (A + MX views).

If anything fails, reply with the checkpoint format + screenshot of the exact screen + fresh dig output. We'll fix one checkbox at a time.

Once all pass: site + email + forms live from your GitHub on Netlify. Update this note with "done" + final checkpoint and we're closed.

---
