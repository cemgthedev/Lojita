import { Calendar, type CalendarButton } from "@/components/ui/calendar";
import { InputDate } from "@/components/ui/datepicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import React from "react";
import type { DateRange, DayPicker } from "react-day-picker";
import { pt } from "react-day-picker/locale";

type DatePickerRangeProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  "mode"
> & {
  value?: DateRange | undefined;
  defaultValue?: DateRange;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  formatString?: string;
  onChange?: (date: DateRange | undefined) => void;

  //variants
  inputVariant?: React.ComponentProps<typeof InputDate>["variant"];
  inputRounded?: React.ComponentProps<typeof InputDate>["rounded"];
  calendarVariant?: React.ComponentProps<typeof CalendarButton>["variant"];
  calendarRounded?: React.ComponentProps<typeof CalendarButton>["rounded"];
};

const DatePickerRange = React.forwardRef<
  HTMLButtonElement,
  DatePickerRangeProps
>(
  (
    {
      value,
      defaultValue,
      placeholder = "Selecione um período",
      disabled,
      clearable = true,
      className,
      formatString = "dd/MM/yyyy",
      onChange,
      inputVariant = "default",
      inputRounded = "md",
      calendarVariant = "default",
      calendarRounded = "md",
      ...calendarProps
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const [internalRange, setInternalRange] = React.useState<
      DateRange | undefined
    >(defaultValue);

    const selectedRange = value ?? internalRange;

    const handleSelect = (range: DateRange | undefined) => {
      if (!value) {
        setInternalRange(range);
      }

      onChange?.(range);

      if (range?.from && range?.to) {
        setOpen(false);
      }
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (!value) {
        setInternalRange(undefined);
      }

      onChange?.(undefined);
    };

    const formatRange = (range: DateRange | undefined): string => {
      if (!range?.from) return placeholder;
      if (range.to) {
        return `${format(range.from, formatString)} - ${format(range.to, formatString)}`;
      }
      return format(range.from, formatString);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <InputDate
            ref={ref}
            disabled={disabled}
            variant={inputVariant}
            rounded={inputRounded}
            className={className}
            endContent={
              <div className="flex items-center gap-1">
                {clearable && selectedRange?.from && (
                  <span
                    role="button"
                    onClick={handleClear}
                    className={cn(
                      "rounded-sm p-0.5 transition-colors",
                      "hover:bg-muted-foreground/10",
                    )}
                  >
                    <X className="size-4 opacity-70" />
                  </span>
                )}

                <CalendarIcon className="size-4 opacity-70" />
              </div>
            }
          >
            <span
              className={cn(
                "truncate",
                !selectedRange?.from && "text-muted-foreground",
              )}
            >
              {formatRange(selectedRange)}
            </span>
          </InputDate>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            locale={pt}
            showOutsideDays
            calendarButtonVariant={calendarVariant}
            calendarButtonRounded={calendarRounded}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

export { DatePickerRange };
export type { DatePickerRangeProps };
