import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const headingVariants = cva("font-semibold font-heading", {
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
      xl: "text-5xl",
      lg: "text-4xl",
      md: "text-3xl",
      sm: "text-2xl",
      xs: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type HeadingProps = React.ComponentProps<"h1"> &
  VariantProps<typeof headingVariants>;

function Heading({
  className,
  variant = "default",
  size = "md",
  ...props
}: HeadingProps) {
  const Comp = "h1";

  return (
    <Comp
      data-slot="h1"
      data-variant={variant}
      data-size={size}
      className={cn(headingVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Heading, headingVariants };
export type { HeadingProps };
