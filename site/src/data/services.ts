// src/data/services.ts
// Easy to edit / clone for future client projects.
// Keep descriptions short (1 sentence) for scannability.

export interface Service {
  icon: string; // simple emoji or later SVG name
  title: string;
  desc: string;
}

export const services: Service[] = [
  {
    icon: "🔍",
    title: "Discovery & Strategy",
    desc: "We learn your business, customers, and goals so the site actually works for you — not just looks pretty.",
  },
  {
    icon: "🎨",
    title: "Custom Design",
    desc: "Hand-crafted layout, typography, and visuals that feel like your business (no templates or cookie-cutter themes).",
  },
  {
    icon: "📱",
    title: "Mobile-First & Fast",
    desc: "Designed on phones first. Loads in under 2 seconds. Google loves it, your customers will too.",
  },
  {
    icon: "✉️",
    title: "Lead Forms & SEO Basics",
    desc: "Contact forms that actually get emails to you + on-page SEO so people searching locally can find you.",
  },
  {
    icon: "✅",
    title: "Revisions & Launch",
    desc: "Two rounds of changes included. We handle the tech, domain pointing, and make sure everything goes live smoothly.",
  },
  {
    icon: "🛠️",
    title: "Ongoing Care (Optional)",
    desc: "Annual updates, small content changes, and peace of mind so your site stays current without you thinking about it.",
  },
];