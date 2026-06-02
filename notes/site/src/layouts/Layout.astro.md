# Layout.astro — Base HTML + head + body wrapper

**Location:** site/src/layouts/Layout.astro  
**Role in site:** The single root layout for the one-pager. Provides `<html>`, `<head>` (title, meta, description, favicon), `<body>`, and imports the global Tailwind + custom CSS.

**Key implementation:**
- Astro frontmatter import of `../styles/global.css` (required after `astro add tailwind`).
- Professional title + meta description for SEO ("Premium one-page websites for small local businesses...").
- Viewport + charset standard.
- No extra frameworks; keeps the page 100% static + fast.
- Inline `<style>` for html/body reset (Tailwind handles most).

**Decisions & tradeoffs:**
- Kept simple (no extra layout props or SEO component yet) to match v1 one-pager scope.
- Description is benefit-focused and keyword-rich for local + "premium / trustworthy".
- Favicon points to public/ (default svg kept for now; will customize).

**How to customize / extend:**
- Update title/description here (or move to a SEO component later).
- Add more `<meta>` (OG, Twitter) in the head section when polishing.
- For client clones: this file rarely changes; most per-client work is in data/ + index content.
- If adding more pages (v2), turn into a reusable BaseLayout with props.

**Related:** global.css (theme), index.astro (uses it), Report.md (branding + SEO sections), notes/Branding.md (when written).

**Status:** Scaffold complete. OG tags + description added in polish pass for basic sharing/SEO. Full LocalBusiness JSON-LD can go in index or a component later.