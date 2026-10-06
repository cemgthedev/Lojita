import { cn } from "@/utils/cn";

type FieldLegendProps = React.ComponentProps<"legend"> & {
  variant?: "legend" | "label";
};

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { FieldLegend };
export type { FieldLegendProps };
