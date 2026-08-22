import React from "react";

interface RegenisLogoProps {
  /** "full" = monogram + wordmark, "wordmark" = text only, "mark" = monogram only */
  variant?: "full" | "wordmark" | "mark";
  /** "dark" = for light backgrounds, "light" = for dark backgrounds */
  theme?: "dark" | "light";
  className?: string;
}

/**
 * Text-based Regenis Life wordmark. No image asset — a bordered monogram
 * ("R") paired with a lowercase serif wordmark and an accent-colored
 * ".life" suffix, styled after understated, high-end wellness/aesthetics
 * branding. Renders as real text (crisp at any size, accessible, indexable).
 */
export default function RegenisLogo({
  variant = "full",
  theme = "dark",
  className = "",
}: RegenisLogoProps) {
  const ink = theme === "light" ? "#eef5ff" : "#071426";
  const accent = "#3d8cff";
  const border = theme === "light" ? "rgba(238,245,255,0.35)" : "rgba(7,20,38,0.35)";

  const Monogram = (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center flex-shrink-0"
      style={{
        width: "1.9em",
        height: "1.9em",
        border: `1px solid ${border}`,
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: "0.62em",
        color: ink,
        letterSpacing: 0,
      }}
    >
      R
    </span>
  );

  const Wordmark = (
    <span
      className="inline-flex items-baseline leading-none whitespace-nowrap"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 500,
        letterSpacing: "0.01em",
      }}
    >
      <span style={{ color: ink }}>regenis</span>
      <span style={{ color: accent, fontStyle: "italic" }}>.life</span>
    </span>
  );

  if (variant === "mark") {
    return <span className={className}>{Monogram}</span>;
  }

  if (variant === "wordmark") {
    return <span className={className}>{Wordmark}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {Monogram}
      {Wordmark}
    </span>
  );
}
