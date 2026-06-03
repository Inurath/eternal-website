# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here.

**Current site status:** One-page Astro + Tailwind site is complete, build-clean, all previous feedback incorporated (main phrase "Built to Endure. Designed to Perform.", your X logo filling the square, IG/FB visuals, international only, team language, pricing 1297/2197/3497 + optional $49/mo, Netlify Forms-ready contact form, etc.). `cd "site" && npm run build` produces a ready `dist/` folder.

**Goal of this document:** Every single action **you** must take is a checkbox `- [ ]`.  
After you finish a group of steps you will have clear "Checkpoint" boxes.  
**If you get stuck:** Reply with the exact last checkbox number you checked + what you see on screen / error / dig output. This way I know precisely where you are and what to tell you next. No guessing.

---

## Current Status (2026-06-03)

**Latest from your edits + images in this note:**
- Namecheap A records: provided full list (10 A all to 198.54.119.206 in screenshot 20260602205452.png), asked "this are all A records on namecheap side do i delete all of them?" — you marked several [x].
- Forwarding: "i dont know what are you talking abt URL Redirect / Forwarding / Parking / "For Sale" here are the rest of the records on namecheap" + images 20260602210111.png + 20260602210124.png (MX x2 privateemail, mail. CNAME privateemail, 5 SRV including autodiscover to cpanel + caldav/carddav to eternalwebsite.com, 2 SPF (old hosting + privateemail), full DKIM default._domainkey, _dmarc, several _card* TXT path=/, and the bad www CNAME to bare).
- NS: "confirmed" + image 20260602210156.png (exactly the 4 dns1-4.p05.nsone.net).
- After: digs still 198 A (even @nsone), site "still Your website is ready to go! from Namecheap".
- "i cant find any of that is on namecheap or cpanel im lost with that site. can i give you my credentials and you check all?"
- Netlify records: "reply this are the records on Netlify" + 20260602213000.png showing bad www CNAME eternalwebsite.com + correct @ NETLIFY + www NETLIFY to eternalwebsite.netlify.app.
- SRV: "reply for SRV there is a lot more of fields to fill check the img" + 20260603113311.png (Netlify SRV create form) + "also are you sure is the 5 of them? you only listed 2".
- DMARC: "on this one on namecheap is listed as _dmarc.eternalwebsite.com. with a _ at front is that ok?"
- Latest: "the dig returns [198s] but the site is up on his address also forms dont work i think".

**Fresh verification (terminal right now):**
- NS: dns1-4.p05.nsone.net (correct).
- A eternalwebsite.com + www: 198.54.119.206 (even querying @dns1.p05.nsone.net directly).
- MX: (none).
- curl https://eternalwebsite.com: LiteSpeed, parking page "Your website is ready to go!".
- https://eternalwebsite.netlify.app : 200 + serves correct "Built to Endure. Designed to Perform." hero + full site.

**Root cause:** Authoritative zone (Netlify) still has (or is returning) the old A 198 for apex, overriding the NETLIFY records. The www CNAME to bare (in your Netlify screenshot) is also wrong and can interfere. Namecheap A records (even if deleted) are no longer authoritative after NS switch — focus is Netlify DNS list now.

**Direct answers:**
- Yes — delete all of the 10 A records from your Namecheap A screenshot (main @ + the 9 service subdomains). You likely did most.
- No — do not give credentials. Use screenshots + the steps you perform. If still stuck on forwarding, screenshot the very top of the Namecheap "Manage eternalwebsite.com" page (the overview, before Advanced DNS tab).
- The leading _ in _dmarc.eternalwebsite.com. is correct and required for DMARC. In Netlify use name `_dmarc`.
- SRV: yes, exactly the 5 from the image. Netlify SRV add form has split fields (Name/Service/Protocol/Priority/Weight/Port/Target/TTL) — see exact fills below using your 20260603113311.png + the values from the rest-of-records images.
- "site up on his address" = the netlify.app preview (good). "forms dont work" = notification not set yet + custom domain not resolving yet. Test form + notification on preview immediately (see section 3).

**Immediate next (in order):**
1. Clean Netlify DNS list (delete bad www CNAME + hunt/delete any A 198.54... — this is why custom domain still shows old parking).
2. Complete/add the email records in Netlify (MX/CNAME/SPF/DKIM/DMARC/SRV + path TXTs from your two "rest of records" images). Verify with dig MX.
3. Set Forms notification + test submit on preview (and custom once web works).
4. Report checkpoint (digs + what browser shows on custom + preview).

---

## 1. Clean Up Netlify DNS Records (Do This First — Authoritative Zone)

Netlify UI screenshot shows correct NETLIFY types, but the bad www CNAME + the invisible/missed A 198 are breaking resolution.

