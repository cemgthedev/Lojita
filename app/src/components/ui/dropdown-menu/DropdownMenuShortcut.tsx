import * as React from "react";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const dropdownMenuShortcutVariants = cva(
  "ml-auto tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
  {
    variants: {
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
        xl: "text-lg leading-lg p-3",
        lg: "text-md leading-md p-3",
        md: "text-md leading-md px-1.5 py-1",
        sm: "text-sm leading-sm p-2",
        xs: "text-sm leading-xs p-2",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type DropdownMenuShortcutProps = React.ComponentProps<"span"> &
  VariantProps<typeof dropdownMenuShortcutVariants>;

function DropdownMenuShortcut({
  variant = "default",
  size = "md",
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(dropdownMenuShortcutVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { DropdownMenuShortcut };
export type { DropdownMenuShortcutProps };
