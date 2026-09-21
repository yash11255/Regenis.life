import { cn } from "@/lib/cn";

/**
 * Long-form copy wrapper (About / Contact / category intros).
 * Tokenised typographic defaults — no @tailwindcss/typography dependency.
 */
export default function Prose({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-[15px] leading-[1.75] text-ink-muted font-light",
        "[&_p]:mt-5 [&_p:first-child]:mt-0",
        "[&_h2]:font-display [&_h2]:text-ink [&_h2]:font-light [&_h2]:text-[clamp(22px,2.6vw,32px)] [&_h2]:leading-tight [&_h2]:mt-12 [&_h2]:mb-4",
        "[&_h3]:font-semibold [&_h3]:text-ink [&_h3]:text-[15px] [&_h3]:uppercase [&_h3]:tracking-[0.08em] [&_h3]:mt-9 [&_h3]:mb-3",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-hover",
        "[&_strong]:text-ink [&_strong]:font-semibold",
        "[&_ul]:mt-5 [&_ul]:space-y-2 [&_ul]:pl-0 [&_li]:list-none [&_li]:relative [&_li]:pl-6",
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-primary",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
