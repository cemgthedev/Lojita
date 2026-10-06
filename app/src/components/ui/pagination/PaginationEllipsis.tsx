import { cn } from "@/utils/cn";
import { MoreHorizontalIcon } from "lucide-react";

type PaginationEllipsisProps = React.ComponentProps<"span">;

function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export { PaginationEllipsis };
export type { PaginationEllipsisProps };