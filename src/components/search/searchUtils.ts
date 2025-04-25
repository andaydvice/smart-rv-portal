
import { SearchCategory, SearchResult } from './types';
import { KEYWORD_MAPPING } from './searchConstants';

// Mock search service with enhanced keyword matching and better results
export const mockSearch = (query: string, category: SearchCategory): SearchResult[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase().trim();
  
  // Mock results based on the search query
  const allResults: SearchResult[] = [
    {
      id: 'models-all',
      title: 'All RV Models',
      description: 'Browse our complete lineup of smart RV models',
      category: 'features',
      url: '/models',
    },
    {
      id: 'models-luxury',
      title: 'Luxury Class RVs',
      description: 'Our premium luxury class smart RV lineup',
      category: 'features',
      url: '/models/luxury',
    },
    {
      id: 'models-adventure',
      title: 'Adventure Class RVs',
      description: 'Explore our off-road capable adventure RVs',
      category: 'features',
      url: '/models/adventure',
    },
    {
      id: 'models-compact',
      title: 'Compact Smart RVs',
      description: 'Efficient and easy to maneuver compact RVs',
      category: 'features',
      url: '/models/compact',
    },
    {
      id: 'models-compare',
      title: 'Compare RV Models',
      description: 'Compare features and specs across our RV lineup',
      category: 'features',
      url: '/models/compare',
    },
    {
      id: 'features-security',
      title: 'Smart RV Security Systems',
      description: 'Learn about the latest in RV security technology',
      category: 'features',
      url: '/features/security-system',
    },
    {
      id: 'features-power',
      title: 'Power Management Solutions',
      description: 'Optimize your RV power consumption and battery life',
      category: 'features',
      url: '/features/power-management',
    },
    {
      id: 'maintenance-winter',
      title: 'Winterization Checklist',
      description: 'Complete guide to preparing your RV for winter storage',
      category: 'maintenance',
      url: '/storage-preparation-checklist',
    },
    {
      id: 'storage-facilities',
      title: 'Storage Facilities Finder',
      description: 'Find the best RV storage options near you',
      category: 'storage',
      url: '/storage-facilities',
    },
    {
      id: 'weather-calculator',
      title: 'Weather Impact Calculator',
      description: 'Calculate how weather conditions affect your RV trip',
      category: 'weather',
      url: '/rv-weather',
    },
    {
      id: 'tools-calculators',
      title: 'RV Calculators & Tools',
      description: 'Essential tools for planning and managing your RV',
      category: 'calculators',
      url: '/calculators',
    },
    {
      id: 'features-voice',
      title: 'Voice Control Systems',
      description: 'Guide to setting up and using voice commands in your RV',
      category: 'features',
      url: '/voice-control',
    },
    {
      id: 'maintenance-troubleshoot',
      title: 'Troubleshooting Common RV Problems',
      description: 'Solutions for the most frequent RV system issues',
      category: 'maintenance',
      url: '/troubleshooting',
    }
  ];
  
  // Filter by category if not 'all'
  const filteredByCategory = category === 'all' 
    ? allResults 
    : allResults.filter(result => result.category === category);
  
  // More flexible searching - match against partial words and phrases
  return filteredByCategory.filter(result => 
    result.title.toLowerCase().includes(lowercaseQuery) || 
    result.description.toLowerCase().includes(lowercaseQuery) ||
    lowercaseQuery.split(' ').some(word => 
      result.title.toLowerCase().includes(word) || 
      result.description.toLowerCase().includes(word)
    )
  ).slice(0, 6); // Limit to 6 results
};

// Find the best matching page for a search term
export const findBestMatchingPage = (searchTerm: string, selectedCategory: SearchCategory, results: SearchResult[]): string => {
  const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
  
  // Direct keyword match
  if (KEYWORD_MAPPING[lowercaseSearchTerm]) {
    return KEYWORD_MAPPING[lowercaseSearchTerm];
  }
  
  // Try partial matches by checking if the search term contains a keyword
  for (const [keyword, url] of Object.entries(KEYWORD_MAPPING)) {
    if (lowercaseSearchTerm.includes(keyword)) {
      return url;
    }
  }
  
  // Search for individual words in multi-word queries
  const words = lowercaseSearchTerm.split(/\s+/);
  for (const word of words) {
    if (word.length > 2 && KEYWORD_MAPPING[word]) { // Only match words longer than 2 chars
      return KEYWORD_MAPPING[word];
    }
  }
  
  // Category-based fallback
  switch (selectedCategory) {
    case 'features':
      return '/features';
    case 'maintenance':
      return '/troubleshooting';
    case 'storage':
      return '/storage-facilities';
    case 'weather':
      return '/rv-weather';
    case 'calculators':
      return '/calculators';
    default:
      // If there are results, use the first result's URL
      if (results.length > 0) {
        return results[0].url;
      }
      // Final fallback - search results page
      return `/search?query=${encodeURIComponent(searchTerm)}&category=${selectedCategory}`;
  }
};

// Helper function to highlight matching text
export const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  if (!lowerText.includes(lowerQuery)) return text;
  
  const index = lowerText.indexOf(lowerQuery);
  const before = text.substring(0, index);
  const match = text.substring(index, index + query.length);
  const after = text.substring(index + query.length);
  
  return { before, match, after };
};
