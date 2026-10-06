import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";
import { Loader2Icon } from "lucide-react";

const loaderVariants = cva("animate-spin p-0", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted",
      dark: "text-dark",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
    size: {
      default: "min-w-fit max-w-fit min-h-fit max-h-fit",
      xl: "min-w-8 max-w-8 min-h-8 max-h-8",
      lg: "min-w-7 max-w-7 min-h-7 max-h-7",
      md: "min-w-6 max-w-6 min-h-6 max-h-6",
      sm: "min-w-5 max-w-5 min-h-5 max-h-5",
      xs: "min-w-4 max-w-4 min-h-4 max-h-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type LoaderProps = React.ComponentProps<"div"> &
  VariantProps<typeof loaderVariants> & {
    icon?: React.ReactNode;
  };

function Loader({
  className,
  variant = "default",
  size = "default",
  icon,
  ...props
}: LoaderProps) {
  if (!icon)
    return (
      <Loader2Icon
        className={cn(loaderVariants({ variant, size, className }))}
      />
    );

  return (
    <div
      data-variant={variant}
      className={cn(loaderVariants({ variant, size, className }))}
      {...props}
    >
      {icon}
    </div>
  );
}

export { Loader, loaderVariants };
export type { LoaderProps };
