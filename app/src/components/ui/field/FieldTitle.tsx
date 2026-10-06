import { cn } from "@/utils/cn";

type FieldTitleProps = React.ComponentProps<"div">;

function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-md font-medium group-data-[disabled=true]/field:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { FieldTitle };
export type { FieldTitleProps };
