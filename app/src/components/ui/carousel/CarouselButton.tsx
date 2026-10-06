import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";

const carouselButtonVariants = cva(
  "w-fit h-fit flex justify-center items-center gap-2 transition-all cursor-pointer",
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
          "border border-dark text-dark hover:bg-dark hover:text-dark-foreground",
        "muted-bordered":
          "border border-muted text-muted opacity-60 hover:bg-muted hover:text-muted-foreground",
        "primary-bordered":
          "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        "secondary-bordered":
          "border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
        "success-bordered":
          "border border-success text-success hover:bg-success hover:text-success-foreground",
        "warning-bordered":
          "border border-warning text-warning hover:bg-warning hover:text-warning-foreground",
        "danger-bordered":
          "border border-danger text-danger hover:bg-danger hover:text-danger-foreground",
        ghost: "bg-transparent border-transparent hover:bg-muted",
        "dark-ghost": "bg-muted border-dark text-dark hover:opacity-80",
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
        lg: "text-md leading-md p-3",
        md: "text-md leading-md p-2",
        sm: "text-sm leading-sm p-2",
        xs: "text-sm leading-xs p-2",
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

type CarouselButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof carouselButtonVariants> & {
    asChild?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  };

function CarouselButton({
  className,
  variant = "default",
  size = "md",
  rounded = "md",
  asChild = false,
  startContent = null,
  endContent = null,
  children,
  ...props
}: CarouselButtonProps) {
  if (asChild)
    return (
      <div
        className={cn(
          carouselButtonVariants({ variant, size, rounded, className }),
        )}
      >
        {startContent}

        <Slot.Root
          data-slot="button"
          data-variant={variant}
          data-size={size}
          {...props}
        >
          {children}
        </Slot.Root>

        {endContent}
      </div>
    );

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        carouselButtonVariants({ variant, size, rounded, className }),
      )}
      {...props}
    >
      {startContent}

      {children}

      {endContent}
    </button>
  );
}

export { CarouselButton, carouselButtonVariants };
export type { CarouselButtonProps };
