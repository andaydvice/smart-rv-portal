
export type SearchCategory = 'all' | 'features' | 'maintenance' | 'storage' | 'weather' | 'calculators';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
}

export const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'features', label: 'Features & Systems' },
  { value: 'maintenance', label: 'Maintenance & Troubleshooting' },
  { value: 'storage', label: 'Storage & Facilities' },
  { value: 'weather', label: 'Weather & Travel' },
  { value: 'calculators', label: 'Calculators & Tools' },
];
