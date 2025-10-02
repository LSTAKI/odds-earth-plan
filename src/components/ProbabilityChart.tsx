import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const colors = ["#f97316", "#3b82f6", "#06b6d4", "#6b7280", "#a855f7"];

const conditionLabels: Record<string, string> = {
  "very-hot": "Very Hot",
  "very-cold": "Very Cold",
  "very-wet": "Very Wet",
  "very-windy": "Very Windy",
  "uncomfortable": "Uncomfortable",
};

interface ProbabilityChartProps {
  data: { condition: string; probability: number }[];
}

const ProbabilityChart = ({ data }: ProbabilityChartProps) => {
  const chartData = data.map(item => ({
    condition: conditionLabels[item.condition] || item.condition,
    probability: item.probability,
  }));

  return (
    <Card className="shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle>Probability Distribution</CardTitle>
        <CardDescription>Likelihood of each weather condition</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
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
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProbabilityChart;
