"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    let active = true;
    const preload = new Image();
    preload.onload = () => active && setStatus("ready");
    preload.onerror = () => active && setStatus("failed");
    preload.src = src;

    return () => {
      active = false;
    };
  }, [src]);

  if (status === "failed") return null;

  const image = status === "ready" ? (
    // CMS images may be hosted on customer-managed domains that cannot be
    // exhaustively listed in Next's remote image configuration.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={
        variant === "card"
          ? "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          : "aspect-[16/8] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-raised)]"
      }
      loading={variant === "card" ? "lazy" : "eager"}
      decoding="async"
      onError={() => setStatus("failed")}
    />
  ) : null;

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

  return image || <div aria-hidden className="aspect-[16/8] w-full rounded-[var(--radius-card)] bg-sunken" />;
}
