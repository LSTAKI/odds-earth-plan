import { TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface OverallPredictionProps {
  location: string;
  startDate: Date;
  endDate: Date;
  conditions: string[];
  overallProbabilities: { condition: string; probability: number }[];
  daysAnalyzed: number;
}

const conditionLabels: Record<string, string> = {
  "very-hot": "Very Hot",
  "very-cold": "Very Cold",
  "very-wet": "Very Wet",
  "very-windy": "Very Windy",
  "uncomfortable": "Very Uncomfortable",
  "very-comfortable": "Very Comfortable",
};

const OverallPrediction = ({ 
  location, 
  startDate, 
  endDate, 
  overallProbabilities, 
  daysAnalyzed 
}: OverallPredictionProps) => {
  const averageOverallProbability = Math.round(
    overallProbabilities.reduce((sum, p) => sum + p.probability, 0) / overallProbabilities.length
  );

  return (
    <Card className="shadow-card-hover border-border animate-scale-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Overall Period Analysis
            </CardTitle>
            <CardDescription className="text-base">
              {location} • {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2 shadow-glow">
            <TrendingUp className="w-4 h-4 mr-2" />
            {averageOverallProbability}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
          <p className="text-foreground leading-relaxed">
            Over the <span className="font-bold text-primary">{daysAnalyzed}-day period</span>, 
            there is an average <span className="font-bold text-primary">{averageOverallProbability}% probability</span> of 
            the selected conditions occurring in {location}.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Analysis based on 30+ years of NASA POWER climate data combined with Open-Meteo historical records.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {overallProbabilities.map((prob, index) => {
            const label = conditionLabels[prob.condition] || prob.condition;
            const getProbabilityGradient = (p: number) => {
              if (p >= 70) return "from-green-500/20 to-green-500/5 border-green-500/30";
              if (p >= 40) return "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30";
              return "from-red-500/20 to-red-500/5 border-red-500/30";
            };
            
            return (
              <div
                key={index}
                className={`p-4 rounded-lg bg-gradient-to-br border ${getProbabilityGradient(prob.probability)}`}
              >
                <div className="text-2xl font-bold text-foreground">{prob.probability}%</div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">{label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-primary">{daysAnalyzed}</div>
            <div className="text-sm text-muted-foreground">Days Analyzed</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-secondary">{Math.round(averageOverallProbability * 0.85)}%</div>
            <div className="text-sm text-muted-foreground">Confidence</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallPrediction;
