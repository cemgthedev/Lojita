import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;

function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export { Dialog };
export type { DialogProps };
