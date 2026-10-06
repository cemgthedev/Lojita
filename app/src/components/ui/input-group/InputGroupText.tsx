import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const inputGroupTextVariants = cva("font-normal font-sans", {
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

type InputGroupTextProps = React.ComponentProps<"span"> &
  VariantProps<typeof inputGroupTextVariants>;

function InputGroupText({
  className,
  variant = "default",
  size = "md",
  ...props
}: InputGroupTextProps) {
  const Comp = "span";

  return (
    <Comp
      data-slot="span"
      data-variant={variant}
      data-size={size}
      className={cn(inputGroupTextVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { InputGroupText, inputGroupTextVariants };
export type { InputGroupTextProps };
