import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { searchCity } from '../../lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface HeaderProps {
  onCitySelect: (city: { name: string; lat: number; lon: number; country: string }) => void;
  currentCity: string;
}

export const Header: React.FC<HeaderProps> = ({ onCitySelect, currentCity }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ name: string; lat: number; lon: number; country: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const cities = await searchCity(query);
        setResults(cities);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (city: any) => {
    onCitySelect(city);
    setOpen(false);
    setQuery("");
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            CA
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            CarbonAir
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-[200px] md:w-[300px] justify-start text-muted-foreground bg-muted/50 border-0">
                <Search className="mr-2 h-4 w-4" />
                {currentCity || "Search city..."}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Search Location</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Type city name..." 
                    className="pl-9"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[300px] rounded-md border p-2">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map((city, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => handleSelect(city)}
                        >
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-xs text-muted-foreground">{city.country}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      {query.length > 2 ? "No results found" : "Start typing to search..."}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};
