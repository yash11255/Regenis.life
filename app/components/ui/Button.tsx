import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "quiet" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<typeof Link>, keyof CommonProps | "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold no-underline " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-ring " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const VARIANTS: Record<Variant, string> = {
  solid:
    "rounded-[var(--radius-pill)] bg-primary text-primary-contrast " +
    "hover:bg-primary-hover hover:-translate-y-px active:translate-y-0 " +
    "shadow-[var(--shadow-raised)]",
  outline:
    "rounded-[var(--radius-pill)] border border-line-strong text-ink " +
    "hover:border-primary hover:text-primary",
  quiet:
    "gap-1.5 pb-0.5 text-[11px] font-bold uppercase tracking-[0.13em] " +
    "border-b border-current/40 text-ink hover:text-primary hover:border-primary",
  ghost: "rounded-[var(--radius-pill)] text-ink hover:bg-sunken",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[13px]",
  md: "px-7 py-3 text-[14px]",
  lg: "px-8 py-4 text-[15px]",
};

export default function Button(props: ButtonProps) {
  const { variant = "solid", size = "md", className, children, ...rest } = props;
  const classes = cn(
    BASE,
    VARIANTS[variant],
    variant !== "quiet" && SIZES[size],
    className
  );

  if (rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as ButtonAsLink)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
