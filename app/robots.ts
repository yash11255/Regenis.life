import type { MetadataRoute } from "next";
import { BUSINESS_URL } from "@/lib/business-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    host: "https://regenis.life",
    sitemap: `${BUSINESS_URL}/sitemap.xml`,
  };
}
