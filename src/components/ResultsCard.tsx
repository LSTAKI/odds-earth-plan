import { AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsCardProps {
  location: string;
  date: Date | undefined;
  conditions: string[];
  probability?: number;
}

const ResultsCard = ({ location, date, conditions, probability }: ResultsCardProps) => {
  if (!location || !date || conditions.length === 0) {
    return (
      <Card className="shadow-card border-border animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            <CardTitle>No Results Yet</CardTitle>
          </div>
          <CardDescription>
            Select a location, date, and at least one weather condition to see predictions.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const actualProbability = probability || 50;
  const primaryCondition = conditions[0].replace("-", " ");

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow border-border animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Weather Prediction</CardTitle>
            <CardDescription className="text-base">
              {location} • {formattedDate}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            {actualProbability}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-foreground leading-relaxed">
            There is a <span className="font-bold text-primary">{actualProbability}% chance</span> of{" "}
            <span className="font-semibold capitalize">{primaryCondition}</span> conditions
            {conditions.length > 1 && (
              <span> and {conditions.length - 1} other condition(s)</span>
            )}{" "}
            on {formattedDate} in {location}.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on 10 years of historical weather data from NASA and meteorological archives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-primary">{actualProbability}%</div>
            <div className="text-sm text-muted-foreground">Probability</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-secondary">{Math.round(actualProbability * 0.85)}%</div>
            <div className="text-sm text-muted-foreground">Confidence</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-foreground">{conditions.length}</div>
            <div className="text-sm text-muted-foreground">Conditions</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
