import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const cardFooterVariants = cva("group/card-footer flex flex-col", {
  variants: {
    size: {
      xl: "p-8 gap-8",
      lg: "p-6 gap-6",
      md: "p-4 gap-4",
      sm: "p-2 gap-2",
      xs: "p-1 gap-1",
      none: "",
    },
    rounded: {
      full: "rounded-full",
      xl: "rounded-xl",
      lg: "rounded-lg",
      md: "rounded-md",
      sm: "rounded-sm",
      xs: "rounded-xs",
      none: "",
    },
  },
  defaultVariants: {
    size: "none",
    rounded: "none",
  },
});

type CardFooterProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardFooterVariants>;

function CardFooter({ size, rounded, className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants({ size, rounded, className }))}
      {...props}
    />
  );
}

export { CardFooter, cardFooterVariants };
export type { CardFooterProps };
