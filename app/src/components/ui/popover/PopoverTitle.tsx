import { cn } from "@/utils/cn";

type PopoverTitleProps = React.ComponentProps<"h2">;

function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}
export { PopoverTitle };
export type { PopoverTitleProps };
