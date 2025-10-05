import { Satellite, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const DataSourceBadge = () => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center mb-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1">
              <Satellite className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">NASA POWER</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Climate data from NASA's POWER project</p>
            <p className="text-xs text-muted-foreground">Historical records: 1981-2020</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1">
              <Database className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Open-Meteo</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Recent weather archive data</p>
            <p className="text-xs text-muted-foreground">Last 10 years of observations</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
