# index.astro (contact form section) — JS-enhanced mailto

**Updates in this step:** Added real JS submit handler that builds a nicely formatted mailto to admin@eternalwebsite.com (uses the business email we set up earlier with Thunderbird + keyring). Shows success message after triggering the client.

**Why this approach for v1:** Zero external services or keys. Works everywhere (including the pre-configured Thunderbird). Graceful degradation. Easy to upgrade to Formspree / real POST later (just change the handler and add success UI).

**Related:** Business Email Setup note (admin@ + Thunderbird), Report (contact), global.css (form styles).

**Status:** Good v1 UX. Polish todo can add real endpoint + better validation if desired.

**Nav + dark toggle updates (2026-06-02 GK - addressing CLI Web Tasks):**
- Navbar logo bumped from h-10 to h-12 (with resized 260x96 asset) for "as big as possible" per screenshot feedback.
- Dark toggle button: switched from fragile inline onclick + small text to proper addEventListener + larger accessible button (aria-label, min size).
- Script made robust (DOMContentLoaded guard, initTheme, click listener attach) so "dark mode button does not work" is fixed.
- Nav now relies on theme CSS (solid --surface) instead of any light-only rules.
- Form success message updated to theme vars for dark mode compatibility.
- All changes documented, built (see http://localhost:4321/ in terminal), logo filter ensures visibility in dark.

See global.css.md for full dark mode + palette details. Per project AGENTS: every edit gets note + Report append.

**Latest fixes (2026-06-02 GK - new web tasks from screenshots):**
- X/Twitter button: made icon-only (removed @Eternalwebsite text and pill content); now just the clean X SVG icon in a minimal rounded button. Better "actual X logo" presentation, only the icon is the clickable target.
- Removed "Flat project fee" from hero subline (was "Bradenton / Sarasota, FL - 1-2 week delivery - Flat project fee").
- Fixed personal name in first testimonial quote (testimonials.ts): "Randy took..." → "The Eternal Website team took..." (consistent with team-only language rule).
- Builds run; URL surfaced.

These address the three new pending items in CLI Web Tasks.

**Follow-up fixes (same day GK):**
- X button: replaced the SVG with the actual user-provided logo (X.jpg from Pictures/Web/General logos/ copied to public/x-logo.jpg); rendered as <img src="/x-logo.jpg" alt="X" /> inside the icon-only button.
- X logo polish (user feedback): made the button a square w-9 h-9 with rounded-lg corners (instead of rounded-full / pill) and bigger icon (h-6 w-6) with small p-1.5 padding so the actual square logo picture fits nicely. Added dark mode filter for visibility. The button is now square-shaped with rounded corners to properly frame the provided logo image.
- "Local Florida Focus": removed the item from the trust row (section-box) because "it is not only florida focus is international"; the row now shows the other 4 items.
- Builds performed after each; http://localhost:4321/ surfaced in terminal output.

All per CLI Web Tasks pending + project AGENTS (document, build+URL, update notes/Report).