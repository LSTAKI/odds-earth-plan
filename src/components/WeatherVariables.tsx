import { Flame, Snowflake, Droplets, Wind, CloudRain, Sun } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const weatherOptions = [
  { id: "very-hot", label: "Very Hot", icon: Flame, description: "Above 90°F", gradient: "from-orange-500/10 to-red-500/10", iconColor: "text-orange-500" },
  { id: "very-cold", label: "Very Cold", icon: Snowflake, description: "Below 32°F", gradient: "from-blue-400/10 to-cyan-400/10", iconColor: "text-blue-400" },
  { id: "very-wet", label: "Very Wet", icon: Droplets, description: "Heavy rainfall", gradient: "from-cyan-500/10 to-blue-500/10", iconColor: "text-cyan-500" },
  { id: "very-windy", label: "Very Windy", icon: Wind, description: "Above 20 mph", gradient: "from-gray-400/10 to-slate-500/10", iconColor: "text-muted-foreground" },
  { id: "uncomfortable", label: "Very Uncomfortable", icon: CloudRain, description: "Extreme conditions", gradient: "from-purple-500/10 to-pink-500/10", iconColor: "text-purple-500" },
  { id: "very-comfortable", label: "Very Comfortable", icon: Sun, description: "65-78°F, pleasant", gradient: "from-green-500/10 to-emerald-500/10", iconColor: "text-green-500" },
];

interface WeatherVariablesProps {
  selected: string[];
  onToggle: (id: string) => void;
}

const WeatherVariables = ({ selected, onToggle }: WeatherVariablesProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Weather Conditions
        </label>
        {selected.length > 0 && (
          <Badge variant="secondary" className="animate-scale-in">
            {selected.length} selected
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {weatherOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selected.includes(option.id);
          return (
            <div
              key={option.id}
              className={`group relative p-4 rounded-lg border bg-gradient-to-br transition-all cursor-pointer
                ${isSelected 
                  ? `border-primary shadow-glow bg-primary/5 ${option.gradient}` 
                  : 'border-border bg-card hover:border-primary/30 hover:shadow-card-hover'
                }
              `}
              onClick={() => onToggle(option.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={option.id}
                  checked={isSelected}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={option.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Icon className={`w-5 h-5 ${option.iconColor} transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`} />
                    <span className="text-sm font-medium">{option.label}</span>
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1 ml-7">{option.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherVariables;
