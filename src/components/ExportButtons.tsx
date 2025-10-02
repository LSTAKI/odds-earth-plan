import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ExportButtonsProps {
  data: any;
}

const ExportButtons = ({ data }: ExportButtonsProps) => {
  const handleExportCSV = () => {
    try {
      const csv = convertToCSV(data);
      downloadFile(csv, 'weather-analysis.csv', 'text/csv');
      toast.success("CSV downloaded", {
        description: "Your weather analysis has been exported.",
      });
    } catch (error) {
      toast.error("Export failed", {
        description: "Could not export data to CSV.",
      });
    }
  };

  const handleExportJSON = () => {
    try {
      const json = JSON.stringify(data, null, 2);
      downloadFile(json, 'weather-analysis.json', 'application/json');
      toast.success("JSON downloaded", {
        description: "Your weather analysis has been exported.",
      });
    } catch (error) {
      toast.error("Export failed", {
        description: "Could not export data to JSON.",
      });
    }
  };

  const convertToCSV = (data: any) => {
    let csv = 'Location,Date,Conditions\n';
    csv += `"${data.location}","${data.date}","${data.conditions.join(', ')}"\n\n`;
    
    csv += 'Condition,Probability\n';
    data.results.probabilities.forEach((item: any) => {
      csv += `"${item.condition}",${item.probability}\n`;
    });
    
    csv += '\nYear,Temperature (°F),Humidity (%)\n';
    data.results.historicalTrends.forEach((item: any) => {
      csv += `${item.year},${item.temperature},${item.humidity}\n`;
    });
    
    return csv;
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle>Export Data</CardTitle>
        <CardDescription>Download your weather predictions in various formats</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="flex-1 h-12"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export as CSV
          </Button>
          <Button
            onClick={handleExportJSON}
            variant="outline"
            className="flex-1 h-12"
          >
            <FileJson className="w-4 h-4 mr-2" />
            Export as JSON
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportButtons;
