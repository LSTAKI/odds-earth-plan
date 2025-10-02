import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MapPlaceholderProps {
  location: string;
}

const MapPlaceholder = ({ location }: MapPlaceholderProps) => {
  return (
    <Card className="shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle>Interactive Map</CardTitle>
        <CardDescription>Visual representation of weather risk zones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            Map integration with Mapbox coming soon. Pin locations and see color-coded weather risk zones.
          </AlertDescription>
        </Alert>
        
        <div className="relative h-[300px] rounded-lg bg-muted/30 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="relative z-10 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {location || "No location selected"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Interactive map placeholder
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapPlaceholder;
