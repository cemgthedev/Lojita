import { PaginationLink } from "@/components/ui/pagination";
import { cn } from "@/utils/cn";
import { ChevronRightIcon } from "lucide-react";

type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & {
  text?: string;
};

function PaginationNext({
  className,
  text = "Próximo",
  ...props
}: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Vá para a próxima página"
      className={cn("group", className)}
      {...props}
    >
      <span>{text}</span>
      <ChevronRightIcon className="group-data-[size=xs]:size-3 group-data-[size=sm]:size-4 group-data-[size=md]:size-5 group-data-[size=lg]:size-6 group-data-[size=xl]:size-7" />
    </PaginationLink>
  );
}

export { PaginationNext };
export type { PaginationNextProps };
