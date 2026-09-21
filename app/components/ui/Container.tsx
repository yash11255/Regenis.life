import { cn } from "@/lib/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
}

const SIZES: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-[760px]",
  default: "max-w-[var(--container-max)]",
  wide: "max-w-[1560px]",
  full: "max-w-none",
};

/** Centered, gutter-padded content column. Replaces the repeated
 *  `px-[clamp(24px,5vw,80px)] mx-auto max-w-[...]` literals. */
export default function Container({
  size = "default",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full gutter", SIZES[size], className)} {...rest}>
      {children}
    </div>
  );
}
