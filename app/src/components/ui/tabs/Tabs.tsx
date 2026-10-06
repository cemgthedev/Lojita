import { cn } from "@/utils/cn";
import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

function Tabs({ className, orientation = "horizontal", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs };
export type { TabsProps };
