import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const labelVariants = cva("font-medium font-label", {
  variants: {
    variant: {
      default: "",
      muted: "text-muted",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
    size: {
      xl: "text-3xl",
      lg: "text-2xl",
      md: "text-xl",
      sm: "text-lg",
      xs: "text-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type LabelProps = React.ComponentProps<"label"> &
  VariantProps<typeof labelVariants>;

function Label({
  className,
  variant = "default",
  size = "md",
  ...props
}: LabelProps) {
  const Comp = "label";

  return (
    <Comp
      data-slot="label"
      data-variant={variant}
      data-size={size}
      className={cn(labelVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Label, labelVariants };
export type { LabelProps };
