import { visibleEquipment } from "../data/equipment";
import { CATEGORIES } from "../data/categories";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_URL,
} from "@/lib/business-config";
import { fetchBlogPosts } from "@/lib/blog";
import { parseManufacturerInfo } from "@/lib/schema";

export const dynamic = "force-static";
export const revalidate = 3600;

function sanitizeInlineText(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const blog = await fetchBlogPosts({ page: 1, limit: 100 });
  const productEntries = visibleEquipment
    .map((equipment) => {
      const description = sanitizeInlineText(
        equipment.fullDescription || equipment.description
      );
      const image = equipment.image.startsWith("http")
        ? equipment.image
        : `${BUSINESS_URL}${equipment.image}`;
      const { manufacturerName, countryOfOrigin } = parseManufacturerInfo(
        equipment.manufacturer,
        equipment.partner
      );
      const cleanManufacturer = countryOfOrigin
        ? `${manufacturerName} (${countryOfOrigin})`
        : manufacturerName || equipment.partner;

      const lines = [
        `### ${equipment.name}`,
        `- Partner: ${equipment.partner}`,
        `- Manufacturer: ${cleanManufacturer}`,
        `- Category: ${equipment.category || "Clinical and wellness equipment"}`,
      ];

      if (equipment.alternateOption) {
        lines.push(`- Benchmark alternate: ${equipment.alternateOption}`);
      }

      lines.push(`- Description: ${description}`);

      if (equipment.specifications?.length) {
        const specs = equipment.specifications
          .map((spec) => `${spec.label}: ${spec.value}`)
          .join("; ");
        lines.push(`- Specifications: ${specs}`);
      }

      if (equipment.features?.length) {
        lines.push(`- Key features: ${equipment.features.join("; ")}`);
      }

      lines.push(`- Product page: ${BUSINESS_URL}/equipment/${equipment.id}`);
      lines.push(`- Image: ${image}`);

      return lines.join("\n");
    })
    .join("\n\n");

  const content = [
    `# ${BUSINESS_NAME}`,
    "> Regenis Life provides curated clinical, diagnostics, recovery, and wellness equipment from global manufacturers for professional clinical, rehabilitation, aesthetic, recovery, diagnostics, and innovation facilities in India.",
    "",
    "## Organization & contact",
    `- Primary market: India`,
    `- Email: ${BUSINESS_EMAIL[0]}`,
    ...(BUSINESS_PHONE[0] ? [`- Phone / WhatsApp: ${BUSINESS_PHONE[0]}`] : []),
    `- Website: ${BUSINESS_URL}`,
    "",
    "## Primary pages",
    `- Home: ${BUSINESS_URL}`,
    `- Equipment showcase: ${BUSINESS_URL}/equipment`,
    `- Full equipment catalog: ${BUSINESS_URL}/equipment/all`,
    `- About: ${BUSINESS_URL}/about`,
    `- Contact: ${BUSINESS_URL}/contact`,
    `- Insights: ${BUSINESS_URL}/blog`,
    `- Privacy policy: ${BUSINESS_URL}/privacy`,
    `- Terms of use: ${BUSINESS_URL}/terms`,
    `- Medical and product disclaimer: ${BUSINESS_URL}/disclaimer`,
    `- Enquiries: mailto:${BUSINESS_EMAIL[0]}`,
    "",
    "## Categories",
    ...CATEGORIES.map(
      (c) => `- ${c.name}: ${BUSINESS_URL}/equipment/category/${c.slug} — ${c.blurb}`
    ),
    ...(blog.data.length
      ? [
          "",
          "## Latest insights",
          ...blog.data.map((post) => {
            const title = sanitizeInlineText(post.title);
            const excerpt = sanitizeInlineText(post.excerpt || post.metaDescription || "");
            return `- ${title}: ${BUSINESS_URL}/blog/${post.slug}${excerpt ? ` — ${excerpt}` : ""}`;
          }),
        ]
      : []),
    "",
    "## Equipment catalog",
    "The following product names, manufacturers, specifications, features, descriptions, images, and URLs are the authoritative catalog content published by Regenis Life:",
    "",
    productEntries,
    "",
    "## Content guidance",
    "Product availability, regulatory status, indications, installation requirements, specifications, and pricing should be confirmed with Regenis Life and the relevant manufacturer before procurement or clinical use.",
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
