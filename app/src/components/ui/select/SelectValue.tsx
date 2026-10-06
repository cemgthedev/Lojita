import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;

function SelectValue({ ...props }: SelectValueProps) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

export { SelectValue };
export type { SelectValueProps };
