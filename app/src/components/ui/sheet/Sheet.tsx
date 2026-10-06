import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

function Sheet({ ...props }: SheetProps) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

export { Sheet };
export type { SheetProps };
