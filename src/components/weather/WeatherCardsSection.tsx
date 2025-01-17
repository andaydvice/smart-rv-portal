import React from 'react';
import { WeatherData } from '@/types/weather';
import { Card } from '@/components/ui/card';

interface WeatherCardsSectionProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

const WeatherCardsSection: React.FC<WeatherCardsSectionProps> = ({
  weatherData,
  isLoading,
}) => {
  if (isLoading) {
    return <div>Loading weather data...</div>;
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Temperature</h3>
        <p className="text-2xl">{Math.round(weatherData.current.temp)}°C</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Humidity</h3>
        <p className="text-2xl">{weatherData.current.humidity}%</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Wind Speed</h3>
        <p className="text-2xl">{weatherData.current.windSpeed} m/s</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Conditions</h3>
        <p className="text-2xl capitalize">{weatherData.current.description}</p>
      </Card>
    </div>
  );
};

export default WeatherCardsSection;