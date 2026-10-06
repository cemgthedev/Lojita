import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>;

function SheetTrigger({ ...props }: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export { SheetTrigger };
export type { SheetTriggerProps };
