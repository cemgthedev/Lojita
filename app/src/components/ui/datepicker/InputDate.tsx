import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

const inputDateVariants = cva(
  "flex justify-between items-center gap-2 px-3 transition-all border border-border cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground border-gray-200 hover:border-gray-400 focus-within:border-gray-900",
        dark: "bg-dark text-dark-foreground border-gray-200 hover:border-gray-400 focus-within:border-gray-200",
        muted:
          "bg-background text-foreground border-gray-200 hover:border-gray-400 focus-within:border-gray-900 opacity-60",
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

type InputDateProps = React.ComponentProps<"button"> &
  VariantProps<typeof inputDateVariants> & {
    asChild?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  };

function InputDate({
  className,
  variant = "default",
  size = "md",
  rounded = "md",
  asChild = false,
  startContent = null,
  endContent = null,
  children,
  ...props
}: InputDateProps) {
  if (asChild)
    return (
      <div
        className={cn(inputDateVariants({ variant, size, rounded, className }))}
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
      className={cn(inputDateVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {startContent}

      {children}

      {endContent}
    </button>
  );
}

export { InputDate, inputDateVariants };
export type { InputDateProps };
