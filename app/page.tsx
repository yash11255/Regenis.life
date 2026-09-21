import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Hero from "./components/equipment/Hero";
import PartnerBrandsSection from "./components/home/PartnerBrandsSection";
import CategoryOverview from "./components/equipment/CategoryOverview";
import FeaturedShowcase from "./components/equipment/FeaturedShowcase";
import WhyPartners from "./components/equipment/WhyPartners";
import FAQSection from "./components/home/FAQSection";
import Section from "./components/ui/Section";
import Eyebrow from "./components/ui/Eyebrow";
import SectionHeading from "./components/ui/SectionHeading";
import Button from "./components/ui/Button";
import { SchemaScript } from "./components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateItemListSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { getEquipmentFaqs, SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { visibleEquipment } from "./data/equipment";

const PAGE_DESCRIPTION =
  "Regenis Life curates a portfolio of clinically precise, globally certified medical and wellness equipment — hyperbaric, aesthetic, rehabilitation, diagnostics, recovery, and robotics systems — for professional facilities.";

const FEATURED_ITEMS = visibleEquipment.slice(0, 6);

export const metadata: Metadata = {
  title: { absolute: "Regenis Life | Curated Medical & Wellness Equipment" },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Regenis Life | Curated Medical & Wellness Equipment",
    description: PAGE_DESCRIPTION,
    url: "/",
    type: "website",
    images: [{ url: "/Regenis.png", width: 1536, height: 1024, alt: "Regenis Life" }],
  },
};

export default function HomePage() {
  const webPageSchema = generateWebPageSchema({
    name: "Regenis Life | Curated Medical & Wellness Equipment",
    url: `${BUSINESS_URL}/`,
    description: PAGE_DESCRIPTION,
    pageType: "WebPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    dateModified: SEO_LAST_MODIFIED,
    mainEntity: { "@id": `${BUSINESS_URL}/#featured-equipment` },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([{ label: "Home", url: BUSINESS_URL }]);
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
    `${BUSINESS_URL}/#featured-equipment`
  );
  const faqSchema = generateFAQSchema(getEquipmentFaqs(visibleEquipment.length));

  return (
    <main>
      <SchemaScript
        id="home-schema"
        schema={[webPageSchema, breadcrumbSchema, itemListSchema, faqSchema]}
      />

      <Hero
        eyebrow="Regenis Life"
        title={
          <>
            The equipment behind <span className="text-primary-on-dark">exceptional</span>{" "}
            facilities.
          </>
        }
        summary={PAGE_DESCRIPTION}
        primary={{ label: "Explore the portfolio", href: "/equipment" }}
      />

      <PartnerBrandsSection ctaHref="/equipment" ctaLabel="View equipment partners" />
      <CategoryOverview />
      <FeaturedShowcase
        eyebrow="From the portfolio"
        items={FEATURED_ITEMS}
        ctaHref="/equipment/all"
        ctaLabel="View full catalog"
      />
      <WhyPartners />
      <FAQSection />

      <Section band="dark" divide className="text-center">
        <Eyebrow className="mb-6 text-ink-inverse-faint">Planning a new facility?</Eyebrow>
        <SectionHeading className="mx-auto mb-10 max-w-[720px] text-ink-inverse">
          Let&apos;s talk about the <span className="text-primary">right platforms</span> for
          your space.
        </SectionHeading>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Button href="/contact">Contact the team</Button>
          <Button href="/about" variant="quiet" className="text-ink-inverse">
            About Regenis Life
            <ArrowUpRight size={14} />
          </Button>
        </div>
      </Section>
    </main>
  );
}
