/**
 * Map provider fallback utilities
 */

import { logErrorOnce } from './suppressConsoleSpam';

export interface MapProviderConfig {
  google: {
    available: boolean;
    apiKey: string | null;
    error: string | null;
  };
  mapbox: {
    available: boolean;
    token: string | null;
    error: string | null;
  };
}

/**
 * Determine the best available map provider
 */
export const getBestMapProvider = (config: MapProviderConfig): 'google' | 'mapbox' | null => {
  // Check saved preference first
  const savedProvider = localStorage.getItem('map_provider');
  
  if (savedProvider === 'google' && config.google.available) {
    return 'google';
  }
  
  if (savedProvider === 'mapbox' && config.mapbox.available) {
    return 'mapbox';
  }

  // Fallback logic: prefer Google Maps due to more reliable API
  if (config.google.available) {
    return 'google';
  }
  
  if (config.mapbox.available) {
    return 'mapbox';
  }
  
  logErrorOnce('No map providers available', 'MapFallback');
  return null;
};

/**
 * Switch to fallback provider when current fails
 */
export const switchToFallback = (
  currentProvider: 'google' | 'mapbox',
  config: MapProviderConfig
): 'google' | 'mapbox' | null => {
  const fallbackProvider = currentProvider === 'google' ? 'mapbox' : 'google';
  
  if (config[fallbackProvider].available) {
    localStorage.setItem('map_provider', fallbackProvider);
    return fallbackProvider;
  }
  
  return null;
};

/**
 * Validate map provider configuration
 */
export const validateMapProvider = (provider: 'google' | 'mapbox', config: MapProviderConfig): boolean => {
  const providerConfig = config[provider];
  
  if (!providerConfig.available) {
    logErrorOnce(`${provider} maps not available: ${providerConfig.error}`, 'MapValidation');
    return false;
  }
  
  return true;
};