import { visibleEquipment, type Equipment } from "./equipment";

export interface Category {
  /** URL segment for /equipment/category/[slug] */
  slug: string;
  /** MUST match the `category` string on equipment records exactly. */
  name: string;
  /** Compact label for nav / footer / chips. */
  shortName: string;
  /** One-line summary for cards and meta descriptions. */
  blurb: string;
  /** Lead paragraph for the category landing page. */
  intro: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "body-contouring-facial-aesthetics",
    name: "Body Contouring & Facial Aesthetics",
    shortName: "Body & Facial Aesthetics",
    blurb:
      "Non-invasive muscle, skin, and facial rejuvenation platforms — RF, HIFEM, ultrasound, and light-based systems.",
    intro:
      "Non-invasive body-shaping and facial platforms for clinics and medspas: radiofrequency, HIFEM muscle stimulation, ultrasound, microneedling RF, and multi-technology facial systems from category-leading manufacturers.",
  },
  {
    slug: "pelvic-health-neuro-wellness",
    name: "Pelvic Health & Neuro Wellness",
    shortName: "Pelvic & Neuro",
    blurb:
      "Seated pelvic-floor therapy and non-invasive neuro-stimulation systems for supervised professional protocols.",
    intro:
      "Pelvic-floor rehabilitation and non-invasive brain-stimulation technology for clinical and wellness facilities — fully-clothed HIFEM therapy chairs and transcranial magnetic stimulation platforms used under clinician direction.",
  },
  {
    slug: "recovery-regeneration",
    name: "Recovery & Regeneration",
    shortName: "Recovery & Regeneration",
    blurb:
      "Hyperbaric oxygen, cryotherapy, shockwave, spinal decompression, and anti-gravity recovery modalities.",
    intro:
      "The core of the Regenis Life portfolio: hyperbaric oxygen chambers, whole-body cryotherapy, focused shockwave, spinal decompression, laser, and anti-gravity treadmills — recovery and regeneration technology for rehabilitation, sports-performance, and longevity environments.",
  },
  {
    slug: "diagnostics-performance-testing",
    name: "Diagnostics & Performance Testing",
    shortName: "Diagnostics & Testing",
    blurb:
      "Body composition, movement analysis, isokinetic strength, and diagnostic imaging platforms.",
    intro:
      "Objective measurement for clinical and performance facilities: bioimpedance body composition, markerless 3D movement capture, force-plate and isokinetic strength testing, and diagnostic ultrasound imaging.",
  },
  {
    slug: "innovation-robotics",
    name: "Innovation & Robotics",
    shortName: "Innovation & Robotics",
    blurb: "Emerging AI and humanoid-robotics platforms for demonstrations and research.",
    intro:
      "Forward-looking technology for guest-facing demonstrations and internal research — humanoid robotics platforms with onboard AI compute, positioned as an innovation showcase rather than a clinical device.",
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function slugForCategory(name: string | undefined): string | undefined {
  if (!name) return undefined;
  return CATEGORIES.find((c) => c.name === name)?.slug;
}

export function equipmentInCategory(slug: string): Equipment[] {
  const cat = categoryBySlug(slug);
  if (!cat) return [];
  return visibleEquipment.filter((e) => e.category === cat.name);
}

export function categoryCount(name: string): number {
  return visibleEquipment.filter((e) => e.category === name).length;
}
