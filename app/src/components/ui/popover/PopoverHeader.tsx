import { cn } from "@/utils/cn";

type PopoverHeaderProps = React.ComponentProps<"div">;

function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  );
}

export { PopoverHeader };
export type { PopoverHeaderProps };
