import { Tooltip as TooltipPrimitive } from "radix-ui";

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

function Tooltip({ ...props }: TooltipProps) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

export { Tooltip };
export type { TooltipProps };
