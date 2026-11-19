import type { Metadata } from "next";
import { BUSINESS_GEO, BUSINESS_NAME, BUSINESS_URL } from "./business-config";

export const DEFAULT_OG_IMAGE = {
  url: "/Regenis.png",
  width: 2062,
  height: 763,
  alt: BUSINESS_NAME,
} as const;

export interface PageMetadataImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface BuildPageMetadataOptions {
  title: string;
  absoluteTitle?: boolean;
  ogTitle?: string;
  description: string;
  canonicalPath?: string;
  images?: PageMetadataImage[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  articleAuthors?: string[];
  tags?: string[];
  keywords?: string[];
  authors?: Metadata["authors"];
  robots?: Metadata["robots"];
}

export function buildPageMetadata({
  title,
  absoluteTitle = false,
  ogTitle,
  description,
  canonicalPath,
  images,
  type = "website",
  publishedTime,
  modifiedTime,
  articleAuthors,
  tags,
  keywords,
  authors,
  robots,
}: BuildPageMetadataOptions): Metadata {
  const hasBrand = /regenis\s+life/i.test(title);
  const useAbsolute = absoluteTitle || hasBrand;
  const resolvedOgTitle =
    ogTitle || (hasBrand ? title : `${title} | ${BUSINESS_NAME}`);

  const resolvedImages: PageMetadataImage[] =
    images && images.length > 0 ? images : [{ ...DEFAULT_OG_IMAGE }];

  const canonicalUrl = canonicalPath
    ? canonicalPath === "/"
      ? BUSINESS_URL
      : `${BUSINESS_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`
    : undefined;

  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    ...(authors ? { authors } : {}),
    ...(robots ? { robots } : {}),
    ...(canonicalPath ? { alternates: { canonical: canonicalPath } } : {}),
    openGraph: {
      title: resolvedOgTitle,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      siteName: BUSINESS_NAME,
      locale: BUSINESS_GEO.locale,
      type,
      images: resolvedImages.map((img) => ({
        url: img.url,
        ...(img.width ? { width: img.width } : {}),
        ...(img.height ? { height: img.height } : {}),
        alt: img.alt || BUSINESS_NAME,
      })),
      ...(type === "article"
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(articleAuthors?.length ? { authors: articleAuthors } : {}),
            ...(tags?.length ? { tags } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description,
      creator: "@RegenisLife",
      images: resolvedImages.map((img) => img.url),
    },
  };
}
