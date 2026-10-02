import "server-only";
import { BUSINESS_IMAGE, BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import type { LDJsonSchema } from "@/lib/schema";

const BACKEND_BASE_URL =
  process.env.BLOG_API_BASE_URL || "https://seo-blog-backend-seven.vercel.app";
const SITE_ID = "regenis.life";

export const BLOG_REVALIDATE_SECONDS = 60;
export const BLOG_POSTS_PER_PAGE = 9;
export const BLOG_NAME = "Regenis Life Insights";
export const BLOG_DESCRIPTION =
  "Equipment planning insights for clinical, rehabilitation, aesthetic, recovery, diagnostics, performance, and wellness facilities.";

export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  status?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[] | string;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  coverImage?: string;
  image?: string;
  featuredImage?: string;
  content?: string;
  body?: string;
  html?: string;
  text?: string;
  faq?: Array<{ question?: string; q?: string; answer?: string; a?: string }>;
  faqs?: Array<{ question?: string; q?: string; answer?: string; a?: string }>;
}

interface BlogListResponse {
  success: boolean;
  data: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
  status: number;
}

const cleanText = (value = "") =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/gi, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const stripSeoMetadataArtifacts = (html = "") => {
  if (!html) return "";

  const labels = [
    "meta\\s*title",
    "meta\\s*description",
    "seo\\s*title",
    "seo\\s*description",
    "focus\\s*keyword",
    "focus\\s*keywords",
    "keywords",
    "slug",
    "canonical\\s*url",
  ].join("|");

  const htmlLine = new RegExp(
    `<(?:p|div|li)[^>]*>\\s*(?:<strong>|<b>)?\\s*(?:${labels})\\s*:?\\s*(?:<\\/strong>|<\\/b>)?[\\s\\S]*?<\\/(?:p|div|li)>`,
    "gi"
  );
  const markdownLine = new RegExp(`^\\s*(?:\\*\\*)?(?:${labels})\\s*:?\\s*.*$`, "gim");

  return html.replace(htmlLine, "").replace(markdownLine, "").trim();
};

const buildApiUrl = (
  path: string,
  params: Record<string, string | number | undefined> = {}
) => {
  const url = new URL(path, `${BACKEND_BASE_URL.replace(/\/$/, "")}/`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  });
  return url.toString();
};

