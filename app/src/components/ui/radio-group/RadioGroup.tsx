import { cn } from "@/utils/cn";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

export { RadioGroup };
export type { RadioGroupProps };
