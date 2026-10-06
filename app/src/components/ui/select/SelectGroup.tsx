import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";

type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}

export { SelectGroup };
export type { SelectGroupProps };
