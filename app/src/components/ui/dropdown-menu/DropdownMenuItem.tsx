import { cva, type VariantProps } from "class-variance-authority";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";

const dropdownMenuItemVariants = cva(
  "group/dropdown-menu-item border border-transparent relative flex cursor-default items-center gap-1.5 rounded-md outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      inset: {
        true: "pl-7",
        false: "",
      },

      variant: {
        default: "bg-transparent text-foreground hover:opacity-80",
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
        xl: "text-xl p-2",
        lg: "text-lg p-2",
        md: "text-md p-2",
        sm: "text-sm p-2",
        xs: "text-xs p-2",
      },
    },

    defaultVariants: {
      inset: false,
      variant: "default",
      size: "md",
    },
  },
);

type DropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
> &
  VariantProps<typeof dropdownMenuItemVariants>;

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  size = "md",
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        dropdownMenuItemVariants({
          inset,
          variant,
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { DropdownMenuItem, dropdownMenuItemVariants };
export type { DropdownMenuItemProps };
