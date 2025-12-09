import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AirQualityData } from '../../lib/api';

interface PollutantsGridProps {
  data: AirQualityData;
}

const PollutantCard = ({ name, value, unit, description }: { name: string, value: number, unit: string, description: string }) => (
  <Card className="bg-card/50 backdrop-blur-sm border-muted/50 hover:bg-card/80 transition-colors">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-xs text-muted-foreground ml-1">{unit}</span>
        </div>
        <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
          {/* Simple percentage bar for visual effect (mock scale) */}
          <div 
            className="h-full bg-blue-500" 
            style={{ width: `${Math.min((value / 100) * 100, 100)}%` }} 
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 truncate" title={description}>
        {description}
      </p>
    </CardContent>
  </Card>
);

export const PollutantsGrid: React.FC<PollutantsGridProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pollutant Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <PollutantCard 
          name="PM2.5" 
          value={data.pm2_5} 
          unit="µg/m³" 
          description="Fine particles, combustion, organic compounds"
        />
        <PollutantCard 
          name="PM10" 
          value={data.pm10} 
          unit="µg/m³" 
          description="Dust, pollen, mold, coarser particles"
        />
        <PollutantCard 
          name="NO2" 
          value={data.no2} 
          unit="µg/m³" 
          description="Nitrogen Dioxide from vehicles/industry"
        />
        <PollutantCard 
          name="SO2" 
          value={data.so2} 
          unit="µg/m³" 
          description="Sulphur Dioxide from burning fossil fuels"
        />
        <PollutantCard 
          name="O3" 
          value={data.o3} 
          unit="µg/m³" 
          description="Ozone, formed by chemical reactions"
        />
        <PollutantCard 
          name="CO" 
          value={data.co} 
          unit="µg/m³" 
          description="Carbon Monoxide from combustion"
        />
      </div>
    </div>
  );
};
