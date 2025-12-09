export interface AirQualityData {
  aqi: number;
  pm2_5: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
  co: number;
  timestamp: string;
}

export interface ForecastData {
  time: string[];
  aqi: number[];
}

export const getAirQuality = async (lat: number, lon: number): Promise<{ current: AirQualityData, forecast: ForecastData }> => {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current: 'us_aqi,pm10,pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone,carbon_monoxide',
      hourly: 'us_aqi',
      timezone: 'auto',
      forecast_days: '7'
    });

    const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`);
    const data = await response.json();

    if (!data.current) {
      throw new Error('No data received');
    }

    return {
      current: {
        aqi: data.current.us_aqi,
        pm2_5: data.current.pm2_5,
        pm10: data.current.pm10,
        no2: data.current.nitrogen_dioxide,
        so2: data.current.sulphur_dioxide,
        o3: data.current.ozone,
        co: data.current.carbon_monoxide,
        timestamp: data.current.time,
      },
      forecast: {
        time: data.hourly.time,
        aqi: data.hourly.us_aqi,
      }
    };
  } catch (error) {
    console.error("Failed to fetch air quality data:", error);
    throw error;
  }
};

export const searchCity = async (query: string): Promise<{ name: string; lat: number; lon: number; country: string }[]> => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    const data = await response.json();
    if (!data.results) return [];
    
    return data.results.map((item: any) => ({
      name: item.name,
      lat: item.latitude,
      lon: item.longitude,
      country: item.country
    }));
  } catch (error) {
    console.error("Failed to search city:", error);
    return [];
  }
};
