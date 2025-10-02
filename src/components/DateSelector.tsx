import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const DateSelector = ({ date, onDateSelect }: DateSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <CalendarIcon className="w-4 h-4 text-primary" />
        Date
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start h-12 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateSelect}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
