
import React from 'react';
import { WeatherData } from '@/types/weather';

interface WeatherDataProviderProps {
  currentLocation: {
    lat: number;
    lon: number;
    name: string;
  };
  children: (props: {
    weatherData: WeatherData | null;
    isLoading: boolean;
    error: string | null;
  }) => React.ReactNode;
}

const WeatherDataProvider: React.FC<WeatherDataProviderProps> = ({ currentLocation, children }) => {
  // This is a simplified version that doesn't actually fetch data
  // since we've moved to static content for weather pages
  return children({
    weatherData: null,
    isLoading: false,
    error: null
  });
};

export default WeatherDataProvider;
