import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const messageVariants = cva("font-normal font-sans", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
    size: {
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
      xs: "text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type MessageProps = React.ComponentProps<"p"> &
  VariantProps<typeof messageVariants>;

function Message({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: MessageProps) {
  const Comp = "p";

  return (
    <Comp
      data-slot="p"
      data-variant={variant}
      data-size={size}
      className={cn(messageVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Message, messageVariants };
export type { MessageProps };
