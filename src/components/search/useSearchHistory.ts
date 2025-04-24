
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'rv_search_history';
const MAX_HISTORY_ITEMS = 10;

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setSearchHistory(prevHistory => {
      // Remove duplicates and add to the beginning
      const filteredHistory = prevHistory.filter(item => item.toLowerCase() !== trimmedQuery.toLowerCase());
      return [trimmedQuery, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { searchHistory, addToHistory, clearHistory };
};
