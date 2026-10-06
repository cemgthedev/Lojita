import { cn } from "@/utils/cn";

type TableCellProps = React.ComponentProps<"td">;

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

export { TableCell };
export type { TableCellProps };
