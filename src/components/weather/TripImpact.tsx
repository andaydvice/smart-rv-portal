import React from 'react';
import { WeatherData } from '@/types/weather';
import { cn } from '@/lib/utils';

interface TripImpactProps {
  weatherData: WeatherData;
  className?: string;
}

const TripImpact: React.FC<TripImpactProps> = ({ weatherData, className }) => {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold">Trip Impact Analysis</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-background-secondary/50 rounded-lg">
          <h3 className="font-semibold mb-2">Travel Conditions</h3>
          <ul className="space-y-2">
            <li>Wind Speed: {weatherData.current.windSpeed} m/s</li>
            <li>Visibility: Good</li>
            <li>Road Conditions: Normal</li>
          </ul>
        </div>
        <div className="p-4 bg-background-secondary/50 rounded-lg">
          <h3 className="font-semibold mb-2">Recommendations</h3>
          <ul className="space-y-2">
            <li>Check tire pressure</li>
            <li>Monitor wind conditions</li>
            <li>Plan breaks accordingly</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TripImpact;