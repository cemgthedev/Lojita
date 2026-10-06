import { cn } from "@/utils/cn";

type PaginationContentProps = React.ComponentProps<"ul">;

function PaginationContent({ className, ...props }: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { PaginationContent };
export type { PaginationContentProps };
