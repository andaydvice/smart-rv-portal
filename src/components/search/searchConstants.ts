
import { CategoryOption } from './types';

// Categories for search filtering
export const CATEGORIES: CategoryOption[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'features', label: 'Features & Systems' },
  { value: 'maintenance', label: 'Maintenance & Troubleshooting' },
  { value: 'storage', label: 'Storage & Facilities' },
  { value: 'weather', label: 'Weather & Travel' },
  { value: 'calculators', label: 'Calculators & Tools' },
];

// Enhanced keyword mapping for better search prediction
export const KEYWORD_MAPPING: Record<string, string> = {
  // Models and Vehicle related keywords
  'model': '/models',
  'models': '/models',
  'rv': '/models',
  'rv model': '/models',
  'rv models': '/models',
  'vehicle': '/models',
  'vehicles': '/models',
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
  'climate control': '/features/climate-control',
  
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
