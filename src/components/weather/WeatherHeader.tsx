import React from 'react';
import { format } from 'date-fns';

interface WeatherHeaderProps {
  locationName: string;
  timestamp?: number;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ locationName, timestamp }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">{locationName}</h1>
      {timestamp && (
        <p className="text-sm opacity-70">
          Last updated: {format(timestamp * 1000, 'PPpp')}
        </p>
      )}
    </div>
  );
};

export default WeatherHeader;