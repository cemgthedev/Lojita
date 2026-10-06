import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type DialogFooterProps = React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
};

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="dark-bordered">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

export { DialogFooter };
export type { DialogFooterProps };
