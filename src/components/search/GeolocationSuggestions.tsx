import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Star, Phone, Clock, Car } from 'lucide-react';

interface LocationSuggestion {
  id: string;
  type: 'facility' | 'service' | 'destination' | 'emergency';
  name: string;
  address: string;
  distance: number;
  rating?: number;
  category: string;
  description: string;
  hours?: string;
  phone?: string;
  services?: string[];
  price?: string;
  coordinates: { lat: number; lng: number };
}

interface GeolocationSuggestionsProps {
  userLocation?: { lat: number; lng: number };
  searchRadius?: number;
  onSuggestionClick?: (suggestion: LocationSuggestion) => void;
}

export const GeolocationSuggestions: React.FC<GeolocationSuggestionsProps> = ({
  userLocation,
  searchRadius = 50,
  onSuggestionClick
}) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(userLocation || null);

  useEffect(() => {
    checkGeolocationPermission();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      fetchLocationSuggestions();
    }
  }, [currentLocation, searchRadius]);

  const checkGeolocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationPermission('denied');
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setLocationPermission(permission.state);
      
      if (permission.state === 'granted' && !currentLocation) {
        getCurrentLocation();
      }
    } catch (error) {
      console.error('Error checking geolocation permission:', error);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        setLocationPermission('granted');
        setIsLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationPermission('denied');
        setIsLoading(false);
        // Use default suggestions for major cities
        generateDefaultSuggestions();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const fetchLocationSuggestions = async () => {
    if (!currentLocation) return;
    
    setIsLoading(true);
    
    // Simulate API call to find nearby facilities and services
    setTimeout(() => {
      const mockSuggestions = generateLocationSuggestions();
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 1000);
  };

  const generateLocationSuggestions = (): LocationSuggestion[] => {
    if (!currentLocation) return [];

    // Mock data - in real app, this would come from APIs
    return [
      {
        id: '1',
        type: 'facility',
        name: 'Secure RV Storage Plus',
        address: '1234 Storage Lane, Your City, ST 12345',
        distance: 2.3,
        rating: 4.8,
        category: 'Indoor Storage',
        description: 'Climate-controlled indoor storage with 24/7 security',
        hours: '24/7 Access',
        phone: '(555) 123-4567',
        services: ['Security', 'Climate Control', 'Wash Station'],
        price: '$120/month',
        coordinates: { lat: currentLocation.lat + 0.01, lng: currentLocation.lng + 0.01 }
      },
      {
        id: '2',
        type: 'service',
        name: 'Mobile RV Repair Pro',
        address: '567 Service Rd, Your City, ST 12345',
        distance: 4.7,
        rating: 4.6,
        category: 'Mobile Service',
        description: 'On-site RV maintenance and emergency repairs',
        hours: 'Mon-Sat 8AM-6PM',
        phone: '(555) 987-6543',
        services: ['Engine Repair', 'Electrical', 'Plumbing', 'Emergency'],
        price: '$95/hour',
        coordinates: { lat: currentLocation.lat + 0.02, lng: currentLocation.lng - 0.01 }
      },
      {
        id: '3',
        type: 'destination',
        name: 'Sunset RV Park & Resort',
        address: '890 Scenic Dr, Your City, ST 12345',
        distance: 12.5,
        rating: 4.9,
        category: 'RV Park',
        description: 'Full-hookup sites with lake views and amenities',
        hours: 'Check-in 3PM',
        phone: '(555) 456-7890',
        services: ['Full Hookups', 'WiFi', 'Pool', 'Store'],
        price: '$45/night',
        coordinates: { lat: currentLocation.lat + 0.05, lng: currentLocation.lng + 0.03 }
      },
      {
        id: '4',
        type: 'service',
        name: 'RV Parts & Accessories',
        address: '321 Parts Ave, Your City, ST 12345',
        distance: 6.8,
        rating: 4.4,
        category: 'Parts Store',
        description: 'Complete RV parts, accessories, and supplies',
        hours: 'Mon-Fri 9AM-7PM, Sat 9AM-5PM',
        phone: '(555) 234-5678',
        services: ['Parts', 'Accessories', 'Propane', 'Repairs'],
        price: 'Varies',
        coordinates: { lat: currentLocation.lat - 0.01, lng: currentLocation.lng + 0.02 }
      },
      {
        id: '5',
        type: 'emergency',
        name: '24/7 RV Roadside Assistance',
        address: 'Mobile Service - Your Area',
        distance: 0,
        rating: 4.7,
        category: 'Emergency Service',
        description: 'Round-the-clock emergency roadside assistance',
        hours: '24/7 Emergency',
        phone: '(555) 911-HELP',
        services: ['Towing', 'Jump Start', 'Flat Tire', 'Lockout'],
        price: 'From $75',
        coordinates: currentLocation
      }
    ];
  };

  const generateDefaultSuggestions = () => {
    // Default suggestions for when location is not available
    const defaultSuggestions: LocationSuggestion[] = [
      {
        id: 'default-1',
        type: 'facility',
        name: 'National RV Storage Network',
        address: 'Multiple Locations Available',
        distance: 0,
        rating: 4.5,
        category: 'Storage Network',
        description: 'Find storage facilities across the country',
        coordinates: { lat: 39.8283, lng: -98.5795 } // Center of US
      }
    ];
    setSuggestions(defaultSuggestions);
  };

  const requestLocation = () => {
    getCurrentLocation();
  };

  const getDirections = (suggestion: LocationSuggestion) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${suggestion.coordinates.lat},${suggestion.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const callBusiness = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'facility': return '🏢';
      case 'service': return '🔧';
      case 'destination': return '🏕️';
      case 'emergency': return '🚨';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'facility': return 'bg-blue-500';
      case 'service': return 'bg-green-500';
      case 'destination': return 'bg-purple-500';
      case 'emergency': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-connectivity-accent" />
          Nearby Suggestions
        </CardTitle>
        
        {locationPermission !== 'granted' && (
          <div className="text-sm text-muted-foreground">
            <p>Enable location access for personalized nearby suggestions</p>
            <Button
              size="sm"
              onClick={requestLocation}
              className="mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Getting Location...' : 'Enable Location'}
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onSuggestionClick?.(suggestion)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getTypeIcon(suggestion.type)}</span>
                      <h4 className="font-medium text-sm">{suggestion.name}</h4>
                      {suggestion.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">{suggestion.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                    <p className="text-xs text-muted-foreground mb-2">{suggestion.address}</p>
                    
                    <div className="flex items-center gap-4 mb-2 text-xs text-muted-foreground">
                      {suggestion.distance > 0 && (
                        <div className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          <span>{suggestion.distance} miles</span>
                        </div>
                      )}
                      {suggestion.hours && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{suggestion.hours}</span>
                        </div>
                      )}
                      {suggestion.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{suggestion.phone}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.category}
                      </Badge>
                      {suggestion.price && (
                        <Badge variant="outline" className="text-xs">
                          {suggestion.price}
                        </Badge>
                      )}
                    </div>
                    
                    {suggestion.services && (
                      <div className="flex flex-wrap gap-1">
                        {suggestion.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {suggestion.services.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{suggestion.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(suggestion);
                      }}
                      className="gap-1"
                    >
                      <Navigation className="h-3 w-3" />
                      Directions
                    </Button>
                    
                    {suggestion.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          callBusiness(suggestion.phone!);
                        }}
                        className="gap-1"
                      >
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && suggestions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No nearby suggestions found</p>
            <p className="text-xs">Try enabling location or expanding search radius</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};