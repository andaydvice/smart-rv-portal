
import React from 'react';
import { format } from 'date-fns';
import { MapPin, Clock } from 'lucide-react';

interface WeatherHeaderProps {
  locationName: string;
  timestamp?: number;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ locationName, timestamp }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <MapPin className="h-5 w-5 text-blue-400" />
        <h1 className="text-4xl font-bold">{locationName}</h1>
      </div>
      {timestamp && (
        <div className="flex items-center gap-1 text-sm opacity-70">
          <Clock className="h-3 w-3" />
          <span>Last updated: {format(timestamp * 1000, 'PPpp')}</span>
        </div>
      )}
    </div>
  );
};

export default WeatherHeader;
