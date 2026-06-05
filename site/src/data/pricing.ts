// src/data/pricing.ts
// 3-tier pricing — project fee + optional monthly hosting & maintenance.
// Updated 2026-06-05: real prices per user contract definition (Starter $899, Pro $1,499, Premium $2,499).
// Monthly care plan: Starter $79/mo, Pro/Premium $99/mo (hosting + backups + security + unlimited changes).
// Deposit: 25% upfront; remainder due within 3 business days of delivery.

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  cta: string;
  slug: string;
  detail: {
    intro: string;
    bullets: string[];
    image: string;
    closing: string;
  };
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$899",
    period: "project fee",
    slug: "starter",
    features: [
      "Clean one-page custom website",
      "Mobile-friendly & responsive",
      "Contact form + Google Maps button",
      "Basic SEO (title, meta, Google Business)",
      "Social media links",
      "Fast loading speed optimization",
      "60-day bug fix warranty",
      "Hosting & maintenance: +$79/mo",
    ],
    cta: "Start simple",
    detail: {
      intro: "The Starter plan is built for businesses that need a clean, professional web presence fast — without overpaying for features they don't need yet. One fully custom page that looks like you hired a real designer, delivered in 1–2 weeks.",
      bullets: [
        "One fully custom-designed page (not a template)",
        "Mobile-responsive layout that works on every screen size",
        "Contact form connected to your inbox",
        "Basic on-page SEO: title, meta, headings, Google Business integration",
        "Social media links (Instagram, Facebook, TikTok, and more)",
        "Fast loading speed optimization",
        "60-day bug fix warranty after delivery",
        "Optional hosting & maintenance plan: $79/mo (includes hosting, security updates, backups, analytics, and unlimited content changes while subscribed)",
        "Project starts upon signed contract + 25% deposit. Balance due within 3 business days of delivery.",
      ],
      image: "/images/tier-starter.gif",
      closing: "Perfect for: restaurants, barbers, mechanics, contractors, and any local business that needs a credible, lead-generating web presence without the big agency price tag.",
    },
  },
  {
    name: "Professional",
    price: "$1,499",
    period: "project fee",
    popular: true,
    slug: "professional",
    features: [
      "Everything in Starter",
      "Multi-page site (Home, About, Services, Portfolio, Contact)",
      "Professional custom design",
      "Portfolio / services gallery section",
      "Testimonials section",
      "Better SEO + schema markup",
      "60-day bug fix warranty",
      "Hosting & maintenance: +$99/mo",
    ],
    cta: "Most popular choice",
    detail: {
      intro: "The Professional plan is our most popular for a reason. It gives you a full multi-page website with a custom design, a dedicated portfolio or services section, stronger SEO, and everything you need to stand out from competitors. Delivered in 1–2 weeks.",
      bullets: [
        "Everything included in the Starter plan",
        "Full multi-page website: Home, About, Services, Portfolio/Gallery, Contact",
        "Expanded custom layout with more sections and visual detail",
        "Portfolio or services showcase section with images and descriptions",
        "Testimonials carousel to build trust",
        "Optional blog section (on request)",
        "Enhanced SEO: on-page optimization, schema markup, local keywords",
        "60-day bug fix warranty after delivery",
        "Optional hosting & maintenance plan: $99/mo (includes hosting, security updates, backups, analytics, and unlimited content changes while subscribed)",
        "Project starts upon signed contract + 25% deposit. Balance due within 3 business days of delivery.",
      ],
      image: "/images/tier-professional.gif",
      closing: "Best for: established businesses, service professionals, restaurants, and anyone who wants a site that consistently drives inquiries and reflects the quality of their work.",
    },
  },
  {
    name: "Premium",
    price: "$2,499",
    period: "project fee",
    slug: "premium",
    features: [
      "Everything in Professional",
      "Advanced cinematic / animated design",
      "Interactive elements (gallery, booking, etc.)",
      "Newsletter signup integration",
      "Custom unique visual effects",
      "Priority delivery (up to 3 weeks)",
      "60-day bug fix warranty",
      "Hosting & maintenance: +$99/mo",
    ],
    cta: "Go premium",
    detail: {
      intro: "The Premium plan is for businesses that want the highest level of craftsmanship, the fastest turnaround, and the most complete package — advanced animations, interactive elements, and a site that genuinely looks better than anything else in your market. Delivered in up to 3 weeks.",
      bullets: [
        "Everything included in the Professional plan",
        "Advanced cinematic / animated design — smooth transitions, parallax, premium feel",
        "Interactive elements: gallery, booking calendar, before/after slider, and more",
        "Newsletter signup integration",
        "Custom unique visual effects tailored to your brand",
        "Priority delivery: project scheduled and started as a top priority",
        "60-day bug fix warranty after delivery",
        "Optional hosting & maintenance plan: $99/mo (includes hosting, security updates, backups, analytics, and unlimited content changes while subscribed)",
        "Project starts upon signed contract + 25% deposit. Balance due within 3 business days of delivery.",
      ],
      image: "/images/tier-premium.gif",
      closing: "Best for: luxury businesses, coaches, clinics, high-end service providers, and anyone who wants their site to be genuinely the best in their area.",
    },
  },
];
