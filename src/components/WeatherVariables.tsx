import { Flame, Snowflake, Droplets, Wind, CloudRain, Sun } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const weatherOptions = [
  { id: "very-hot", label: "Very Hot", icon: Flame, color: "text-orange-500" },
  { id: "very-cold", label: "Very Cold", icon: Snowflake, color: "text-blue-400" },
  { id: "very-wet", label: "Very Wet", icon: Droplets, color: "text-cyan-500" },
  { id: "very-windy", label: "Very Windy", icon: Wind, color: "text-gray-500" },
  { id: "uncomfortable", label: "Very Uncomfortable", icon: CloudRain, color: "text-purple-500" },
  { id: "very-comfortable", label: "Very Comfortable", icon: Sun, color: "text-green-500" },
];

interface WeatherVariablesProps {
  selected: string[];
  onToggle: (id: string) => void;
}

const WeatherVariables = ({ selected, onToggle }: WeatherVariablesProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Weather Conditions
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {weatherOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="flex items-center space-x-3 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => onToggle(option.id)}
            >
              <Checkbox
                id={option.id}
                checked={selected.includes(option.id)}
                onCheckedChange={() => onToggle(option.id)}
              />
              <Label
                htmlFor={option.id}
                className="flex items-center gap-2 cursor-pointer flex-1"
              >
                <Icon className={`w-5 h-5 ${option.color}`} />
                <span className="text-sm font-medium">{option.label}</span>
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherVariables;
