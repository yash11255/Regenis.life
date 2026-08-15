import type { MetadataRoute } from "next";
import { BUSINESS_URL } from "@/lib/business-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BUSINESS_URL}/sitemap.xml`,
  };
}
