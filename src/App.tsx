import React, { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar, ViewType } from './components/layout/Sidebar';
import { AQIOverview } from './components/dashboard/AQIOverview';
import { PollutantsGrid } from './components/dashboard/PollutantsGrid';
import { ForecastChart } from './components/dashboard/ForecastChart';
import { CityComparison } from './components/dashboard/CityComparison';
import { Rankings } from './components/dashboard/Rankings';
import { Alerts } from './components/dashboard/Alerts';
import { Profile } from './components/dashboard/Profile';
import { getAirQuality, AirQualityData, ForecastData } from './lib/api';
import { Loader2 } from 'lucide-react';
import { Toaster } from 'sonner@2.0.3';
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./components/ui/button";

// Default to Bangalore
const DEFAULT_CITY = {
  name: "Bangalore",
  lat: 12.9716,
  lon: 77.5946,
  country: "India"
};

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentCity, setCurrentCity] = useState(DEFAULT_CITY);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ current: AirQualityData; forecast: ForecastData } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAirQuality(currentCity.lat, currentCity.lon);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentCity]);

  const handleCitySelect = (city: any) => {
    setCurrentCity(city);
    // If searching, likely want to see dashboard for that city
    if (currentView !== 'dashboard') {
      setCurrentView('dashboard');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'rankings':
        return <Rankings />;
      case 'alerts':
        return <Alerts />;
      case 'profile':
        return <Profile />;
      case 'dashboard':
      default:
        return loading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : data ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <AQIOverview 
              aqi={data.current.aqi}
              city={currentCity.name}
              country={currentCity.country}
              timestamp={data.current.timestamp}
            />
            
            <PollutantsGrid data={data.current} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ForecastChart data={data.forecast} />
            </div>
            
            <CityComparison />

            {/* Awareness Section */}
            <div className="bg-muted/30 rounded-2xl p-6 border flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Sustainable Development Goal 13</h3>
                <p className="text-muted-foreground max-w-xl">
                  Take urgent action to combat climate change and its impacts. 
                  Monitoring air quality is the first step towards a healthier planet.
                </p>
                <a href="#" className="text-blue-500 hover:underline text-sm font-medium">Learn more about SDG 13 &rarr;</a>
              </div>
              <div className="h-24 w-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                13
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            Failed to load data. Please try again.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header onCitySelect={handleCitySelect} currentCity={currentCity.name} />
      
      <div className="flex flex-1 container mx-auto px-4 max-w-7xl">
        {/* Desktop Sidebar */}
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />

        {/* Mobile Menu Trigger (Optional enhancement) */}
        <div className="lg:hidden absolute top-[70px] left-4 z-40">
           <Sheet>
             <SheetTrigger asChild>
               <Button variant="outline" size="icon">
                 <Menu className="h-4 w-4" />
               </Button>
             </SheetTrigger>
             <SheetContent side="left" className="p-0 w-72">
               <Sidebar currentView={currentView} onViewChange={(view) => { setCurrentView(view); }} className="flex border-none w-full h-full static" />
             </SheetContent>
           </Sheet>
        </div>
        
        <main className="flex-1 py-6 lg:pl-8 space-y-6 overflow-hidden">
          {renderContent()}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
