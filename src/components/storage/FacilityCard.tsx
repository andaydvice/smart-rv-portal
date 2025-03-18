
import React, { forwardRef } from 'react';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useFavorites } from './useFavorites';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { FacilityHeader } from './facility-card/FacilityHeader';
import { PriceRange } from './facility-card/PriceRange';
import { ContactInfo } from './facility-card/ContactInfo';
import { FacilityFeatures } from './facility-card/FacilityFeatures';
import StarRating from '@/components/ui/star-rating';

interface StorageFacility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
  contact_phone?: string;
  contact_email?: string;
  avg_rating?: number;
  review_count?: number;
  verified_fields: {
    features?: boolean;
    location?: boolean;
    price_range?: boolean;
    contact_info?: boolean;
  };
}

interface FacilityCardProps {
  facility: StorageFacility;
  isHighlighted: boolean;
  onClick: () => void;
}

const FacilityCard = forwardRef<HTMLDivElement, FacilityCardProps>(
  ({ facility, isHighlighted, onClick }, ref) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { isAuthenticated, isFavorite, addFavorite, removeFavorite, isLoading } = useFavorites();

    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      
      if (!isAuthenticated) {
        toast({
          title: "Want to save favorites?",
          description: "Create a free account to save your favorite storage facilities and access them anytime.",
          action: (
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Sign Up
            </Button>
          ),
        });
        return;
      }

      if (isFavorite(facility.id)) {
        removeFavorite(facility.id);
      } else {
        addFavorite(facility.id);
      }
    };

    // Custom rating description based on facility features
    const getRatingDescription = () => {
      if (facility.features.indoor && facility.features.climate_controlled) {
        return "Premium indoor facility";
      } else if (facility.features.indoor) {
        return "Indoor storage facility";
      } else if (facility.features.security_system) {
        return "Secure storage facility";
      } else {
        return "Storage facility rating";
      }
    };

    return (
      <Card 
        ref={ref}
        className={`p-4 cursor-pointer transition-all duration-200 bg-[#131a2a] border-gray-700 hover:border-[#60A5FA] ${
          isHighlighted ? 'border-[#60A5FA] ring-1 ring-[#60A5FA]' : ''
        }`}
        onClick={onClick}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <FacilityHeader 
                name={facility.name}
                address={facility.address}
                city={facility.city}
                state={facility.state}
                verifiedFeatures={Boolean(facility.verified_fields?.features)}
                verifiedLocation={Boolean(facility.verified_fields?.location)}
                reviewCount={facility.review_count}
              />
              
              {facility.avg_rating !== undefined && (
                <div className="mt-1">
                  <StarRating 
                    rating={facility.avg_rating} 
                    description={getRatingDescription()}
                    readonly
                    size="sm"
                  />
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0 ml-2"
              disabled={isLoading}
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite(facility.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
            </Button>
          </div>

          <PriceRange 
            min={facility.price_range.min}
            max={facility.price_range.max}
            currency={facility.price_range.currency}
            verified={Boolean(facility.verified_fields?.price_range)}
          />

          <ContactInfo 
            phone={facility.contact_phone}
            email={facility.contact_email}
            verifiedContact={Boolean(facility.verified_fields?.contact_info)}
          />

          <FacilityFeatures features={facility.features} />
        </div>
      </Card>
    );
  }
);

FacilityCard.displayName = 'FacilityCard';

export default FacilityCard;
