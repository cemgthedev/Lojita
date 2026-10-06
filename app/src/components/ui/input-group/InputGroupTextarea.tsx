import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputGroupTextareaVariants = cva(
  "group/textarea bg-transparent border-none flex gap-2 w-full max-h-fit border overflow-hidden px-3 py-2 focus:outline-none",
);

type InputGroupTextareaProps = Omit<React.ComponentProps<"textarea">, "size"> &
  VariantProps<typeof inputGroupTextareaVariants>;

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(({ className, rows = 3, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={inputGroupTextareaVariants({
        className,
      })}
      {...props}
    />
  );
});

export { InputGroupTextarea, inputGroupTextareaVariants };
export type { InputGroupTextareaProps };
