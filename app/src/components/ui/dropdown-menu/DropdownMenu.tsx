import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

type DropdownMenuProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Root
>;

function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export { DropdownMenu };
export type { DropdownMenuProps };
