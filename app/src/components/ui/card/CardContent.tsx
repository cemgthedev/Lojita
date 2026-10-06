import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const cardContentVariants = cva("group/card-content flex flex-col", {
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

type CardContentProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardContentVariants>;

function CardContent({ size, rounded, className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants({ size, rounded, className }))}
      {...props}
    />
  );
}

export { CardContent, cardContentVariants };
export type { CardContentProps };
