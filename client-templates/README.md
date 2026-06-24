# Client Website Templates

Three ready-to-use local website templates matching the Eternal Website service tiers.
Open any `index.html` directly in a browser to preview - no build step required.

---

## Templates

### Starter - Rivera Auto Repair
`starter/` - **One-page site** for a local auto repair shop.
- Single `index.html` with all sections + `style.css`
- Sections: Hero, Services (6), About/Why Us, Contact Form + Map, Footer
- Accent color: Navy blue + Orange (#f97316)
- Matches Starter tier: one-page, contact form, Google Maps placeholder, social links, basic SEO meta

### Professional - Summit Property Group
`professional/` - **Multi-page site** for a real estate/property firm.
- 5 HTML pages + shared `style.css`
- Pages: Home (testimonials, stats), About (team), Services (full grid), Portfolio (listings), Contact
- Accent color: Forest green + Gold (#c9a84c)
- Matches Professional tier: multi-page, portfolio section, testimonials, schema markup

### Premium - Elara Wellness Clinic
`premium/` - **Full animated site** for a luxury wellness clinic.
- 5 HTML pages + `style.css` + `script.js`
- Pages: Home (animated hero), About (team + philosophy), Services (interactive), Gallery (before/after slider), Contact (booking form + FAQ accordion)
- Accent color: Deep purple + Rose (#d4857f)
- Matches Premium tier: animations, scroll effects, before/after slider, newsletter, booking form

### Custom - AURA Audio Scroll Showcase
`custom/` - **Apple/Linear-style scroll-driven product sequence** for a premium audio brand.
- Full-viewport fixed product stage; text panels scroll over the rotating headphones
- 10-frame scroll sequence: front → three-quarter fronts/sides → sides → three-quarters back → back → top-down → bottom cushion
- Dark mode + theme-aware stage scrim
- Accent color: Deep charcoal (#14161c) + Electric blue (#2f6bff)

---

## How to Use

1. Pick the template matching the client's tier
2. Open the folder and replace:
   - Business name, tagline, phone, address, email, hours
   - Service names and descriptions
   - Colors in `:root` CSS variables at top of `style.css`
   - Photo placeholders with real client photos
   - Google Maps embed placeholder with actual embed code
   - Form `action="#"` with Formspree or Netlify form endpoint
   - Social link `href="#"` with real URLs
   - Footer copyright name
3. Test locally by opening `index.html` in any browser
4. When ready, push to GitHub for Netlify deployment

---

## Customizing Colors (all templates)

Each `style.css` starts with `:root { }` variables. Change these to retheme the whole site:

```css
:root {
  --primary: #1e3a5f;   /* main dark color - nav, headings */
  --accent: #f97316;    /* highlight/CTA color - buttons, icons */
}
```

---

## Credits

Website templates by [Eternal Website](https://eternalwebsite.com) - Bradenton / Sarasota, FL

## Media Assets (Higgsfield Generated)

All images generated with Higgsfield (gpt_image_2 model, 2k resolution) and integrated for production-ready use. No placeholders remain.

### Starter (Rivera Auto Repair)
- images/Rivera-Auto-Repair-Hero-20260622.png (hero)
- images/Rivera-Auto-Shop-Interior-20260621.png (about/interior)

### Professional (Summit Property Group)
- images/Summit-Property-Hero-20260622.png (hero)
- images/Summit-team-photo-20260621.png (team)
- images/Summit-Property-1.png ... Summit-Property-6.png (portfolio)
- images/Summit-agent-carlos.png ... agent-maria.png (team)

### Premium (Elara Wellness Clinic)
- images/Elara-Spa-Hero-20260622.png (hero)
- images/Elara-clinic-interior-20260621.png, Elara-gallery-lobby-20260621.png, Elara-founder-sofia-20260621.png, Elara-team-*.png
- Services: Elara-massage-20260621.png, Elara-facial-20260621.png, Elara-iv-therapy-20260621.png, Elara-yoga-20260621.png, Elara-body-20260621.png, Elara-nutrition-20260621.png
- Before/After: before1.png / after1.png, before2.png / after2.png
- All referenced in HTML with .png/.jpg as appropriate.

### Custom (AURA Audio - scroll sequence 10-frame, generated 2026-06-22)
- images/aura-frame-01.png through aura-frame-10.png — 10 product views for scroll-driven sequence
- Sequence: front → three-quarter front-right → right side → three-quarter back-right → back → three-quarter back-left → left side → three-quarter front-left → top-down → bottom ear cushion
- Palette: matte charcoal headphones with electric blue accents, clean gradient studio backdrops.

To regenerate: higgsfield generate create gpt_image_2 --prompt "AURA Pro wireless headphones, <view>, matte charcoal with electric blue accents, clean gradient studio background, product photography" --aspect_ratio 16:9 --resolution 2k then curl to custom/images/aura-frame-<NN>.png.

Verification: ls images/ ; grep -o 'images/[^"'\'' ]*\.(png|jpg)' **/*.{html,css}
