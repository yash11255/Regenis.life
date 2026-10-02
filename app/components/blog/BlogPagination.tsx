import Link from "next/link";

export default function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pathFor = (page: number) => (page <= 1 ? "/blog" : `/blog/page/${page}`);

  return (
    <nav
      aria-label="Journal pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-3"
    >
      {currentPage > 1 && (
        <Link
          href={pathFor(currentPage - 1)}
          rel="prev"
          className="inline-flex h-11 items-center rounded-lg border border-line bg-raised px-4 text-[13px] font-semibold text-ink transition-colors hover:border-line-strong hover:text-primary"
        >
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Link
          key={page}
          href={pathFor(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`inline-flex h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-[13px] font-semibold transition-colors ${
            page === currentPage
              ? "border-primary bg-primary text-primary-contrast"
              : "border-line bg-raised text-ink-muted hover:border-line-strong hover:text-ink"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={pathFor(currentPage + 1)}
          rel="next"
          className="inline-flex h-11 items-center rounded-lg border border-line bg-raised px-4 text-[13px] font-semibold text-ink transition-colors hover:border-line-strong hover:text-primary"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