const fetchApi = async (
  path: string,
  params: Record<string, string | number | undefined> = {}
) => {
  try {
    const response = await fetch(buildApiUrl(path, params), {
      next: { revalidate: BLOG_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return { success: false, data: null, totalPages: 0, status: response.status };
    }

    const payload = await response.json();
    return { ...payload, status: response.status };
  } catch (error) {
    return {
      success: false,
      data: null,
      totalPages: 0,
      status: 0,
      error: error instanceof Error ? error.message : "Unknown fetch error",
    };
  }
};

export const fetchBlogPosts = async ({
  page = 1,
  limit = BLOG_POSTS_PER_PAGE,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<BlogListResponse> => {
  const response = await fetchApi("/api/posts", { siteId: SITE_ID, page, limit });

  return {
    success: Boolean(response?.success),
    data: Array.isArray(response?.data) ? response.data : [],
    totalPages: Number(response?.totalPages || 0),
    currentPage: Number(response?.page || response?.currentPage || page),
    totalPosts: Number(response?.total || response?.totalPosts || 0),
    status: Number(response?.status || 0),
  };
};

export const fetchBlogBySlug = async (slug?: string) => {
  if (!slug) return { success: false, data: null as BlogPost | null, status: 0 };

  const response = await fetchApi(`/api/posts/${encodeURIComponent(slug)}`, {
    siteId: SITE_ID,
  });

  return {
    success: Boolean(response?.success),
    data: (response?.data || null) as BlogPost | null,
    status: Number(response?.status || 0),
  };
};

export const fetchAllBlogSlugs = async () => {
  const response = await fetchBlogPosts({ page: 1, limit: 1000 });
  if (!response.success) return [];

  return response.data
    .filter((post) => post?.slug)
    .map((post) => ({
      slug: String(post.slug),
      updatedAt: post.updatedAt || post.publishedAt || post.createdAt || null,
    }));
};

export const fetchBlogPaginationParams = async () => {
  const response = await fetchBlogPosts({ page: 1, limit: BLOG_POSTS_PER_PAGE });
  if (!response.success || response.totalPages < 2) return [];

  return Array.from({ length: response.totalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
};

export const buildBlogListPath = (page = 1) =>
  page <= 1 ? "/blog" : `/blog/page/${page}`;
export const buildBlogPostPath = (slug: string) => `/blog/${slug}`;
export const absoluteUrl = (path: string) =>
  `${BUSINESS_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const stripBrandSuffix = (title = "") =>
  title.replace(/\s*[|\u2013\u2014-]\s*Regenis(?:\s+Life)?\s*$/i, "").trim() || title.trim();

export const getPostContent = (post: BlogPost) =>
  post.content || post.body || post.html || post.text || "";

export const getPostFeatureImage = (post: BlogPost) => {
  const image = post.coverImage || post.image || post.featuredImage || "";
  if (typeof image !== "string" || !image.trim()) return null;

  const trimmed = image.trim();
  return trimmed.startsWith(`${BUSINESS_URL}/`) ? trimmed.replace(BUSINESS_URL, "") : trimmed;
};

export const getPostImage = (post: BlogPost) => getPostFeatureImage(post) || BUSINESS_IMAGE;
export const getPostImageUrl = (post: BlogPost) => {
  const image = getPostImage(post);
  if (/^https?:\/\//i.test(image)) return image;
  return absoluteUrl(image);
};

export const countWords = (html = "") => {
  const text = cleanText(html);
  return text ? text.split(/\s+/).length : 0;
};
export const calculateReadingTime = (html = "") =>
  Math.max(1, Math.ceil(countWords(html) / 220));

export const processBlogHtml = (html = "", title = "") => {
  let safeHtml = stripSeoMetadataArtifacts(html);

  safeHtml = safeHtml.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  safeHtml = safeHtml.replace(/<(?:iframe|object|embed|form|input|button|textarea|select|meta|link|base)\b[^>]*>[\s\S]*?<\/(?:iframe|object|embed|form|button|textarea|select)>/gi, "");
  safeHtml = safeHtml.replace(/<(?:iframe|object|embed|form|input|button|textarea|select|meta|link|base)\b[^>]*\/?\s*>/gi, "");
  safeHtml = safeHtml.replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  safeHtml = safeHtml.replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, "");
  safeHtml = safeHtml.replace(/\s(?:href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, "");
  safeHtml = safeHtml.replace(/<\/?article\b[^>]*>/gi, "");

  if (title) {
    const normalizedTitle = cleanText(title).toLowerCase();
    safeHtml = safeHtml.replace(/^\s*<h1[^>]*>([\s\S]*?)<\/h1>/i, (match, inner) =>
      cleanText(inner).toLowerCase() === normalizedTitle ? "" : match
    );
  }

  safeHtml = safeHtml.replace(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi, "<h2$1>$2</h2>");
  safeHtml = safeHtml.replace(/<img\b([^>]*)>/gi, (_match, attrs) => {
    let nextAttrs = attrs;
    if (!/\sloading=/i.test(nextAttrs)) nextAttrs += ' loading="lazy"';
    if (!/\sdecoding=/i.test(nextAttrs)) nextAttrs += ' decoding="async"';
    if (!/\salt=/i.test(nextAttrs)) nextAttrs += ' alt=""';
    return `<img${nextAttrs}>`;
  });

  const usedIds = new Set<string>();
  const tableOfContents: Array<{ id: string; level: number; text: string }> = [];

  safeHtml = safeHtml.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (fullMatch, level, attrs, innerHtml) => {
      const text = cleanText(innerHtml);
      if (!text) return fullMatch;

      const baseId = slugify(text) || `section-${tableOfContents.length + 1}`;
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
      usedIds.add(id);
      tableOfContents.push({ id, level: Number(level), text });

      const cleanedAttrs = String(attrs)
        .replace(/\sid="[^"]*"/i, "")
        .replace(/\sid='[^']*'/i, "");
      return `<h${level}${cleanedAttrs} id="${id}">${innerHtml}</h${level}>`;
    }
  );

  return { safeHtml, tableOfContents };
};

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogFaqResult {
  items: BlogFaqItem[];
  source: "structured" | "content" | "none";
}

const extractFaqFromHtml = (safeHtml: string): BlogFaqItem[] => {
  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings: Array<{ level: number; text: string; start: number; end: number }> = [];

  let match = headingRegex.exec(safeHtml);
  while (match) {
    headings.push({
      level: Number(match[1]),
      text: cleanText(match[2]),
      start: match.index,
      end: match.index + match[0].length,
    });
    match = headingRegex.exec(safeHtml);
  }

  const faqIndex = headings.findIndex((heading) =>
    /faq|frequently\s+asked/i.test(heading.text)
  );
  if (faqIndex === -1) return [];

  const faqHeading = headings[faqIndex];
  const nextSection = headings
    .slice(faqIndex + 1)
    .find((heading) => heading.level <= faqHeading.level);
  const section = safeHtml.slice(faqHeading.end, nextSection?.start);
  const questionLevel = faqHeading.level + 1;
  if (questionLevel > 6) return [];

  const questionRegex = new RegExp(
    `<h([${questionLevel}-6])[^>]*>([\\s\\S]*?)<\\/h\\1>`,
    "gi"
  );
  const questions: Array<{ text: string; start: number; end: number }> = [];
  let questionMatch = questionRegex.exec(section);
  while (questionMatch) {
    questions.push({
      text: cleanText(questionMatch[2]),
      start: questionMatch.index,
      end: questionMatch.index + questionMatch[0].length,
    });
    questionMatch = questionRegex.exec(section);
  }

  return questions
    .map((question, index) => ({
      q: question.text,
      a: cleanText(section.slice(question.end, questions[index + 1]?.start)),
    }))
    .filter((item) => item.q && item.a);
};

export const extractFaqItems = (post: BlogPost, safeHtml = ""): BlogFaqResult => {
  const raw = Array.isArray(post.faq) ? post.faq : Array.isArray(post.faqs) ? post.faqs : [];
  const structured = raw
    .map((item) => ({
      q: cleanText(item.question || item.q || ""),
      a: cleanText(item.answer || item.a || ""),
    }))
    .filter((item) => item.q && item.a);

  if (structured.length) return { items: structured, source: "structured" };
  const content = extractFaqFromHtml(safeHtml);
  return content.length
    ? { items: content, source: "content" }
    : { items: [], source: "none" };
};

const authorSchema = (post: BlogPost) =>
  post.author
    ? { "@type": "Person", name: post.author }
    : { "@id": `${BUSINESS_URL}/#organization` };

export const buildBlogPostingSchema = ({
  post,
  path,
  wordCount,
  readingTime,
  faqCount = 0,
}: {
  post: BlogPost;
  path: string;
  wordCount: number;
  readingTime: number;
  faqCount?: number;
}): LDJsonSchema => {
  const url = absoluteUrl(path);
  const published = post.publishedAt || post.createdAt;
  const keywords = Array.isArray(post.keywords)
    ? post.keywords
    : typeof post.keywords === "string"
      ? post.keywords.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: post.metaTitle || post.title,
    name: post.title,
    description: post.metaDescription || post.excerpt || "",
    author: authorSchema(post),
    ...(published ? { datePublished: published } : {}),
    ...(post.updatedAt || published ? { dateModified: post.updatedAt || published } : {}),
    image: { "@type": "ImageObject", url: getPostImageUrl(post), caption: post.title },
    publisher: { "@id": `${BUSINESS_URL}/#organization` },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
    url,
    inLanguage: "en-IN",
    ...(keywords.length ? { keywords } : {}),
    ...(post.tags?.length ? { articleSection: post.tags } : {}),
    ...(wordCount ? { wordCount } : {}),
    ...(readingTime ? { timeRequired: `PT${readingTime}M` } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
    ...(faqCount ? { mainEntity: { "@id": `${url}#faq` } } : {}),
  };
};

export const buildBlogSchema = ({ posts, path }: { posts: BlogPost[]; path: string }): LDJsonSchema => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${absoluteUrl("/blog")}#blog`,
  name: BLOG_NAME,
  description: BLOG_DESCRIPTION,
  url: absoluteUrl("/blog"),
  ...(path !== "/blog"
    ? { mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` } }
    : {}),
  publisher: { "@id": `${BUSINESS_URL}/#organization` },
  inLanguage: "en-IN",
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(buildBlogPostPath(post.slug))}#blogposting`,
    headline: post.metaTitle || post.title,
    url: absoluteUrl(buildBlogPostPath(post.slug)),
    image: getPostImageUrl(post),
    ...(post.publishedAt || post.createdAt
      ? { datePublished: post.publishedAt || post.createdAt }
      : {}),
    ...(post.updatedAt || post.publishedAt || post.createdAt
      ? { dateModified: post.updatedAt || post.publishedAt || post.createdAt }
      : {}),
    author: authorSchema(post),
  })),
});

export const buildBlogItemListSchema = ({
  posts,
  path,
}: {
  posts: BlogPost[];
  path: string;
}): LDJsonSchema => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${absoluteUrl(path)}#blog-item-list`,
  name: `${BLOG_NAME} articles`,
  itemListElement: posts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(buildBlogPostPath(post.slug)),
    name: post.title,
  })),
});

export const buildFaqSchema = (items: BlogFaqItem[], path: string): LDJsonSchema => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absoluteUrl(path)}#faq`,
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export const getDisplayDate = (post: BlogPost) =>
  post.publishedAt || post.createdAt || post.updatedAt || null;

export const getAuthorName = (post: BlogPost) =>
  post.author?.trim() || `${BUSINESS_NAME} Editorial Team`;
