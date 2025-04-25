
import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from './searchConstants';
import { SearchCategory } from './types';
import SearchResults from './SearchResults';

interface DesktopSearchProps {
  query: string;
  setQuery: (query: string) => void;
  category: SearchCategory;
  setCategory: (category: string) => void;
  results: any[];
  isOpen: boolean;
  onResultClick: (url: string) => void;
  searchHistory: string[];
  onSubmit: (e?: React.FormEvent) => void;
}

const DesktopSearch: React.FC<DesktopSearchProps> = ({
  query,
  setQuery,
  category,
  setCategory,
  results,
  isOpen,
  onResultClick,
  searchHistory,
  onSubmit
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
        />
        <Input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search RV resources..." 
          className="h-9 w-60 rounded-md border border-gray-700 bg-[#131a2a] text-sm px-9 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#5B9BD5] z-50"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
          }}
          ref={inputRef}
        />
        {query && (
          <button 
            className="absolute right-10 top-1/2 transform -translate-y-1/2 z-50"
            onClick={() => setQuery('')}
            type="button"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[15px] h-9 border-none bg-transparent absolute right-2 top-0 focus:ring-0 focus:ring-offset-0 pointer-events-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900/95 backdrop-blur-sm text-white border-gray-700 z-[999]">
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value} className="focus:bg-gray-800 focus:text-white">
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 p-0 bg-gray-900/95 backdrop-blur-sm border border-gray-700 text-white shadow-lg z-[999] rounded-md">
          <SearchResults 
            results={results} 
            query={query} 
            onResultClick={onResultClick} 
            searchHistory={searchHistory}
          />
        </div>
      )}
    </div>
  );
};

export default DesktopSearch;
