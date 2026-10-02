import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/app/components/blog/BlogCard";
import BlogPagination from "@/app/components/blog/BlogPagination";
import { SchemaScript } from "@/app/components/SchemaScript";
import {
  BLOG_DESCRIPTION,
  BLOG_NAME,
  buildBlogItemListSchema,
  buildBlogSchema,
  fetchBlogPosts,
} from "@/lib/blog";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";

const PAGE_URL = `${BUSINESS_URL}/blog`;

export const metadata: Metadata = {
  title: "Medical Equipment Insights",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${BLOG_NAME} | ${BUSINESS_NAME}`,
    description: BLOG_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/Regenis.png", alt: BUSINESS_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BLOG_NAME} | ${BUSINESS_NAME}`,
    description: BLOG_DESCRIPTION,
    images: ["/Regenis.png"],
  },
};

export default async function BlogPage() {
  const result = await fetchBlogPosts();
  const schemas = [
    generateWebPageSchema({
      name: BLOG_NAME,
      url: PAGE_URL,
      description: BLOG_DESCRIPTION,
      pageType: "CollectionPage",
      isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
      mainEntity: { "@id": `${PAGE_URL}#blog` },
    }),
    generateBreadcrumbSchema([
      { label: "Home", url: BUSINESS_URL },
      { label: "Insights", url: PAGE_URL },
    ]),
    buildBlogSchema({ posts: result.data, path: "/blog" }),
    ...(result.data.length
      ? [buildBlogItemListSchema({ posts: result.data, path: "/blog" })]
      : []),
  ];

  return (
    <main>
      <SchemaScript id="blog-index-schema" schema={schemas} />
      <section className="border-b border-line pt-[clamp(132px,16vw,188px)] pb-[clamp(54px,8vw,96px)]">
        <div className="mx-auto max-w-[var(--container-max)] gutter">
          <p className="text-eyebrow text-primary">Regenis Life Insights</p>
          <h1 className="mt-5 max-w-[900px] font-display text-[clamp(46px,8vw,88px)] font-light leading-[0.98] tracking-[-0.03em] text-ink text-balance">
            Better decisions for clinical and wellness facilities.
          </h1>
          <p className="mt-7 max-w-[700px] text-[16px] font-light leading-8 text-ink-muted md:text-[18px]">
            Practical guidance on equipment evaluation, facility planning, implementation,
            recovery, performance, diagnostics, and longevity-focused care.
          </p>
        </div>
      </section>

      <section className="py-[clamp(56px,8vw,104px)]">
        <div className="mx-auto max-w-[var(--container-max)] gutter">
          {result.data.length ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {result.data.map((post) => (
                  <BlogCard key={post._id || post.slug} post={post} />
                ))}
              </div>
              <BlogPagination currentPage={1} totalPages={result.totalPages} />
            </>
          ) : (
            <div className="rounded-[var(--radius-card)] border border-line bg-raised px-6 py-14 text-center md:px-12">
              <p className="text-eyebrow text-primary">Editorial desk</p>
              <h2 className="mt-4 font-display text-[clamp(30px,5vw,48px)] font-light text-ink">
                Our first insights are in preparation.
              </h2>
              <p className="mx-auto mt-4 max-w-[580px] text-[15px] font-light leading-7 text-ink-muted">
                In the meantime, explore our curated equipment portfolio or speak with the
                team about a facility requirement.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/equipment" className="rounded-full bg-primary px-6 py-3 text-[13px] font-semibold text-primary-contrast transition-colors hover:bg-primary-hover">
                  Explore equipment
                </Link>
                <Link href="/contact" className="rounded-full border border-line-strong bg-paper px-6 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-primary hover:text-primary">
                  Contact the team
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
