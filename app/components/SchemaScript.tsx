/**
 * Reusable Schema Component
 * Used to inject JSON-LD markup directly into server-rendered HTML
 */
import type { ReactElement } from "react";
import { LDJsonSchema, serializeSchema } from "@/lib/schema";

interface SchemaScriptProps {
  /**
   * Single schema or array of schemas to render
   */
  schema: LDJsonSchema | LDJsonSchema[];
  /**
   * Optional ID for debugging/identification
   */
  id?: string;
}

/**
 * Renders JSON-LD schema markup using a plain <script> tag
 * Supports single or multiple schemas
 * @example
 * <SchemaScript schema={organizationSchema} id="org-schema" />
 * <SchemaScript schema={[faqSchema, breadcrumbSchema]} />
 */
export function SchemaScript({ schema, id }: SchemaScriptProps): ReactElement {
  // Normalize to array for consistent handling
  const schemas = Array.isArray(schema) ? schema : [schema];

  // Validate schemas
  const validSchemas = schemas.filter((s) => {
    if (typeof s !== "object" || s === null) {
      console.warn("Invalid schema structure:", s);
      return false;
    }
    return true;
  });

  if (validSchemas.length === 0) {
    console.warn("SchemaScript: No valid schemas provided");
    return <></>;
  }

  // If multiple schemas, wrap in array with @graph
  const jsonLd: Record<string, unknown> =
    validSchemas.length === 1
      ? (validSchemas[0] as Record<string, unknown>)
      : {
          "@context": "https://schema.org",
          "@graph": validSchemas,
        };

  const jsonString = serializeSchema(jsonLd as LDJsonSchema);

  return (
    <script
      id={id || "seo-schema"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonString,
      }}
    />
  );
}
