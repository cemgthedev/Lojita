import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/utils/cn";

type CarouselContentProps = React.ComponentProps<"div">;

function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { CarouselContent };
export type { CarouselContentProps };
