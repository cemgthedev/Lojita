import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>;

function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export { DialogTrigger };
export type { DialogTriggerProps };
