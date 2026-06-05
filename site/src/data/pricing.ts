// src/data/pricing.ts
// 3-tier pricing for local businesses.
// Flat project fees. "Most popular" on the middle (proven pattern from competitors).
// User can adjust numbers/features in notes/Pricing.md and here.

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
    price: "$1,297",
    period: "one-time",
    slug: "starter",
    features: [
      "One-page custom design",
      "Mobile responsive",
      "Basic contact form",
      "Launch & basic SEO",
      "1 round of revisions",
      "30-day support",
    ],
    cta: "Start simple",
    detail: {
      intro: "The Starter plan is built for businesses that need a clean, professional web presence fast — without overpaying for features they don't need yet. You get a fully custom one-page site that looks like you hired a real designer.",
      bullets: [
        "One fully custom-designed page (not a template)",
        "Mobile-responsive layout that works on every screen size",
        "Contact form connected to your inbox",
        "Basic on-page SEO: title, meta, headings, local keywords",
        "Domain + SSL launch handled by us",
        "1 round of revisions so you can request final adjustments",
        "30-day post-launch support window",
      ],
      image: "/images/tier-starter.gif",
      closing: "Perfect for: service businesses, freelancers, local shops, and anyone who needs a credible online presence that generates real leads. Simple, professional, and built to last.",
    },
  },
  {
    name: "Professional",
    price: "$2,197",
    period: "one-time",
    popular: true,
    slug: "professional",
    features: [
      "Everything in Starter",
      "Custom visuals & layout",
      "Portfolio / services section",
      "Stronger SEO & speed",
      "2 rounds of revisions",
      "60-day support",
      "Google Business integration help",
      "Optional $49/mo hosting & support subscription",
    ],
    cta: "Most popular choice",
    detail: {
      intro: "The Professional plan is our most popular for a reason. It gives you everything in Starter plus a more developed layout, a dedicated portfolio or services section, stronger SEO, and two full rounds of revisions to get everything exactly right.",
      bullets: [
        "Everything included in the Starter plan",
        "Expanded custom layout with more sections and visual detail",
        "Portfolio or services showcase section with images and descriptions",
        "Enhanced SEO: faster load times, structured data, local schema markup",
        "2 rounds of revisions included (most clients never need the second)",
        "60 days of post-launch support",
        "Google Business Profile setup and integration help",
        "Connecting your site to Google Analytics for traffic insights",
        "Optional $49/mo hosting & support subscription to keep everything maintained",
      ],
      image: "/images/tier-professional.gif",
      closing: "Best for: established businesses, service professionals, restaurants, and anyone looking for a site that consistently drives inquiries and reflects the quality of their work.",
    },
  },
  {
    name: "Premium",
    price: "$3,497",
    period: "one-time",
    slug: "premium",
    features: [
      "Everything in Professional",
      "Priority scheduling (1-2 weeks)",
      "Extra custom sections or map",
      "Analytics + performance setup",
      "Unlimited small tweaks (30 days)",
      "90-day priority support",
      "Future page credit (blog/about)",
      "Optional $49/mo hosting & support subscription",
    ],
    cta: "Go premium",
    detail: {
      intro: "The Premium plan is for businesses that want the highest level of craftsmanship, the fastest turnaround, and the most complete package — including extras that would cost far more from a larger agency.",
      bullets: [
        "Everything included in the Professional plan",
        "Priority scheduling: your project starts within days, not weeks",
        "Extra custom sections: location map, team bios, FAQ, gallery, or anything specific to your business",
        "Full analytics and performance setup (Google Analytics + Search Console)",
        "Unlimited small content tweaks in the first 30 days after launch",
        "90-day priority support — you go to the front of the queue",
        "Future page credit: when you're ready to add a blog, about, or landing page, one extra page is included",
        "Optional $49/mo hosting & support subscription for long-term peace of mind",
      ],
      image: "/images/tier-premium.gif",
      closing: "Best for: competitive markets, businesses launching a rebrand, professionals who need a fast turnaround, and anyone who wants their site to be genuinely the best in their area.",
    },
  },
];
