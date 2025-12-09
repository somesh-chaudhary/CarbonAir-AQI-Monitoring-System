import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Search, Trophy, Loader2 } from 'lucide-react';
import { getAQILevel } from '../../lib/utils';
import { getAirQuality } from '../../lib/api';

const CITIES_TO_TRACK = [
  { name: "New Delhi", country: "India", lat: 28.6139, lon: 77.2090 },
  { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074 },
  { name: "New York", country: "USA", lat: 40.7128, lon: -74.0060 },
  { name: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Sao Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333 },
  { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777 },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { name: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
];

interface RankingItem {
  rank: number;
  city: string;
  country: string;
  aqi: number;
  status: string;
}

export const Rankings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const promises = CITIES_TO_TRACK.map(async (city) => {
          try {
            const data = await getAirQuality(city.lat, city.lon);
            return {
              city: city.name,
              country: city.country,
              aqi: data.current.aqi,
              status: getAQILevel(data.current.aqi).label
            };
          } catch (e) {
            return null;
          }
        });

        const results = await Promise.all(promises);
        const validResults = results.filter((r): r is NonNullable<typeof r> => r !== null);
        
        // Sort by AQI descending
        validResults.sort((a, b) => b.aqi - a.aqi);
        
        // Add rank
        const rankedResults = validResults.map((item, index) => ({
          ...item,
          rank: index + 1
        }));

        setRankings(rankedResults);
      } catch (error) {
        console.error("Failed to fetch rankings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const filteredRankings = rankings.filter(
    (item) => 
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Global Rankings</h2>
          <p className="text-muted-foreground">Real-time air quality from major cities.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search city..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Live City Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">AQI</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRankings.map((item) => {
                   const { color, bg, border } = getAQILevel(item.aqi);
                   return (
                    <TableRow key={item.city}>
                      <TableCell className="font-medium">
                        {item.rank === 1 && "🥇"}
                        {item.rank === 2 && "🥈"}
                        {item.rank === 3 && "🥉"}
                        {item.rank > 3 && `#${item.rank}`}
                      </TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell className="text-muted-foreground">{item.country}</TableCell>
                      <TableCell className="text-right font-bold text-lg">{item.aqi}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={`${color} ${bg}/10 ${border} whitespace-nowrap`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
