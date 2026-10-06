import { cn } from "@/utils/cn";

type FieldSetProps = React.ComponentProps<"fieldset">;

function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
}

export { FieldSet };
export type { FieldSetProps };
