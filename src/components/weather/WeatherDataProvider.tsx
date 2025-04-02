
import React, { useEffect, useState } from 'react';
import { Location, WeatherData } from '@/types/weather';
import { fetchWeatherData } from '@/utils/weatherAPI';

interface WeatherDataProviderProps {
  currentLocation: Location;
  children: (props: {
    weatherData: WeatherData | null;
    isLoading: boolean;
    error: Error | null;
  }) => React.ReactNode;
}

const WeatherDataProvider: React.FC<WeatherDataProviderProps> = ({
  currentLocation,
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const apiKey = localStorage.getItem('oneCallAPIKey');
    if (!apiKey) {
      // Don't attempt to fetch if no API key is available
      setError(new Error('API key is required'));
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchWeatherData(currentLocation.lat, currentLocation.lon);
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentLocation]);

  return <>{children({ weatherData, isLoading, error })}</>;
};

export default WeatherDataProvider;
