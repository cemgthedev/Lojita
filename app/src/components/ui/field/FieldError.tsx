import { useMemo } from "react";

import { cn } from "@/utils/cn";

type FieldErrorProps = React.ComponentProps<"div"> & {
  errors?: { message?: string }[];
};

function FieldError({
  className,
  children,
  errors,
  ...props
}: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-danger", className)}
      {...props}
    >
      {content}
    </div>
  );
}

export { FieldError };
export type { FieldErrorProps };
