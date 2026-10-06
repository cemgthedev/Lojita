import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;

function Select({ ...props }: SelectProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export { Select };
export type { SelectProps };
