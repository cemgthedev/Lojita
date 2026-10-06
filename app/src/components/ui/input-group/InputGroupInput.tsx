import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputGroupInputVariants = cva(
  "group/input bg-transparent h-8 border-none flex gap-2 w-full items-center overflow-hidden px-3 focus:outline-none",
);

type InputGroupInputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputGroupInputVariants>;

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={inputGroupInputVariants({
        className,
      })}
      {...props}
    />
  );
});

export { InputGroupInput, inputGroupInputVariants };
export type { InputGroupInputProps };
