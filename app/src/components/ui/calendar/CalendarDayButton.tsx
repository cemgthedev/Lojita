import { CalendarButton } from "@/components/ui";
import { cn } from "@/utils/cn";
import React from "react";
import {
  type DayButton,
  type Locale,
  getDefaultClassNames,
} from "react-day-picker";

import { pt } from "react-day-picker/locale";

type CalendarDayButtonProps = React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>;
} & {
  variant?: React.ComponentProps<typeof CalendarButton>["variant"];
  rounded?: React.ComponentProps<typeof CalendarButton>["rounded"];
};

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale = pt,
  variant = "ghost",
  rounded = "md",
  ...props
}: CalendarDayButtonProps) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <CalendarButton
      ref={ref}
      variant={variant}
      rounded={rounded}
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-today={modifiers.today}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-l-(--cell-radius) data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { CalendarDayButton };
export type { CalendarDayButtonProps };
