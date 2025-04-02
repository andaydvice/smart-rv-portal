
import React from 'react';
import { WeatherData } from '@/types/weather';
import { Card } from '@/components/ui/card';
import { CloudSun, Thermometer, Wind } from 'lucide-react';

interface WeatherCardsSectionProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

const WeatherCardsSection: React.FC<WeatherCardsSectionProps> = ({
  weatherData,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-4 animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!weatherData) {
    return (
      <Card className="p-4 text-center mb-8">
        <p>Enter your API key to view weather data</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold mb-2">Temperature</h3>
          <Thermometer className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-2xl">{Math.round(weatherData.current.temp)}°C</p>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold mb-2">Humidity</h3>
          <CloudSun className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-2xl">{weatherData.current.humidity}%</p>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold mb-2">Wind Speed</h3>
          <Wind className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-2xl">{weatherData.current.windSpeed} m/s</p>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold mb-2">Conditions</h3>
          <CloudSun className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-2xl capitalize">{weatherData.current.description}</p>
      </Card>
    </div>
  );
};

export default WeatherCardsSection;
