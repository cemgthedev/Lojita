import { useCarousel } from "@/components/ui/carousel";
import { CarouselButton } from "@/components/ui/carousel";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon } from "lucide-react";

type CarouselPreviousProps = React.ComponentProps<typeof CarouselButton>;

function CarouselPrevious({
  className,
  variant = "dark-bordered",
  size = "sm",
  ...props
}: CarouselPreviousProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <CarouselButton
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -left-12 my-auto"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="sr-only">Previous slide</span>
    </CarouselButton>
  );
}

export { CarouselPrevious };
export type { CarouselPreviousProps };
