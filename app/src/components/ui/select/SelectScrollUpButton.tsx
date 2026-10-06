import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";
import { ChevronUpIcon } from "lucide-react";

type SelectScrollUpButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
>;

function SelectScrollUpButton({
  className,
  ...props
}: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
}

export { SelectScrollUpButton };
export type { SelectScrollUpButtonProps };
