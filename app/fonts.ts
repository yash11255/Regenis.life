import { Inter, Fraunces } from "next/font/google";

/**
 * Two families, loaded once and exposed as CSS variables that
 * `@theme` in globals.css maps onto `--font-sans` / `--font-display`.
 *
 * - Inter    → body / UI text
 * - Fraunces → editorial display serif (headings, wordmark)
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

export const fontVariables = `${inter.variable} ${fraunces.variable}`;
