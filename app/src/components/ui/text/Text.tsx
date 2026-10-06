import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const textVariants = cva("font-normal font-sans", {
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
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
      xs: "text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type TextProps = React.ComponentProps<"p"> & VariantProps<typeof textVariants>;

function Text({
  className,
  variant = "default",
  size = "md",
  ...props
}: TextProps) {
  const Comp = "p";

  return (
    <Comp
      data-slot="p"
      data-variant={variant}
      data-size={size}
      className={cn(textVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Text, textVariants };
export type { TextProps };
