import { cn } from "@/utils/cn";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

type DropdownMenuTriggerProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Trigger
>;

function DropdownMenuTrigger({
  className,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn("text-md", className)}
      {...props}
    />
  );
}

export { DropdownMenuTrigger };
export type { DropdownMenuTriggerProps };
