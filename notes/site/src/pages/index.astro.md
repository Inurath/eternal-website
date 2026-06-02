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