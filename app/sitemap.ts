import type { MetadataRoute } from "next";
import { BUSINESS_URL } from "@/lib/business-config";
import { visibleEquipment } from "./data/equipment";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BUSINESS_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BUSINESS_URL}/equipment`, changeFrequency: "weekly", priority: 1 },
    { url: `${BUSINESS_URL}/equipment/all`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const equipmentRoutes: MetadataRoute.Sitemap = visibleEquipment.map((eq) => ({
    url: `${BUSINESS_URL}/equipment/${eq.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...equipmentRoutes];
}
