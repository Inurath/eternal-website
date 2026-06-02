# Deployment — Publish eternalwebsite.com from GitHub (Clear Checkbox Guide)

**Source of truth on GitHub:** https://github.com/Inurath/eternal-website (main branch). All deploys come from here.

**Current site status:** One-page Astro + Tailwind site is complete, build-clean, all previous feedback incorporated (main phrase "Built to Endure. Designed to Perform.", your X logo filling the square, IG/FB visuals, international only, team language, pricing 1297/2197/3497 + optional $49/mo, Netlify Forms-ready contact form, etc.). `cd "site" && npm run build` produces a ready `dist/` folder.

**Goal of this document:** Every single action **you** must take is a checkbox `- [ ]`.  
After you finish a group of steps you will have clear "Checkpoint" boxes.  
**If you get stuck:** Reply with the exact last checkbox number you checked + what you see on screen / error / dig output. This way I know precisely where you are and what to tell you next. No guessing.

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

- [ ] Open Namecheap → Domain List → Manage eternalwebsite.com → **Advanced DNS** tab.  
  Tell me: Do you currently see MX records for mx1.privateemail.com and mx2.privateemail.com? (Yes/No + paste the first 2-3 lines if possible)

- [ ] In the same Advanced DNS tab, tell me what the current A / ALIAS / CNAME for `@` (bare domain) and `www` look like right now (or if the parking page is still active).

