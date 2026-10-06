import {
  PaginationButton,
  type paginationButtonVariants,
} from "@/components/ui/pagination";
import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";

type PaginationLinkProps = Pick<
  React.ComponentProps<typeof PaginationButton>,
  "size"
> &
  VariantProps<typeof paginationButtonVariants> &
  React.ComponentProps<"a"> & {
    isActive?: boolean;
  };

function PaginationLink({
  className,
  variant,
  size = "md",
  rounded = "md",
  isActive = false,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationButton
      asChild
      variant={variant ? variant : "ghost"}
      size={size}
      rounded={rounded}
      className={cn(className)}
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </PaginationButton>
  );
}

export { PaginationLink };
export type { PaginationLinkProps };
