import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ForecastData } from '../../lib/api';

interface ForecastChartProps {
  data: ForecastData;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  // Process hourly data into daily max AQI
  const dailyDataMap = new Map<string, { date: string; aqi: number }>();

  data.time.forEach((t, i) => {
    // Use the date string as key (YYYY-MM-DD)
    // The time from API is ISO string
    const dateKey = t.split('T')[0];
    const aqi = data.aqi[i];

    if (!dailyDataMap.has(dateKey)) {
      dailyDataMap.set(dateKey, { date: t, aqi: aqi });
    } else {
      const current = dailyDataMap.get(dateKey)!;
      if (aqi > current.aqi) {
        current.aqi = aqi;
      }
    }
  });

  const chartData = Array.from(dailyDataMap.values()).map((item) => ({
    date: item.date,
    aqi: item.aqi,
    formattedDate: format(parseISO(item.date), 'EEE'), // Mon, Tue, etc.
    fullDate: format(parseISO(item.date), 'PP'),
  }));

  // Ensure we limit to 7 days if API returns more or partials
  const finalChartData = chartData.slice(0, 7);

  return (
    <Card className="col-span-2 lg:col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>7-Day Forecast</CardTitle>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Max AQI Prediction
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={finalChartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="formattedDate" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    return payload[0].payload.fullDate;
                  }
                  return label;
                }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area 
                type="monotone" 
                dataKey="aqi" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorAqi)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
