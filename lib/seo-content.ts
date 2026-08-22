import type { FAQItem } from "./schema";

export const SEO_LAST_MODIFIED = "2026-08-20";

export function getEquipmentFaqs(deviceCount: number): FAQItem[] {
  return [
    {
      question: "What medical and wellness equipment does Regenis Life supply?",
      answer: `Regenis Life presents a curated catalog of ${deviceCount} medical, wellness, rehabilitation, diagnostics, recovery, aesthetic, and innovation systems. The portfolio includes hyperbaric oxygen, body contouring, pelvic health, neuro-wellness, movement analysis, strength testing, shockwave, laser, and robotics technologies.`,
    },
    {
      question: "Who is the Regenis Life equipment catalog for?",
      answer: "The catalog is designed for clinics, wellness centres, rehabilitation facilities, sports-performance environments, and other professional facilities evaluating clinical and wellness technology.",
    },
    {
      question: "How can I enquire about a Regenis Life device?",
      answer: "Open Enquire Now from the navigation, a product page, or the equipment catalog to submit your name, email address, phone number, selected product, and message to the Regenis Life team.",
    },
    {
      question: "Does Regenis Life support equipment planning and installation?",
      answer: "Regenis Life describes end-to-end support across site planning, installation, and staff training. Product-specific availability, specifications, installation requirements, and service terms should be confirmed with the team before procurement.",
    },
    {
      question: "Are all Regenis Life products medical devices?",
      answer: "The portfolio combines clinical medical equipment with wellness, aesthetic, performance, and innovation systems. Each product page identifies its category, manufacturer, intended professional context, specifications, and current portfolio status.",
    },
  ];
}
