import { cn } from "@/utils/cn";

type FieldContentProps = React.ComponentProps<"div">;

function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className,
      )}
      {...props}
    />
  );
}

export { FieldContent };
export type { FieldContentProps };
