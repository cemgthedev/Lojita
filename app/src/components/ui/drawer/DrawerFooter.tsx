import { cn } from "@/utils/cn";
import * as React from "react";

type DrawerFooterProps = React.ComponentProps<"div">;

function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

export { DrawerFooter };
export type { DrawerFooterProps };
