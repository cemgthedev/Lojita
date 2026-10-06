import { cva, type VariantProps } from "class-variance-authority";
import { Separator as SeparatorPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";

const separatorVariants = cva("peer w-full rounded-full opacity-60 border-0", {
  variants: {
    variant: {
      default: "bg-muted",
      dark: "bg-dark",
      muted: "bg-muted",
      primary: "bg-primary",
      secondary: "bg-secondary",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
    },
    size: {
      xl: "data-horizontal:h-2 data-horizontal:w-full data-vertical:w-2 data-vertical:self-stretch",
      lg: "data-horizontal:h-1.5 data-horizontal:w-full data-vertical:w-1.5 data-vertical:self-stretch",
      md: "data-horizontal:h-1 data-horizontal:w-full data-vertical:w-1 data-vertical:self-stretch",
      sm: "data-horizontal:h-0.5 data-horizontal:w-full data-vertical:w-0.5 data-vertical:self-stretch",
      xs: "data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "xs",
  },
});

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>;

function Separator({
  className,
  variant,
  orientation = "horizontal",
  size,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="hr"
      data-variant={variant}
      orientation={orientation}
      data-size={size}
      className={cn(separatorVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Separator, separatorVariants };
export type { SeparatorProps };
