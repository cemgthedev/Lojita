import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

type DropdownMenuSubProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Sub
>;

function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

export { DropdownMenuSub };
export type { DropdownMenuSubProps };
