import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;

function DialogClose({ ...props }: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export { DialogClose };
export type { DialogCloseProps };
