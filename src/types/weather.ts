export interface Location {
  lat: number;
  lon: number;
  name: string;
}

export interface WeatherData {
  timestamp: number;
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
  };
  daily: Array<{
    date: number;
    temp: {
      min: number;
      max: number;
    };
    description: string;
  }>;
}