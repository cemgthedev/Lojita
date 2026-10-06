import { cn } from "@/utils/cn";

type PaginationProps = React.ComponentProps<"nav">;

function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export { Pagination };
export type { PaginationProps };
