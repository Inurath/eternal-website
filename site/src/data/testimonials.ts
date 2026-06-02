// src/data/testimonials.ts
// Realistic local small-biz flavor. Replace with real quotes post-launch.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  business: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "The Eternal Website team took our scattered ideas and turned them into a clean one-page site that actually brings in calls. We look like the established choice now.",
    name: "Maria Lopez",
    role: "Owner",
    business: "Lopez Family Dental — Bradenton",
  },
  {
    quote: "Fast, professional, and exactly what a small law practice needed. No fluff, just a trustworthy site that makes clients feel confident before they even call.",
    name: "David Chen",
    role: "Attorney",
    business: "Chen Law, Sarasota",
  },
  {
    quote: "My HVAC business went from a Facebook page to a real website in under two weeks. I’m getting leads from people who never would have found me before.",
    name: "Tommy Rivera",
    role: "Owner",
    business: "Rivera Comfort Cooling — Lakewood Ranch",
  },
];