import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dummyData = [
  { year: "2019", temperature: 85, humidity: 45 },
  { year: "2020", temperature: 87, humidity: 48 },
  { year: "2021", temperature: 89, humidity: 50 },
  { year: "2022", temperature: 91, humidity: 52 },
  { year: "2023", temperature: 90, humidity: 49 },
  { year: "2024", temperature: 92, humidity: 55 },
];

const TimeSeriesChart = () => {
  return (
    <Card className="shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle>Historical Trends</CardTitle>
        <CardDescription>Temperature and humidity averages over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="year"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              label={{ value: "Value", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              activeDot={{ r: 6 }}
              name="Temperature (°F)"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--secondary))", r: 4 }}
              activeDot={{ r: 6 }}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesChart;
