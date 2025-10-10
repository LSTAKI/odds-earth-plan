import { format } from "date-fns";
import { Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DailyPrediction {
  date: Date;
  probabilities: { condition: string; probability: number }[];
  averageProbability: number;
}

interface DailyPredictionsProps {
  predictions: DailyPrediction[];
  location: string;
}

const conditionLabels: Record<string, string> = {
  "very-hot": "Very Hot",
  "very-cold": "Very Cold",
  "very-wet": "Very Wet",
  "very-windy": "Very Windy",
  "uncomfortable": "Very Uncomfortable",
  "very-comfortable": "Very Comfortable",
};

const DailyPredictions = ({ predictions, location }: DailyPredictionsProps) => {
  return (
    <Card className="shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Daily Predictions
        </CardTitle>
        <CardDescription>
          Individual predictions for each day in {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-card transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {format(prediction.date, "EEEE, MMM d, yyyy")}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Based on historical patterns
                    </p>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {Math.round(prediction.averageProbability)}%
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {prediction.probabilities.map((prob, idx) => {
                    const label = conditionLabels[prob.condition] || prob.condition;
                    const getProbabilityColor = (p: number) => {
                      if (p >= 70) return "text-green-500 bg-green-500/10 border-green-500/20";
                      if (p >= 40) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
                      return "text-red-500 bg-red-500/10 border-red-500/20";
                    };
                    
                    return (
                      <div
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-md border ${getProbabilityColor(prob.probability)}`}
                      >
                        {label}: {prob.probability}%
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DailyPredictions;
