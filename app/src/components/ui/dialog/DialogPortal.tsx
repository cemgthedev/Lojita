import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>;

function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export { DialogPortal };
export type { DialogPortalProps };
