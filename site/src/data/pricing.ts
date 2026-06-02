// src/data/pricing.ts
// 3-tier pricing for small local businesses.
// Flat project fees. "Most popular" on the middle (proven pattern from competitors).
// User can adjust numbers/features in notes/Pricing.md and here.

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$1,497",
    period: "one-time",
    features: [
      "One-page custom design",
      "Mobile responsive",
      "Basic contact form",
      "Launch & basic SEO",
      "1 round of revisions",
      "30-day support",
    ],
    cta: "Start simple",
  },
  {
    name: "Professional",
    price: "$2,497",
    period: "one-time",
    popular: true,
    features: [
      "Everything in Starter",
      "Custom visuals & layout",
      "Portfolio / services section",
      "Stronger SEO & speed",
      "2 rounds of revisions",
      "60-day support",
      "Google Business integration help",
    ],
    cta: "Most popular choice",
  },
  {
    name: "Premium",
    price: "$3,997",
    period: "one-time",
    features: [
      "Everything in Professional",
      "Priority scheduling (1-2 weeks)",
      "Extra custom sections or map",
      "Analytics + performance setup",
      "Unlimited small tweaks (30 days)",
      "90-day priority support",
      "Future page credit (blog/about)",
    ],
    cta: "Go premium",
  },
];