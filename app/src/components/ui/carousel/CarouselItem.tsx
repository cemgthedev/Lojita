import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/utils/cn";

type CarouselItemProps = React.ComponentProps<"div">;

function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

export { CarouselItem };
export type { CarouselItemProps };
