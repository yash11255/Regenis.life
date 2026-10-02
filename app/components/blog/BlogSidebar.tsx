import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export default function BlogSidebar({
  currentPostSlug,
  latestPosts,
  topics,
}: {
  currentPostSlug: string;
  latestPosts: BlogPost[];
  topics: string[];
}) {
  const visiblePosts = latestPosts.filter((post) => post.slug !== currentPostSlug).slice(0, 5);

  return (
    <aside className="space-y-8 lg:sticky lg:top-36 lg:self-start">
      <section>
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
          Latest insights
        </h2>
        <div className="mt-4 border-t border-line">
          {visiblePosts.length ? (
            visiblePosts.map((post) => (
              <Link
                key={post._id || post.slug}
                href={`/blog/${post.slug}`}
                className="block border-b border-line py-4 text-[14px] leading-6 text-ink-muted transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            ))
          ) : (
            <p className="border-b border-line py-4 text-[14px] text-ink-faint">
              More insights are coming soon.
            </p>
          )}
        </div>
      </section>

      {topics.length > 0 && (
        <section>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            Topics
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-line bg-raised px-3 py-1.5 text-[12px] text-ink-muted"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>
      )}

      <section data-band="dark" className="rounded-[var(--radius-card)] p-6">
        <h2 className="font-display text-[25px] font-light text-ink-inverse">
          Planning a facility?
        </h2>
        <p className="mt-3 text-[14px] font-light leading-6 text-ink-inverse-muted">
          Discuss equipment suitability, site requirements, installation, and training with
          the Regenis Life team.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-ground transition-colors hover:bg-primary/90"
        >
          Start an enquiry
        </Link>
      </section>
    </aside>
  );
}
