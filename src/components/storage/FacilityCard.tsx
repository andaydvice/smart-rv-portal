
import { Building2, MapPin, Phone, Mail, CheckCircle, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useFavorites } from './useFavorites';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

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
}

interface FacilityCardProps {
  facility: StorageFacility;
  isHighlighted: boolean;
  onClick: () => void;
}

const FacilityCard = ({ facility, isHighlighted, onClick }: FacilityCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, isFavorite, addFavorite, removeFavorite, isLoading } = useFavorites();
  
  const featureLabels = {
    indoor: 'Indoor Storage',
    climate_controlled: 'Climate Controlled',
    "24h_access": '24/7 Access',
    security_system: 'Security System',
    vehicle_washing: 'Vehicle Washing'
  };

  const activeFeatures = Object.entries(facility.features)
    .filter(([_, value]) => value)
    .map(([key, _]) => featureLabels[key as keyof typeof featureLabels]);

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

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 bg-[#131a2a] border-gray-700 hover:border-[#60A5FA] ${
        isHighlighted ? 'border-[#60A5FA] ring-1 ring-[#60A5FA]' : ''
      }`}
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-[#60A5FA] flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {facility.name}
            </h3>
            <div className="flex items-start gap-2 mt-1 text-gray-300">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span className="text-sm">{facility.address}, {facility.city}, {facility.state}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={isLoading}
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite(facility.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </Button>
        </div>

        <div className="flex justify-between items-center py-2 border-y border-gray-700">
          <div>
            <span className="text-sm text-gray-400">Price Range</span>
            <div className="font-semibold text-[#60A5FA]">
              ${facility.price_range.min} - ${facility.price_range.max}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {facility.contact_phone && (
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{facility.contact_phone}</span>
            </div>
          )}
          {facility.contact_email && (
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{facility.contact_email}</span>
            </div>
          )}
        </div>

        {activeFeatures.length > 0 && (
          <div className="space-y-1">
            <div className="flex flex-wrap gap-2">
              {activeFeatures.map((feature, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-[#1a2235] text-[#60A5FA]"
                >
                  <CheckCircle className="w-3 h-3" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FacilityCard;
