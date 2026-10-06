import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const fieldDescriptionVariants = cva("font-normal font-sans", {
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

type FieldDescriptionProps = React.ComponentProps<"p"> &
  VariantProps<typeof fieldDescriptionVariants>;

function FieldDescription({
  className,
  variant = "default",
  size = "md",
  ...props
}: FieldDescriptionProps) {
  const Comp = "p";

  return (
    <Comp
      data-slot="p"
      data-variant={variant}
      data-size={size}
      className={cn(fieldDescriptionVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { FieldDescription, fieldDescriptionVariants };
export type { FieldDescriptionProps };
