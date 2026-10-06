import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

import { Progress as ProgressPrimitive } from "radix-ui";

const progressVariants = cva(
  "relative flex w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        success: "bg-success/20",
        warning: "bg-warning/20",
        danger: "bg-danger/20",
      },
      size: {
        xl: "h-3",
        lg: "h-2.5",
        md: "h-2",
        sm: "h-1.5",
        xs: "h-1",
      },
      rounded: {
        none: "rounded-none",
        full: "rounded-full",
        xl: "rounded-xl",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
        xs: "rounded-xs",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
      variant: "default",
    },
  },
);

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants>;

function Progress({
  className,
  size,
  rounded,
  variant,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        progressVariants({
          size,
          rounded,
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Progress, progressVariants };
export type { ProgressProps };
