// src/data/services.ts
// Easy to edit / clone for future client projects.
// Keep descriptions short (1 sentence) for scannability.

export interface Service {
  icon: string;
  title: string;
  desc: string;
  slug: string;
  detail: {
    intro: string;
    bullets: string[];
    closing: string;
  };
}

export const services: Service[] = [
  {
    icon: "🔍",
    title: "Discovery & Strategy",
    desc: "We learn your business, customers, and goals so the site actually works for you — not just looks pretty.",
    slug: "discovery-strategy",
    detail: {
      intro: "Before we write a single line of code, we get to know your business. This phase is what separates a site that just exists from one that actually converts visitors into customers.",
      bullets: [
        "30-minute kickoff call to understand your goals, customers, and competitors",
        "Identify your top 2–3 conversion goals (calls, form fills, bookings)",
        "Review your market: who's searching for you and what they expect to see",
        "Outline a content plan: what sections, what messaging, what call-to-action",
        "Agree on tone and style before any design begins — no surprises",
      ],
      closing: "Most agencies skip this step and hand you a generic template. We don't. Every decision we make is rooted in what will actually work for your specific business and market.",
    },
  },
  {
    icon: "🎨",
    title: "Custom Design",
    desc: "Hand-crafted layout, typography, and visuals that feel like your business (no templates or cookie-cutter themes).",
    slug: "custom-design",
    detail: {
      intro: "Your site should look like you hired a real designer — because you did. We build every layout from scratch, tailored to your brand, your audience, and the impression you want to make.",
      bullets: [
        "Custom color palette, typography, and spacing built around your brand",
        "Hand-crafted section layouts: hero, services, testimonials, contact",
        "Professional imagery guidance (or sourced placeholder photography)",
        "Dark/light mode support with consistent visual identity",
        "Pixel-perfect attention to detail — not a Squarespace template with your logo swapped in",
      ],
      closing: "Visitors decide whether to trust you within 3 seconds of landing on your page. A custom design gives you that credibility. A template gives it to 10,000 other businesses at the same time.",
    },
  },
  {
    icon: "📱",
    title: "Mobile-First & Fast",
    desc: "Designed on phones first. Loads in under 2 seconds. Google loves it, your customers will too.",
    slug: "mobile-first-fast",
    detail: {
      intro: "Over 70% of local searches happen on a phone. If your site takes 4 seconds to load or falls apart on a small screen, you've already lost that customer. We build mobile-first, every time.",
      bullets: [
        "Layout designed for phones first, then scaled up for tablets and desktops",
        "Target load time under 2 seconds on mobile networks",
        "Optimized images, clean code, no bloat — fast by default",
        "Tap-friendly buttons, readable text sizes, thumb-zone navigation",
        "Passes Google Core Web Vitals — a real ranking factor for local search",
      ],
      closing: "Speed isn't just a nice-to-have. Google uses page speed as a ranking signal. A fast mobile site means more visibility, more visitors, and more customers finding you instead of your competitors.",
    },
  },
  {
    icon: "✉️",
    title: "Lead Forms & SEO Basics",
    desc: "Contact forms that actually get emails to you + on-page SEO so people searching locally can find you.",
    slug: "lead-forms-seo",
    detail: {
      intro: "Getting visitors to your site is only half the battle. We make sure they have a clear, easy way to contact you — and that local customers can find you in the first place.",
      bullets: [
        "Custom contact form connected to your inbox (no missed leads)",
        "Spam-protected with honeypot + validation so you only get real inquiries",
        "On-page SEO: title tags, meta descriptions, headings, and structured data",
        "Local SEO basics: city/region keywords, Google Maps embed, business schema",
        "Fast static delivery so Googlebot crawls and indexes your site easily",
      ],
      closing: "A beautiful site that nobody can find is wasted money. We make sure the right people — people in your area who are already searching for what you do — can find you and contact you without friction.",
    },
  },
  {
    icon: "✅",
    title: "Revisions & Launch",
    desc: "Two rounds of changes included. We handle the tech, domain pointing, and make sure everything goes live smoothly.",
    slug: "revisions-launch",
    detail: {
      intro: "We don't just hand you a link and disappear. Launch is a full service — we handle the technical side, review everything with you, and make sure the site goes live without issues.",
      bullets: [
        "Structured review process: we walk through every section with you before launch",
        "Up to 2 rounds of revisions included (most clients use 1)",
        "Domain connection and DNS configuration handled by us",
        "SSL certificate setup so your site is secure (https://)",
        "Pre-launch checklist: forms tested, mobile check, speed verified, links confirmed",
        "Post-launch monitoring for 30 days — we watch for any issues",
      ],
      closing: "We've launched dozens of sites and know exactly what can go wrong at the last minute. Our process is built to catch it before your customers do.",
    },
  },
  {
    icon: "🛠️",
    title: "Ongoing Care (Optional)",
    desc: "Annual updates, small content changes, and peace of mind so your site stays current without you thinking about it.",
    slug: "ongoing-care",
    detail: {
      intro: "Your business changes. Your site should too. Our optional care plan means you never have to worry about your site getting stale, breaking, or falling behind on security updates.",
      bullets: [
        "Up to 3 content updates per month (hours, prices, team, services, etc.)",
        "Annual visual refresh to keep the design current and competitive",
        "Hosting included — no separate bills to manage",
        "Uptime monitoring with alerts if anything goes down",
        "Priority support — faster response times than standard clients",
        "Optional: $49/mo hosting & support subscription (available on Professional and Premium plans)",
      ],
      closing: "Most business owners don't have time to think about their website after it launches. That's exactly why this plan exists. Set it, forget it, and know it's handled.",
    },
  },
];
