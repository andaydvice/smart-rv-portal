import { SearchCategory, SearchResult } from './types';

// Keyword mapping for search prediction
export const KEYWORD_MAPPING: Record<string, string> = {
  // Models and Vehicle related keywords
  'model': '/models',
  'models': '/models',
  'rv': '/models',
  'rv model': '/models',
  'rv models': '/models',
  'vehicle': '/models',
  'vehicles': '/vehicles',
  'luxury': '/models/luxury',
  'adventure': '/models/adventure',
  'compact': '/models/compact',
  'luxury model': '/models/luxury',
  'luxury class': '/models/luxury',
  'luxury rv': '/models/luxury',
  'adventure model': '/models/adventure',
  'adventure class': '/models/adventure',
  'adventure rv': '/models/adventure',
  'compact model': '/models/compact',
  'compact smart': '/models/compact',
  'compact rv': '/models/compact',
  'compare': '/models/compare',
  'compare models': '/models/compare',
  'comparison': '/models/compare',
  
  // Features & Systems
  'features': '/features',
  'feature': '/features',
  'system': '/features',
  'rv feature': '/features',
  'smart': '/features',
  'technology': '/technology',
  'tech': '/technology',
  'intelligence': '/features',
  'rv intelligence': '/features',
  'rv systems': '/features',
  'smart features': '/features',
  'automation': '/features/smart-automation',
  
  // Voice Control
  'voice': '/voice-control',
  'voice control': '/voice-control',
  'voice command': '/voice-control',
  'voice assistant': '/voice-control',
  'commands': '/voice-control',
  
  // Tools & Calculators
  'tools': '/calculators',
  'tool': '/calculators',
  'calculator': '/calculators',
  'calculators': '/calculators',
  'calc': '/calculators',
  'rv tools': '/calculators',
  'rv calculator': '/calculators',
  'planning tools': '/calculators',
  
  // Weather
  'weather': '/rv-weather',
  'forecast': '/rv-weather',
  'climate': '/rv-weather',
  'temperature': '/rv-weather',
  'rv weather': '/rv-weather',
  'conditions': '/rv-weather',
  'alerts': '/rv-weather',
  
  // Storage
  'storage': '/storage-facilities',
  'facility': '/storage-facilities',
  'facilities': '/storage-facilities',
  'store': '/storage-facilities',
  'storing': '/storage-facilities',
  'rv storage': '/storage-facilities',
  'parking': '/storage-facilities',
  'checklist': '/storage-preparation-checklist',
  'preparation': '/storage-preparation-checklist',
  'winterize': '/storage-preparation-checklist',
  'winterization': '/storage-preparation-checklist',
  'storage guide': '/storage-preparation-checklist',
  
  // Support & Troubleshooting
  'support': '/troubleshooting',
  'help': '/troubleshooting',
  'maintenance': '/troubleshooting',
  'fix': '/troubleshooting',
  'repair': '/troubleshooting',
  'issue': '/troubleshooting',
  'troubleshoot': '/troubleshooting',
  'problem': '/troubleshooting',
  'guide': '/troubleshooting',
  
  // Core Systems & Features
  'security': '/features/security-system',
  'power': '/features/power-management',
  'entertainment': '/features/entertainment',
  'water': '/features/water-systems',
  'kitchen': '/features/smart-kitchen',
  'audio': '/features/audio-system',
  'wifi': '/features/internet-connectivity',
  'internet': '/features/internet-connectivity',
  'connectivity': '/features/internet-connectivity',
  'navigation': '/features/navigation-system',
  'climate': '/features/climate-control',
  
  // Documentation & Support
  'documentation': '/documentation',
  'docs': '/documentation',
  'manual': '/documentation',
  'schedule': '/schedule-demo',
  'demo': '/schedule-demo',
  'contact': '/contact',
  
  // Blog & Content
  'blog': '/blog',
  'post': '/blog',
  'article': '/blog',
  'news': '/blog'
};

// Generate search results with unique IDs
export const getSearchResults = (): SearchResult[] => {
  return [
    {
      id: `features-security-${Date.now()}-1`,
      title: 'Smart RV Security Systems',
      description: 'Learn about the latest in RV security technology',
      category: 'features',
      url: '/features/security-system',
    },
    {
      id: `features-power-${Date.now()}-2`,
      title: 'Power Management Solutions',
      description: 'Optimize your RV power consumption and battery life',
      category: 'features',
      url: '/features/power-management',
    },
    {
      id: `maintenance-winter-${Date.now()}-3`,
      title: 'Winterization Checklist',
      description: 'Complete guide to preparing your RV for winter storage',
      category: 'maintenance',
      url: '/storage-preparation-checklist',
    },
    {
      id: `storage-facility-${Date.now()}-4`,
      title: 'Storage Facilities Finder',
      description: 'Find the best RV storage options near you',
      category: 'storage',
      url: '/storage-facilities',
    },
    {
      id: `weather-impact-${Date.now()}-5`,
      title: 'Weather Impact Calculator',
      description: 'Calculate how weather conditions affect your RV trip',
      category: 'weather',
      url: '/rv-weather',
    },
    {
      id: `calculators-tools-${Date.now()}-6`,
      title: 'RV Calculators & Tools',
      description: 'Essential tools for planning and managing your RV',
      category: 'calculators',
      url: '/calculators',
    },
    {
      id: `features-voice-${Date.now()}-7`,
      title: 'Voice Control Systems',
      description: 'Guide to setting up and using voice commands in your RV',
      category: 'features',
      url: '/voice-control',
    },
    {
      id: `maintenance-trouble-${Date.now()}-8`,
      title: 'Troubleshooting Common RV Problems',
      description: 'Solutions for the most frequent RV system issues',
      category: 'maintenance',
      url: '/troubleshooting',
    },
    {
      id: `features-model-all-${Date.now()}-9`,
      title: 'All RV Models',
      description: 'Browse our complete lineup of smart RV models',
      category: 'features',
      url: '/models',
    },
    {
      id: `features-luxury-${Date.now()}-10`,
      title: 'Luxury Class RVs',
      description: 'Our premium luxury class smart RV lineup',
      category: 'features',
      url: '/models/luxury',
    },
    {
      id: `features-adventure-${Date.now()}-11`,
      title: 'Adventure Class RVs',
      description: 'Explore our off-road capable adventure RVs',
      category: 'features',
      url: '/models/adventure',
    },
    {
      id: `features-compact-${Date.now()}-12`,
      title: 'Compact Smart RVs',
      description: 'Efficient and easy to maneuver compact RVs',
      category: 'features',
      url: '/models/compact',
    },
    {
      id: `features-compare-${Date.now()}-13`,
      title: 'Compare RV Models',
      description: 'Compare features and specs across our RV lineup',
      category: 'features',
      url: '/models/compare',
    }
  ];
};

// Search service with enhanced keyword matching
export const mockSearch = (query: string, category: SearchCategory): SearchResult[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase().trim();
  const allResults = getSearchResults();
  
  const filteredByCategory = category === 'all' 
    ? allResults 
    : allResults.filter(result => result.category === category);
  
  return filteredByCategory.filter(result => 
    result.title.toLowerCase().includes(lowercaseQuery) || 
    result.description.toLowerCase().includes(lowercaseQuery) ||
    lowercaseQuery.split(' ').some(word => 
      result.title.toLowerCase().includes(word) || 
      result.description.toLowerCase().includes(word)
    )
  ).slice(0, 6);
};
