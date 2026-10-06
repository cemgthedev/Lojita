import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const fieldLabelVariants = cva("font-medium font-label", {
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

type FieldLabelProps = React.ComponentProps<"label"> &
  VariantProps<typeof fieldLabelVariants>;

function FieldLabel({
  className,
  variant = "default",
  size = "md",
  ...props
}: FieldLabelProps) {
  const Comp = "label";

  return (
    <Comp
      data-slot="label"
      data-variant={variant}
      data-size={size}
      className={cn(fieldLabelVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { FieldLabel, fieldLabelVariants };
export type { FieldLabelProps };
