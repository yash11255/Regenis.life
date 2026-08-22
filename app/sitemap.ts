import type { MetadataRoute } from "next";
import { BUSINESS_URL } from "@/lib/business-config";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { visibleEquipment } from "./data/equipment";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BUSINESS_URL}/equipment`, lastModified: SEO_LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    { url: `${BUSINESS_URL}/equipment/all`, lastModified: SEO_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
  ];

  const equipmentRoutes: MetadataRoute.Sitemap = visibleEquipment.map((eq) => ({
    url: `${BUSINESS_URL}/equipment/${eq.id}`,
    images: [eq.image.startsWith("http") ? eq.image : `${BUSINESS_URL}${eq.image}`],
    lastModified: SEO_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...equipmentRoutes];
}
