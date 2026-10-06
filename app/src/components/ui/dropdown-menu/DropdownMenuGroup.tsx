import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

type DropdownMenuGroupProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Group
>;

function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

export { DropdownMenuGroup };
export type { DropdownMenuGroupProps };
