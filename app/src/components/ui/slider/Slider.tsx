import { cn } from "@/utils/cn";
import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

export const sliderVariants = cva("", {
  variants: {
    variant: {
      default:
        "[&_[data-slot=slider-range]]:bg-muted [&_[data-slot=slider-thumb]]:bg-muted [&_[data-slot=slider-thumb]]:border-muted",

      dark: "[&_[data-slot=slider-range]]:bg-dark [&_[data-slot=slider-thumb]]:bg-dark [&_[data-slot=slider-thumb]]:border-dark",

      muted:
        "[&_[data-slot=slider-range]]:bg-muted/60 [&_[data-slot=slider-thumb]]:bg-muted [&_[data-slot=slider-thumb]]:border-muted [&_[data-slot=slider-thumb]]:opacity-60",

      primary:
        "[&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary",

      secondary:
        "[&_[data-slot=slider-range]]:bg-secondary [&_[data-slot=slider-thumb]]:bg-secondary [&_[data-slot=slider-thumb]]:border-secondary",

      success:
        "[&_[data-slot=slider-range]]:bg-success [&_[data-slot=slider-thumb]]:bg-success [&_[data-slot=slider-thumb]]:border-success",

      warning:
        "[&_[data-slot=slider-range]]:bg-warning [&_[data-slot=slider-thumb]]:bg-warning [&_[data-slot=slider-thumb]]:border-warning",

      danger:
        "[&_[data-slot=slider-range]]:bg-danger [&_[data-slot=slider-thumb]]:bg-danger [&_[data-slot=slider-thumb]]:border-danger",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderVariants>;

function Slider({
  className,
  variant,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps) {
  const values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
        sliderVariants({ variant }),
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-muted/30 data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>

      {Array.from({ length: values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="relative block size-3 shrink-0 rounded-full border ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
export type { SliderProps };
