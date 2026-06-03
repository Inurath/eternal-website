# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here.

**Current site status:** One-page Astro + Tailwind site is complete, build-clean, all previous feedback incorporated (main phrase "Built to Endure. Designed to Perform.", your X logo filling the square, IG/FB visuals, international only, team language, pricing 1297/2197/3497 + optional $49/mo, Netlify Forms-ready contact form, etc.). `cd "site" && npm run build` produces a ready `dist/` folder.

**Goal of this document:** Every single action **you** must take is a checkbox `- [ ]`.  
After you finish a group of steps you will have clear "Checkpoint" boxes.  
**If you get stuck:** Reply with the exact last checkbox number you checked + what you see on screen / error / dig output. This way I know precisely where you are and what to tell you next. No guessing.

---

## 📍 Your Current Progress (from the replies + screenshots you added to this note) — LATEST UPDATE

**Great progress!** DNS is now pointing to Netlify.

From my check (just now):
- Nameservers: dns1.p05.nsone.net, dns2..., dns3..., dns4... (exactly the Netlify ones from your earlier screenshots).
- A: 18.208.88.157 and 98.84.224.111 (Netlify).
- This means you (or the setup) have switched the domain to use **Netlify DNS** (nameserver change at the registrar). The cPanel "Zone Records" you are looking at are no longer authoritative for the domain's public DNS.

Your latest reply + images: "here are all the records on cpanel" with 3 new screenshots (20260602202545.png etc.).

I OCR'd them. They show the old cPanel view:
- @ (eternalwebsite.com) A 198.54.119.206 (and many subdomains like cpanel., webmail., whm., ftp., autoconfig. etc. also A to that IP — these were for old hosting/cPanel access).
- mail. CNAME privateemail.com
- MX 10 mx1.privateemail.com and mx2.privateemail.com
- SPF TXT records (one with include:spf.privateemail.com ~all , another with ip4 for the hosting).
- SRV records for _autodiscover._tcp , _caldav._tcp , _carddav._tcp , _caldavs._tcp etc. (for email/calendar clients, pointing to ports on eternalwebsite.com or cpanel discovery).
- _dmarc TXT "v=DMARC1; p=none;"
- default._domainkey TXT with the long RSA key for DKIM.

**Latest reply on Netlify instructions:** "cant find that **external DNS / manual records instructions** in Netlify"

**Key situation (updated):**
- Because nameservers are now Netlify's, you are using **Netlify DNS**, not "external DNS". The "external instructions" (A/CNAME for when keeping your own NS) no longer apply or are not shown the same way. The site is already configured and resolving correctly via Netlify.
- The cPanel screenshots are the **source of truth for the email records** that need to be added to Netlify's DNS editor for this domain (to keep Private Email working).
- Currently (from my dig MX), it looks like the MX are not (or not yet) in Netlify DNS, so email delivery to @eternalwebsite.com is likely broken until you add them.
- The old A 198.54... for web is irrelevant now (Netlify handles the web resolution). The subdomains for cPanel access may or may not be needed anymore.

