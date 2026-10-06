import { cn } from "@/utils/cn";

type TableCaptionProps = React.ComponentProps<"caption">;

function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { TableCaption };
export type { TableCaptionProps };
