# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here.

**Current site status:** One-page Astro + Tailwind site is complete, build-clean, all previous feedback incorporated (main phrase "Built to Endure. Designed to Perform.", your X logo filling the square, IG/FB visuals, international only, team language, pricing 1297/2197/3497 + optional $49/mo, Netlify Forms-ready contact form, etc.). `cd "site" && npm run build` produces a ready `dist/` folder.

**Goal of this document:** Every single action **you** must take is a checkbox `- [ ]`.  
After you finish a group of steps you will have clear "Checkpoint" boxes.  
**If you get stuck:** Reply with the exact last checkbox number you checked + what you see on screen / error / dig output. This way I know precisely where you are and what to tell you next. No guessing.

---

## Current Status (based on your latest replies + fresh checks)

**Your latest updates (new images + text):**
- You have been working on the Namecheap cleanup.
- Marked A records deletion [x], provided screenshot of remaining A records (all the service subdomains + main), asked "this are all A records on namecheap side do i delete all of them?"
- For the "URL Redirect / Forwarding / Parking" checkbox: "i dont know what are you talking abt URL Redirect / Forwarding / Parking / "For Sale" here are the rest of the records on namecheap" + images 20260602210111.png and 20260602210124.png (showing MX, SRV for autodiscover/caldav/carddav, SPF, DKIM, DMARC, mail CNAME, www CNAME to eternalwebsite.com).
- Nameservers: "confirmed" + image 20260602210156.png (showing the 4 Netlify NS: dns1-4.p05.nsone.net).
- After running digs: "still Your website is ready to go! from Namecheap"
- "i cant find any of that is on namecheap or cpanel im lost with that site. can i give you my credentials and you check all?"

**My checks right now:**
- NS: the 4 Netlify ones (good).
- A for eternalwebsite.com and www: still 198.54.119.206 (old IP) — even querying Netlify NS directly. So the A cleanup hasn't taken effect yet or main A record wasn't deleted.
- curl to custom domain: still old hosting (LiteSpeed), showing "Your website is ready to go!" parking page.
- Preview works.

**Key from your new images:** The "rest of the records" are exactly the email ones we need to copy to Netlify DNS (MX for privateemail, SRV for email clients/calendar, SPF, DKIM key, DMARC, mail. CNAME). There's also a bad www CNAME pointing to eternalwebsite.com (should be removed or fixed).

**The URL Redirect question:** In Namecheap, even after setting custom nameservers, there can be separate "Forwarding" (URL Redirect) settings on the main domain overview page (not just Advanced DNS). Check the top-level domain management for any "URL Forwarding", "Domain Forwarding", or "Parking" and turn them off if present. The images you provided show the DNS records, not the forwarding settings.

**No, do not give credentials.** I can't and won't access your accounts for security reasons. Provide screenshots of the pages (like you are doing), and I'll guide you exactly where to click.

**Netlify side (from previous screenshot):** You see the correct "Type: NETLIFY" for the domain and www — good, no need to add manual A records there. But since resolution is still old, we need to check the actual DNS records list in Netlify and remove any A record pointing to 198.54.119.206.

**Next (in order):**
1. Finish Namecheap cleanup: delete the remaining A records (yes, all of them from your screenshot), check for any forwarding/parking settings and disable, confirm NS.
2. In Netlify, go to DNS records for the domain and delete any A record for @ with 198.54.119.206.
3. Add the email records (from the "rest of records" images) into Netlify's DNS editor (MX, SRV, TXT/SPF/DKIM/DMARC, mail CNAME). Remove the bad www CNAME if present.
4. Wait/test propagation.
5. Set up Forms notification.
6. Test.

---

## Clean Up Namecheap Side (Most Important Right Now)

Your Netlify side looks correct (the NETLIFY records from your earlier screenshot).

Public DNS is still stuck on the old A 198.54.119.206 (even from Netlify NS). Your latest images show the remaining records after you started deleting A records.

**Do these (checkboxes):**

- [x] Log into Namecheap → Domain List → Manage eternalwebsite.com.
- [x] Go to the **Advanced DNS** tab (or "DNS" / "Nameservers" area).
- [x] **Delete any A records** for:
  - Host: @ or eternalwebsite.com (the one with 198.54.119.206)
  - Host: www (if it has an A or wrong value)
  - All the service ones: ftp., autoconfig., cpcontacts., webdisk., cpcalendars., whm., webmail., autodiscover., cpanel. (all pointing to 198.54.119.206)

**Yes — delete all of them** (the entire list in your latest screenshot 20260602205452.png). These old hosting A records are overriding the Netlify delegation.

- [ ] Delete or disable any **URL Redirect / Forwarding / Parking / "For Sale"** settings if present.
  (Even with custom nameservers, Namecheap has a separate "Forwarding" or "URL Redirect" section on the main domain page or under "Advanced DNS". Check the top domain management screen for any "Forwarding", "Redirect", or "Parking" options and turn them all off. Your new images 20260602210111.png + 20260602210124.png show the DNS records, not the forwarding settings — look in the main domain overview.)

