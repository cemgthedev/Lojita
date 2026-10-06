import { cn } from "@/utils/cn";
import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>;

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  );
}

export { TabsContent };
export type { TabsContentProps };
