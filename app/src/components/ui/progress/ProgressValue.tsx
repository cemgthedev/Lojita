import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Progress as ProgressPrimitive } from "radix-ui";

const progressValueVariants = cva(
  "h-full w-full flex-1 transition-transform duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-gray-600",
        dark: "bg-dark",
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
      },
      striped: {
        true: "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-size-[1rem_1rem]",
        false: "",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      striped: false,
      animated: false,
    },
  },
);

type ProgressValueProps = React.ComponentProps<
  typeof ProgressPrimitive.Indicator
> &
  VariantProps<typeof progressValueVariants> & {
    value?: number;
  };

function ProgressValue({
  className,
  value = 0,
  variant,
  striped = false,
  animated = false,
  style,
  ...props
}: ProgressValueProps) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-value"
      className={cn(
        progressValueVariants({
          variant,
          striped,
          animated,
        }),
        className,
      )}
      style={{
        transform: `translateX(-${100 - value}%)`,
        ...style,
      }}
      {...props}
    />
  );
}

export { ProgressValue, progressValueVariants };
export type { ProgressValueProps };
