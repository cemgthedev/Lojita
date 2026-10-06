import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

function Drawer({ ...props }: DrawerProps) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

export { Drawer };
export type { DrawerProps };
