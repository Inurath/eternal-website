# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here.

**Current site status:** One-page Astro + Tailwind site is complete, build-clean, all previous feedback incorporated (main phrase "Built to Endure. Designed to Perform.", your X logo filling the square, IG/FB visuals, international only, team language, pricing 1297/2197/3497 + optional $49/mo, Netlify Forms-ready contact form, etc.). `cd "site" && npm run build` produces a ready `dist/` folder.

**Goal of this document:** Every single action **you** must take is a checkbox `- [ ]`.  
After you finish a group of steps you will have clear "Checkpoint" boxes.  
**If you get stuck:** Reply with the exact last checkbox number you checked + what you see on screen / error / dig output. This way I know precisely where you are and what to tell you next. No guessing.

---

## Current Status (based on your latest screenshot + fresh checks)

**What you showed in the latest image (Pasted image 20260602204803.png):**
- In Netlify DNS settings for eternalwebsite.com and www.eternalwebsite.com:
  - Type: NETLIFY
  - Value: eternalwebsite.netlify.app
- This is **correct and exactly what you want** when using Netlify DNS. Netlify uses the special "NETLIFY" record type to point the domain to your site (it handles the actual IPs behind the scenes).

**Current public resolution (my checks right now):**
- A for eternalwebsite.com and www: 198.54.119.206 (old Namecheap IP)
- NS: the 4 Netlify ones (correct delegation)
- curl https://eternalwebsite.com returns 200 with LiteSpeed (old hosting server), not your Astro site.
- The preview https://eternalwebsite.netlify.app works and serves your site.

**Why it's still "down" on the custom domain:**
The nameserver change to Netlify has been started, and Netlify has the correct records (NETLIFY type).
However, the old A record from before (or cached at registrar/resolvers) is still winning for many lookups. Propagation of full NS delegation + old records being flushed can take time (minutes to hours, sometimes longer with Namecheap).

**Your cPanel images are only useful for the email records (MX, DKIM, etc.) — not for web DNS anymore.**

**Next (in order):**
1. Clean up Namecheap side so it fully delegates to Netlify (remove old A records, parking, forwards).
2. Confirm in Netlify (you already see the good NETLIFY records).
3. Wait + aggressively test propagation (specific dig commands below).
4. Once custom domain serves your site, add the email records in Netlify DNS using your cPanel screenshots.
5. Set up Forms notification.
6. Test.

The old instructions in this note about "add manual A records in Netlify" or "the A is 198 in Netlify DNS" are no longer accurate for your current UI (you see NETLIFY type). We are past that.

I have cleaned up the note below — removed the mixed old history, old "add A" steps, and old pre-checks that assumed cPanel was still the DNS authority. Only current actionable steps remain.

---

## Clean Up Namecheap Side (Most Important Right Now)

Your Netlify side looks correct (NETLIFY records in the screenshot).

The public DNS is still getting the old A record. This usually means Namecheap still has old A records, URL forwarding, or parking active that is interfering with the full delegation to Netlify.

**Do these (checkboxes):**

- [ ] Log into Namecheap → Domain List → Manage eternalwebsite.com.
- [ ] Go to the **Advanced DNS** tab (or "DNS" / "Nameservers" area).
- [ ] **Delete any A records** for:
  - Host: @ or eternalwebsite.com (the one with 198.54.119.206)
  - Host: www (if it has an A or wrong value)
- [ ] Delete or disable any **URL Redirect / Forwarding / Parking / "For Sale"** settings if present.
- [ ] In the Nameservers section, confirm it is set to **Custom DNS** with exactly these 4 (add if missing, remove others):
  - dns1.p05.nsone.net
  - dns2.p05.nsone.net
  - dns3.p05.nsone.net
  - dns4.p05.nsone.net
- [ ] Save / Apply changes. Namecheap may take a minute to update.

**Then test (use these exact commands and paste output):**

```
dig eternalwebsite.com A +short
dig @dns1.p05.nsone.net eternalwebsite.com A +short
dig www.eternalwebsite.com A +short
```

Wait 5-15 minutes and repeat the tests. Use https://dnschecker.org for eternalwebsite.com (select A record).

