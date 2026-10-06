import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";

const radioGroupItemVariants = cva(
  "group/radio-group-item peer relative flex shrink-0 items-center justify-center border transition-colors outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-checked:hover:opacity-100",

  {
    variants: {
      variant: {
        default:
          "bg-muted text-foreground border-input data-checked:border-muted data-checked:bg-muted data-checked:text-primary-foreground hover:opacity-80 aria-invalid:data-checked:border-primary",

        dark: "bg-dark text-dark-foreground border-dark data-checked:border-dark data-checked:bg-dark data-checked:text-dark-foreground hover:opacity-80 aria-invalid:data-checked:border-dark",

        muted:
          "bg-muted text-muted-foreground border-muted data-checked:border-muted data-checked:bg-muted data-checked:text-muted-foreground opacity-60 hover:opacity-80 aria-invalid:data-checked:border-muted",

        primary:
          "bg-primary text-primary-foreground border-primary data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground hover:opacity-80 aria-invalid:data-checked:border-primary",

        secondary:
          "bg-secondary text-secondary-foreground border-secondary data-checked:border-secondary data-checked:bg-secondary data-checked:text-secondary-foreground hover:opacity-80 aria-invalid:data-checked:border-secondary",

        success:
          "bg-success text-success-foreground border-success data-checked:border-success data-checked:bg-success data-checked:text-success-foreground hover:opacity-80 aria-invalid:data-checked:border-success",

        warning:
          "bg-warning text-warning-foreground border-warning data-checked:border-warning data-checked:bg-warning data-checked:text-warning-foreground hover:opacity-80 aria-invalid:data-checked:border-warning",

        danger:
          "bg-danger text-danger-foreground border-danger data-checked:border-danger data-checked:bg-danger data-checked:text-danger-foreground hover:opacity-80 aria-invalid:data-checked:border-danger",

        "dark-bordered":
          "border-dark text-dark data-checked:border-dark data-checked:bg-dark data-checked:text-dark-foreground hover:bg-dark hover:text-dark-foreground aria-invalid:data-checked:border-dark",

        "muted-bordered":
          "border-muted text-muted opacity-60 data-checked:border-muted data-checked:bg-muted data-checked:text-muted-foreground hover:bg-muted hover:text-muted-foreground aria-invalid:data-checked:border-muted",

        "primary-bordered":
          "border-primary text-primary data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground hover:bg-primary hover:text-primary-foreground aria-invalid:data-checked:border-primary",

        "secondary-bordered":
          "border-secondary text-secondary data-checked:border-secondary data-checked:bg-secondary data-checked:text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground aria-invalid:data-checked:border-secondary",

        "success-bordered":
          "border-success text-success data-checked:border-success data-checked:bg-success data-checked:text-success-foreground hover:bg-success hover:text-success-foreground aria-invalid:data-checked:border-success",

        "warning-bordered":
          "border-warning text-warning data-checked:border-warning data-checked:bg-warning data-checked:text-warning-foreground hover:bg-warning hover:text-warning-foreground aria-invalid:data-checked:border-warning",

        "danger-bordered":
          "border-danger text-danger data-checked:border-danger data-checked:bg-danger data-checked:text-danger-foreground hover:bg-danger hover:text-danger-foreground aria-invalid:data-checked:border-danger",

        "dark-ghost":
          "bg-muted border-dark text-dark data-checked:border-dark data-checked:bg-dark data-checked:text-dark-foreground hover:opacity-80 aria-invalid:data-checked:border-dark",

        "muted-ghost":
          "bg-muted border-dark text-dark opacity-60 data-checked:border-dark data-checked:bg-dark data-checked:text-dark-foreground hover:opacity-80 aria-invalid:data-checked:border-dark",

        "primary-ghost":
          "bg-primary-200 border-primary-800 text-primary-800 data-checked:border-primary-800 data-checked:bg-primary-800 data-checked:text-primary-foreground hover:opacity-80 aria-invalid:data-checked:border-primary-800",

        "secondary-ghost":
          "bg-secondary-200 border-secondary-800 text-secondary-800 data-checked:border-secondary-800 data-checked:bg-secondary-800 data-checked:text-secondary-foreground hover:opacity-80 aria-invalid:data-checked:border-secondary-800",

        "success-ghost":
          "bg-success-200 border-success-800 text-success-800 data-checked:border-success-800 data-checked:bg-success-800 data-checked:text-success-foreground hover:opacity-80 aria-invalid:data-checked:border-success-800",

        "warning-ghost":
          "bg-warning-200 border-warning-800 text-warning-800 data-checked:border-warning-800 data-checked:bg-warning-800 data-checked:text-warning-foreground hover:opacity-80 aria-invalid:data-checked:border-warning-800",

        "danger-ghost":
          "bg-danger-200 border-danger-800 text-danger-800 data-checked:border-danger-800 data-checked:bg-danger-800 data-checked:text-danger-foreground hover:opacity-80 aria-invalid:data-checked:border-danger-800",
      },

      size: {
        xl: "size-8",
        lg: "size-7",
        md: "size-6",
        sm: "size-5",
        xs: "size-4",
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
      rounded: "full",
    },
  },
);

type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
> &
  VariantProps<typeof radioGroupItemVariants>;

function RadioGroupItem({
  className,
  variant = "default",
  size = "md",
  rounded = "full",
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      data-size={size}
      data-rounded={rounded}
      className={cn(
        radioGroupItemVariants({ variant, size, rounded, className }),
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(
          "flex items-center justify-center",
          "group-data-[size=xl]/radio-group-item:size-8 group-data-[size=xl]/radio-group-item:[&_span]:size-5 group-data-[rounded=xl]/radio-group-item:[&_span]:rounded-sm group-data-[rounded=full]/radio-group-item:[&_span]:rounded-full",
          "group-data-[size=lg]/radio-group-item:size-7 group-data-[size=lg]/radio-group-item:[&_span]:size-4 group-data-[rounded=lg]/radio-group-item:[&_span]:rounded-sm",
          "group-data-[size=md]/radio-group-item:size-6 group-data-[size=md]/radio-group-item:[&_span]:size-3 group-data-[rounded=md]/radio-group-item:[&_span]:rounded-xs",
          "group-data-[size=sm]/radio-group-item:size-5 group-data-[size=sm]/radio-group-item:[&_span]:size-2.5 group-data-[rounded=sm]/radio-group-item:[&_span]:rounded-xs",
          "group-data-[size=xs]/radio-group-item:size-4 group-data-[size=xs]/radio-group-item:[&_span]:size-1.5 group-data-[rounded=xs]/radio-group-item:[&_span]:rounded-[2px]",
        )}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroupItem, radioGroupItemVariants };
export type { RadioGroupItemProps };
