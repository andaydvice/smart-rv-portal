
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Location } from '@/types/weather';
import { Search } from 'lucide-react';

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      setIsSearching(true);
      const apiKey = localStorage.getItem('oneCallAPIKey');
      
      if (!apiKey) {
        throw new Error("Please enter an API key first");
      }
      
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          searchQuery
        )}&limit=1&appid=${apiKey}`
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
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error('Error searching location:', error);
      // You could handle the error with toast notifications here
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-4">
      <div className="relative flex-1">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location..."
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-4 w-4" />
        </div>
      </div>
      <Button type="submit" disabled={isSearching || !searchQuery.trim()}>
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
};

export default LocationSearch;
