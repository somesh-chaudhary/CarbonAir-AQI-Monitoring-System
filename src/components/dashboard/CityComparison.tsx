import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

// Removed the Sidebar export from here since it's now in its own file
// This file now strictly handles the CityComparison component

interface CityComparisonProps {
  // Mock data for now
}

const cities = [
  { name: "Ahmedabad", aqi: 175, color: "text-red-500" },
  { name: "Bangalore", aqi: 139, color: "text-orange-500" },
  { name: "Chennai", aqi: 240, color: "text-purple-500" },
  { name: "Hyderabad", aqi: 238, color: "text-purple-500" },
  { name: "Kolkata", aqi: 321, color: "text-rose-900" },
  { name: "Mumbai", aqi: 171, color: "text-red-500" },
  { name: "New Delhi", aqi: 360, color: "text-rose-900" },
  { name: "Pune", aqi: 331, color: "text-rose-900" },
];

export const CityComparison: React.FC<CityComparisonProps> = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">City Comparison</h3>
        <Button variant="ghost" size="sm" className="text-xs">View All <ArrowRight className="ml-1 h-3 w-3" /></Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cities.map((city) => (
          <Card key={city.name} className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{city.name}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground transform -rotate-45" />
              </div>
              <div className={`text-2xl font-bold ${city.color}`}>
                {city.aqi}
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                 <span>AQI</span>
                 <span>Unhealthy</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
