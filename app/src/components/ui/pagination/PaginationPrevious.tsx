import { PaginationLink } from "@/components/ui/pagination";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon } from "lucide-react";

type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink> & {
  text?: string;
};

function PaginationPrevious({
  className,
  text = "Anterior",
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Vá para a página anterior"
      className={cn("group", className)}
      {...props}
    >
      <ChevronLeftIcon className="group-data-[size=xs]:size-3 group-data-[size=sm]:size-4 group-data-[size=md]:size-5 group-data-[size=lg]:size-6 group-data-[size=xl]:size-7" />
      <span>{text}</span>
    </PaginationLink>
  );
}

export { PaginationPrevious };
export type { PaginationPreviousProps };
