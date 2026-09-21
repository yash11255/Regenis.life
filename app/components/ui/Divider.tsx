import { cn } from "@/lib/cn";

/** Hairline rule. Inherits the right colour on dark bands via the
 *  `--color-line` override in `[data-band="dark"]`. */
export default function Divider({
  className,
  ...rest
}: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-0 border-t border-line", className)} {...rest} />;
}
