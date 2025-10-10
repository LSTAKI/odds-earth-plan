import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DateSelectorProps {
  date: Date | undefined;
  dateRange: DateRange | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onDateRangeSelect: (range: DateRange | undefined) => void;
  mode: "single" | "range";
  onModeChange: (mode: "single" | "range") => void;
}

const DateSelector = ({ date, dateRange, onDateSelect, onDateRangeSelect, mode, onModeChange }: DateSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <CalendarIcon className="w-4 h-4 text-primary" />
        Date Selection
      </label>
      
      <Tabs value={mode} onValueChange={(v) => onModeChange(v as "single" | "range")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single Date</TabsTrigger>
          <TabsTrigger value="range">Date Range</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single" className="mt-3">
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
        </TabsContent>
        
        <TabsContent value="range" className="mt-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start h-12 text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Pick a date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={onDateRangeSelect}
                initialFocus
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DateSelector;
