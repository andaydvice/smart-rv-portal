import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { Globe, X, MapPin, Truck, CreditCard } from 'lucide-react';

const InternationalBanner = () => {
  const { geoData, resetToUSA } = useGeoLocation();
  const [dismissed, setDismissed] = useState(false);

  // Only show for non-USA visitors who haven't dismissed
  if (geoData.isUSA || dismissed) {
    return null;
  }

  const features = [
    {
      icon: <Truck className="h-4 w-4" />,
      text: "International Shipping Available"
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      text: `Prices shown in ${geoData.currency} + USD`
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      text: "Regional RV Partner Network"
    }
  ];

  return (
    <Alert className="bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 border-[#5B9BD5]/30 mb-6">
      <Globe className="h-4 w-4 text-[#5B9BD5]" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{
              geoData.countryCode === 'CA' ? '🇨🇦' :
              geoData.countryCode === 'AU' ? '🇦🇺' :
              geoData.countryCode === 'GB' ? '🇬🇧' :
              geoData.countryCode === 'DE' ? '🇩🇪' :
              geoData.countryCode === 'NL' ? '🇳🇱' : '🌍'
            }</span>
            <span className="text-white font-medium">
              Welcome, international visitor from {geoData.country}!
            </span>
            <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
              International
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-1">
                {feature.icon}
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-400 mt-2">
            Our primary focus is the USA market, but we welcome international customers with special services.
          </p>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToUSA}
            className="border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5]/10"
          >
            View USA Site
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default InternationalBanner;