import { useState, useEffect } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchLocations, LocationCoordinates } from "@/services/weatherService";

interface LocationInputProps {
  onLocationSelect: (location: string, coordinates: LocationCoordinates) => void;
  selectedLocation: string;
}

const LocationInput = ({ onLocationSelect, selectedLocation }: LocationInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationCoordinates[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }
      
      const results = await searchLocations(searchQuery);
      setSuggestions(results);
      setShowSuggestions(true);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSelectLocation = (loc: LocationCoordinates) => {
    const locationName = `${loc.name}, ${loc.country}`;
    setSearchQuery(locationName);
    onLocationSelect(locationName, loc);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        Location
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
        <Input
          id="location"
          type="text"
          placeholder="Search city or place..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className="pl-10 pr-10 h-12"
        />
        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((loc, index) => (
              <button
                key={index}
                onClick={() => handleSelectLocation(loc)}
                className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-2 text-sm"
              >
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{loc.name}, {loc.country}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedLocation && (
        <p className="text-xs text-muted-foreground">
          Selected: {selectedLocation}
        </p>
      )}
    </div>
  );
};

export default LocationInput;
