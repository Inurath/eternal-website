# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here.

**Current site status:** One-page Astro + Tailwind site is complete, build-clean, all previous feedback incorporated (main phrase "Built to Endure. Designed to Perform.", your X logo filling the square, IG/FB visuals, international only, team language, pricing 1297/2197/3497 + optional $49/mo, Netlify Forms-ready contact form, etc.). `cd "site" && npm run build` produces a ready `dist/` folder.

**Goal of this document:** Every single action **you** must take is a checkbox `- [ ]`.  
After you finish a group of steps you will have clear "Checkpoint" boxes.  
**If you get stuck:** Reply with the exact last checkbox number you checked + what you see on screen / error / dig output. This way I know precisely where you are and what to tell you next. No guessing.

---

## 📍 Your Current Progress (from the replies + screenshots you added to this note) — LATEST UPDATE

**Great progress!** DNS is now pointing to Netlify (confirmed by dig output you added), and the live site at https://eternalwebsite.com is already serving the correct Eternal Website content (I verified via terminal: resolves to Netlify IPs 18.208.88.157 + 98.84.224.111, returns HTTP 200 with Netlify Edge cache, and page contains "Built to Endure" + "Eternal Website").

You have completed:
- Pre-Checks (0) including installing dig and running it (showing Netlify IPs — this means the DNS records were successfully added in cPanel and have propagated!).
- Section 1 (Netlify side, adding the domain).
- Marked the cPanel login checkbox.

**Latest reply:** "cant find that **external DNS / manual records instructions** in Netlify"

**Key situation:**
- Your cPanel Zone Editor is where the records live (and apparently where you or previous steps added the Netlify A/CNAME — since dig now shows Netlify, not the old 198.54.119.206).
- In Netlify, once the domain is added and DNS is detected as correct, the big "here are the records you need to add" prompt often moves or becomes a "status" view instead of the initial instructions page. The nameserver screenshots you took earlier are the alternative (we avoided it).

**Next immediate focus:** 
- Confirm exactly what records are currently in your cPanel Zone Editor for @ and www.
- In Netlify, find the current domain *status* / expected records view (alternative navigation below).
- Set up the Forms notification (your original "can't find the notification thing" — you can do this *now* on the preview URL or live).
- Test the contact form on the live https://eternalwebsite.com .
- Verify SSL and full site.

I have updated checkboxes and added verification steps below based on your new replies. The site is basically live already — we're in verification + Forms setup phase!

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
  (Marked [x] by you — please confirm in your next reply what the current @ and www records look like in cPanel Zone Editor now.)

- [ ] In Netlify (for the eternalwebsite.com domain you already added), look for the **external DNS / manual records instructions** (not the nameserver change page). Usually there is a tab or link "Configure external DNS", "DNS records for external provider", or it lists:
  - For the apex (@): A record(s) or ALIAS to specific value(s) Netlify gives (commonly 75.2.60.5 and/or 99.83.190.102).
  - For www: CNAME to your-project-name.netlify.app
  Find and screenshot/copy the **exact** recommended A/CNAME values (the ones for "use your current DNS provider").
  Your reply: "cant find that **external DNS / manual records instructions** in Netlify"

  **If you can't find the "add these records" instructions anymore** (common once it's working): 
  - Go to Domain management in your site.
  - Click on the "eternalwebsite.com" entry in the list.
  - Look for tabs/sections like "DNS", "Configuration", "Status", "Records", or "Verify". It often shows the current status as "External DNS" or "DNS configured" and may still list the expected records for reference.
  - Alternatively, from the main project sidebar: Domain management > (the domain) > there may be a "DNS records" link or "This domain uses external DNS. Netlify expects these records:" area.
  Take a screenshot of whatever you see on that domain's detail page and add it here, or describe the options/tabs visible.

**Checkpoint 0 (updated for you) — Reply with:**
- Last checkbox you just completed.
- Fresh `dig` output (you already added good one — confirm if same now).
- Confirmation + description/screenshot of what you see in cPanel Zone Editor for the @ (apex) and www records *right now*.
- What you see when you click into the eternalwebsite.com entry in Netlify Domain management (tabs, status, any list of records, "external DNS" mention, etc.). Even if you can't find "instructions", describe the page.

