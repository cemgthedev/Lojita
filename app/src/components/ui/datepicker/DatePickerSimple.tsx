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

type DatePickerSimpleProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  "mode"
> & {
  value?: Date;
  defaultValue?: Date;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  formatString?: string;
  onChange?: (date: Date | undefined) => void;

  //variants
  inputVariant?: React.ComponentProps<typeof InputDate>["variant"];
  inputRounded?: React.ComponentProps<typeof InputDate>["rounded"];
  calendarVariant?: React.ComponentProps<typeof CalendarButton>["variant"];
  calendarRounded?: React.ComponentProps<typeof CalendarButton>["rounded"];
};

const DatePickerSimple = React.forwardRef<
  HTMLButtonElement,
  DatePickerSimpleProps
>(
  (
    {
      value,
      defaultValue,
      placeholder = "Selecione uma data",
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

    const [internalDate, setInternalDate] = React.useState<Date | undefined>(
      defaultValue,
    );

    const selectedDate = value ?? internalDate;

    const handleSelect = (date: Date | undefined) => {
      if (!value) {
        setInternalDate(date);
      }

      onChange?.(date);

      if (date) {
        setOpen(false);
      }
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (!value) {
        setInternalDate(undefined);
      }

      onChange?.(undefined);
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
                {clearable && selectedDate && (
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
                !selectedDate && "text-muted-foreground",
              )}
            >
              {selectedDate ? format(selectedDate, formatString) : placeholder}
            </span>
          </InputDate>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
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

export { DatePickerSimple };
export type { DatePickerSimpleProps };
