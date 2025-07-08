import { useState, useEffect } from 'react';

export interface GeoLocationData {
  country: string;
  countryCode: string;
  currency: string;
  region: string;
  isUSA: boolean;
  timezone: string;
}

export const useGeoLocation = () => {
  const [geoData, setGeoData] = useState<GeoLocationData>({
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    region: 'North America',
    isUSA: true,
    timezone: 'America/New_York'
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [userPreference, setUserPreference] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user preference first
    const stored = localStorage.getItem('user_location_preference');
    if (stored) {
      try {
        const preference = JSON.parse(stored);
        setGeoData(preference);
        setUserPreference(preference.countryCode);
        setIsLoading(false);
        return;
      } catch (error) {
        console.warn('Invalid stored location preference:', error);
      }
    }

    // Auto-detect location with USA fallback
    detectLocation();
  }, []);

  const detectLocation = async () => {
    try {
      // Try multiple geo-detection methods with USA fallback
      let detectedData = await fetchGeoData();
      
      // Always default to USA if detection fails or returns uncertain results
      if (!detectedData || !detectedData.country) {
        detectedData = {
          country: 'United States',
          countryCode: 'US',
          currency: 'USD',
          region: 'North America',
          isUSA: true,
          timezone: 'America/New_York'
        };
      }

      setGeoData(detectedData);
    } catch (error) {
      console.warn('Geo-detection failed, defaulting to USA:', error);
      // Keep USA default
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGeoData = async (): Promise<GeoLocationData> => {
    // Use timezone detection as primary method (most reliable)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language || 'en-US';
    
    // USA timezone detection
    const usTimezones = [
      'America/New_York', 'America/Chicago', 'America/Denver', 
      'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu'
    ];
    
    if (usTimezones.some(tz => timezone.includes(tz.split('/')[1]))) {
      return {
        country: 'United States',
        countryCode: 'US',
        currency: 'USD',
        region: 'North America',
        isUSA: true,
        timezone
      };
    }

    // Try to detect other major RV markets
    const countryMappings: Record<string, Partial<GeoLocationData>> = {
      'Canada': { countryCode: 'CA', currency: 'CAD', region: 'North America' },
      'Australia': { countryCode: 'AU', currency: 'AUD', region: 'Oceania' },
      'United Kingdom': { countryCode: 'GB', currency: 'GBP', region: 'Europe' },
      'Germany': { countryCode: 'DE', currency: 'EUR', region: 'Europe' },
      'France': { countryCode: 'FR', currency: 'EUR', region: 'Europe' },
      'Netherlands': { countryCode: 'NL', currency: 'EUR', region: 'Europe' },
    };

    // Enhanced detection based on timezone and locale
    let detectedCountry = 'United States';
    let isUSA = true;

    if (timezone.includes('America/Toronto') || locale.includes('CA')) {
      detectedCountry = 'Canada';
      isUSA = false;
    } else if (timezone.includes('Australia') || locale.includes('AU')) {
      detectedCountry = 'Australia';
      isUSA = false;
    } else if (timezone.includes('Europe') || locale.includes('GB')) {
      detectedCountry = 'United Kingdom';
      isUSA = false;
    } else if (timezone.includes('Europe') && locale.includes('DE')) {
      detectedCountry = 'Germany';
      isUSA = false;
    }

    const mapping = countryMappings[detectedCountry];
    
    return {
      country: detectedCountry,
      countryCode: mapping?.countryCode || 'US',
      currency: mapping?.currency || 'USD',
      region: mapping?.region || 'North America',
      isUSA,
      timezone
    };
  };

  const setLocationPreference = (locationData: GeoLocationData) => {
    setGeoData(locationData);
    setUserPreference(locationData.countryCode);
    localStorage.setItem('user_location_preference', JSON.stringify(locationData));
  };

  const resetToUSA = () => {
    const usaData = {
      country: 'United States',
      countryCode: 'US',
      currency: 'USD',
      region: 'North America',
      isUSA: true,
      timezone: 'America/New_York'
    };
    setLocationPreference(usaData);
  };

  return {
    geoData,
    isLoading,
    userPreference,
    setLocationPreference,
    resetToUSA,
    detectLocation
  };
};
