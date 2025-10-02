import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const dummyLocations = [
  "Phoenix, AZ",
  "Los Angeles, CA",
  "Miami, FL",
  "Chicago, IL",
  "New York, NY",
  "Seattle, WA",
  "Denver, CO",
  "Boston, MA",
];

interface LocationInputProps {
  onLocationSelect: (location: string) => void;
  selectedLocation: string;
}

const LocationInput = ({ onLocationSelect, selectedLocation }: LocationInputProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        Location
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 text-left font-normal"
          >
            {selectedLocation || "Search for a location..."}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search locations..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {dummyLocations
                  .filter((location) =>
                    location.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((location) => (
                    <CommandItem
                      key={location}
                      value={location}
                      onSelect={() => {
                        onLocationSelect(location);
                        setOpen(false);
                      }}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {location}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationInput;
