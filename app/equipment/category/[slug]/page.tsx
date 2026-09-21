import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Section from "../../../components/ui/Section";
import Container from "../../../components/ui/Container";
import Eyebrow from "../../../components/ui/Eyebrow";
import SectionHeading from "../../../components/ui/SectionHeading";
import PartnerSection from "../../../components/equipment/PartnerSection";
import { SchemaScript } from "../../../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { CATEGORIES, categoryBySlug, equipmentInCategory } from "../../../data/categories";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return { title: "Category Not Found", robots: { index: false } };

  const title = `${category.name} Equipment`;
  return {
    title,
    description: category.blurb,
    alternates: { canonical: `/equipment/category/${category.slug}` },
    openGraph: {
      title: `${category.name} | Regenis Life`,
      description: category.blurb,
      url: `${BUSINESS_URL}/equipment/category/${category.slug}`,
      type: "website",
      images: (() => {
        const first = equipmentInCategory(slug)[0];
        return first ? [{ url: first.image, alt: first.name }] : undefined;
      })(),
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const items = equipmentInCategory(slug);
  const pageUrl = `${BUSINESS_URL}/equipment/category/${category.slug}`;

  const webPageSchema = generateWebPageSchema({
    name: `${category.name} | Regenis Life`,
    url: pageUrl,
    description: category.blurb,
    pageType: "CollectionPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    dateModified: SEO_LAST_MODIFIED,
    mainEntity: { "@id": `${pageUrl}#equipment-list` },
    about: { "@type": "Thing", name: category.name },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: `${BUSINESS_URL}/equipment` },
    { label: "All Equipment", url: `${BUSINESS_URL}/equipment/all` },
    { label: category.name, url: pageUrl },
  ]);
  const itemListSchema = generateItemListSchema(
    `${category.name} — Regenis Life`,
    items.map((eq) => ({
      name: eq.name,
      url: `${BUSINESS_URL}/equipment/${eq.id}`,
      description: eq.description,
      image: `${BUSINESS_URL}${eq.image}`,
      itemType: "MedicalDevice",
      brand: eq.partner,
      manufacturer: eq.manufacturer || eq.partner,
      category: eq.category,
    })),
    `${pageUrl}#equipment-list`
  );

  return (
    <main>
      <SchemaScript
        id="category-schema"
        schema={[webPageSchema, breadcrumbSchema, itemListSchema]}
      />

      <Section space="lg" contained={false} className="pt-[clamp(120px,15vw,180px)]">
        <Container>
          <Link
            href="/equipment/all"
            className="mb-10 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-ink-faint transition-colors hover:text-primary"
          >
            <ChevronLeft size={16} />
            All equipment
          </Link>
          <Eyebrow tone="primary" className="mb-6">
            Equipment category
          </Eyebrow>
          <SectionHeading as="h1" size="lg" className="max-w-[900px]">
            {category.name}
          </SectionHeading>
          <p className="mt-7 max-w-[680px] text-[15px] font-light leading-[1.8] text-ink-muted">
            {category.intro}
          </p>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            {items.length} {items.length === 1 ? "device" : "devices"}
          </p>
        </Container>
      </Section>

      <div className="border-t border-line">
        <PartnerSection equipments={items} mode="category" />
      </div>

      <Section divide className="text-center">
        <SectionHeading size="sm" className="mx-auto mb-6 max-w-[560px]">
          Explore the other categories.
        </SectionHeading>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
            <Link
              key={c.slug}
              href={`/equipment/category/${c.slug}`}
              className="text-[13px] font-semibold text-ink-muted underline underline-offset-4 transition-colors hover:text-primary"
            >
              {c.shortName}
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
