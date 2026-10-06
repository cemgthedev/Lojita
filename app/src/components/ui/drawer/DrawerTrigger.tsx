import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

type DrawerTriggerProps = React.ComponentProps<typeof DrawerPrimitive.Trigger>;

function DrawerTrigger({ ...props }: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export { DrawerTrigger };
export type { DrawerTriggerProps };
