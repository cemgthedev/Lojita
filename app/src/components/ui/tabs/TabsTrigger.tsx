import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

const tabsTriggerVariants = cva(
  [
    "relative inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5",
    "rounded-md border border-transparent font-medium whitespace-nowrap",
    "focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-80",
  ],
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-background data-[state=active]:text-foreground hover:opacity-80",

        dark: "data-[state=active]:bg-dark data-[state=active]:text-dark-foreground hover:opacity-80",

        muted:
          "data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:opacity-60 hover:opacity-80",

        primary:
          "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:opacity-80",

        secondary:
          "data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground hover:opacity-80",

        success:
          "data-[state=active]:bg-success data-[state=active]:text-success-foreground hover:opacity-80",

        warning:
          "data-[state=active]:bg-warning data-[state=active]:text-warning-foreground hover:opacity-80",

        danger:
          "data-[state=active]:bg-danger data-[state=active]:text-danger-foreground hover:opacity-80",

        "dark-bordered":
          "data-[state=active]:border data-[state=active]:border-dark data-[state=active]:text-dark",

        "muted-bordered":
          "data-[state=active]:border data-[state=active]:border-muted data-[state=active]:text-muted data-[state=active]:opacity-60",

        "primary-bordered":
          "data-[state=active]:border data-[state=active]:border-primary data-[state=active]:text-primary",

        "secondary-bordered":
          "data-[state=active]:border data-[state=active]:border-secondary data-[state=active]:text-secondary",

        "success-bordered":
          "data-[state=active]:border data-[state=active]:border-success data-[state=active]:text-success",

        "warning-bordered":
          "data-[state=active]:border data-[state=active]:border-warning data-[state=active]:text-warning",

        "danger-bordered":
          "data-[state=active]:border data-[state=active]:border-danger data-[state=active]:text-danger",

        ghost:
          "data-[state=active]:bg-transparent data-[state=active]:border-transparent hover:bg-muted",

        "dark-ghost":
          "data-[state=active]:bg-muted data-[state=active]:border-dark data-[state=active]:text-dark hover:opacity-80",

        "primary-ghost":
          "data-[state=active]:bg-primary-200 data-[state=active]:border-primary-800 data-[state=active]:text-primary-800 hover:opacity-80",

        "secondary-ghost":
          "data-[state=active]:bg-secondary-200 data-[state=active]:border-secondary-800 data-[state=active]:text-secondary-800 hover:opacity-80",

        "success-ghost":
          "data-[state=active]:bg-success-200 data-[state=active]:border-success-800 data-[state=active]:text-success-800 hover:opacity-80",

        "warning-ghost":
          "data-[state=active]:bg-warning-200 data-[state=active]:border-warning-800 data-[state=active]:text-warning-800 hover:opacity-80",

        "danger-ghost":
          "data-[state=active]:bg-danger-200 data-[state=active]:border-danger-800 data-[state=active]:text-danger-800 hover:opacity-80",
      },

      size: {
        xl: "text-lg px-3 py-2.5",
        lg: "text-md px-2.5 py-2",
        md: "text-md px-2 py-1.5",
        sm: "text-sm px-1.5 py-1",
        xs: "text-sm px-1 py-0.5",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>;

function TabsTrigger({ variant, size, className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { TabsTrigger, tabsTriggerVariants };
export type { TabsTriggerProps };
