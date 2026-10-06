import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";

type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>;

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { SelectLabel };
export type { SelectLabelProps };