**Next immediate focus:** 
- In Netlify (now that it's Netlify DNS), find the DNS records manager for the domain and add the email records from your cPanel screenshots (MX, mail CNAME, SPF, DKIM, DMARC, SRV for autodiscover/caldav etc.).
- (Optional) Clean up old A records if still listed.
- Confirm live site works (it does per previous checks).
- Set up the Forms notification (the "notification thing").
- Test form on live site.
- Verify email starts working after adding the records (test send/receive).

I have updated the note with specific checkboxes for adding the records in Netlify DNS based on your images + OCR. The site is live — focus on email DNS fix + Forms.

---

---

---

## ⚠️ CRITICAL: Your Email Will NOT Break (Answer to the "Grok told me it will break email" concern)

Namecheap Private Email for `admin@eternalwebsite.com` (and info@) uses these MX records:
- Priority 10 → mx1.privateemail.com
- Priority 10 → mx2.privateemail.com

(Plus some CNAMEs for mail., autodiscover., etc. that are already set up.)

**The risky way (what previous advice was probably warning about):** Changing the domain's **nameservers** at Namecheap to Netlify's four nameservers moves *all* DNS (including MX) to Netlify. You then have to manually re-add the exact MX + SPF + DKIM records or email stops.

**The safe way we will use (RECOMMENDED — email stays 100% untouched):**
- **Keep using Namecheap's DNS** (do **not** change nameservers).
- Only add the two web records that point the website to Netlify (ALIAS or A for the bare domain + CNAME for www).
- Your existing MX records for Private Email stay exactly where they are in Namecheap.
- Email continues to work exactly as it does today in Thunderbird.

This is the standard safe pattern when you have email on the registrar and web on Netlify/Vercel/etc.

We will do the safe way below.

---

## 0. Pre-Checks (Do these first — tell me the results)

**You have completed these (from your edits to the note):**

- [x] Open Namecheap → Domain List → Manage eternalwebsite.com → **Advanced DNS** tab.  
  Your reply: "i see them on cpanel" (with images). MX records (priority 10 mx1.privateemail.com and mx2.privateemail.com) are in **cPanel Zone Records**, not showing in Namecheap Advanced DNS tab. Advanced DNS tab tells you to manage in cPanel or switch back to BasicDNS.

- [x] In the same Advanced DNS tab, tell me what the current A / ALIAS / CNAME for `@` (bare domain) and `www` look like right now (or if the parking page is still active). 
  Your reply: images show current state (many A records to 198.54.119.206 for cpanel., webmail., etc., bare A to that IP, www CNAME to bare, mail CNAME to privateemail.com).

- [x] Log into Netlify (https://app.netlify.com). Have you already added `eternalwebsite.com` (and www) under Domain management for the eternal-website site? (Yes/No)
  Your reply: yes

- [x] Run these two commands in your terminal and paste the full output here:
  ```
  dig eternalwebsite.com +short
  dig www.eternalwebsite.com +short
  ```
  Your reply: `dig` command not found (zsh autocorrected to `dir`). We need to install it.

**New action items for your situation (cPanel-managed DNS):**

- [x] Install `dig` so we can test DNS: Run `sudo pacman -S bind` (or the minimal package if prompted). Then re-run the two dig commands above and paste fresh output. (This package provides dig on Arch.)
  Your reply (fresh output):
  ```
  randy@RandysPC ~  v26.2.0 
  ❯ dig eternalwebsite.com +short 
  18.208.88.157
  98.84.224.111
   randy@RandysPC ~  v26.2.0 
  ❯ dig www.eternalwebsite.com +short 
  98.84.224.111
  18.208.88.157
  ```
  **Excellent!** These are Netlify's IPs (not the old parking 198.54.119.206). DNS changes you made in cPanel have propagated. The site is live on Netlify.

- [x] Log into your **cPanel** for eternalwebsite.com (from Namecheap dashboard under the domain there should be a "cPanel" or "Login to cPanel" button, or try https://eternalwebsite.com:2083 or the IP:2083 with your cPanel credentials). Confirm you can see "Zone Editor" or "Advanced Zone Editor".
  Your reply + images: "here are all the records on cpanel" (new images 20260602202545.png, 20260602202601.png, 20260602202612.png, 20260602202619.png).
  I OCR'd them — see the list in the new section below.

- [ ] In Netlify (for the eternalwebsite.com domain you already added), look for the **external DNS / manual records instructions** (not the nameserver change page). Usually there is a tab or link "Configure external DNS", "DNS records for external provider", or it lists:
  - For the apex (@): A record(s) or ALIAS to specific value(s) Netlify gives (commonly 75.2.60.5 and/or 99.83.190.102).
  - For www: CNAME to your-project-name.netlify.app
  Find and screenshot/copy the **exact** recommended A/CNAME values (the ones for "use your current DNS provider").
  Your reply: "cant find that **external DNS / manual records instructions** in Netlify"

  **Why you can't find "external" instructions:** Because the nameservers are now Netlify's (dns*.p05.nsone.net), this domain is using **Netlify DNS** (not external/keep-your-NS). The UI for managing records is different — you add/edit records directly in Netlify for the domain (MX, TXT, SRV etc. for email). The "external" prompt is for when you keep Namecheap/ cPanel as DNS.

  To find the DNS editor in Netlify:
  - Domain management > click eternalwebsite.com
  - Look for "DNS records", "Manage DNS", "Add a DNS record", or a table/list of current records with + Add button.
  - You can add MX, TXT, SRV, CNAME, A etc. there.

**Checkpoint 0 (updated for you) — Reply with:**
- Last checkbox you just completed.
- Fresh `dig` output (you already added good one — confirm if same now).
- Confirmation + description of what you see in cPanel Zone Editor (or just reference the images you pasted).
- What you see in Netlify when you click into the eternalwebsite.com entry (any DNS records list, add button, status like "Netlify DNS", etc.). Even if no "external", describe the page.

Since dig already shows Netlify, the web part is good. We need to add the email records from your cPanel images into Netlify's DNS editor. See new section below.

---

## 1. Connect / Verify the Site on Netlify (from GitHub)

**You have completed these (per your note updates):**

- [x] Go to https://app.netlify.com and log in with GitHub.
- [x] If you have not imported the site yet: "Add new site" → "Import an existing project" → GitHub → select `Inurath/eternal-website`.
- [x] **Critical settings for our repo structure** (site/ is a subfolder):
  - Base directory: `site`
  - Build command: `npm run build`
  - Publish directory: `dist`
- [x] Click Deploy. Wait for the first build to finish.
- [x] You should now have a live random URL like `https://your-project-name.netlify.app`. Click it and confirm the site loads (hero phrase, dark mode toggle, contact form, etc.).

- [x] Now go to the site settings → **Domain management** (left sidebar or top).
- [x] Click **Add a domain** (or "Add custom domain").
- [x] Type `eternalwebsite.com` and add it. Also add `www.eternalwebsite.com`.
- [x] Netlify will now show you the **exact DNS records** you need to add... (you added the reply images here).

  **Note on your screenshots (20260602200509.png + 20260602200519.png):** These show the **nameserver change instructions** (dns1-4.p05.nsone.net) and some "IN NETLIFY" view. 

  **Update:** You (or the process) did switch the nameservers to Netlify's. That is why the site resolves via Netlify and why the "external" instructions are hard to find now — you are on Netlify DNS. The DNS records editor in Netlify is where you add the email records from your cPanel screenshots (see the new Section 2 below). The web A/AAAA for the site are already handled correctly (dig confirms).

**Checkpoint 1 (updated) — Reply with:**
- Confirmation you found the external A + CNAME values Netlify wants (transcribe them exactly, e.g. "A @ 75.2.60.5" and "CNAME www eternalwebsite-xxx.netlify.app").
- The live Netlify preview URL if different.
- Whether the site preview on the random .netlify.app URL is still working.

---

**DNS Verification (NEW — because your dig output already shows Netlify IPs and the site is live!)**

Since `dig` now returns Netlify IPs (18.208.88.157 + 98.84.224.111) instead of the old parking IP, your cPanel records are working and propagated.

- [ ] Open a browser (incognito/private) and visit **https://eternalwebsite.com** and **https://www.eternalwebsite.com**.
- [ ] Confirm it loads the Eternal Website (hero "Built to Endure. Designed to Perform.", navigation, pricing, contact form, dark mode toggle, your X/IG/FB footer squares, etc.).
- [ ] Check for green padlock (HTTPS/SSL — Netlify should have auto-provisioned it).
- [ ] Note any issues (e.g. old parking page still showing, mixed content, form not there).

**Checkpoint 1.5 (live verification) — Reply with:**
- What you see on https://eternalwebsite.com (does it match the localhost preview? Any differences?).
- Is there a green lock? Any browser warnings?
- Screenshot description if something looks wrong.

This confirms the DNS part from your side is successful. We can then focus on the Forms notification (the part you had trouble finding).

---

## 2. Add Email DNS Records in Netlify (Required — You Switched to Netlify DNS)

**Important update based on your latest replies + my checks:**

- Nameservers are Netlify's (dns1-4.p05.nsone.net) → you are now using **Netlify DNS** for the whole domain. The cPanel Zone Records you screenshotted are the *old* source (no longer authoritative).
- Your new cPanel images (the 4 you just pasted) are perfect — they show exactly the email records that need to be copied into Netlify's DNS editor so Private Email keeps working.
- The web part is already good (dig shows correct Netlify IPs, site is live).
- The "external DNS instructions" you can't find make sense now — because it's not external anymore. You add records directly in Netlify.

**What to do in Netlify:**

Go to your site in Netlify → Domain management → click on eternalwebsite.com → look for the DNS records section / "Add a DNS record" / table of records. (It may say "Netlify DNS" or have a list with + button.)

You need to add (do not delete the existing web ones):

**MX records (critical for email delivery):**
- [ ] Add MX for eternalwebsite.com (or @) : priority 10, value mx1.privateemail.com
- [ ] Add MX for eternalwebsite.com (or @) : priority 10, value mx2.privateemail.com

**CNAME for mail:**
- [ ] Add CNAME mail.eternalwebsite.com → privateemail.com

**SPF (TXT record — use the privateemail one):**
- [ ] Add TXT for eternalwebsite.com (or @) : v=spf1 include:spf.privateemail.com ~all
  (The other SPF with ip4:198.54... is for the old hosting — you can add it too if you want, or skip for now.)

**DKIM (TXT):**
- [ ] Add TXT default._domainkey.eternalwebsite.com with the value from your screenshot:
  v=DKIM1; k=rsa; p= [the long key starting MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAGtg/WRTCQ... ending with the base64 key from the image]

**DMARC (TXT):**
- [ ] Add TXT _dmarc.eternalwebsite.com : v=DMARC1; p=none;

**SRV records (for email clients, calendar, autodiscover — copy from your images):**
- [ ] Add the _autodiscover._tcp.eternalwebsite.com SRV (0 0 443 target from image, e.g. cpanelemalldiscovery.cpanel.net or whatever exact)
- [ ] Add the _caldav._tcp , _carddav._tcp , _caldavs._tcp , _carddavs._tcp SRV records (there are several with port 2079/2080 to eternalwebsite.com)

**Optional / cleanup:**
- [ ] The old A records for @ and the cpanel./webmail. etc. subdomains to 198.54.119.206 are no longer needed for the website (Netlify handles the main resolution). You can leave them or remove the @ one if it's still listed. If you still want old cPanel access via cpanel.eternalwebsite.com etc., add A records for those subdomains pointing to 198.54.119.206 in Netlify.

After adding, wait a few minutes and re-test dig MX and dig mail.eternalwebsite.com etc.

**Test email after:**
- Send a test email to info@eternalwebsite.com or admin@ and check if it arrives in Thunderbird/webmail.

**Checkpoint 2 (updated for Netlify DNS + your cPanel images) — Reply with:**
- Last checkbox completed (e.g. which records you added).
- Screenshot or list of what you added in Netlify (or the ones still pending).
- Fresh dig MX eternalwebsite.com +short and dig mail.eternalwebsite.com +short
- Does email start arriving after adding the MX etc.? (test it)
- Any issues finding the "Add record" in Netlify?

Once email DNS is fixed, the site is fully good and we move to the Forms notification + testing the contact form on the live domain.

---

## 3. Set Up Netlify Forms Notifications (The "Notification Thing" You Couldn't Find)

**You can do most of this section right now** (even before the custom domain DNS is fully pointed), using the Netlify preview URL from Section 1. The form detection comes from the build + the attributes we put in the code.

The form on the site already has the magic attributes (`data-netlify="true" name="contact"`, hidden form-name field, honeypot). Netlify auto-detects it on builds.

**Pre-step (do this first if you haven't seen the form yet):**
- [ ] In Netlify, make sure you have a successful deploy of the site (from when you did Section 1). Go to the Deploys tab and confirm a green "Published" deploy exists for the current code.
- [ ] Visit your random Netlify preview URL (from earlier in Section 1) and confirm the contact form is on the page.

**Finding the form + notifications:**

- [ ] In Netlify, go to your eternal-website project.
- [ ] On the left sidebar, look for and click **Forms** (it may be under "Site overview", "Integrations", or directly in the main menu for the project).  
  You should see a form named **contact**. If you don't see any forms:
  - Trigger a new deploy (the "Trigger deploy" button in Deploys tab, choose "Clear cache and deploy site") and wait for it to finish, then refresh the Forms page.

- [ ] Click the "contact" form row.

- [ ] Look for **Notification settings**, a big "Add notification" button, or "Email notifications".

**Most reliable current paths (2026 UI - try in this order):**

Path A (very common):
- [ ] From the project overview or sidebar: **Configuration** (gear or "Project configuration")  
- [ ] **Notifications** (or "Emails and webhooks")  
- [ ] **Form submission notifications**

Path B (direct from Forms):
- [ ] While viewing the "contact" form details, look for a "Notifications" section or tab on that page.

- [ ] Click **Add notification** → choose **Email**.
- [ ] Enter the address: `info@eternalwebsite.com`
- [ ] (Good to do) Customize the subject if the option is there, e.g. "New Eternal Website inquiry from [name] at [business]"
- [ ] Save/Enable it.

- [ ] (Optional) Add a second notification to your personal email for testing while you set things up.

**Test the form (can do on the .netlify.app preview URL right now):**
- [ ] Go to your Netlify preview URL (the one from when you added the domain).
- [ ] Fill the contact form with test info (use a real email you control if you want a reply test).
- [ ] Submit.
- [ ] Check two places:
  - Netlify → Forms tab → the "contact" form → you should see the submission listed (with the data).
  - Your email inbox for info@eternalwebsite.com (Thunderbird or webmail.privateemail.com) — it may take 1-5 minutes.

**Checkpoint 3 — Reply with:**
- Last checkbox in this section.
- Did the "contact" form appear in the Forms list? (Yes/No + exact menu path you clicked to get there)
- Did you add the email notification for info@eternalwebsite.com? (Yes/No + which path worked)
- After submitting a test form on the preview URL: Did the submission show up in the Netlify Forms list? Did an email arrive in the info@ inbox?

(Once custom domain DNS is live later, re-test on eternalwebsite.com itself.)

---

## 4. HTTPS / SSL (Automatic)

- [ ] Once the DNS records are correct and the site loads on the custom domain, Netlify automatically requests a Let's Encrypt certificate.
- [ ] It can take 5–30 minutes. Refresh the domain in incognito.
- [ ] You should eventually see the green padlock and `https://eternalwebsite.com`.
- [ ] In Netlify Domain management you can force HTTPS / HTTPS only if it isn't already on.

---

## 5. Quick Post-Deploy Checks (Do these and mark them)

- [ ] Site loads on both `eternalwebsite.com` and `www.eternalwebsite.com` (decide which is primary in Netlify and add a redirect if wanted).
- [ ] Dark mode toggle works.
- [ ] Contact form submits and you receive the email (or see it in Netlify Forms).
- [ ] All images (logos, portfolio) load.
- [ ] Mobile view looks good (use browser dev tools or phone).
- [ ] Run a quick Lighthouse in Chrome DevTools (or web.dev/measure) on the live URL — aim for 90+ on performance.

---

## 6. Other Hosting Options (Only if you don't want Netlify)

### Vercel
Similar Git import, base directory `site`, build `npm run build`, publish `dist`. Add domain in Vercel. Use Formspree for forms (or keep mailto).

### cPanel / Namecheap Static (Fallback)
1. `cd site && npm run build`
2. Upload the **entire contents** of the `dist/` folder (not the dist folder itself) into `public_html/` via File Manager or FTP.
3. Point the domain/addon to that folder.
4. Form will use mailto fallback (or set up Formspree manually).

---

## 7. If You Ever Need to Roll Back or Change

- Netlify: Every deploy has a "Publish deploy" button for instant rollback to a previous version.
- DNS: Just edit/remove the ALIAS/A + CNAME records in Namecheap to point back to parking or old host.
- Git: The source is always in the repo — you can always rebuild.

---

## Summary of What You Should Have When Done

- [ ] Site live at https://eternalwebsite.com with green lock
- [ ] Form submissions appearing in Netlify → Forms
- [ ] Emails arriving at info@eternalwebsite.com (Thunderbird still works unchanged)
- [ ] You can push changes to GitHub main and Netlify auto-deploys

---

**Agent / Future Notes:**  
After any user feedback or change, update this file with new checkboxes for the new steps. Always keep the "reply with last checkbox number + symptoms" pattern. Update Eternal Report.md and main CLI logs when this doc is revised.

*Heavily revised 2026-06-02+ for maximum clarity with checkboxes after user got stuck at DNS + "can't find notification" + email-break concern. Safe DNS path emphasized.*

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