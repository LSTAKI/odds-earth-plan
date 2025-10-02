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
              Leveraging NASA Earth Data to provide accurate weather probability predictions
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
                <CardTitle>NASA Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built on decades of NASA Earth observation data for reliable predictions.
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
                Weather Odds Explorer is designed to help individuals and organizations make informed decisions
                based on weather probability data. By combining NASA's extensive Earth observation datasets with
                modern analytics, we provide actionable insights for planning activities, events, and operations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Whether you're planning an outdoor event, managing agricultural operations, or simply curious
                about weather patterns, our tool offers the data-driven insights you need to plan smarter.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
