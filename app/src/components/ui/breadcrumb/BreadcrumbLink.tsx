import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";

type BreadcrumbLinkProps = React.ComponentProps<"a"> & {
  asChild?: boolean;
};

function BreadcrumbLink({ asChild, className, ...props }: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
}

export { BreadcrumbLink };
export type { BreadcrumbLinkProps };
