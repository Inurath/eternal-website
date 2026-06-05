// src/data/portfolio.ts
// Placeholder "past work" for the one-pager. Realistic local examples.
// In real use: replace with actual client sites + results (with permission).

export interface PortfolioItem {
  title: string;
  category: string;
  result: string;
  desc: string;
  image?: string;
  url: string;
}

export const portfolio: PortfolioItem[] = [
  {
    title: "Sunset Café",
    category: "Restaurant / Café",
    result: "+47% inquiries in first month",
    desc: "One-page menu + hours + location + online order CTA. Clean photos and easy mobile experience.",
    image: "/images/cafe-local.jpg",
    url: "https://familygoldcare.com",
  },
  {
    title: "Harbor Law Group",
    category: "Professional Services",
    result: "Higher quality leads, less 'price shoppers'",
    desc: "Authority-building layout with clear practice areas, flat-fee messaging, and direct contact form.",
    image: "/images/professional-services.jpg",
    url: "https://familygoldcare.com",
  },
  {
    title: "Gulf Coast Plumbing",
    category: "Trades / Service",
    result: "Top 3 for 'Bradenton plumber'",
    desc: "Fast-loading service grid, prominent phone + quote button, service area map, and testimonials.",
    image: "/images/modern-office.jpg",
    url: "https://familygoldcare.com",
  },
  {
    title: "Palma Sola Wellness",
    category: "Health / Clinic",
    result: "New patients booking directly from site",
    desc: "Trust-focused design with practitioner bio, services, and simple scheduling form integration.",
    image: "/images/laptop-work.jpg",
    url: "https://familygoldcare.com",
  },
];
