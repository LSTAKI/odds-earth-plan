import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { LocationCoordinates } from "@/services/weatherService";

interface MapPlaceholderProps {
  location: string;
  coordinates: LocationCoordinates | null;
}

const MapPlaceholder = ({ location, coordinates }: MapPlaceholderProps) => {
  return (
    <Card className="shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle>Location Map</CardTitle>
        <CardDescription>
          {coordinates 
            ? `Coordinates: ${coordinates.lat.toFixed(4)}°N, ${coordinates.lon.toFixed(4)}°E`
            : "Visual representation of weather data"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] bg-muted rounded-lg flex items-center justify-center border border-border relative overflow-hidden">
          {coordinates ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon-0.5},${coordinates.lat-0.5},${coordinates.lon+0.5},${coordinates.lat+0.5}&marker=${coordinates.lat},${coordinates.lon}`}
                title={`Map of ${location}`}
              />
            </div>
          ) : (
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 mx-auto text-primary" />
              <p className="text-muted-foreground">
                Select a location to view map
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapPlaceholder;
