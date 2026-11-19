"use client";

import Link from "next/link";
import { useState } from "react";

export default function BlogImage({
  src,
  alt,
  href,
  variant,
}: {
  src: string;
  alt: string;
  href?: string;
  variant: "card" | "hero";
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = !src || failedSrc === src;

  if (failed) return null;

  // CMS images may be hosted on customer-managed domains that cannot be
  // exhaustively listed in Next's remote image configuration.
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={
        variant === "card"
          ? "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          : "aspect-[16/8] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-raised)]"
      }
      loading={variant === "hero" ? "eager" : "lazy"}
      fetchPriority={variant === "hero" ? "high" : undefined}
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  );

  if (variant === "card" && href) {
    return (
      <Link
        href={href}
        aria-label={`Read ${alt}`}
        className="block aspect-[16/10] overflow-hidden bg-sunken"
      >
        {image}
      </Link>
    );
  }

  return image;
}
