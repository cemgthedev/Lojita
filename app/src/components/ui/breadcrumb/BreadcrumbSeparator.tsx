import * as React from "react";

import { cn } from "@/utils/cn";
import { ChevronRightIcon } from "lucide-react";

type BreadcrumbSeparatorProps = React.ComponentProps<"li">;

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

export { BreadcrumbSeparator };
export type { BreadcrumbSeparatorProps };
