import type { FAQItem } from "./schema";

export const SEO_LAST_MODIFIED = "2026-11-14T00:00:00+05:30";

export function getHomeFaqs(deviceCount: number): FAQItem[] {
  return [
    {
      question: "What does Regenis Life do for clinical and longevity facilities in India?",
      answer: `Regenis Life partners with clinics, rehabilitation centres, longevity practices, medspas, and sports-performance facilities across India to source, plan, install, and support a curated portfolio of ${deviceCount} clinical, diagnostics, recovery, and wellness systems from global manufacturers.`,
    },
    {
      question: "How does Regenis Life support facility planning, installation, and training?",
      answer:
        "Our team acts as a single point of contact from early room-layout and utility planning through import coordination, commissioning, and on-site operator training, with market-specific documentation confirmed per project.",
    },
    {
      question: "Why does the portfolio pair flagship platforms with benchmark alternates?",
      answer:
        "Across key modalities — such as monoplace hyperbaric oxygen, anti-gravity gait rehabilitation, body composition, isokinetic dynamometry, diagnostic imaging, and neurostimulation — Regenis Life pairs selected flagship systems with established benchmark alternates so operators can compare specifications side by side.",
    },
    {
      question: "Which types of organisations work with Regenis Life?",
      answer:
        "We work with hospital departments, outpatient rehabilitation clinics, aesthetic and dermatology practices, sports-medicine and athlete-performance centres, and structured longevity or recovery facilities evaluating professional-grade equipment.",
    },
    {
      question: "How can a facility request pricing, specifications, or availability?",
      answer:
        "Select Enquire Now in the header or visit the Contact page to share your facility requirements and preferred equipment. A Regenis Life representative typically responds within one business day with technical documentation, configuration options, and procurement details.",
    },
  ];
}

export function getEquipmentFaqs(deviceCount: number): FAQItem[] {
  return [
    {
      question: "What categories are covered in the Regenis Life equipment portfolio?",
      answer: `The ${deviceCount}-system catalog spans five capability areas: Body Contouring & Facial Aesthetics, Pelvic Health & Neuro Wellness, Recovery & Regeneration, Diagnostics & Performance Testing, and Innovation & Robotics.`,
    },
    {
      question: "Which clinical, recovery, and diagnostic modalities are available?",
      answer:
        "Available technologies include monoplace hyperbaric oxygen chambers, electric whole-body cryotherapy, synchronized RF and HIFEM/HIFES platforms, transcranial magnetic stimulation, focused shockwave, Class IV laser, spinal decompression, markerless 3D motion capture, isometric/isokinetic strength testing, and body-composition analyzers.",
    },
    {
      question: "Are all listed platforms regulated medical devices?",
      answer:
        "No. The portfolio combines clinical medical equipment with aesthetic treatment furniture, sports-performance testing systems, and R&D robotics platforms. Each product page states its category, manufacturer, technical specifications, and intended professional context, and regulatory classification must be confirmed for the target market.",
    },
    {
      question: "Can I filter the equipment catalog by manufacturer or capability area?",
      answer:
        "Yes. You can browse dedicated category pages for each of the five capability areas or open the Full Catalog to filter directly by partner manufacturer — including BTL Industries, HPO TECH, MECOTEC, Vald Performance, Canfield Scientific, Storz Medical, InBody, Telea Medical Group, and others.",
    },
    {
      question: "Where do I confirm room dimensions, power requirements, and datasheets?",
      answer:
        "Key dimensions, operating ranges, and core features are listed on each individual product page. Before finalizing room layouts or procurement, request current manufacturer datasheets and pre-installation guides directly from the Regenis Life team.",
    },
  ];
}
