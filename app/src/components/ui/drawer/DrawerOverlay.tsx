import { cn } from "@/utils/cn";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

type DrawerOverlayProps = React.ComponentProps<typeof DrawerPrimitive.Overlay>;

function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

export { DrawerOverlay };
export type { DrawerOverlayProps };
