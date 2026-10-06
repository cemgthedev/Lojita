type PaginationItemProps = React.ComponentProps<"li">;

function PaginationItem({ ...props }: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
}

export { PaginationItem };
export type { PaginationItemProps };
