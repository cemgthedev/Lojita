import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

const baseStyleTabsTrigger = cn(
  "relative inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5 rounded-md border border-transparent font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
  "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
);

const tabsTriggerVariants = cva(baseStyleTabsTrigger, {
  variants: {
    variant: {
      default:
        "data-active:bg-background data-active:text-foreground hover:opacity-80",

      dark: "data-active:bg-dark data-active:text-dark-foreground hover:opacity-80",

      muted:
        "data-active:bg-muted data-active:text-foreground data-active:opacity-60 hover:opacity-80",

      primary:
        "data-active:bg-primary data-active:text-primary-foreground hover:opacity-80",

      secondary:
        "data-active:bg-secondary data-active:text-secondary-foreground hover:opacity-80",

      success:
        "data-active:bg-success data-active:text-success-foreground hover:opacity-80",

      warning:
        "data-active:bg-warning data-active:text-warning-foreground hover:opacity-80",

      danger:
        "data-active:bg-danger data-active:text-danger-foreground hover:opacity-80",

      "dark-bordered":
        "data-active:border data-active:border-dark data-active:text-dark",

      "muted-bordered":
        "data-active:border data-active:border-muted data-active:text-muted data-active:opacity-60",

      "primary-bordered":
        "data-active:border data-active:border-primary data-active:text-primary",

      "secondary-bordered":
        "data-active:border data-active:border-secondary data-active:text-secondary",

      "success-bordered":
        "data-active:border data-active:border-success data-active:text-success",

      "warning-bordered":
        "data-active:border data-active:border-warning data-active:text-warning",

      "danger-bordered":
        "data-active:border data-active:border-danger data-active:text-danger",

      ghost:
        "data-active:bg-transparent data-active:border-transparent hover:bg-muted",

      "dark-ghost":
        "data-active:bg-muted data-active:border-dark data-active:text-dark hover:opacity-80",

      "primary-ghost":
        "data-active:bg-primary-200 data-active:border-primary-800 data-active:text-primary-800 hover:opacity-80",

      "secondary-ghost":
        "data-active:bg-secondary-200 data-active:border-secondary-800 data-active:text-secondary-800 hover:opacity-80",

      "success-ghost":
        "data-active:bg-success-200 data-active:border-success-800 data-active:text-success-800 hover:opacity-80",

      "warning-ghost":
        "data-active:bg-warning-200 data-active:border-warning-800 data-active:text-warning-800 hover:opacity-80",

      "danger-ghost":
        "data-active:bg-danger-200 data-active:border-danger-800 data-active:text-danger-800 hover:opacity-80",
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
});

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>;

function TabsTrigger({ variant, size, className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { TabsTrigger };
export type { TabsTriggerProps };
