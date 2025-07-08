import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGeoLocation, type GeoLocationData } from '@/hooks/useGeoLocation';
import { useCurrency } from '@/hooks/useCurrency';
import { Globe, MapPin, DollarSign, Check } from 'lucide-react';

const SUPPORTED_REGIONS = [
  {
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    region: 'North America',
    isUSA: true,
    timezone: 'America/New_York',
    flag: '🇺🇸',
    description: 'Primary market with full features'
  },
  {
    country: 'Canada',
    countryCode: 'CA',
    currency: 'CAD',
    region: 'North America',
    isUSA: false,
    timezone: 'America/Toronto',
    flag: '🇨🇦',
    description: 'International shipping & local partners'
  },
  {
    country: 'Australia',
    countryCode: 'AU',
    currency: 'AUD',
    region: 'Oceania',
    isUSA: false,
    timezone: 'Australia/Sydney',
    flag: '🇦🇺',
    description: 'Caravan & motorhome specialists'
  },
  {
    country: 'United Kingdom',
    countryCode: 'GB',
    currency: 'GBP',
    region: 'Europe',
    isUSA: false,
    timezone: 'Europe/London',
    flag: '🇬🇧',
    description: 'European RV solutions'
  },
  {
    country: 'Germany',
    countryCode: 'DE',
    currency: 'EUR',
    region: 'Europe',
    isUSA: false,
    timezone: 'Europe/Berlin',
    flag: '🇩🇪',
    description: 'European motorhome market leader'
  },
  {
    country: 'Netherlands',
    countryCode: 'NL',
    currency: 'EUR',
    region: 'Europe',
    isUSA: false,
    timezone: 'Europe/Amsterdam',
    flag: '🇳🇱',
    description: 'European camping culture'
  }
];

interface LocationSelectorProps {
  compact?: boolean;
  showCurrencyToggle?: boolean;
}

const LocationSelector = ({ compact = false, showCurrencyToggle = true }: LocationSelectorProps) => {
  const { geoData, isLoading, setLocationPreference } = useGeoLocation();
  const { showSecondary, toggleCurrencyDisplay } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Select
          value={geoData.countryCode}
          onValueChange={(countryCode) => {
            const region = SUPPORTED_REGIONS.find(r => r.countryCode === countryCode);
            if (region) {
              setLocationPreference(region);
            }
          }}
        >
          <SelectTrigger className="w-32 h-8 text-sm border-gray-600 bg-[#131a2a]">
            <SelectValue>
              <div className="flex items-center gap-1">
                <span>{SUPPORTED_REGIONS.find(r => r.countryCode === geoData.countryCode)?.flag}</span>
                <span>{geoData.countryCode}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[#131a2a] border-gray-600">
            {SUPPORTED_REGIONS.map((region) => (
              <SelectItem key={region.countryCode} value={region.countryCode} className="text-white">
                <div className="flex items-center gap-2">
                  <span>{region.flag}</span>
                  <span>{region.country}</span>
                  {region.isUSA && <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5] text-xs">Primary</Badge>}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {showCurrencyToggle && !geoData.isUSA && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCurrencyDisplay}
            className="h-8 px-2 text-xs text-gray-400 hover:text-white"
          >
            <DollarSign className="h-3 w-3 mr-1" />
            {showSecondary ? 'Local' : 'USD'}
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className="bg-[#091020] border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="h-5 w-5 text-[#5B9BD5]" />
          <h3 className="text-lg font-medium text-white">Location & Currency</h3>
          {isLoading && (
            <div className="animate-spin h-4 w-4 border-2 border-[#5B9BD5] border-t-transparent rounded-full" />
          )}
        </div>

        <div className="space-y-4">
          {/* Current Location */}
          <div className="flex items-center justify-between p-3 bg-[#131a2a] rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{SUPPORTED_REGIONS.find(r => r.countryCode === geoData.countryCode)?.flag}</span>
              <div>
                <p className="text-white font-medium">{geoData.country}</p>
                <p className="text-gray-400 text-sm">{geoData.currency} • {geoData.region}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {geoData.isUSA && (
                <Badge className="bg-[#5B9BD5] text-white">Primary Market</Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#5B9BD5] hover:bg-[#5B9BD5]/10"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Change
              </Button>
            </div>
          </div>

          {/* Currency Toggle */}
          {showCurrencyToggle && !geoData.isUSA && (
            <div className="flex items-center justify-between p-3 bg-[#131a2a] rounded-lg border border-gray-700">
              <div>
                <p className="text-white font-medium">Currency Display</p>
                <p className="text-gray-400 text-sm">Show prices in local currency alongside USD</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleCurrencyDisplay}
                className={`border-gray-600 ${showSecondary ? 'bg-[#5B9BD5] text-white border-[#5B9BD5]' : 'text-gray-400'}`}
              >
                <DollarSign className="h-4 w-4 mr-1" />
                {showSecondary ? 'Local Currency' : 'USD Only'}
              </Button>
            </div>
          )}

          {/* Region Selection */}
          {isOpen && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Select Your Region</h4>
              {SUPPORTED_REGIONS.map((region) => (
                <button
                  key={region.countryCode}
                  onClick={() => {
                    setLocationPreference(region);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                    region.countryCode === geoData.countryCode
                      ? 'border-[#5B9BD5] bg-[#5B9BD5]/10'
                      : 'border-gray-700 bg-[#131a2a] hover:border-gray-600 hover:bg-[#1a2332]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{region.flag}</span>
                      <div>
                        <p className="text-white font-medium">{region.country}</p>
                        <p className="text-gray-400 text-sm">{region.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {region.isUSA && (
                        <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
                          Primary
                        </Badge>
                      )}
                      {region.countryCode === geoData.countryCode && (
                        <Check className="h-4 w-4 text-[#5B9BD5]" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Information Note */}
          <div className="text-xs text-gray-400 p-2 bg-[#131a2a]/50 rounded border border-gray-700/50">
            <p>🇺🇸 <strong>USA customers</strong> get full features, fastest shipping, and best prices.</p>
            <p>🌍 <strong>International customers</strong> can shop with currency conversion and international shipping options.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSelector;