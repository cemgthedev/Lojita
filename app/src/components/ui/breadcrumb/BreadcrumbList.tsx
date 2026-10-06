import * as React from "react";

import { cn } from "@/utils/cn";

type BreadcrumbListProps = React.ComponentProps<"ol">;

function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { BreadcrumbList };
export type { BreadcrumbListProps };
