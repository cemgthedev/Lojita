import { useImageContext } from "@/components/ui/image";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const imageSkeletonVariants = cva(
  "absolute inset-0 animate-pulse bg-linear-to-r",
  {
    variants: {
      variant: {
        default: "from-gray-200 to-gray-300",
        dark: "from-dark-600 to-dark-800",
        primary: "from-primary-200 to-primary-300",
        secondary: "from-secondary-200 to-secondary-300",
        success: "from-success-200 to-success-300",
        warning: "from-warning-200 to-warning-300",
        danger: "from-danger-200 to-danger-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ImageSkeletonProps = React.ComponentProps<"div"> &
  VariantProps<typeof imageSkeletonVariants>;

function ImageSkeleton({
  variant = "default",
  className,
  ...props
}: ImageSkeletonProps) {
  const { loaded, error } = useImageContext();

  if (loaded || error) {
    return null;
  }

  return (
    <div
      data-slot="image-skeleton"
      className={cn(imageSkeletonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { ImageSkeleton, imageSkeletonVariants };
export type { ImageSkeletonProps };
