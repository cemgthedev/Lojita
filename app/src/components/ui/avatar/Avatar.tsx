import { Avatar as AvatarPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  "group/avatar relative flex shrink-0 select-none",
  {
    variants: {
      size: {
        xl: "w-13 h-13",
        lg: "w-12 h-12",
        md: "w-11 h-11",
        sm: "w-10 h-10",
        xs: "w-9 h-9",
      },
      rounded: {
        full: "rounded-full",
        xl: "rounded-xl",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
        xs: "rounded-xs",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
    },
  },
);

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>;

function Avatar({
  size = "md",
  rounded = "full",
  className,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-rounded={rounded}
      className={cn(avatarVariants({ size, rounded, className }))}
      {...props}
    />
  );
}

export { Avatar, avatarVariants };
export type { AvatarProps };
