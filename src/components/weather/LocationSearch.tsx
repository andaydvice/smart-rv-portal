import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Location } from '@/types/weather';

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          searchQuery
        )}&limit=1&appid=${localStorage.getItem('oneCallAPIKey')}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch location');
      
      const data = await response.json();
      
      if (data.length > 0) {
        const location: Location = {
          lat: data[0].lat,
          lon: data[0].lon,
          name: `${data[0].name}, ${data[0].state || data[0].country}`
        };
        
        localStorage.setItem('weatherLocation', JSON.stringify(location));
        onLocationSelect(location);
        setSearchQuery('');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-4">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search location..."
        className="flex-1"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default LocationSearch;