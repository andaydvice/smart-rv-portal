import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { useCurrency } from '@/hooks/useCurrency';
import { Globe, DollarSign } from 'lucide-react';

interface LocationIndicatorProps {
  showCurrencyToggle?: boolean;
}

const LocationIndicator = ({ showCurrencyToggle = true }: LocationIndicatorProps) => {
  const { geoData } = useGeoLocation();
  const { showSecondary, toggleCurrencyDisplay } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      {/* Location Indicator */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#131a2a] rounded border border-gray-600">
        <span className="text-sm">
          {geoData.countryCode === 'US' ? '🇺🇸' :
           geoData.countryCode === 'CA' ? '🇨🇦' :
           geoData.countryCode === 'AU' ? '🇦🇺' :
           geoData.countryCode === 'GB' ? '🇬🇧' :
           geoData.countryCode === 'DE' ? '🇩🇪' :
           geoData.countryCode === 'NL' ? '🇳🇱' : '🌍'}
        </span>
        <span className="text-xs text-white font-medium">{geoData.countryCode}</span>
        {geoData.isUSA && (
          <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5] text-xs px-1 py-0">
            Primary
          </Badge>
        )}
      </div>

      {/* Currency Toggle for International Users */}
      {showCurrencyToggle && !geoData.isUSA && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCurrencyDisplay}
          className="h-7 px-2 text-xs text-gray-400 hover:text-white hover:bg-[#1a2332] border border-gray-600"
          title={`Toggle currency display: ${showSecondary ? 'Show USD only' : 'Show local currency'}`}
        >
          <DollarSign className="h-3 w-3 mr-1" />
          {showSecondary ? geoData.currency : 'USD'}
        </Button>
      )}

      {/* Quick region selector hint */}
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-1 text-gray-400 hover:text-white hover:bg-[#1a2332]"
        title="Change region settings"
      >
        <Globe className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default LocationIndicator;