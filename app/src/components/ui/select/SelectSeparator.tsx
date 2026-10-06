import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";

type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive.Separator
>;

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export { SelectSeparator };
export type { SelectSeparatorProps };
