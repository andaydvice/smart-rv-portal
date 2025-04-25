
import { useState, useCallback } from 'react';
import { SearchCategory, SearchResult } from '../types';
import { mockSearch } from '../searchUtils';
import { useDebounce } from '../useDebounce';

interface SearchCache {
  [key: string]: {
    results: SearchResult[];
    timestamp: number;
    category: SearchCategory;
  }
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [cache, setCache] = useState<SearchCache>({});
  
  const debouncedQuery = useDebounce(query, 300);
  
  const getCacheKey = (query: string, category: SearchCategory) => `${query}_${category}`;
  
  const isValidCache = useCallback((cacheEntry: { timestamp: number }) => {
    return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
  }, []);
  
  const performSearch = useCallback((searchQuery: string, searchCategory: SearchCategory) => {
    const cacheKey = getCacheKey(searchQuery, searchCategory);
    const cachedResult = cache[cacheKey];
    
    if (cachedResult && isValidCache(cachedResult)) {
      setResults(cachedResult.results);
      return;
    }
    
    const searchResults = mockSearch(searchQuery, searchCategory);
    setResults(searchResults);
    
    setCache(prevCache => ({
      ...prevCache,
      [cacheKey]: {
        results: searchResults,
        timestamp: Date.now(),
        category: searchCategory
      }
    }));
  }, [cache, isValidCache]);
  
  // Update search results when debounced query or category changes
  useState(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery, category);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, category, performSearch]);
  
  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    setResults
  };
};
