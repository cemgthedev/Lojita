import * as React from "react";

import { cn } from "@/utils/cn";

type BreadcrumbPageProps = React.ComponentProps<"span">;

function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
}

export { BreadcrumbPage };
export type { BreadcrumbPageProps };
