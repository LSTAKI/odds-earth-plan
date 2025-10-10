import { useState } from "react";
import { Sparkles } from "lucide-react";
import { DateRange } from "react-day-picker";
import Navbar from "@/components/Navbar";
import LocationInput from "@/components/LocationInput";
import DateSelector from "@/components/DateSelector";
import WeatherVariables from "@/components/WeatherVariables";
import ResultsCard from "@/components/ResultsCard";
import ProbabilityChart from "@/components/ProbabilityChart";
import TimeSeriesChart from "@/components/TimeSeriesChart";
import MapPlaceholder from "@/components/MapPlaceholder";
import ExportButtons from "@/components/ExportButtons";
import DailyPredictions from "@/components/DailyPredictions";
import OverallPrediction from "@/components/OverallPrediction";
import { DataSourceBadge } from "@/components/DataSourceBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { LocationCoordinates, calculateProbabilities, calculateDateRangeProbabilities, fetchHistoricalTrends } from "@/services/weatherService";

interface WeatherResults {
  probabilities: { condition: string; probability: number }[];
  historicalTrends: { year: string; temperature: number; humidity: number }[];
  primaryProbability: number;
}

interface DateRangeResults {
  dailyPredictions: Array<{
    date: Date;
    probabilities: { condition: string; probability: number }[];
    averageProbability: number;
  }>;
  overallProbabilities: { condition: string; probability: number }[];
  historicalTrends: { year: string; temperature: number; humidity: number }[];
}

const Index = () => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [dateMode, setDateMode] = useState<"single" | "range">("single");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [weatherResults, setWeatherResults] = useState<WeatherResults | null>(null);
  const [dateRangeResults, setDateRangeResults] = useState<DateRangeResults | null>(null);
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
    // Validation for single date mode
    if (dateMode === "single") {
      if (!location || !coordinates || !date || selectedConditions.length === 0) {
        toast.error("Please fill all fields", {
          description: "Select a location, date, and at least one weather condition.",
        });
        return;
      }
    }
    
    // Validation for date range mode
    if (dateMode === "range") {
      if (!location || !coordinates || !dateRange?.from || !dateRange?.to || selectedConditions.length === 0) {
        toast.error("Please fill all fields", {
          description: "Select a location, date range, and at least one weather condition.",
        });
        return;
      }
    }

    setIsLoading(true);
    setShowResults(false);
    toast.loading("Analyzing weather data...", { id: "weather-analysis" });

    try {
      if (dateMode === "single" && date) {
        // Single date analysis
        const probabilities = await calculateProbabilities(
          coordinates!.lat,
          coordinates!.lon,
          date,
          selectedConditions
        );

        const trends = await fetchHistoricalTrends(
          coordinates!.lat,
          coordinates!.lon,
          date
        );

        const primaryProbability = probabilities.length > 0 ? probabilities[0].probability : 0;

        setWeatherResults({
          probabilities,
          historicalTrends: trends,
          primaryProbability,
        });
        setDateRangeResults(null);

        toast.success("Analysis complete!", {
          id: "weather-analysis",
          description: "Weather probability data from NASA and historical records.",
        });
      } else if (dateMode === "range" && dateRange?.from && dateRange?.to) {
        // Date range analysis
        const rangeResults = await calculateDateRangeProbabilities(
          coordinates!.lat,
          coordinates!.lon,
          dateRange.from,
          dateRange.to,
          selectedConditions
        );

        const trends = await fetchHistoricalTrends(
          coordinates!.lat,
          coordinates!.lon,
          dateRange.from
        );

        setDateRangeResults({
          ...rangeResults,
          historicalTrends: trends,
        });
        setWeatherResults(null);

        toast.success("Range analysis complete!", {
          id: "weather-analysis",
          description: `Analyzed ${rangeResults.dailyPredictions.length} days of weather data.`,
        });
      }

      setShowResults(true);
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
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium shadow-glow animate-pulse-glow">
              <Sparkles className="w-4 h-4" />
              Powered by NASA POWER & Open-Meteo
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary animate-fade-in">
              Weather Odds Explorer
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Unlock 30+ years of NASA climate data combined with real-time historical weather insights to predict conditions with scientific precision.
            </p>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-card-hover border-border sticky top-24 animate-scale-in overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
              <CardContent className="relative p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                    Configure Analysis
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">Set parameters to analyze historical weather patterns</p>
                  <div className="space-y-6">
                    <LocationInput
                      onLocationSelect={handleLocationSelect}
                      selectedLocation={location}
                    />
                    <DateSelector 
                      date={date} 
                      dateRange={dateRange}
                      onDateSelect={setDate}
                      onDateRangeSelect={setDateRange}
                      mode={dateMode}
                      onModeChange={setDateMode}
                    />
                    <WeatherVariables
                      selected={selectedConditions}
                      onToggle={handleConditionToggle}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleGetOdds}
                  className="w-full h-12 text-base font-semibold shadow-glow hover:shadow-glow transition-all"
                  size="lg"
                  disabled={
                    isLoading || 
                    !location || 
                    !coordinates ||
                    selectedConditions.length === 0 ||
                    (dateMode === "single" && !date) ||
                    (dateMode === "range" && (!dateRange?.from || !dateRange?.to))
                  }
                >
                  <Sparkles className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? "Analyzing NASA Data..." : dateMode === "range" ? "Analyze Date Range" : "Get Weather Odds"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            <DataSourceBadge />
            
            {/* Single Date Results */}
            {dateMode === "single" && (
              <>
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
              </>
            )}
            
            {/* Date Range Results */}
            {dateMode === "range" && showResults && dateRangeResults && dateRange?.from && dateRange?.to && (
              <>
                <OverallPrediction
                  location={location}
                  startDate={dateRange.from}
                  endDate={dateRange.to}
                  conditions={selectedConditions}
                  overallProbabilities={dateRangeResults.overallProbabilities}
                  daysAnalyzed={dateRangeResults.dailyPredictions.length}
                />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <DailyPredictions 
                    predictions={dateRangeResults.dailyPredictions}
                    location={location}
                  />
                  <div className="space-y-6">
                    <ProbabilityChart data={dateRangeResults.overallProbabilities} />
                    <TimeSeriesChart data={dateRangeResults.historicalTrends} />
                  </div>
                </div>

                <MapPlaceholder location={location} coordinates={coordinates} />

                <ExportButtons 
                  data={{
                    location,
                    dateRange: `${dateRange.from.toISOString()} to ${dateRange.to.toISOString()}`,
                    conditions: selectedConditions,
                    results: dateRangeResults,
                  }}
                />
              </>
            )}
            
            {/* Empty state for date range mode when no results */}
            {dateMode === "range" && !showResults && (
              <ResultsCard
                location={location}
                date={dateRange?.from}
                conditions={selectedConditions}
                probability={undefined}
              />
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
