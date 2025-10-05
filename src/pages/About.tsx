import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Database, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">About Weather Odds Explorer</h1>
            <p className="text-lg text-muted-foreground">
              Combining NASA POWER climate data with Open-Meteo weather archives for accurate probability analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 animate-scale-in">
            <Card className="shadow-card border-border">
              <CardHeader>
                <Globe className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Global Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access weather predictions for locations worldwide using comprehensive satellite data.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardHeader>
                <Database className="w-10 h-10 text-secondary mb-2" />
                <CardTitle>NASA POWER Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Powered by NASA POWER API with 40+ years of satellite-derived climate data (1981-2020).
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced algorithms analyze historical patterns to forecast future conditions.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card border-border animate-fade-in">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Weather Odds Explorer combines authoritative data sources to deliver reliable weather probability insights.
                We integrate <strong>NASA POWER API</strong> (40+ years of satellite-derived climate data from 1981-2020) 
                with <strong>Open-Meteo's historical weather archives</strong> (recent 10-year observations) to provide 
                comprehensive analysis that balances long-term climate patterns with current trends.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Whether you're planning an outdoor event, managing agricultural operations, or conducting climate research,
                our tool combines decades of NASA Earth observations with up-to-date weather data to help you make informed,
                data-driven decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
