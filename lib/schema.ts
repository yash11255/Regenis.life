/**
 * SEO Schema Generation Library
 * Provides TypeScript-safe schema generators for JSON-LD markup
 * Usage: Use these functions to generate schema for meta tags via SchemaScript
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
}

export interface ContactPoint {
  "@type": "ContactPoint";
  telephone?: string;
  contactType: "Customer Service" | "Support" | "Emergency Support" | "Sales" | "sales";
  email?: string;
  areaServed?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LDJsonSchema {
  "@context": "https://schema.org";
  "@type": string | string[];
  [key: string]: unknown;
}

// ============================================================================
// EQUIPMENT CLASSIFICATION & MANUFACTURER PARSING HELPERS
// ============================================================================

/**
 * Non-clinical portfolio items that should use Product + WebPage
 * rather than MedicalDevice + MedicalWebPage:
 * - "16": Silverfox Derma Chair (motorized aesthetic treatment chair / furniture)
 * - "24": Unitree G1 EDU U8 Robot + Nvidia AGX Thor System (R&D humanoid robotics)
 */
const NON_CLINICAL_EQUIPMENT_IDS = new Set(["16", "24"]);

export function isNonClinicalEquipment(id: string): boolean {
  return NON_CLINICAL_EQUIPMENT_IDS.has(id);
}

const COUNTRY_PATTERNS: Array<[RegExp, string]> = [
  [/\bTurkey\b/i, "Turkey"],
  [/\bSpain\b/i, "Spain"],
  [/\bBulgaria\b/i, "Bulgaria"],
  [/\bSouth Korea\b/i, "South Korea"],
  [/\bGermany\b/i, "Germany"],
  [/\bAustralia\b/i, "Australia"],
  [/\b(?:UAE|United Arab Emirates)\b/i, "United Arab Emirates"],
  [/\bItaly\b/i, "Italy"],
  [/\b(?:USA|United States)\b/i, "United States"],
  [/\b(?:UK|United Kingdom)\b/i, "United Kingdom"],
  [/\bSwitzerland\b/i, "Switzerland"],
  [/\bChina\b/i, "China"],
  [/\bIsrael\b/i, "Israel"],
  [/\bFinland\b/i, "Finland"],
  [/\bFrance\b/i, "France"],
];

export function parseManufacturerInfo(
  rawManufacturer?: string,
  fallbackPartner?: string
): { manufacturerName: string; countryOfOrigin?: string } {
  const raw = (rawManufacturer || fallbackPartner || "").trim();
  if (!raw) return { manufacturerName: "" };

  const primarySegment = raw.split(/\s*\/\s*/)[0].trim();
  const dashParts = primarySegment.split(/\s*[—–-]\s+/);
  let manufacturerName = dashParts[0].trim();
  let locationText = dashParts.slice(1).join(", ").trim();

  const parenMatch = manufacturerName.match(/^(.+?)\s*\(([^)]+)\)$/);
  if (parenMatch) {
    manufacturerName = parenMatch[1].trim();
    locationText = [locationText, parenMatch[2].trim()].filter(Boolean).join(", ");
  }

  let countryOfOrigin: string | undefined;
  if (locationText) {
    for (const [pattern, country] of COUNTRY_PATTERNS) {
      if (pattern.test(locationText)) {
        countryOfOrigin = country;
        break;
      }
    }
  }

  return {
    manufacturerName: manufacturerName || fallbackPartner?.trim() || raw,
    ...(countryOfOrigin ? { countryOfOrigin } : {}),
  };
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
    address: params.address || {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  if (params.sameAs.length) schema.sameAs = params.sameAs;
  if (params.telephone.length) schema.telephone = params.telephone[0];
  if (params.email.length) schema.email = params.email[0];
  if (params.telephone.length || params.email.length) {
    schema.contactPoint = [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        areaServed: "IN",
        ...(params.telephone.length ? { telephone: params.telephone[0] } : {}),
        ...(params.email.length ? { email: params.email[0] } : {}),
      },
    ];
  }
  if (params.knowsAbout?.length) schema.knowsAbout = params.knowsAbout;

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
  inLanguage?: string;
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
    ...(params.inLanguage ? { inLanguage: params.inLanguage } : {}),
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
  itemId?: string;
  description?: string;
  image?: string;
  itemType?: string | string[];
  brand?: string;
  manufacturer?: string;
  countryOfOrigin?: string;
  category?: string;
}

