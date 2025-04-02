
import React from 'react';
import { WeatherData } from '@/types/weather';
import { cn } from '@/lib/utils';
import { Shield, Truck, Calendar } from 'lucide-react';

interface TripImpactProps {
  weatherData: WeatherData;
  className?: string;
}

const TripImpact: React.FC<TripImpactProps> = ({ weatherData, className }) => {
  // Determine travel condition level based on weather
  const getConditionLevel = () => {
    const { windSpeed } = weatherData.current;
    if (windSpeed > 10) return "caution";
    if (windSpeed > 5) return "moderate";
    return "favorable";
  };
  
  const conditionLevel = getConditionLevel();
  const conditionColors = {
    favorable: "border-green-500/50 bg-green-500/10",
    moderate: "border-yellow-500/50 bg-yellow-500/10",
    caution: "border-orange-500/50 bg-orange-500/10"
  };
  
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-400" />
        <h2 className="text-2xl font-bold">Trip Impact Analysis</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className={`p-4 border rounded-lg ${conditionColors[conditionLevel as keyof typeof conditionColors]}`}>
          <div className="flex items-start justify-between">
            <h3 className="font-semibold mb-2">Travel Conditions</h3>
            <Truck className="h-5 w-5 text-blue-400" />
          </div>
          <ul className="space-y-2">
            <li>Wind Speed: {weatherData.current.windSpeed} m/s</li>
            <li>Visibility: Good</li>
            <li>Road Conditions: Normal</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-blue-500/50 bg-blue-500/10">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <Shield className="h-5 w-5 text-blue-400" />
          </div>
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