**Checkpoint — Reply with:**
- Last checkbox completed.
- The dig outputs (especially the @dns1 one).
- What https://eternalwebsite.com shows in your browser now (does it load your "Built to Endure..." site, or still old page / LiteSpeed / 403?).

Once the @dns1 dig returns something other than 198.54.119.206 (or the site loads your real content), the web is good.

---

## Add Email Records in Netlify (After Web is Working)

Once the custom domain serves your site, add these in Netlify (same place where you saw the NETLIFY records).

Go to your site in Netlify → Domain management → click eternalwebsite.com → DNS records / Add new record.

Use the records from your cPanel screenshots as the source. Add:

**MX (do these first for email):**
- [ ] eternalwebsite.com (or @) MX 10 mx1.privateemail.com
- [ ] eternalwebsite.com (or @) MX 10 mx2.privateemail.com

**CNAME:**
- [ ] mail.eternalwebsite.com CNAME privateemail.com

**TXT (SPF - use the privateemail one):**
- [ ] eternalwebsite.com (or @) TXT "v=spf1 include:spf.privateemail.com ~all"

**TXT (DKIM - copy the exact long value from your cPanel image for default._domainkey):**
- [ ] default._domainkey.eternalwebsite.com TXT v=DKIM1; k=rsa; p=[paste the full key from screenshot]

**TXT (DMARC):**
- [ ] _dmarc.eternalwebsite.com TXT "v=DMARC1; p=none;"

**SRV (copy the exact ones from your cPanel images for autodiscover/caldav/carddav):**
- [ ] The _autodiscover._tcp one
- [ ] The various _caldav._tcp , _carddav._tcp etc.

**Checkpoint — Reply with:**
- Which records you added.
- dig eternalwebsite.com MX +short
- Test: send an email to info@eternalwebsite.com and see if it arrives.

---

## Set Up Netlify Forms Notification (The "notification thing")

You can do this part now (it works on the preview URL).

In Netlify:
- Go to your site → Forms (or Configuration → Notifications → Form submission notifications)
- Find the "contact" form.
- Add notification → Email → info@eternalwebsite.com
- Save.

Test by submitting the form on https://eternalwebsite.netlify.app (or the custom domain once it's up). Check Netlify Forms tab for the submission, and your email inbox.

**Checkpoint — Reply with:**
- Did you find the form and add the email notification? (yes/no + exact path you used)
- After test submit: did it appear in Netlify Forms? Did email arrive?

---

## Once Everything is Live on Custom Domain

- Test https://eternalwebsite.com loads your full site + green lock.
- Test form submit on the custom domain.
- Test email to info@ arrives.
- Optional: add redirects if www vs non-www.

The old long pre-checks and old "add A records manually" instructions have been removed from this note because they no longer apply (your Netlify screenshot shows the correct NETLIFY records).

Reply with your checkpoint results after the Namecheap cleanup + dig tests. That's the current blocker.

## Add Email Records in Netlify (Do This After the Custom Domain Serves Your Site)

Once https://eternalwebsite.com loads your actual Astro site (not the old LiteSpeed page), add the email records in the same Netlify DNS editor where you saw the NETLIFY records.

Use your cPanel screenshots as the source for the exact values.

Add:

**MX (highest priority for email to work):**
- [ ] eternalwebsite.com (or @) → MX 10 mx1.privateemail.com
- [ ] eternalwebsite.com (or @) → MX 10 mx2.privateemail.com

**CNAME:**
- [ ] mail.eternalwebsite.com → CNAME privateemail.com

**TXT records (copy exact values from your cPanel images):**
- [ ] eternalwebsite.com (or @) → TXT v=spf1 include:spf.privateemail.com ~all   (the privateemail SPF)
- [ ] default._domainkey.eternalwebsite.com → TXT v=DKIM1; k=rsa; p=[full long key from your cPanel screenshot]
- [ ] _dmarc.eternalwebsite.com → TXT v=DMARC1; p=none;

