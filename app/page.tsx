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
import { buildPageMetadata } from "@/lib/metadata";
import {
  buildEquipmentItemListEntry,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateItemListSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { getHomeFaqs, SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { visibleEquipment } from "./data/equipment";

const PAGE_TITLE =
  "Regenis Life | Clinical, Longevity & Wellness Equipment Partner in India";
const PAGE_DESCRIPTION =
  "Regenis Life provides curated clinical, diagnostics, recovery, and wellness equipment from global manufacturers — with turnkey site planning, installation, and staff training across India.";

const FEATURED_ITEMS = visibleEquipment.slice(0, 6);

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  absoluteTitle: true,
  description: PAGE_DESCRIPTION,
  canonicalPath: "/",
});

export default function HomePage() {
  const homeFaqs = getHomeFaqs(visibleEquipment.length);
  const webPageSchema = generateWebPageSchema({
    name: PAGE_TITLE,
    url: BUSINESS_URL,
    description: PAGE_DESCRIPTION,
    pageType: "WebPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    dateModified: SEO_LAST_MODIFIED,
    mainEntity: { "@id": `${BUSINESS_URL}/#featured-equipment` },
    speakable: ["h1", ".equipment-page-summary"],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([{ label: "Home", url: BUSINESS_URL }]);
  const itemListSchema = generateItemListSchema(
    "Regenis Life Featured Equipment",
    FEATURED_ITEMS.map((eq) => buildEquipmentItemListEntry(eq, BUSINESS_URL)),
    `${BUSINESS_URL}/#featured-equipment`
  );
  const faqSchema = generateFAQSchema(homeFaqs);

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
      <FAQSection
        faqs={homeFaqs}
        heading="Partnering with Regenis Life."
        intro="Answers for clinical, rehabilitation, longevity, and performance facilities planning equipment procurement in India."
      />

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
