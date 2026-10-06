import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

type DrawerPortalProps = React.ComponentProps<typeof DrawerPrimitive.Portal>;

function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

export { DrawerPortal };
export type { DrawerPortalProps };
