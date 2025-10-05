import { useState } from "react";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import LocationInput from "@/components/LocationInput";
import DateSelector from "@/components/DateSelector";
import WeatherVariables from "@/components/WeatherVariables";
import ResultsCard from "@/components/ResultsCard";
import ProbabilityChart from "@/components/ProbabilityChart";
import TimeSeriesChart from "@/components/TimeSeriesChart";
import MapPlaceholder from "@/components/MapPlaceholder";
import ExportButtons from "@/components/ExportButtons";
import { DataSourceBadge } from "@/components/DataSourceBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { LocationCoordinates, calculateProbabilities, fetchHistoricalTrends } from "@/services/weatherService";

interface WeatherResults {
  probabilities: { condition: string; probability: number }[];
  historicalTrends: { year: string; temperature: number; humidity: number }[];
  primaryProbability: number;
}

const Index = () => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [weatherResults, setWeatherResults] = useState<WeatherResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConditionToggle = (id: string) => {
    setSelectedConditions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleLocationSelect = (locationName: string, coords: LocationCoordinates) => {
    setLocation(locationName);
    setCoordinates(coords);
  };

  const handleGetOdds = async () => {
    if (!location || !coordinates || !date || selectedConditions.length === 0) {
      toast.error("Please fill all fields", {
        description: "Select a location, date, and at least one weather condition.",
      });
      return;
    }

    setIsLoading(true);
    toast.loading("Analyzing weather data...", { id: "weather-analysis" });

    try {
      // Fetch real probability data based on 10 years of historical weather data
      const probabilities = await calculateProbabilities(
        coordinates.lat,
        coordinates.lon,
        date,
        selectedConditions
      );

      // Fetch historical trends from last 6 years
      const trends = await fetchHistoricalTrends(
        coordinates.lat,
        coordinates.lon,
        date
      );

      const primaryProbability = probabilities.length > 0 ? probabilities[0].probability : 0;

      setWeatherResults({
        probabilities,
        historicalTrends: trends,
        primaryProbability,
      });

      setShowResults(true);
      toast.success("Analysis complete!", {
        id: "weather-analysis",
        description: "Real weather probability data from NASA and historical records.",
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Failed to fetch weather data", {
        id: "weather-analysis",
        description: "Please try again or select a different location.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by NASA Earth Data
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Weather Odds Explorer
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Plan smarter with NASA Earth Data insights.
            </p>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-border sticky top-24 animate-scale-in">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Configure Analysis</h2>
                  <div className="space-y-6">
                    <LocationInput
                      onLocationSelect={handleLocationSelect}
                      selectedLocation={location}
                    />
                    <DateSelector date={date} onDateSelect={setDate} />
                    <WeatherVariables
                      selected={selectedConditions}
                      onToggle={handleConditionToggle}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleGetOdds}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                  disabled={isLoading}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isLoading ? "Analyzing..." : "Get Weather Odds"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            <DataSourceBadge />
            
            <ResultsCard
              location={location}
              date={date}
              conditions={selectedConditions}
              probability={weatherResults?.primaryProbability}
            />

            {showResults && weatherResults && (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ProbabilityChart data={weatherResults.probabilities} />
                  <TimeSeriesChart data={weatherResults.historicalTrends} />
                </div>

                <MapPlaceholder location={location} coordinates={coordinates} />

                <ExportButtons 
                  data={{
                    location,
                    date: date?.toISOString(),
                    conditions: selectedConditions,
                    results: weatherResults,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Weather Odds Explorer. Data insights powered by NASA Earth observations.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
