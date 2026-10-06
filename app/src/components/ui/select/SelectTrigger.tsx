import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

const selectTriggerVariants = cva(
  "flex w-fit items-center justify-between gap-1.5 border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground border-gray-200 hover:border-gray-400 focus-within:border-gray-900",
        dark: "bg-dark text-dark-foreground border-gray-200 hover:border-gray-400 focus-within:border-gray-200",
        muted:
          "bg-background text-foreground border-muted-200 hover:border-muted-400 focus-within:border-muted-900 opacity-60",
        primary:
          "bg-background text-primary-800 border-primary-200 hover:border-primary-400 focus-within:border-primary-900",
        secondary:
          "bg-background text-secondary-800 border-secondary-200 hover:border-secondary-400 focus-within:border-secondary-900",
        success:
          "bg-background text-success-800 border-success-200 hover:border-success-400 focus-within:border-success-900",
        warning:
          "bg-background text-warning-800 border-warning-200 hover:border-warning-400 focus-within:border-warning-900",
        danger:
          "bg-background text-danger-800 border-danger-200 hover:border-danger-400 focus-within:border-danger-900",
      },
      size: {
        xl: "min-h-13 max-h-13",
        lg: "min-h-12 max-h-12",
        md: "min-h-11 max-h-11",
        sm: "min-h-10 max-h-10",
        xs: "min-h-9 max-h-9",
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

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>;

function SelectTrigger({
  variant,
  size,
  rounded,
  className,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        selectTriggerVariants({ variant, size, rounded, className }),
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export { SelectTrigger };
export type { SelectTriggerProps };