- [ ] Log into Netlify (https://app.netlify.com). Have you already added `eternalwebsite.com` (and www) under Domain management for the eternal-website site? (Yes/No)

- [ ] Run these two commands in your terminal and paste the full output here:
  ```
  dig eternalwebsite.com +short
  dig www.eternalwebsite.com +short
  ```

**Checkpoint 0 — Reply with:**
- Last checkbox: 0.x (the ones above)
- Your dig outputs
- Screenshot description or text from Namecheap Advanced DNS (especially MX and current web records)
- Whether the domain is already added in Netlify

Once I have that I can give you the *exact* next records if needed. But you can also proceed with the steps below — Netlify will show you the precise values for your site.

---

## 1. Connect / Verify the Site on Netlify (from GitHub)

- [ ] Go to https://app.netlify.com and log in with GitHub.
- [ ] If you have not imported the site yet: "Add new site" → "Import an existing project" → GitHub → select `Inurath/eternal-website`.
- [ ] **Critical settings for our repo structure** (site/ is a subfolder):
  - Base directory: `site`
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Click Deploy. Wait for the first build to finish.
- [ ] You should now have a live random URL like `https://your-project-name.netlify.app`. Click it and confirm the site loads (hero phrase, dark mode toggle, contact form, etc.).

- [ ] Now go to the site settings → **Domain management** (left sidebar or top).
- [ ] Click **Add a domain** (or "Add custom domain").
- [ ] Type `eternalwebsite.com` and add it. Also add `www.eternalwebsite.com`.
- [ ] Netlify will now show you the **exact DNS records** you need to add at Namecheap for *this specific site*.  
  **Screenshot or copy the exact recommended records** (it will say something like ALIAS for @ to apex-loadbalancer.netlify.com or 4x A records to 75.2.60.5 etc., plus CNAME for www).

**Checkpoint 1 — Reply with:**
- Last checkbox you completed in this section.
- The exact records Netlify is asking you to add (copy the table or text it shows).
- The live Netlify URL for the site.

---

## 2. Point the Domain from Namecheap (Safe Method — Email Protected)

**We are keeping Namecheap as the DNS provider. No nameserver change.**

- [ ] In Namecheap, go to eternalwebsite.com → Manage → **Advanced DNS** tab (not the nameservers tab).
- [ ] **Important:** If you see any old A record for `@` (the bare domain) that points to parking or old hosting, delete it first (Namecheap sometimes shows a default one).
- [ ] Add the records **exactly as Netlify told you** in the previous step.

  Typical values (use whatever Netlify shows for your site — these are examples):

  **For the bare domain (apex) — choose ONE of these two depending on what Namecheap + Netlify recommend for you:**

  - [ ] Preferred if available: Add **ALIAS** record  
    Host: `@` (or leave empty / @)  
    Value / Points to: `apex-loadbalancer.netlify.com`   (or the exact ALIAS target Netlify gave you)

  - [ ] Alternative (always works): Add **A** record(s)  
    Host: `@`  
    Value: `75.2.60.5`   (Netlify's standard IP — they may give you 4 different ones; add all of them as separate A records if shown)

  **For www:**

  - [ ] Add **CNAME** record  
    Host: `www`  
    Value / Points to: `your-project-name.netlify.app`   (use the exact one from Netlify, e.g. `eternal-website-abc123.netlify.app`)

- [ ] **Do NOT touch or delete** any MX, TXT (SPF), CNAME for `mail`, `autodiscover`, `_dmarc`, or DKIM records. Those are your email. Leave them alone.
- [ ] Save / Apply the changes in Namecheap.
- [ ] Wait 5–30 minutes (sometimes up to a couple hours for full propagation). Use a checker.

- [ ] Test propagation:
  ```
  dig eternalwebsite.com +short
  dig www.eternalwebsite.com +short
  ```
  You should eventually see the Netlify IP or the netlify.app name (CNAME target).

- [ ] Visit https://eternalwebsite.com and https://www.eternalwebsite.com in a private/incognito window. The site should load (you may get a "not secure" warning until SSL finishes — Netlify provisions it automatically once DNS is correct).

**Checkpoint 2 — Reply with:**
- Last checkbox completed.
- Output of the two `dig` commands.
- Does https://eternalwebsite.com load the Eternal Website hero with the purple phrase? (Yes / what you see instead)
- Any errors you see in Namecheap when adding the records?

---

## 3. Set Up Netlify Forms Notifications (The "Notification Thing" You Couldn't Find)

The form on the site already has the magic attributes (`data-netlify="true" name="contact"`, hidden form-name field, honeypot). Netlify should have auto-detected it after the first successful build.

- [ ] In Netlify, go to your eternal-website project.
- [ ] On the left sidebar, look for and click **Forms** (it may be under "Site overview" or directly in the menu).  
  You should see a form named **contact** (or "contact" from the HTML name=). If you don't see it yet, trigger a new deploy (push any tiny change or use the "Trigger deploy" button) and refresh.

- [ ] Once you see the form listed, click on it (the "contact" form).

- [ ] Look for **Notification settings**, **Email notifications**, or a button **Add notification**.

**Exact current paths (UI can have slight label differences — try them in order):**

Path A (most common in 2026):
- [ ] Go to the project → left menu: **Configuration** (or gear icon / Project configuration)  
- [ ] Then **Notifications**  
- [ ] Then **Form submission notifications** (or "Emails and webhooks")

Path B:
- [ ] Project sidebar → **Forms** → click the form → look for "Notifications" tab or "Set up notifications"

- [ ] Click **Add notification** (or + Email).
- [ ] Choose **Email**.
- [ ] In the email address field, type: `info@eternalwebsite.com`
- [ ] (Optional but recommended) Set a subject line like: "New website inquiry from {name} – {business}"
- [ ] Save / Enable the notification.

- [ ] (Optional extra) You can also add your personal Gmail or another address as a second notification for testing.

**Test it:**
- [ ] Go to the live site (after DNS is working) → fill out the contact form with test data → submit.
- [ ] Within a minute or two, check the inbox of info@eternalwebsite.com (via Thunderbird or https://mail.privateemail.com).
- [ ] Also check the Netlify Forms tab — you should see the submission appear there even if email is slow.

**Checkpoint 3 — Reply with:**
- Last checkbox in this section.
- Did you find the form under the Forms section? (Yes/No — describe exactly what menus you clicked)
- Did you successfully add the email notification for info@eternalwebsite.com? (Yes/No + exact path you used)
- After test submit: did the submission appear in Netlify Forms list? Did the email arrive?

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

**Next action for you right now (after reading this whole thing):**

Start at **Section 0. Pre-Checks**, do the checkboxes, then reply here with the results (especially the dig outputs and what you see in Namecheap Advanced DNS + whether the domain is added in Netlify).

I will then give you the next precise move or corrections.

This format means you can never be "lost" — just tell me the last checked box.