export function buildEquipmentItemListEntry(
  eq: {
    id: string;
    name: string;
    description: string;
    image: string;
    partner: string;
    manufacturer?: string;
    category?: string;
  },
  baseUrl: string
): ItemListEntry {
  const nonClinical = isNonClinicalEquipment(eq.id);
  const url = `${baseUrl}/equipment/${eq.id}`;
  const { manufacturerName, countryOfOrigin } = parseManufacturerInfo(
    eq.manufacturer,
    eq.partner
  );
  const image = eq.image.startsWith("http") ? eq.image : `${baseUrl}${eq.image}`;

  return {
    name: eq.name,
    url,
    itemId: `${url}#${nonClinical ? "product" : "medical-device"}`,
    description: eq.description,
    image,
    itemType: nonClinical ? "Product" : ["Product", "MedicalDevice"],
    brand: eq.partner,
    manufacturer: manufacturerName || eq.partner,
    ...(countryOfOrigin ? { countryOfOrigin } : {}),
    category: eq.category,
  };
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
        "@id": item.itemId || item.url,
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
        ...(item.countryOfOrigin
          ? { countryOfOrigin: { "@type": "Country", name: item.countryOfOrigin } }
          : {}),
        ...(item.category ? { category: item.category } : {}),
      },
    })),
  };
}

// ============================================================================
// PRODUCT / MEDICAL DEVICE SCHEMA
// ============================================================================

export interface MedicalDeviceSchemaParams {
  id?: string;
  name: string;
  description: string;
  url: string;
  image: string[];
  manufacturer: string;
  brand: string;
  category?: string;
  additionalProperty?: { label: string; value: string }[];
  relatedDeviceName?: string;
  isClinical?: boolean;
}

export function generateMedicalDeviceSchema(
  params: MedicalDeviceSchemaParams
): LDJsonSchema {
  const isClinical =
    params.isClinical ?? (params.id ? !isNonClinicalEquipment(params.id) : true);
  const { manufacturerName, countryOfOrigin } = parseManufacturerInfo(
    params.manufacturer,
    params.brand
  );
  const fragment = isClinical ? "medical-device" : "product";

  const schema: LDJsonSchema = {
    "@context": "https://schema.org",
    "@type": isClinical ? ["Product", "MedicalDevice"] : "Product",
    "@id": `${params.url}#${fragment}`,
    name: params.name,
    description: params.description,
    url: params.url,
    image: params.image,
    mainEntityOfPage: { "@id": `${params.url}#webpage` },
    manufacturer: {
      "@type": "Organization",
      name: manufacturerName || params.brand,
    },
    brand: {
      "@type": "Brand",
      name: params.brand,
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
      "@type": isClinical ? ["Product", "MedicalDevice"] : "Product",
      name: params.relatedDeviceName,
    };
  }
  if (countryOfOrigin) {
    schema.countryOfOrigin = {
      "@type": "Country",
      name: countryOfOrigin,
    };
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
// SITE NAVIGATION ELEMENT SCHEMA
// ============================================================================

export interface NavigationItem {
  name: string;
  url: string;
}

export function generateSiteNavigationSchema(
  items: NavigationItem[],
  siteUrl: string
): LDJsonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${siteUrl}/#site-navigation`,
    name: "Main Navigation",
    hasPart: items.map((item) => ({
      "@type": "WebPage",
      name: item.name,
      url: item.url,
    })),
  };
}

// ============================================================================
// HELPER UTILITIES
// ============================================================================

/**
 * Safely serialize schema to JSON string and escape `<` to prevent script-tag breakouts
 */
export function serializeSchema(schema: LDJsonSchema | Record<string, unknown>): string {
  try {
    return JSON.stringify(schema).replace(/</g, "\\u003c");
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
