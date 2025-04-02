
import React, { useEffect, useState } from 'react';
import { Location, WeatherData } from '@/types/weather';
import { fetchWeatherData } from '@/utils/weatherAPI';

interface WeatherDataProviderProps {
  currentLocation: Location;
  children: (props: {
    weatherData: WeatherData | null;
    isLoading: boolean;
    error: Error | null;
    isActivationError: boolean;
  }) => React.ReactNode;
}

const WeatherDataProvider: React.FC<WeatherDataProviderProps> = ({
  currentLocation,
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isActivationError, setIsActivationError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setIsActivationError(false);

        const data = await fetchWeatherData(currentLocation.lat, currentLocation.lon);
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err as Error);
        if (err instanceof Error && err.message.includes('API key')) {
          setIsActivationError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentLocation]);

  return <>{children({ weatherData, isLoading, error, isActivationError })}</>;
};

export default WeatherDataProvider;
