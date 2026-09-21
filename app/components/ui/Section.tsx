import { cn } from "@/lib/cn";
import Container from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** "dark" sets the deep ground band + flips ink/line tokens for descendants. */
  band?: "paper" | "dark";
  /** Draw a hairline divider along the top edge. */
  divide?: boolean;
  /** Vertical rhythm. */
  space?: "sm" | "md" | "lg";
  /** Wrap children in a Container (default true). Pass false for full-bleed content. */
  contained?: boolean;
  containerSize?: React.ComponentProps<typeof Container>["size"];
  as?: "section" | "div" | "footer" | "header" | "article";
}

const SPACE: Record<NonNullable<SectionProps["space"]>, string> = {
  sm: "py-[clamp(40px,5vw,72px)]",
  md: "py-[clamp(56px,7vw,100px)]",
  lg: "py-[clamp(72px,9vw,128px)]",
};

export default function Section({
  band = "paper",
  divide = false,
  space = "md",
  contained = true,
  containerSize = "default",
  as = "section",
  className,
  children,
  ...rest
}: SectionProps) {
  const Tag = as;
  return (
    <Tag
      data-band={band === "dark" ? "dark" : undefined}
      className={cn(
        "relative",
        SPACE[space],
        divide && "border-t border-line",
        className
      )}
      {...rest}
    >
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </Tag>
  );
}
