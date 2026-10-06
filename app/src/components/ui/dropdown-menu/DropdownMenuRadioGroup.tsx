import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

type DropdownMenuRadioGroupProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioGroup
>;

function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

export { DropdownMenuRadioGroup };
export type { DropdownMenuRadioGroupProps };
