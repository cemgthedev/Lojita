import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const imageOverlayVariants = cva(
  "absolute inset-0 bg-linear-to-t to-transparent p-2 text-white",
  {
    variants: {
      variant: {
        default: "from-transparent via-transparent",
        dark: "from-dark/60 via-dark/20 text-dark-foreground",
        muted: "from-muted/60 via-muted/20 text-muted-foreground",
        primary: "from-primary/60 via-primary/20 text-primary-foreground",
        secondary:
          "from-secondary/60 via-secondary/20 text-secondary-foreground",
        success: "from-success/60 via-success/20 text-success-foreground",
        warning: "from-warning/60 via-warning/20 text-warning-foreground",
        danger: "from-danger/60 via-danger/20 text-danger-foreground",
      },
      position: {
        "top-left": "flex items-start justify-start",
        "top-right": "flex items-start justify-end",
        "bottom-left": "flex items-end justify-start",
        "bottom-right": "flex items-end justify-end",
      },
    },
  },
);

type ImageOverlayProps = React.ComponentProps<"div"> &
  VariantProps<typeof imageOverlayVariants>;

function ImageOverlay({
  position = "bottom-right",
  variant = "default",
  className,
  ...props
}: ImageOverlayProps) {
  return (
    <div
      data-slot="image-overlay"
      className={cn(imageOverlayVariants({ variant, position, className }))}
      {...props}
    />
  );
}

export { ImageOverlay, imageOverlayVariants };
export type { ImageOverlayProps };
