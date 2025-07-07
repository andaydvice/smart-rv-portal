import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, X, Clock, Bookmark } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SavedSearch {
  id: string;
  query: string;
  filters: Record<string, any>;
  category: string;
  savedAt: string;
  lastUsed?: string;
  useCount: number;
}

interface SavedSearchesProps {
  onSearchSelect: (search: SavedSearch) => void;
  currentSearch?: string;
  currentFilters?: Record<string, any>;
  category: string;
}

const SavedSearches = ({ 
  onSearchSelect, 
  currentSearch = '', 
  currentFilters = {}, 
  category 
}: SavedSearchesProps) => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedSearches();
  }, [category]);

  const loadSavedSearches = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Load from Supabase for authenticated users
        const { data, error } = await supabase
          .from('saved_searches')
          .select('*')
          .eq('user_id', user.id)
          .eq('category', category)
          .order('last_used', { ascending: false, nullsFirst: false })
          .order('saved_at', { ascending: false });

        if (error) {
          console.error('Error loading saved searches:', error);
        } else {
          setSavedSearches(data || []);
        }
      } else {
        // Load from localStorage for anonymous users
        const key = `saved_searches_${category}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          setSavedSearches(JSON.parse(saved));
        }
      }
    } catch (error) {
      console.error('Error loading saved searches:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentSearch = async () => {
    if (!currentSearch.trim()) return;

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query: currentSearch,
      filters: currentFilters,
      category,
      savedAt: new Date().toISOString(),
      useCount: 1
    };

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Save to Supabase
        const { error } = await supabase
          .from('saved_searches')
          .insert({
            ...newSearch,
            user_id: user.id
          });

        if (error) {
          console.error('Error saving search:', error);
          return;
        }
      } else {
        // Save to localStorage
        const key = `saved_searches_${category}`;
        const updated = [newSearch, ...savedSearches.slice(0, 9)]; // Keep max 10
        setSavedSearches(updated);
        localStorage.setItem(key, JSON.stringify(updated));
      }

      await loadSavedSearches();
      
      console.log('Search Saved:', {
        query: currentSearch,
        category,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  const useSearch = async (search: SavedSearch) => {
    // Update use count and last used
    const updatedSearch = {
      ...search,
      lastUsed: new Date().toISOString(),
      useCount: search.useCount + 1
    };

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase
          .from('saved_searches')
          .update({
            last_used: updatedSearch.lastUsed,
            use_count: updatedSearch.useCount
          })
          .eq('id', search.id);
      } else {
        const key = `saved_searches_${category}`;
        const updated = savedSearches.map(s => 
          s.id === search.id ? updatedSearch : s
        );
        setSavedSearches(updated);
        localStorage.setItem(key, JSON.stringify(updated));
      }

      onSearchSelect(updatedSearch);
      
      console.log('Saved Search Used:', {
        searchId: search.id,
        query: search.query,
        useCount: updatedSearch.useCount,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating search usage:', error);
    }
  };

  const removeSearch = async (searchId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase
          .from('saved_searches')
          .delete()
          .eq('id', searchId);
      } else {
        const key = `saved_searches_${category}`;
        const updated = savedSearches.filter(s => s.id !== searchId);
        setSavedSearches(updated);
        localStorage.setItem(key, JSON.stringify(updated));
      }

      await loadSavedSearches();
    } catch (error) {
      console.error('Error removing search:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-3"></div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Save Current Search */}
      {currentSearch && (
        <Card className="bg-[#091020] border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#5B9BD5]" />
                <span className="text-sm text-gray-300">Save current search</span>
              </div>
              <Button
                onClick={saveCurrentSearch}
                size="sm"
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Searches List */}
      {savedSearches.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Searches
          </h3>
          
          {savedSearches.slice(0, 5).map(search => (
            <Card 
              key={search.id} 
              className="bg-[#091020] border-gray-700 hover:border-[#5B9BD5]/50 transition-colors cursor-pointer"
              onClick={() => useSearch(search)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Search className="h-3 w-3 text-[#5B9BD5] flex-shrink-0" />
                      <span className="text-sm text-white truncate">
                        {search.query}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>Used {search.useCount} times</span>
                      {search.lastUsed && (
                        <span>• Last used {formatRelativeTime(search.lastUsed)}</span>
                      )}
                    </div>
                    
                    {Object.keys(search.filters).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {Object.entries(search.filters).slice(0, 3).map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="text-xs">
                            {key}: {String(value)}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSearch(search.id);
                    }}
                    size="sm"
                    variant="ghost"
                    className="ml-2 h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default SavedSearches;