Since dig already shows Netlify, we can treat DNS as done and move to verification + Forms. But report the cPanel current state so we can confirm it matches.

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

  **Note on your screenshots (20260602200509.png + 20260602200519.png):** These show the **nameserver change instructions** (dns1-4.p05.nsone.net) and some "IN NETLIFY" view. We are deliberately **not** changing nameservers. 

  **Action:** In the same Netlify Domain management page for eternalwebsite.com, look around for a section, tab, or expandable "Use your own DNS / external DNS provider", "DNS records", "Manual configuration", or "What records do I need to add?". It should list specific:
  - A record for the root/apex (@ or eternalwebsite.com) pointing to one or two IPs (e.g. 75.2.60.5).
  - CNAME for www pointing to `something.netlify.app`.

  If you don't see it immediately, click around "DNS settings" or the domain row. Take a new screenshot of the **A/CNAME instructions** (not the NS one) and paste the exact values here or describe them.

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

## 2. Point the Domain from cPanel (Safe Method — Email Protected)

**Important for your setup:** Because DNS is currently managed in cPanel (as your screenshots showed), we edit records **inside cPanel's Zone Editor**, not the Namecheap Advanced DNS tab. We keep the same nameservers (no change). This is still the safe path for email.

**We are keeping your current DNS provider (cPanel/Namecheap). No nameserver change.**

**First, get the exact values from Netlify (do this if not done):**
- [ ] In Netlify Domain management for eternalwebsite.com, find and copy the **external DNS records** (A for apex + CNAME for www). Ignore any nameserver (NS) instructions.

**Verification / Confirmation in cPanel (DNS changes appear already done based on your dig!):**

Since your `dig` now returns Netlify IPs, the A/CNAME records for Netlify have likely already been added in cPanel (by you or previously). We will verify instead of "add new".

- [ ] Log into cPanel for eternalwebsite.com.
- [ ] Go to **Zone Editor** (or "Advanced Zone Editor" / "DNS Zone Editor").
- [ ] Find/select the eternalwebsite.com zone.
- [ ] **Critical - leave these completely alone (do not edit/delete):**
  - All MX records (mx1.privateemail.com, mx2.privateemail.com)
  - The mail. CNAME to privateemail.com
  - Any _dmarc, DKIM, SPF TXT records
  - All the service subdomains that point to 198.54.119.206 (cpanel., webmail., whm., ftp., autoconfig., webdisk., etc.) — these let you keep accessing cPanel and webmail if you want.
- [ ] Locate the records for the bare domain / apex (@ or eternalwebsite.com) and for www.
  - Note exactly what they are now (e.g. A record(s) with the Netlify IPs like 18.208.88.157 / 98.84.224.111, or CNAME for www to the .netlify.app target). Paste or describe them here.
- [ ] If they already match the Netlify external instructions (the ones you are trying to find in the UI), great — no changes needed. If something is still the old 198.54.119.206, then edit the @ to the Netlify A value(s) and www to the Netlify CNAME target.

- [ ] Save any changes if you made them.
- [ ] Re-run the dig tests (you already have good output).

- [ ] Visit https://eternalwebsite.com (incognito) and confirm it loads the correct site with green lock.

**Checkpoint 2 (tailored to cPanel) — Reply with:**
- Last checkbox completed.
- Exact current records you see in cPanel for @ and www (this is important so we know they match Netlify).
- Fresh dig output (or confirm same as before).
- Does https://eternalwebsite.com load the hero "Built to Endure. Designed to Perform." with the full site? Any issues?
- Any problems in cPanel Zone Editor?

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

**Your immediate next steps (based on your *latest* replies in this note — DNS is already working!):**

1. [ ] In cPanel Zone Editor: look at the current @ and www records and reply with exactly what they say now (this confirms what you added for Netlify).
2. [ ] In Netlify Domain management, click into the eternalwebsite.com entry and describe/screenshot what you see (status, any "external DNS", listed records, tabs available). Even if the "add instructions" are gone, tell me the current view.
3. [ ] Visit https://eternalwebsite.com (and www) in incognito. Confirm it loads the full correct site (hero phrase, form, footer logos, etc.) + green lock.
4. [ ] Proceed to Section 3: Set up the Forms notification for info@eternalwebsite.com (use the detailed paths — you can test the form submit on the live site or the preview URL right now). This was one of your original stuck points.

**Reply format reminder:** Tell me the last checkbox number(s) you completed + the info requested in the relevant Checkpoint (0, 1, 1.5, 2, or 3).

Once you reply with the cPanel current records + Netlify domain page description + live site confirmation, I can confirm DNS is fully good and we'll knock out the Forms + final tests.

The site is basically published already — awesome work on the DNS part! This is now mostly verification + the notification setup you were looking for.