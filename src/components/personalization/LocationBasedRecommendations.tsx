import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink, Star } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  region?: string;
}

interface RegionalDealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distance: number;
  rating: number;
  reviewCount: number;
  services: string[];
  website?: string;
  phone?: string;
  specialties: string[];
}

interface LocationBasedRecommendationsProps {
  category: 'rv_dealers' | 'service_centers' | 'parts_suppliers' | 'storage_facilities';
  className?: string;
}

const LocationBasedRecommendations = ({ 
  category, 
  className = "" 
}: LocationBasedRecommendationsProps) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [dealers, setDealers] = useState<RegionalDealer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLocationAndRecommendations();
  }, [category]);

  const loadLocationAndRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      // First try to get saved location
      const savedLocation = localStorage.getItem('user_location');
      let userLocation: LocationData | null = null;

      if (savedLocation) {
        userLocation = JSON.parse(savedLocation);
      } else {
        // Request user location
        userLocation = await getCurrentLocation();
        if (userLocation) {
          localStorage.setItem('user_location', JSON.stringify(userLocation));
        }
      }

      if (userLocation) {
        setLocation(userLocation);
        await loadRegionalDealers(userLocation);
      } else {
        setError('Location access denied. Showing general recommendations.');
        await loadDefaultRecommendations();
      }
    } catch (err) {
      console.error('Error loading location recommendations:', err);
      setError('Unable to load location-based recommendations.');
      await loadDefaultRecommendations();
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = (): Promise<LocationData | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocode to get city/state (mock implementation)
            const locationData: LocationData = {
              latitude,
              longitude,
              city: 'Your City', // In production, use reverse geocoding API
              state: 'Your State',
              region: 'Your Region'
            };
            
            resolve(locationData);
          } catch (error) {
            resolve({ latitude, longitude });
          }
        },
        () => resolve(null),
        { timeout: 10000, enableHighAccuracy: false }
      );
    });
  };

  const loadRegionalDealers = async (userLocation: LocationData) => {
    // Mock data - in production, this would be an API call
    const mockDealers: RegionalDealer[] = [
      {
        id: '1',
        name: 'Rocky Mountain RV Center',
        address: '123 Highway 50',
        city: 'Denver',
        state: 'CO',
        distance: 12.5,
        rating: 4.7,
        reviewCount: 189,
        services: ['Sales', 'Service', 'Parts', 'Financing'],
        website: 'https://rockymountainrv.com',
        phone: '(303) 555-0123',
        specialties: ['Solar Installation', 'Lithium Upgrades', 'Custom Builds']
      },
      {
        id: '2',
        name: 'Adventure RV Solutions',
        address: '456 Mountain View Dr',
        city: 'Boulder',
        state: 'CO',
        distance: 18.2,
        rating: 4.5,
        reviewCount: 97,
        services: ['Service', 'Parts', 'Accessories'],
        phone: '(720) 555-0456',
        specialties: ['Boondocking Setups', 'Off-Grid Systems', 'Satellite Internet']
      },
      {
        id: '3',
        name: 'Mile High Mobile Service',
        address: 'Mobile Service Area',
        city: 'Aurora',
        state: 'CO',
        distance: 8.7,
        rating: 4.9,
        reviewCount: 156,
        services: ['Mobile Service', 'Emergency Repair', 'Winterization'],
        phone: '(303) 555-0789',
        specialties: ['Mobile Repairs', '24/7 Emergency', 'Roadside Service']
      }
    ];

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDealers(mockDealers);

    // Track location-based recommendation view
    console.log('Location-Based Recommendations Loaded:', {
      category,
      userLocation: {
        city: userLocation.city,
        state: userLocation.state
      },
      dealerCount: mockDealers.length,
      timestamp: new Date().toISOString()
    });
  };

  const loadDefaultRecommendations = async () => {
    // Load popular national dealers/services
    const defaultRecommendations: RegionalDealer[] = [
      {
        id: 'national-1',
        name: 'Camping World',
        address: 'Multiple Locations',
        city: 'Nationwide',
        state: '',
        distance: 0,
        rating: 4.2,
        reviewCount: 2847,
        services: ['Sales', 'Service', 'Parts', 'Accessories'],
        website: 'https://campingworld.com',
        specialties: ['New & Used RVs', 'Service Centers', 'Extended Warranties']
      },
      {
        id: 'national-2',
        name: 'Good Sam Club',
        address: 'Multiple Locations',
        city: 'Nationwide',
        state: '',
        distance: 0,
        rating: 4.4,
        reviewCount: 1923,
        services: ['Roadside Assistance', 'Travel Planning', 'Discounts'],
        website: 'https://goodsam.com',
        specialties: ['Roadside Assistance', 'Travel Discounts', 'RV Insurance']
      }
    ];

    setDealers(defaultRecommendations);
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'rv_dealers': return 'RV Dealers Near You';
      case 'service_centers': return 'Service Centers';
      case 'parts_suppliers': return 'Parts Suppliers';
      case 'storage_facilities': return 'Storage Facilities';
      default: return 'Recommendations';
    }
  };

  if (loading) {
    return (
      <Card className={`bg-[#091020] border-gray-700 ${className}`}>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#5B9BD5]" />
            Loading Recommendations...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-[#091020] border-gray-700 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#5B9BD5]" />
          {getCategoryTitle()}
          {location?.city && (
            <span className="text-sm font-normal text-gray-400">
              in {location.city}, {location.state}
            </span>
          )}
        </CardTitle>
        {error && (
          <p className="text-sm text-yellow-400">{error}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {dealers.map(dealer => (
          <div 
            key={dealer.id} 
            className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-white">{dealer.name}</h4>
                <p className="text-sm text-gray-400">
                  {dealer.address}, {dealer.city} {dealer.state}
                </p>
                {dealer.distance > 0 && (
                  <p className="text-sm text-[#5B9BD5] flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {dealer.distance} miles away
                  </p>
                )}
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm">{dealer.rating}</span>
                  <span className="text-gray-400 text-xs">({dealer.reviewCount})</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex flex-wrap gap-1 mb-2">
                {dealer.services.slice(0, 4).map(service => (
                  <span 
                    key={service} 
                    className="text-xs bg-[#5B9BD5]/20 text-[#5B9BD5] px-2 py-1 rounded"
                  >
                    {service}
                  </span>
                ))}
              </div>
              
              {dealer.specialties.length > 0 && (
                <p className="text-xs text-gray-400">
                  Specialties: {dealer.specialties.slice(0, 2).join(', ')}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {dealer.website && (
                <Button
                  asChild
                  size="sm"
                  className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                >
                  <a 
                    href={dealer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
              
              {dealer.phone && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <a href={`tel:${dealer.phone}`}>
                    Call: {dealer.phone}
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}

        {dealers.length === 0 && !loading && (
          <p className="text-gray-400 text-center py-4">
            No recommendations available at this time.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationBasedRecommendations;