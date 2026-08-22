import { visibleEquipment } from "../data/equipment";
import { BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";

export const dynamic = "force-static";

export function GET() {
  const productEntries = visibleEquipment
    .map((equipment) => {
      const description = equipment.fullDescription || equipment.description;
      const image = equipment.image.startsWith("http")
        ? equipment.image
        : `${BUSINESS_URL}${equipment.image}`;

      return [
        `### ${equipment.name}`,
        `- Partner: ${equipment.partner}`,
        `- Category: ${equipment.category || "Medical and wellness equipment"}`,
        `- Description: ${description}`,
        `- Product page: ${BUSINESS_URL}/equipment/${equipment.id}`,
        `- Image: ${image}`,
      ].join("\n");
    })
    .join("\n\n");

  const content = [
    `# ${BUSINESS_NAME}`,
    "> Regenis Life curates medical and wellness equipment for professional clinical, rehabilitation, aesthetic, recovery, diagnostics, and innovation facilities.",
    "",
    "## Primary pages",
    `- Equipment showcase: ${BUSINESS_URL}/equipment`,
    `- Full equipment catalog: ${BUSINESS_URL}/equipment/all`,
    `- Enquiries: mailto:${BUSINESS_EMAIL[0]}`,
    "",
    "## Equipment catalog",
    "The following product names, descriptions, images, and URLs are the authoritative catalog content published by Regenis Life:",
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
