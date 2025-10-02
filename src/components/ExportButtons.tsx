import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ExportButtons = () => {
  const handleExportCSV = () => {
    toast.success("CSV export started", {
      description: "Your weather data is being prepared for download.",
    });
  };

  const handleExportJSON = () => {
    toast.success("JSON export started", {
      description: "Your weather data is being prepared for download.",
    });
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
