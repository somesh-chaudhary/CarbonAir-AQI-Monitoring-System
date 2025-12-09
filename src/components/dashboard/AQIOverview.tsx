import React from 'react';
import { getAQILevel, cn } from '../../lib/utils';
import { Wind, Thermometer, Droplets, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface AQIOverviewProps {
  aqi: number;
  city: string;
  country: string;
  timestamp: string;
}

export const AQIOverview: React.FC<AQIOverviewProps> = ({ aqi, city, country, timestamp }) => {
  const { label, color, bg, border, description } = getAQILevel(aqi);

  // Mock weather data since Air Quality API doesn't provide it directly in the same call mostly, 
  // or we could fetch it separately. For now, we'll display placeholder or generic data 
  // or I could add weather fetching to the API call if I use Open-Meteo Weather API. 
  // Open-Meteo Air Quality is separate. I'll stick to AQI focus for now but add mock weather UI as requested in images.
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2 overflow-hidden relative border-none bg-gradient-to-br from-card/50 to-card shadow-xl">
        <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20", bg)} />
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{city} Air Quality</h2>
              <p className="text-sm text-muted-foreground">{country} • {new Date().toLocaleTimeString()}</p>
            </div>
            <div className={cn("px-4 py-1 rounded-full text-sm font-bold border", color, "bg-background/50", border)}>
              {label}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex items-center justify-center w-48 h-48 shrink-0">
               {/* Circular Progress Mock */}
               <svg className="w-full h-full transform -rotate-90">
                 <circle
                   cx="96"
                   cy="96"
                   r="88"
                   stroke="currentColor"
                   strokeWidth="12"
                   fill="transparent"
                   className="text-muted/20"
                 />
                 <circle
                   cx="96"
                   cy="96"
                   r="88"
                   stroke="currentColor"
                   strokeWidth="12"
                   fill="transparent"
                   strokeDasharray={2 * Math.PI * 88}
                   strokeDashoffset={2 * Math.PI * 88 * (1 - Math.min(aqi, 500) / 500)}
                   className={cn("transition-all duration-1000 ease-out", color)}
                   strokeLinecap="round"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className={cn("text-6xl font-bold", color)}>{Math.round(aqi)}</span>
                 <span className="text-sm text-muted-foreground uppercase tracking-widest mt-1">US AQI</span>
               </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <Wind className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Wind</p>
                    <p className="font-medium">14 km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <Droplets className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                    <p className="font-medium">63%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <Thermometer className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Temp</p>
                    <p className="font-medium">24°C</p>
                  </div>
                </div>
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <Sun className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">UV Index</p>
                    <p className="font-medium">Moderate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2 lg:col-span-1 bg-gradient-to-b from-blue-950 to-indigo-950 text-white border-none shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <CardHeader>
          <CardTitle className="relative z-10">Health Advice</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-200">Sensitive Groups</h4>
            <p className="text-sm text-blue-100/80">
              {aqi > 100 ? "Wear a mask outdoors. Limit prolonged exertion." : "Great day to be active outside."}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-200">General Public</h4>
            <p className="text-sm text-blue-100/80">
              {aqi > 150 ? "Avoid outdoor activities. Keep windows closed." : "Open windows to bring in fresh air."}
            </p>
          </div>
          
          <div className="mt-8 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                 🌿
              </div>
              <div>
                <p className="text-xs text-blue-200">Climate Action</p>
                <p className="text-sm font-medium">Reduce car usage today</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
