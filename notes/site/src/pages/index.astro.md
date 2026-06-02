# index.astro (contact form section) — JS-enhanced mailto

**Updates in this step:** Added real JS submit handler that builds a nicely formatted mailto to admin@eternalwebsite.com (uses the business email we set up earlier with Thunderbird + keyring). Shows success message after triggering the client.

**Why this approach for v1:** Zero external services or keys. Works everywhere (including the pre-configured Thunderbird). Graceful degradation. Easy to upgrade to Formspree / real POST later (just change the handler and add success UI).

**Related:** Business Email Setup note (admin@ + Thunderbird), Report (contact), global.css (form styles).

**Status:** Good v1 UX. Polish todo can add real endpoint + better validation if desired.