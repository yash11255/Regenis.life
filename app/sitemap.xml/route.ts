import { BUSINESS_URL } from "@/lib/business-config";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { visibleEquipment } from "../data/equipment";

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

function equipmentUrlXml(id: string, image: string) {
  return `<url>
  <loc>${BUSINESS_URL}/equipment/${id}</loc>
  <lastmod>${SEO_LAST_MODIFIED}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  ${imageXml(image)}
</url>`;
}

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const staticUrls = `<url>
  <loc>${BUSINESS_URL}</loc>
  <lastmod>${SEO_LAST_MODIFIED}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
  ${imageXml("/Regenis.png")}
</url>
<url>
  <loc>${BUSINESS_URL}/equipment</loc>
  <lastmod>${SEO_LAST_MODIFIED}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
  <video:video>
    <video:thumbnail_loc>https://i.ytimg.com/vi/${HERO_VIDEO_ID}/maxresdefault.jpg</video:thumbnail_loc>
    <video:title>Regenis Life Clinical Equipment Showcase</video:title>
    <video:description>Regenis Life presents medical, wellness, rehabilitation, recovery, diagnostics, and clinical equipment for professional facilities.</video:description>
    <video:player_loc>https://www.youtube.com/embed/${HERO_VIDEO_ID}</video:player_loc>
    <video:publication_date>${SEO_LAST_MODIFIED}T00:00:00+00:00</video:publication_date>
    <video:family_friendly>yes</video:family_friendly>
  </video:video>
</url>
<url>
  <loc>${BUSINESS_URL}/equipment/all</loc>
  <lastmod>${SEO_LAST_MODIFIED}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>`;

  const productUrls = visibleEquipment
    .map((equipment) => equipmentUrlXml(equipment.id, equipment.image))
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticUrls}
${productUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": XML_CONTENT_TYPE,
    },
  });
}
