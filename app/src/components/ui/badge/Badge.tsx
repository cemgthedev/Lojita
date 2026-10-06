import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "w-fit h-fit flex justify-center items-center gap-2 transition-all border border-border cursor-default select-none",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground hover:opacity-80",
        dark: "bg-dark text-dark-foreground hover:opacity-80",
        muted: "bg-muted text-foreground opacity-60 hover:opacity-80",
        primary: "bg-primary text-primary-foreground hover:opacity-80",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-80",
        success: "bg-success text-success-foreground hover:opacity-80",
        warning: "bg-warning text-warning-foreground hover:opacity-80",
        danger: "bg-danger text-danger-foreground hover:opacity-80",
        "dark-bordered":
          "border-dark text-dark hover:bg-dark hover:text-dark-foreground",
        "muted-bordered":
          "border-muted text-muted opacity-60 hover:bg-muted hover:text-muted-foreground",
        "primary-bordered":
          "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        "secondary-bordered":
          "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
        "success-bordered":
          "border-success text-success hover:bg-success hover:text-success-foreground",
        "warning-bordered":
          "border-warning text-warning hover:bg-warning hover:text-warning-foreground",
        "danger-bordered":
          "border-danger text-danger hover:bg-danger hover:text-danger-foreground",
        "dark-ghost": "bg-muted border-dark text-dark hover:opacity-80",
        ghost: "bg-transparent border-transparent hover:bg-muted",
        "muted-ghost":
          "bg-muted border-dark text-dark opacity-60 hover:opacity-80",
        "primary-ghost":
          "bg-primary-200 border-primary-800 text-primary-800 hover:opacity-80",
        "secondary-ghost":
          "bg-secondary-200 border-secondary-800 text-secondary-800 hover:opacity-80",
        "success-ghost":
          "bg-success-200 border-success-800 text-success-800 hover:opacity-80",
        "warning-ghost":
          "bg-warning-200 border-warning-800 text-warning-800 hover:opacity-80",
        "danger-ghost":
          "bg-danger-200 border-danger-800 text-danger-800 hover:opacity-80",
      },
      size: {
        xl: "text-lg leading-lg p-3",
        lg: "text-md leading-md px-2.5 py-2",
        md: "text-md leading-md p-2",
        sm: "text-sm leading-sm px-2 py-1.5",
        xs: "text-sm leading-xs p-1.5",
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
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  };

function Badge({
  className,
  variant = "default",
  size = "md",
  rounded = "md",
  asChild = false,
  startContent,
  endContent,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="span"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {startContent}
      {children}
      {endContent}
    </Comp>
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