**SRV records (for full email client / calendar functionality - copy the exact ones from cPanel images):**
- [ ] The _autodiscover._tcp.eternalwebsite.com SRV record(s)
- [ ] The _caldav._tcp , _carddav._tcp , _caldavs._tcp , _carddavs._tcp SRV records

**Checkpoint — Reply with:**
- Which ones you added.
- Output of: dig eternalwebsite.com MX +short
- Test: Did a test email to info@eternalwebsite.com arrive in Thunderbird?

---

## Set Up the Forms Notification ("the notification thing")

This can be done on the preview right now.

In Netlify dashboard for your site:
- Look for **Forms** (sidebar) or go to Configuration → Notifications → Form submission notifications.
- Find the "contact" form.
- Add notification → Email → info@eternalwebsite.com
- (Optional) customize subject.

Test by filling the contact form on https://eternalwebsite.netlify.app and submitting.

Check:
- Netlify Forms tab — the submission should appear.
- Your info@ inbox (Thunderbird or webmail).

**Checkpoint — Reply with:**
- Did you find the form and successfully add the info@ notification? (yes/no + path you clicked)
- After test submit on preview: did it show in Netlify Forms? Did the email arrive?

---

## Final Checks (Once Custom Domain is Fully Working)

- [ ] https://eternalwebsite.com loads your full site (hero, pricing, form, X/IG/FB squares, dark mode) + green lock.
- [ ] Form submit on the custom domain works end-to-end (appears in Netlify + email arrives).
- [ ] Email to info@ / admin@ works (from outside + replies).
- [ ] www version either redirects or also works cleanly.

The preview https://eternalwebsite.netlify.app is always a working view of your site.

---

**Cleaned note note:** Old pre-checks, old "add manual A records in Netlify", old "cPanel is your DNS" instructions, old progress history, and the long "safe vs risky" text have been removed. Only what is relevant to your current situation (Netlify DNS + NETLIFY records visible + old A still winning publicly + need to clean Namecheap + add email records) remains, with clear checkboxes and checkpoints.

Reply after the Namecheap cleanup + the dig tests with the checkpoint info. That's the current step that will make the site load on eternalwebsite.com.

**Agent / Future Notes:**  
After any user feedback or change, update this file with new checkboxes for the new steps. Always keep the "reply with last checkbox number + symptoms" pattern. Update Eternal Report.md and main CLI logs when this doc is revised.

*Heavily revised 2026-06-02+ for maximum clarity with checkboxes after user got stuck at DNS + "can't find notification" + email-break concern. Safe DNS path emphasized. Current focus: fix A record causing site down on custom domain.*

---

**Your immediate next steps (based on your *latest* replies — NS are Netlify's, web is live, now fix email records):**

1. [ ] In Netlify (the domain's DNS records editor), add the email records from your cPanel screenshots (start with the two MX, the mail. CNAME, the privateemail SPF TXT, the _dmarc TXT, the default._domainkey DKIM TXT, and the SRV ones for autodiscover/caldav/carddav). Use the detailed list in Section 2 above.
2. [ ] After adding, re-run:
   dig eternalwebsite.com MX +short
   dig mail.eternalwebsite.com +short
   dig _dmarc.eternalwebsite.com TXT +short
   And test sending an email to one of the addresses and see if it arrives in Thunderbird.
3. [ ] Visit https://eternalwebsite.com (incognito) and confirm the full site loads with green lock + your content (X logo square etc.).
4. [ ] Go to Section 3 and set up the Forms notification for info@eternalwebsite.com (the "notification thing" you were looking for). Test submitting the contact form on the live site — it should appear in Netlify Forms dashboard, and after notification is set, arrive in email.

**Reply format reminder:** Tell me the last checkbox number(s) you completed + the info requested in the relevant Checkpoint (0, 1, 1.5, 2, or 3). E.g. "Added MX and mail CNAME (checkboxes 2.1 and 2.2). New dig MX: ... . Live site looks good except ..."

The web part of the site is published and working. Fixing the email records in Netlify DNS will restore Private Email, then we finish with the form notification and testing.

If you run into any specific error adding a record in Netlify (e.g. validation on the DKIM key or SRV), paste the exact error and the checkbox number.