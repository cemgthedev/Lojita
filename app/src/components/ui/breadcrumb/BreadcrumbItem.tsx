import * as React from "react";

import { cn } from "@/utils/cn";

type BreadcrumbItemProps = React.ComponentProps<"li">;

function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { BreadcrumbItem };
export type { BreadcrumbItemProps };
