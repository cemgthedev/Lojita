import { cn } from "@/utils/cn";

type PopoverDescriptionProps = React.ComponentProps<"p">;

function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

export { PopoverDescription };
export type { PopoverDescriptionProps };