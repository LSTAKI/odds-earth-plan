import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const dummyData = [
  { condition: "Very Hot", probability: 65 },
  { condition: "Very Cold", probability: 12 },
  { condition: "Very Wet", probability: 45 },
  { condition: "Very Windy", probability: 30 },
  { condition: "Uncomfortable", probability: 55 },
];

const colors = ["#f97316", "#3b82f6", "#06b6d4", "#6b7280", "#a855f7"];

const ProbabilityChart = () => {
  return (
    <Card className="shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle>Probability Distribution</CardTitle>
        <CardDescription>Likelihood of each weather condition</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="condition"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              label={{ value: "Probability (%)", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Bar dataKey="probability" radius={[8, 8, 0, 0]}>
              {dummyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProbabilityChart;
