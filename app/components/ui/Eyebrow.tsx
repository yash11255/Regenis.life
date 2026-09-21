import { cn } from "@/lib/cn";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: "primary" | "muted";
}

/** Small tracked uppercase kicker above a heading. */
export default function Eyebrow({ tone = "muted", className, children, ...rest }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-eyebrow",
        tone === "primary" ? "text-primary" : "text-ink-faint",
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
