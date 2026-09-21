import { cn } from "@/lib/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "primary" | "neutral" | "accent";
}

const TONES: Record<NonNullable<BadgeProps["tone"]>, string> = {
  primary: "bg-primary-subtle text-primary border-primary/20",
  neutral: "bg-sunken text-ink-muted border-line-strong",
  accent: "bg-accent-subtle text-accent border-accent/25",
};

/** Small pill label (badges, "Exclusive Indian Importer", category tags). */
export default function Badge({ tone = "neutral", className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] border px-2.5 py-0.5",
        "text-[9px] font-bold uppercase tracking-[0.12em]",
        TONES[tone],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
