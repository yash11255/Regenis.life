import Link from "next/link";
import {
  calculateReadingTime,
  getDisplayDate,
  getPostContent,
  getPostFeatureImage,
  type BlogPost,
} from "@/lib/blog";
import BlogImage from "./BlogImage";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));

export default function BlogCard({ post }: { post: BlogPost }) {
  const image = getPostFeatureImage(post);
  const date = getDisplayDate(post);
  const content = getPostContent(post);
  const readingTime = content ? calculateReadingTime(content) : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-raised shadow-[var(--shadow-raised)]">
      {image && (
        <BlogImage
          src={image}
          alt={post.title}
          href={`/blog/${post.slug}`}
          variant="card"
        />
      )}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-ink-faint">
          {date && <time dateTime={date}>{formatDate(date)}</time>}
          {date && readingTime && <span aria-hidden>·</span>}
          {readingTime && <span>{readingTime} min read</span>}
        </div>
        <h2 className="mt-4 font-display text-[clamp(23px,2.4vw,31px)] font-light leading-[1.18] text-ink text-balance">
          <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-3 text-[14px] font-light leading-7 text-ink-muted">
          {post.excerpt ||
            post.metaDescription ||
            "Equipment planning insight from the Regenis Life editorial team."}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-7 inline-flex items-center gap-2 self-start text-[13px] font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Read insight <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
