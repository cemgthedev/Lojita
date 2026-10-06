import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

type DrawerCloseProps = React.ComponentProps<typeof DrawerPrimitive.Close>;

function DrawerClose({ ...props }: DrawerCloseProps) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export { DrawerClose };
export type { DrawerCloseProps };
