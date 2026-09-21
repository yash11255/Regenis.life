import { cn } from "@/lib/cn";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZES: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  sm: "text-[clamp(24px,3vw,36px)]",
  md: "text-[clamp(28px,3.8vw,48px)]",
  lg: "text-[clamp(32px,5vw,64px)]",
  xl: "text-[clamp(40px,6.5vw,88px)]",
};

/** Editorial display heading. Wrap emphasised words in
 *  `<span className="text-primary">…</span>`. */
export default function SectionHeading({
  as = "h2",
  size = "md",
  className,
  children,
  ...rest
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "font-display font-light leading-[1.12] tracking-[-0.01em] text-ink text-balance",
        SIZES[size],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
