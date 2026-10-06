import * as React from "react";

import { cn } from "@/utils/cn";

type DialogHeaderProps = React.ComponentProps<"div">;

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

export { DialogHeader };
export type { DialogHeaderProps };
