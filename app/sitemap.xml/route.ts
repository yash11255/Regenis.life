import { BUSINESS_URL } from "@/lib/business-config";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { visibleEquipment } from "../data/equipment";
import { CATEGORIES } from "../data/categories";

const HERO_VIDEO_ID = "9uoYBcnOF2c";
const XML_CONTENT_TYPE = "application/xml; charset=utf-8";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absoluteUrl(value: string) {
  return value.startsWith("http") ? value : `${BUSINESS_URL}${value}`;
}

function imageXml(image: string) {
  return `<image:image><image:loc>${escapeXml(absoluteUrl(image))}</image:loc></image:image>`;
}

function urlXml(
  loc: string,
  opts: { changefreq?: string; priority?: string; extra?: string; lastmod?: string } = {}
) {
  const {
    changefreq = "monthly",
    priority = "0.6",
    extra = "",
    lastmod = SEO_LAST_MODIFIED,
  } = opts;
  return `<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
  ${extra}
</url>`;
}

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const staticUrls = [
    urlXml(BUSINESS_URL, {
      changefreq: "weekly",
      priority: "1.0",
      extra: imageXml("/Regenis.png"),
    }),
    urlXml(`${BUSINESS_URL}/equipment`, {
      changefreq: "weekly",
      priority: "0.9",
      extra: `<video:video>
    <video:thumbnail_loc>https://i.ytimg.com/vi/${HERO_VIDEO_ID}/maxresdefault.jpg</video:thumbnail_loc>
    <video:title>Regenis Life Clinical Equipment Showcase</video:title>
    <video:description>Regenis Life presents medical, wellness, rehabilitation, recovery, diagnostics, and clinical equipment for professional facilities.</video:description>
    <video:player_loc>https://www.youtube.com/embed/${HERO_VIDEO_ID}</video:player_loc>
    <video:publication_date>${SEO_LAST_MODIFIED}</video:publication_date>
    <video:family_friendly>yes</video:family_friendly>
  </video:video>`,
    }),
    urlXml(`${BUSINESS_URL}/equipment/all`, { changefreq: "weekly", priority: "0.8" }),
    urlXml(`${BUSINESS_URL}/about`, { changefreq: "monthly", priority: "0.6" }),
    urlXml(`${BUSINESS_URL}/contact`, { changefreq: "monthly", priority: "0.6" }),
    urlXml(`${BUSINESS_URL}/privacy`, {
      changefreq: "yearly",
      priority: "0.3",
      lastmod: "2026-09-30T00:00:00+05:30",
    }),
    urlXml(`${BUSINESS_URL}/terms`, {
      changefreq: "yearly",
      priority: "0.3",
      lastmod: "2026-09-30T00:00:00+05:30",
    }),
    urlXml(`${BUSINESS_URL}/disclaimer`, {
      changefreq: "yearly",
      priority: "0.3",
      lastmod: "2026-09-30T00:00:00+05:30",
    }),
  ].join("\n");

  const categoryUrls = CATEGORIES.map((c) =>
    urlXml(`${BUSINESS_URL}/equipment/category/${c.slug}`, {
      changefreq: "weekly",
      priority: "0.8",
    })
  ).join("\n");

  const productUrls = visibleEquipment
    .map((equipment) =>
      urlXml(`${BUSINESS_URL}/equipment/${equipment.id}`, {
        changefreq: "monthly",
        priority: "0.7",
        extra: imageXml(equipment.image),
      })
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticUrls}
${categoryUrls}
${productUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": XML_CONTENT_TYPE,
    },
  });
}
