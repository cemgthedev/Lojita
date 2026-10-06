import { useImageContext } from "@/components/ui/image";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const imageContentVariants = cva(
  "size-full object-cover transition-opacity duration-300",
);

type ImageContentProps = React.ComponentProps<"img"> &
  VariantProps<typeof imageContentVariants>;

const ImageContent = React.forwardRef<HTMLImageElement, ImageContentProps>(
  ({ className, onLoad, onError, alt, ...props }, ref) => {
    const { loaded, error, setLoaded, setError } = useImageContext();

    return (
      <img
        ref={ref}
        data-slot="image-content"
        className={cn(
          !loaded && "opacity-0",
          loaded && "opacity-100",
          error && "hidden",
          imageContentVariants({
            className,
          }),
        )}
        onLoad={(event) => {
          setLoaded(true);

          onLoad?.(event);
        }}
        onError={(event) => {
          setError(true);

          onError?.(event);
        }}
        {...props}
      />
    );
  },
);

export { ImageContent, imageContentVariants };
export type { ImageContentProps };
