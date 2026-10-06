import { CarouselButton, useCarousel } from "@/components/ui/carousel";
import { cn } from "@/utils/cn";
import { ChevronRightIcon } from "lucide-react";

type CarouselNextProps = React.ComponentProps<typeof CarouselButton>;

function CarouselNext({
  className,
  variant = "dark-bordered",
  size = "sm",
  ...props
}: CarouselNextProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <CarouselButton
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -right-12 my-auto"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon />
      <span className="sr-only">Next slide</span>
    </CarouselButton>
  );
}

export { CarouselNext };
export type { CarouselNextProps };
