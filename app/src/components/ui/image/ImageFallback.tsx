import { useImageContext } from "@/components/ui/image";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const imageFallbackVariants = cva(
  "flex size-full items-center justify-center bg-muted text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        dark: "bg-dark text-dark-foreground",
        muted: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ImageFallbackProps = React.ComponentProps<"div"> &
  VariantProps<typeof imageFallbackVariants>;

function ImageFallback({
  className,
  variant = "default",
  ...props
}: ImageFallbackProps) {
  const { error } = useImageContext();

  if (!error) {
    return null;
  }

  return (
    <div
      data-slot="image-fallback"
      className={cn(imageFallbackVariants({ variant, className }))}
      {...props}
    />
  );
}

export { ImageFallback, imageFallbackVariants };
export type { ImageFallbackProps };
