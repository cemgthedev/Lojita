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
import type { DayPicker } from "react-day-picker";
import { pt } from "react-day-picker/locale";

type DatePickerMultipleProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  "mode"
> & {
  value?: Date[];
  defaultValue?: Date[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  formatString?: string;
  onChange?: (dates: Date[]) => void;

  //variants
  inputVariant?: React.ComponentProps<typeof InputDate>["variant"];
  inputRounded?: React.ComponentProps<typeof InputDate>["rounded"];
  calendarVariant?: React.ComponentProps<typeof CalendarButton>["variant"];
  calendarRounded?: React.ComponentProps<typeof CalendarButton>["rounded"];
};

const DatePickerMultiple = React.forwardRef<
  HTMLButtonElement,
  DatePickerMultipleProps
>(
  (
    {
      value,
      defaultValue = [],
      placeholder = "Selecione datas",
      disabled,
      clearable = true,
      className,
      formatString = "dd/MM/yyyy",
      onChange,
      inputVariant = "default",
      inputRounded = "md",
      calendarVariant = "default",
      calendarRounded = "md",
      required = true,
      ...calendarProps
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const [internalDates, setInternalDates] =
      React.useState<Date[]>(defaultValue);

    const selectedDates = value ?? internalDates;

    const handleSelect = (dates: Date[]) => {
      if (!value) {
        setInternalDates(dates);
      }

      onChange?.(dates);
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (!value) {
        setInternalDates([]);
      }

      onChange?.([]);
    };

    const formatMultipleDates = (dates: Date[]): string => {
      if (dates.length === 0) return placeholder;
      if (dates.length === 1) return format(dates[0], formatString);
      return `${dates.length} datas selecionadas`;
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
                {clearable && selectedDates.length > 0 && (
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
                selectedDates.length === 0 && "text-muted-foreground",
              )}
            >
              {formatMultipleDates(selectedDates)}
            </span>
          </InputDate>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Calendar
            mode="multiple"
            required
            selected={selectedDates}
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

export { DatePickerMultiple };
export type { DatePickerMultipleProps };
