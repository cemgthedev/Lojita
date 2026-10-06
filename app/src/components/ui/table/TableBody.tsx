import { cn } from "@/utils/cn";

type TableBodyProps = React.ComponentProps<"tbody">;

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export { TableBody };
export type { TableBodyProps };
