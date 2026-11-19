import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import SectionHeading from "../../components/ui/SectionHeading";
import PartnerSection from "../../components/equipment/PartnerSection";
import { SchemaScript } from "../../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import { buildPageMetadata } from "@/lib/metadata";
import {
  buildEquipmentItemListEntry,
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateOfferCatalogSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { visibleEquipment } from "../../data/equipment";

const PAGE_URL = `${BUSINESS_URL}/equipment/all`;
const PAGE_DESCRIPTION =
  "Browse Regenis Life's full clinical, diagnostics, recovery, and wellness equipment catalog — filter by global partner manufacturer across hyperbaric, aesthetic, rehabilitation, testing, and robotics systems.";

export const metadata: Metadata = buildPageMetadata({
  title: "Full Clinical & Wellness Equipment Catalog",
  ogTitle: "All Equipment — Full Catalog | Regenis Life",
  description: PAGE_DESCRIPTION,
  canonicalPath: "/equipment/all",
  images: visibleEquipment[0]
    ? [{ url: visibleEquipment[0].image, alt: visibleEquipment[0].name }]
    : undefined,
});

export default function AllEquipmentPage() {
  const collectionSchema = generateWebPageSchema({
    name: "All Equipment — Full Catalog | Regenis Life",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "CollectionPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    mainEntity: { "@id": `${PAGE_URL}#equipment-list` },
    dateModified: SEO_LAST_MODIFIED,
    about: { "@type": "Thing", name: "Clinical, diagnostics, recovery, and wellness equipment catalog" },
    speakable: ["h1", ".catalog-page-summary"],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: `${BUSINESS_URL}/equipment` },
    { label: "All Equipment", url: PAGE_URL },
  ]);
  const itemListSchema = generateItemListSchema(
    "Regenis Life Equipment Catalog",
    visibleEquipment.map((eq) => buildEquipmentItemListEntry(eq, BUSINESS_URL)),
    `${PAGE_URL}#equipment-list`
  );
  const offerCatalogSchema = generateOfferCatalogSchema(
    "Regenis Life Equipment Services",
    visibleEquipment.map((eq) => ({
      name: eq.name,
      url: `${BUSINESS_URL}/equipment/${eq.id}`,
      description: eq.description,
    }))
  );

  return (
    <main>
      <SchemaScript
        id="all-equipment-schema"
        schema={[collectionSchema, breadcrumbSchema, itemListSchema, offerCatalogSchema]}
      />

      <Section space="lg" contained={false} className="pt-[clamp(120px,15vw,180px)]">
        <Container>
          <Link
            href="/equipment"
            className="mb-10 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-ink-faint transition-colors hover:text-primary"
          >
            <ChevronLeft size={16} />
            Back to Equipment
          </Link>
          <Eyebrow tone="primary" className="mb-6">
            Regenis Life — full catalog
          </Eyebrow>
          <SectionHeading as="h1" size="xl" className="max-w-[900px]">
            All <span className="text-primary">equipment.</span>
          </SectionHeading>
          <p className="catalog-page-summary mt-7 max-w-[680px] text-[15px] font-light leading-[1.75] text-ink-muted">
            {PAGE_DESCRIPTION}
          </p>
        </Container>
      </Section>

      <PartnerSection equipments={visibleEquipment} />
    </main>
  );
}
