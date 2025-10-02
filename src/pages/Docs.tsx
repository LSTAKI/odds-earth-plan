import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, BookOpen, Lightbulb } from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Documentation & Help</h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about using Weather Odds Explorer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 animate-scale-in">
            <Card className="shadow-card border-border">
              <CardHeader>
                <BookOpen className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn the basics of weather probability analysis and how to use the dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardHeader>
                <HelpCircle className="w-10 h-10 text-secondary mb-2" />
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Find answers to commonly asked questions about our platform and data sources.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardHeader>
                <Lightbulb className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tips and recommendations for interpreting weather probability data effectively.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card border-border animate-fade-in">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate are the weather predictions?</AccordionTrigger>
                  <AccordionContent>
                    Our predictions are based on historical NASA Earth data spanning decades. While no forecast
                    is 100% certain, our probability models provide reliable insights for planning purposes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What weather conditions can I analyze?</AccordionTrigger>
                  <AccordionContent>
                    You can analyze five main conditions: Very Hot (over 90°F), Very Cold (below 32°F), Very Wet (over 2&quot; precipitation),
                    Very Windy (over 25mph sustained winds), and Very Uncomfortable (high humidity + temperature combinations).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I export my analysis results?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can export your weather probability data in both CSV and JSON formats for further analysis
                    or integration with other tools.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How far back does the historical data go?</AccordionTrigger>
                  <AccordionContent>
                    Our analysis uses NASA Earth observation data dating back to the 1980s, providing over 40 years
                    of historical climate patterns for robust probability calculations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                  <AccordionContent>
                    Currently, Weather Odds Explorer is available as a responsive web application that works seamlessly
                    on mobile devices, tablets, and desktop computers.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Docs;
