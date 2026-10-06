import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const skeletonVariants = cva("animate-pulse bg-linear-to-r", {
  variants: {
    variant: {
      default: "from-gray-200 to-gray-300",
      dark: "from-dark-600 to-dark-800",
      primary: "from-primary-200 to-primary-300",
      secondary: "from-secondary-200 to-secondary-300",
      success: "from-success-200 to-success-300",
      warning: "from-warning-200 to-warning-300",
      danger: "from-danger-200 to-danger-300",
    },
    size: {
      xl: "h-13",
      lg: "h-12",
      md: "h-11",
      sm: "h-10",
      xs: "h-9",
    },
    rounded: {
      full: "rounded-full",
      xl: "rounded-xl",
      lg: "rounded-lg",
      md: "rounded-md",
      sm: "rounded-sm",
      xs: "rounded-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    rounded: "md",
  },
});

type SkeletonProps = React.ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>;

function Skeleton({
  className,
  variant = "default",
  size = "md",
  rounded = "md",
  ...props
}: SkeletonProps) {
  const Comp = "div";

  return (
    <Comp
      data-slot="div"
      data-variant={variant}
      data-size={size}
      className={cn(skeletonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
export type { SkeletonProps };
