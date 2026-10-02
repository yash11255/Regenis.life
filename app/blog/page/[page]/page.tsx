import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogCard from "@/app/components/blog/BlogCard";
import BlogPagination from "@/app/components/blog/BlogPagination";
import { SchemaScript } from "@/app/components/SchemaScript";
import {
  BLOG_DESCRIPTION,
  BLOG_NAME,
  absoluteUrl,
  buildBlogItemListSchema,
  buildBlogListPath,
  buildBlogSchema,
  fetchBlogPaginationParams,
  fetchBlogPosts,
} from "@/lib/blog";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";

interface BlogArchivePageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  return fetchBlogPaginationParams();
}

export async function generateMetadata({ params }: BlogArchivePageProps): Promise<Metadata> {
  const page = Number((await params).page);
  if (!Number.isInteger(page) || page < 2) return { robots: { index: false } };

  const path = buildBlogListPath(page);
  const title = `Medical Equipment Insights, Page ${page}`;
  return {
    title,
    description: BLOG_DESCRIPTION,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${BUSINESS_NAME}`,
      description: BLOG_DESCRIPTION,
      url: absoluteUrl(path),
      type: "website",
    },
  };
}

export default async function BlogArchivePage({ params }: BlogArchivePageProps) {
  const page = Number((await params).page);
  if (page === 1) permanentRedirect("/blog");
  if (!Number.isInteger(page) || page < 2) notFound();

  const result = await fetchBlogPosts({ page });
  if (!result.success || !result.data.length || page > result.totalPages) notFound();

  const path = buildBlogListPath(page);
  const pageUrl = absoluteUrl(path);
  const schemas = [
    generateWebPageSchema({
      name: `${BLOG_NAME}, Page ${page}`,
      url: pageUrl,
      description: BLOG_DESCRIPTION,
      pageType: "CollectionPage",
      isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
      mainEntity: { "@id": `${pageUrl}#blog-item-list` },
    }),
    generateBreadcrumbSchema([
      { label: "Home", url: BUSINESS_URL },
      { label: "Insights", url: `${BUSINESS_URL}/blog` },
      { label: `Page ${page}`, url: pageUrl },
    ]),
    buildBlogSchema({ posts: result.data, path }),
    buildBlogItemListSchema({ posts: result.data, path }),
  ];

  return (
    <main>
      <SchemaScript id="blog-archive-schema" schema={schemas} />
      <section className="border-b border-line pt-[clamp(132px,16vw,188px)] pb-[clamp(48px,7vw,80px)]">
        <div className="mx-auto max-w-[var(--container-max)] gutter">
          <p className="text-eyebrow text-primary">Regenis Life Insights</p>
          <h1 className="mt-5 font-display text-[clamp(42px,7vw,76px)] font-light leading-none tracking-[-0.03em] text-ink">
            Insights archive
          </h1>
          <p className="mt-5 text-[15px] font-light text-ink-muted">Page {page} of {result.totalPages}</p>
        </div>
      </section>
      <section className="py-[clamp(56px,8vw,104px)]">
        <div className="mx-auto max-w-[var(--container-max)] gutter">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {result.data.map((post) => <BlogCard key={post._id || post.slug} post={post} />)}
          </div>
          <BlogPagination currentPage={page} totalPages={result.totalPages} />
        </div>
      </section>
    </main>
  );
}
