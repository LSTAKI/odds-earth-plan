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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleConditionToggle = (id: string) => {
    setSelectedConditions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleGetOdds = () => {
    if (!location || !date || selectedConditions.length === 0) {
      toast.error("Please fill all fields", {
        description: "Select a location, date, and at least one weather condition.",
      });
      return;
    }

    setShowResults(true);
    toast.success("Analysis complete!", {
      description: "Weather probability data has been calculated.",
    });
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
                      onLocationSelect={setLocation}
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
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Weather Odds
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            <ResultsCard
              location={location}
              date={date}
              conditions={selectedConditions}
            />

            {showResults && (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ProbabilityChart />
                  <TimeSeriesChart />
                </div>

                <MapPlaceholder location={location} />

                <ExportButtons />
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