- [x] In the Nameservers section, confirm it is set to **Custom DNS** with exactly these 4 (add if missing, remove others):
  - dns1.p05.nsone.net
  - dns2.p05.nsone.net
  - dns3.p05.nsone.net
  - dns4.p05.nsone.net
  (Confirmed in your image 20260602210156.png — good.)

- [x] Save / Apply changes. Namecheap may take a minute to update.

**Then test (use these exact commands and paste output):**

```
dig eternalwebsite.com A +short
dig @dns1.p05.nsone.net eternalwebsite.com A +short
dig www.eternalwebsite.com A +short
```

output:  randy@RandysPC ~  v26.2.0 
❯ dig eternalwebsite.com A +short
198.54.119.206

 randy@RandysPC ~  v26.2.0 
❯ dig @dns1.p05.nsone.net eternalwebsite.com A +short
198.54.119.206

 randy@RandysPC ~  v26.2.0 
❯ dig www.eternalwebsite.com A +short
eternalwebsite.com.
198.54.119.206

Wait 5-15 minutes (or longer) and repeat. Use https://dnschecker.org for eternalwebsite.com (A record, all locations).

**From your new images (20260602210111.png + 20260602210124.png) — the "rest of the records":**
These are mostly the email-related ones (MX, SRV for email/calendar, SPF, DKIM, DMARC, mail CNAME) plus a bad www CNAME to eternalwebsite.com.

- Leave them in Namecheap for now (or delete the www CNAME if you want clean), but **copy the values exactly** and add equivalent records in Netlify DNS (see next section).
- The www CNAME to the bare domain is not ideal — once web is on Netlify, it can cause loops or old resolution.

**Checkpoint — Reply with:**
- Last checkbox completed.
- The dig outputs (especially the @dns1 one).
- What https://eternalwebsite.com shows in your browser now (does it load your "Built to Endure..." site, or still old page / LiteSpeed / 403?).
reply: still Your website is ready to go! from Namecheap
- Screenshot of any "Forwarding/Redirect/Parking" settings you found (if any).
reply: i cant find any of that is on namecheap or cpanel im lost with that site. can i give you my credentials and you check all?

**No, do not give credentials.** I can't and won't access your accounts. We guide with screenshots and steps only.

**Additional step for Netlify (since even direct to Netlify NS shows old IP):**
- Go to Netlify → your site → Domain management → click eternalwebsite.com.
- Find the "DNS records" or list of records (may be a tab or "Manage DNS records").
- Delete any A record for "eternalwebsite.com" or "@" that has 198.54.119.206.
- Save.

**Once the @dns1 dig returns something other than 198.54.119.206 (or the site loads your real content), the web is good. Then immediately add the email records from these images into Netlify.**

---

## Add Email Records in Netlify (After Web is Working on Custom Domain)

Once the custom domain serves your site (not old hosting), add the email records in Netlify (same DNS records editor where you saw the NETLIFY type).

Go to your site in Netlify → Domain management → click eternalwebsite.com → look for "DNS records" or "Add new record".

**Use your latest "rest of the records" images (20260602210111.png + 20260602210124.png) as the source — copy the exact values.**

From the images (the remaining non-A records):

**MX (critical for email delivery):**
- [ ] eternalwebsite.com (or @) MX 10 mx1.privateemail.com
- [ ] eternalwebsite.com (or @) MX 10 mx2.privateemail.com

**CNAME:**
- [ ] mail.eternalwebsite.com CNAME privateemail.com

**TXT (SPF - there are two in the image; add both or at least the privateemail one):**
- [ ] eternalwebsite.com (or @) TXT "v=spf1 +a +mx +ip4:198.54.119.195 +ip4:198.54.119.199 include:spf.web-hosting.com ~all"
- [ ] eternalwebsite.com (or @) TXT "v=spf include:spf.privateemail.com ~all"

**TXT (DKIM - copy the full long key exactly from the image for default._domainkey):**
- [ ] default._domainkey.eternalwebsite.com TXT "v=DKIM1; k=rsa; p=[the full base64 key from your screenshot starting MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAGtg/WRTCQ... ]"

**TXT (DMARC):**
- [ ] _dmarc.eternalwebsite.com TXT "v=DMARC1; p=none;"

**SRV (for email clients, autodiscover, calendar - copy the exact 5 from the image):**
- [ ] _autodiscover._tcp.eternalwebsite.com SRV 0 0 443 cpanelemalldiscovery.cpanel.net
- [ ] The _caldav._tcp , _carddav._tcp , _caldavs._tcp , _carddavs._tcp ones (ports 2079/2080 to eternalwebsite.com or the discovery target)

**Note on the www CNAME in the image:** It points to eternalwebsite.com — this can cause issues. Delete it from Namecheap (or leave it, but Netlify's www NETLIFY record should take precedence once A is clean).

**Checkpoint — Reply with:**
- Which records you added in Netlify.
- dig eternalwebsite.com MX +short
- Test: send an email to info@eternalwebsite.com and confirm it arrives in Thunderbird (or webmail).

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

---