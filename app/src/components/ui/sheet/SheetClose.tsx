import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

function SheetClose({ ...props }: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

export { SheetClose };
export type { SheetCloseProps };