- [ ] Netlify → your site → Domain management (left sidebar) → click eternalwebsite.com
- [ ] DNS records list (or "Manage DNS records"):
  - Delete the **www CNAME** record that points to value "eternalwebsite.com" (the non-NETLIFY one, shown first in your 20260602213000.png). Keep the two NETLIFY records (@ and www).
  - Filter or scroll for Type A. Delete **any A record** for Name "@" / "eternalwebsite.com" with value 198.54.119.206 (use "Download records" if list is long; it may not have been in the portion you screenshotted).
  - Delete any other leftover A for subdomains (ftp., cpanel. etc.) if present.
- [ ] Save. Changes are usually instant or <5 min.
- [ ] Test with these commands (copy-paste output back here):

```
dig eternalwebsite.com A +short
dig @dns1.p05.nsone.net eternalwebsite.com A +short
dig www.eternalwebsite.com A +short
dig eternalwebsite.com MX +short
```

**Checkpoint (reply after this section):** Last checkbox # completed. The 4 dig outputs above. What does https://eternalwebsite.com show in your browser (incognito) right now? (e.g. "still parking 'Your website is ready to go!'" or "hero 'Built to Endure...' + form + X logo + green lock"). Same for the preview URL. Any new Netlify DNS screenshot after edits.

---

## 2. Add / Finish Email Records in Netlify (MX + mail. + SPF + DKIM + DMARC + 5 SRV + path TXTs)

Use your exact latest images 20260602210111.png + 20260602210124.png as source. Copy values precisely. You already marked several [x] for MX/CNAME/TXT/DMARC/DKIM — verify they are present and saved in Netlify (MX dig still empty so re-check names/values). Complete the SRV + path TXTs.

In Netlify DNS editor for the domain: "Add new record" for each.

**MX:**
- [ ] @ (or eternalwebsite.com)   MX   10   mx1.privateemail.com
- [ ] @ (or eternalwebsite.com)   MX   10   mx2.privateemail.com

**CNAME:**
- [ ] mail   CNAME   privateemail.com

**TXT SPF (only the privateemail one; remove the old long hosting SPF with 198.54 ips if present):**
- [ ] @   TXT   v=spf1 include:spf.privateemail.com ~all

**TXT DMARC:**
- [ ] _dmarc   TXT   v=DMARC1; p=none;
  (Yes — the _ at the front from Namecheap is correct/required. Name it `_dmarc` or `_dmarc.eternalwebsite.com` per UI.)

**TXT DKIM (copy the entire long value exactly):**
- [ ] default._domainkey   TXT   v=DKIM1; k=rsa; p=[FULL key from image 20260602210124.png — starts MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAGtg/... ends with the full base64]

**SRV (exactly 5 — fill using the split fields in the Netlify SRV form as shown in your 20260603113311.png):**

For each: Add record → SRV type. Use these values from the Namecheap records (Name/Service/Protocol/Priority/Weight/Port/Target/TTL):

1. _autodiscover._tcp
   - Name: _autodiscover._tcp   (or prefilled full as in your form screenshot)
   - Service: _autodiscover (if field shown)
   - Protocol: _tcp (or TCP)
   - Priority: 0
   - Weight: 0
   - Port: 443
   - Target: cpanelemalldiscovery.cpanel.net
   - TTL: 14400

2. _caldav._tcp
   - Name: _caldav._tcp
   - Service: _caldav
   - Protocol: _tcp
   - Priority: 0
   - Weight: 0
   - Port: 2079
   - Target: eternalwebsite.com
   - TTL: 14400

3. _caldavs._tcp
   - Name: _caldavs._tcp
   - Service: _caldavs
   - Protocol: _tcp
   - Priority: 0
   - Weight: 0
   - Port: 2080
   - Target: eternalwebsite.com
   - TTL: 14400

4. _carddav._tcp
   - Name: _carddav._tcp
   - Service: _carddav
   - Protocol: _tcp
   - Priority: 0
   - Weight: 0
   - Port: 2079
   - Target: eternalwebsite.com
   - TTL: 14400

5. _carddavs._tcp
   - Name: _carddavs._tcp
   - Service: _carddavs
   - Protocol: _tcp
   - Priority: 0
   - Weight: 0
   - Port: 2080
   - Target: eternalwebsite.com
   - TTL: 14400

**Extra TXT records (the "path=/" ones from the image, same names as some SRVs):**
- [ ] _caldav._tcp   TXT   path=/
- [ ] _caldavs._tcp   TXT   path=/
- [ ] _carddav._tcp   TXT   path=/
- [ ] _carddavs._tcp   TXT   path=/

**Checkpoint:** Which records added/confirmed? Paste: `dig eternalwebsite.com MX +short` and `dig mail.eternalwebsite.com CNAME +short`. Send a test email to info@eternalwebsite.com — does it arrive in your Thunderbird / Private Email inbox?

---

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













---





---



---