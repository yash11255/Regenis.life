import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Hero from "../components/equipment/Hero";
import CategoryOverview from "../components/equipment/CategoryOverview";
import WhyPartners from "../components/equipment/WhyPartners";
import FeaturedShowcase from "../components/equipment/FeaturedShowcase";
import FAQSection from "../components/home/FAQSection";
import PartnerBrandsSection from "../components/home/PartnerBrandsSection";
import Section from "../components/ui/Section";
import Eyebrow from "../components/ui/Eyebrow";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { SchemaScript } from "../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL, BUSINESS_EMAIL } from "@/lib/business-config";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateItemListSchema,
  generateVideoObjectSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { getEquipmentFaqs, SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { visibleEquipment } from "../data/equipment";

const PAGE_URL = `${BUSINESS_URL}/equipment`;
const PAGE_DESCRIPTION =
  "Explore Regenis Life's medical and wellness equipment portfolio: hyperbaric, aesthetic, rehabilitation, diagnostics, recovery, and robotics systems for professional facilities.";
const FEATURED_ITEMS = visibleEquipment.slice(0, 6);

export const metadata: Metadata = {
  title: "Medical & Wellness Equipment",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/equipment" },
  openGraph: {
    title: "Medical Equipment Showcase | Regenis Life",
    description: PAGE_DESCRIPTION,
    url: "/equipment",
    type: "website",
    images: visibleEquipment[0]
      ? [{ url: visibleEquipment[0].image, alt: visibleEquipment[0].name }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Equipment Showcase | Regenis Life",
    description: PAGE_DESCRIPTION,
    images: [visibleEquipment[0]?.image ?? "/Regenis.png"],
  },
};

export default function EquipmentShowcasePage() {
  const collectionSchema = generateWebPageSchema({
    name: "Medical & Wellness Equipment | Regenis Life",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "CollectionPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    mainEntity: { "@id": `${PAGE_URL}#featured-equipment` },
    dateModified: SEO_LAST_MODIFIED,
    about: {
      "@type": "Thing",
      name: "Medical and wellness equipment for professional facilities",
    },
    speakable: ["h1", ".equipment-page-summary"],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: PAGE_URL },
  ]);
  const itemListSchema = generateItemListSchema(
    "Regenis Life Featured Equipment",
    FEATURED_ITEMS.map((eq) => ({
      name: eq.name,
      url: `${BUSINESS_URL}/equipment/${eq.id}`,
      description: eq.description,
      image: `${BUSINESS_URL}${eq.image}`,
      itemType: "MedicalDevice",
      brand: eq.partner,
      manufacturer: eq.manufacturer || eq.partner,
      category: eq.category,
    })),
    `${PAGE_URL}#featured-equipment`
  );
  const faqSchema = generateFAQSchema(getEquipmentFaqs(visibleEquipment.length));
  const videoSchema = generateVideoObjectSchema({
    name: "Regenis Life Clinical Equipment Showcase",
    description:
      "Regenis Life presents medical, wellness, rehabilitation, recovery, diagnostics, and clinical equipment for professional facilities.",
    thumbnailUrl: "https://i.ytimg.com/vi/9uoYBcnOF2c/maxresdefault.jpg",
    uploadDate: SEO_LAST_MODIFIED,
    embedUrl: "https://www.youtube.com/embed/9uoYBcnOF2c",
  });

  return (
    <main>
      <SchemaScript
        id="equipment-list-schema"
        schema={[collectionSchema, breadcrumbSchema, itemListSchema, faqSchema, videoSchema]}
      />

      <Hero />
      <PartnerBrandsSection />
      <CategoryOverview />
      <FeaturedShowcase
        items={FEATURED_ITEMS}
        ctaHref="/equipment/all"
        ctaLabel="View full catalog"
      />
      <WhyPartners />
      <FAQSection />

      <Section id="contact" band="dark" divide className="scroll-mt-28 text-center">
        <Eyebrow className="mb-6 text-ink-inverse-faint">Ready to equip your facility?</Eyebrow>
        <SectionHeading className="mx-auto mb-10 max-w-[720px] text-ink-inverse">
          Talk to our team about <span className="text-primary">clinical equipment.</span>
        </SectionHeading>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Button href="/contact">Contact the team</Button>
          <Button href={`mailto:${BUSINESS_EMAIL[0]}`} variant="quiet" className="text-ink-inverse">
            Email us
            <ArrowUpRight size={14} />
          </Button>
          <Button href="/equipment/all" variant="quiet" className="text-ink-inverse">
            View full catalog
            <ArrowUpRight size={12} />
          </Button>
        </div>
      </Section>
    </main>
  );
}
