import * as React from "react";

import { cn } from "@/utils/cn";
import { MoreHorizontalIcon } from "lucide-react";

type BreadcrumbEllipsisProps = React.ComponentProps<"span">;

function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More</span>
    </span>
  );
}

export { BreadcrumbEllipsis };
export type { BreadcrumbEllipsisProps };
