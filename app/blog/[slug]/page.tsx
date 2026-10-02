import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogFAQ from "@/app/components/blog/BlogFAQ";
import BlogSidebar from "@/app/components/blog/BlogSidebar";
import BlogImage from "@/app/components/blog/BlogImage";
import { SchemaScript } from "@/app/components/SchemaScript";
import {
  absoluteUrl,
  buildBlogPostPath,
  buildBlogPostingSchema,
  buildFaqSchema,
  calculateReadingTime,
  countWords,
  extractFaqItems,
  fetchAllBlogSlugs,
  fetchBlogBySlug,
  fetchBlogPosts,
  getAuthorName,
  getDisplayDate,
  getPostContent,
  getPostFeatureImage,
  getPostImageUrl,
  processBlogHtml,
  stripBrandSuffix,
} from "@/lib/blog";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";

interface BlogPostPageProps { params: Promise<{ slug: string }> }

const formatDate = (value: string) => new Intl.DateTimeFormat("en-IN", {
  day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
}).format(new Date(value));

const keywordsFor = (value?: string[] | string) => Array.isArray(value)
  ? value
  : typeof value === "string" ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];

export async function generateStaticParams() {
  return (await fetchAllBlogSlugs()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await fetchBlogBySlug(slug);
  if (!post) return { title: "Insight Not Found", robots: { index: false, follow: false } };

  const path = buildBlogPostPath(post.slug);
  const title = stripBrandSuffix(post.metaTitle || post.title);
  const description = post.metaDescription || post.excerpt || "An equipment planning insight from Regenis Life.";
  const publishedTime = post.publishedAt || post.createdAt;
  const modifiedTime = post.updatedAt || publishedTime;
  const image = getPostImageUrl(post);

  return {
    title,
    description,
    keywords: keywordsFor(post.keywords),
    authors: [{ name: getAuthorName(post) }],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${BUSINESS_NAME}`,
      description,
      url: absoluteUrl(path),
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [getAuthorName(post)],
      tags: post.tags,
      images: [{ url: image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [{ data: post }, latest] = await Promise.all([
    fetchBlogBySlug(slug),
    fetchBlogPosts({ page: 1, limit: 6 }),
  ]);
  if (!post) notFound();

  const path = buildBlogPostPath(post.slug);
  const pageUrl = absoluteUrl(path);
  const content = getPostContent(post);
  const { safeHtml, tableOfContents } = processBlogHtml(content, post.title);
  const faq = extractFaqItems(post, safeHtml);
  const wordCount = countWords(safeHtml);
  const readingTime = calculateReadingTime(safeHtml);
  const displayDate = getDisplayDate(post);
  const description = post.metaDescription || post.excerpt || "An equipment planning insight from Regenis Life.";
  const featureImage = getPostFeatureImage(post);
  const schemas = [
    generateWebPageSchema({
      name: post.title,
      url: pageUrl,
      description,
      pageType: "WebPage",
      isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
      mainEntity: { "@id": `${pageUrl}#blogposting` },
      dateModified: post.updatedAt || post.publishedAt || post.createdAt,
      speakable: ["h1", "[data-speakable]"],
    }),
    generateBreadcrumbSchema([
      { label: "Home", url: BUSINESS_URL },
      { label: "Insights", url: `${BUSINESS_URL}/blog` },
      { label: post.title, url: pageUrl },
    ]),
    buildBlogPostingSchema({ post, path, wordCount, readingTime, faqCount: faq.items.length }),
    ...(faq.items.length ? [buildFaqSchema(faq.items, path)] : []),
  ];

  return (
    <main>
      <SchemaScript id="blog-post-schema" schema={schemas} />
      <article>
        <header className="border-b border-line pt-[clamp(132px,16vw,188px)] pb-[clamp(48px,7vw,84px)]">
          <div className="mx-auto max-w-[980px] gutter">
            <Link href="/blog" className="text-eyebrow text-primary transition-colors hover:text-primary-hover">Insights</Link>
            <h1 className="mt-6 font-display text-[clamp(42px,7vw,76px)] font-light leading-[1.02] tracking-[-0.03em] text-ink text-balance">
              {post.title}
            </h1>
            {description && <p data-speakable className="mt-7 max-w-[760px] text-[17px] font-light leading-8 text-ink-muted md:text-[19px]">{description}</p>}
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-ink-faint">
              <span>By {getAuthorName(post)}</span>
              {displayDate && <><span aria-hidden>·</span><time dateTime={displayDate}>{formatDate(displayDate)}</time></>}
              <span aria-hidden>·</span><span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {featureImage && <div className="mx-auto max-w-[var(--container-max)] gutter pt-10 md:pt-14"><BlogImage src={featureImage} alt={post.title} variant="hero" /></div>}

        <div className="mx-auto grid max-w-[var(--container-max)] gap-12 gutter py-[clamp(56px,8vw,104px)] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="min-w-0">
            {tableOfContents.length >= 3 && (
              <nav aria-label="In this article" className="mb-10 rounded-[var(--radius-card)] border border-line bg-raised p-6">
                <h2 className="text-eyebrow text-primary">In this article</h2>
                <ol className="mt-4 grid gap-2 md:grid-cols-2">
                  {tableOfContents.map((item) => <li key={item.id} className={item.level === 3 ? "md:pl-4" : ""}><a href={`#${item.id}`} className="text-[13px] leading-5 text-ink-muted transition-colors hover:text-primary">{item.text}</a></li>)}
                </ol>
              </nav>
            )}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: safeHtml }} />
            {faq.source === "structured" && <BlogFAQ items={faq.items} />}
            <aside className="mt-12 rounded-[var(--radius-card)] border border-line bg-sunken p-6 text-[13px] leading-6 text-ink-muted">
              <strong className="text-ink">Important:</strong> This article is for general educational purposes. Equipment suitability, indications, contraindications, regulatory status, specifications, and clinical protocols must be confirmed with the manufacturer and appropriately qualified professionals.
            </aside>
          </div>
          <BlogSidebar currentPostSlug={post.slug} latestPosts={latest.data} topics={post.tags || keywordsFor(post.keywords).slice(0, 6)} />
        </div>
      </article>
    </main>
  );
}
