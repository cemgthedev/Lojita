import * as React from "react";

import { cn } from "@/utils/cn";

type BreadcrumbProps = React.ComponentProps<"nav">;

function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
}

export { Breadcrumb };
export type { BreadcrumbProps };
