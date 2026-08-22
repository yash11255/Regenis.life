/**
 * SEO Schema Generation Library
 * Provides TypeScript-safe schema generators for JSON-LD markup
 * Usage: Use these functions to generate schema for meta tags via next/script
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

export interface ContactPoint {
  "@type": "ContactPoint";
  telephone: string;
  contactType: "Customer Service" | "Support" | "Emergency Support" | "Sales";
  email?: string;
  areaServed?: string;
}

export interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface MedicalService {
  "@type": "MedicalBusiness" | "Thing";
  name: string;
  description?: string;
  url?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LDJsonSchema {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

// ============================================================================
// ORGANIZATION SCHEMA
// ============================================================================

export interface OrganizationSchemaParams {
  name: string;
  url: string;
  logo: string;
  image: string;
  description: string;
  address?: PostalAddress;
  telephone: string[];
  email: string[];
  sameAs: string[];
  knowsAbout?: string[];
}

export function generateOrganizationSchema(
  params: OrganizationSchemaParams
): LDJsonSchema {
  const schema: LDJsonSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${params.url}/#organization`,
    name: params.name,
    url: params.url,
    logo: {
      "@type": "ImageObject",
      url: params.logo,
    },
    image: {
      "@type": "ImageObject",
      url: params.image,
    },
    description: params.description,
  };

  if (params.sameAs.length) schema.sameAs = params.sameAs;
  if (params.telephone.length) schema.telephone = params.telephone[0];
  if (params.email.length) schema.email = params.email[0];
  if (params.telephone.length || params.email.length) {
    schema.contactPoint = [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        ...(params.telephone.length ? { telephone: params.telephone[0] } : {}),
        ...(params.email.length ? { email: params.email[0] } : {}),
      },
    ];
  }
  if (params.knowsAbout?.length) schema.knowsAbout = params.knowsAbout;

  return schema;
}

// ============================================================================
// MEDICAL BUSINESS / LOCAL BUSINESS SCHEMA
// ============================================================================

export interface MedicalBusinessSchemaParams {
  name: string;
  url: string;
  logo: string;
  image: string;
  description: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  telephone: string[];
  email: string[];
  contactPoints: ContactPoint[];
  openingHours: OpeningHoursSpecification[];
  areaServed: string[];
  services: MedicalService[];
  priceRange?: string;
  rating?: {
    ratingValue: number;
    reviewCount: number;
  };
  sameAs?: string[];
}

export function generateMedicalBusinessSchema(
  params: MedicalBusinessSchemaParams
): LDJsonSchema {
  const schema: LDJsonSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: params.name,
    url: params.url,
    logo: {
      "@type": "ImageObject",
      url: params.logo,
      width: 200,
      height: 200,
    },
    image: {
      "@type": "ImageObject",
      url: params.image,
      width: 1200,
      height: 628,
    },
    description: params.description,
    address: params.address,
    geo: params.geo,
    telephone: params.telephone,
    email: params.email,
    contactPoint: params.contactPoints,
    openingHoursSpecification: params.openingHours,
    areaServed: params.areaServed,
    availableService: params.services,
  };

  if (params.priceRange) {
    schema.priceRange = params.priceRange;
  }

  if (params.rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: params.rating.ratingValue,
      reviewCount: params.rating.reviewCount,
    };
  }

  if (params.sameAs?.length) {
    schema.sameAs = params.sameAs;
  }

  return schema;
}

// ============================================================================
// FAQ SCHEMA (Page-Level Only)
// ============================================================================

export interface FAQQuestionAnswer {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export function generateFAQSchema(faqs: FAQItem[]): LDJsonSchema {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    console.warn("generateFAQSchema: faqs array is empty or invalid");
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    };
  }

  const mainEntity: FAQQuestionAnswer[] = faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

// ============================================================================
// BREADCRUMB SCHEMA (Utility for structured navigation)
// ============================================================================

export interface BreadcrumbItem {
  label: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): LDJsonSchema {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: item.url,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

// ============================================================================
// WEB / COLLECTION / DISCOVERY SCHEMAS
// ============================================================================

export interface WebSiteSchemaParams {
  name: string;
  url: string;
  searchUrl?: string;
}

export function generateWebSiteSchema(params: WebSiteSchemaParams): LDJsonSchema {
  const schema: LDJsonSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${params.url}/#website`,
    name: params.name,
    url: params.url,
    publisher: {
      "@id": `${params.url}/#organization`,
    },
  };

  if (params.searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: params.searchUrl,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

export interface WebPageSchemaParams {
  name: string;
  url: string;
  description: string;
  pageType?: "WebPage" | "MedicalWebPage" | "CollectionPage" | "ContactPage" | "AboutPage";
  isPartOf?: {
    name: string;
    url: string;
  };
  about?: unknown;
  mainEntity?: unknown;
  dateModified?: string;
  inLanguage?: string;
  speakable?: string[];
}

export function generateWebPageSchema(params: WebPageSchemaParams): LDJsonSchema {
  const schema: LDJsonSchema = {
    "@context": "https://schema.org",
    "@type": params.pageType || "WebPage",
    "@id": `${params.url}#webpage`,
    name: params.name,
    url: params.url,
    description: params.description,
    inLanguage: params.inLanguage || "en-IN",
    ...(params.dateModified ? { dateModified: params.dateModified } : {}),
  };

  if (params.isPartOf) {
    schema.isPartOf = {
      "@type": "WebSite",
      "@id": `${params.isPartOf.url}/#website`,
      name: params.isPartOf.name,
      url: params.isPartOf.url,
    };
  }

  if (params.about) {
    schema.about = params.about;
  }

  if (params.mainEntity) {
    schema.mainEntity = params.mainEntity;
  }

  if (params.speakable?.length) {
    schema.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: params.speakable,
    };
  }

  return schema;
}

export interface ItemListEntry {
  name: string;
  url: string;
  description?: string;
  image?: string;
  itemType?: string | string[];
  brand?: string;
  manufacturer?: string;
  category?: string;
}

export function generateItemListSchema(
  name: string,
  items: ItemListEntry[],
  id?: string
): LDJsonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(id ? { "@id": id } : {}),
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      item: {
        "@type": item.itemType || "Thing",
        "@id": item.url,
        name: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
        ...(item.image ? { image: item.image } : {}),
        ...(item.brand
          ? { brand: { "@type": "Brand", name: item.brand } }
          : {}),
        ...(item.manufacturer
          ? { manufacturer: { "@type": "Organization", name: item.manufacturer } }
          : {}),
        ...(item.category ? { category: item.category } : {}),
      },
    })),
  };
}

// ============================================================================
// MEDICAL DEVICE SCHEMA
// ============================================================================

export interface MedicalDeviceSchemaParams {
  name: string;
  description: string;
  url: string;
  image: string[];
  manufacturer: string;
  brand: string;
  seller: { name: string; url: string };
  category?: string;
  additionalProperty?: { label: string; value: string }[];
  relatedDeviceName?: string;
}

export interface ProductSchemaParams {
  name: string;
  description: string;
  url: string;
  image: string[];
  manufacturer: string;
  brand: string;
  seller: { name: string; url: string };
  category?: string;
  additionalProperty?: { label: string; value: string }[];
  relatedDeviceUrl?: string;
}

export function generateMedicalDeviceSchema(
  params: MedicalDeviceSchemaParams
): LDJsonSchema {
  const schema: LDJsonSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalDevice",
    "@id": `${params.url}#medical-device`,
    name: params.name,
    description: params.description,
    url: params.url,
    image: params.image,
    mainEntityOfPage: { "@id": `${params.url}#webpage` },
    manufacturer: {
      "@type": "Organization",
      name: params.manufacturer,
    },
    brand: {
      "@type": "Brand",
      name: params.brand,
    },
    seller: {
      "@type": "Organization",
      name: params.seller.name,
      url: params.seller.url,
    },
  };

  if (params.category) schema.category = params.category;
  if (params.additionalProperty?.length) {
    schema.additionalProperty = params.additionalProperty.map((property) => ({
      "@type": "PropertyValue",
      name: property.label,
      value: property.value,
    }));
  }
  if (params.relatedDeviceName) {
    schema.isRelatedTo = {
      "@type": "MedicalDevice",
      name: params.relatedDeviceName,
    };
  }

  return schema;
}

export function generateProductSchema(params: ProductSchemaParams): LDJsonSchema {
  const schema: LDJsonSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${params.url}#product`,
    name: params.name,
    description: params.description,
    url: params.url,
    image: params.image,
    mainEntityOfPage: { "@id": `${params.url}#webpage` },
    brand: {
      "@type": "Brand",
      name: params.brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: params.manufacturer,
    },
    seller: {
      "@type": "Organization",
      name: params.seller.name,
      url: params.seller.url,
    },
  };

  if (params.category) schema.category = params.category;
  if (params.additionalProperty?.length) {
    schema.additionalProperty = params.additionalProperty.map((property) => ({
      "@type": "PropertyValue",
      name: property.label,
      value: property.value,
    }));
  }
  if (params.relatedDeviceUrl) {
    schema.isRelatedTo = { "@id": params.relatedDeviceUrl };
  }

  return schema;
}

export function generateOfferCatalogSchema(
  name: string,
  items: ItemListEntry[]
): LDJsonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name,
    itemListElement: items.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  };
}

// ============================================================================
// HELPER UTILITIES
// ============================================================================

/**
 * Safely serialize schema to JSON string
 * Handles circular references and undefined values
 */
export function serializeSchema(schema: LDJsonSchema): string {
  try {
    return JSON.stringify(schema);
  } catch (error) {
    console.error("Schema serialization error:", error);
    return "{}";
  }
}

/**
 * Validate schema structure (basic check)
 */
export function isValidSchema(schema: unknown): schema is LDJsonSchema {
  return (
    typeof schema === "object" &&
    schema !== null &&
    "@context" in schema &&
    "@type" in schema
  );
}
