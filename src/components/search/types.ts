
// Define types for search functionality
export type SearchCategory = 'all' | 'features' | 'maintenance' | 'storage' | 'weather' | 'calculators';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
  iconType?: 'feature' | 'maintenance' | 'storage' | 'weather' | 'calculator';
  date?: string;
}

export interface CategoryOption {
  value: SearchCategory | string;
  label: string;
}
