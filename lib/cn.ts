/**
 * Minimal className joiner — filters falsy values and flattens.
 * (No tailwind-merge; components are written so classes don't collide.)
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
