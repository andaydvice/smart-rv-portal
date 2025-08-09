
import React from 'react';
import { Search, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchResult, SearchCategory } from './types';
import { CATEGORIES } from './searchConstants';
import SearchResults from './SearchResults';

interface MobileSearchPanelProps {
  query: string;
  setQuery: (query: string) => void;
  category: SearchCategory;
  setCategory: (category: string) => void;
  results: SearchResult[];
  onResultClick: (url: string) => void;
  onClose: () => void;
  onSubmit: (e?: React.FormEvent) => void;
  searchHistory: string[];
  inputRef: React.RefObject<HTMLInputElement>;
}

const MobileSearchPanel: React.FC<MobileSearchPanelProps> = ({
  query,
  setQuery,
  category,
  setCategory,
  results,
  onResultClick,
  onClose,
  onSubmit,
  searchHistory,
  inputRef,
}) => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg overflow-hidden z-[999]">
      <div className="p-2 flex items-center border-b border-gray-700">
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }} className="flex-1 flex items-center">
          <Search className="h-4 w-4 text-gray-400 ml-1 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Smart RV resources..."
            className="flex-1 bg-transparent border-none text-white text-sm p-1 focus:outline-none"
            ref={inputRef}
          />
          <button type="submit" className="sr-only">Search</button>
        </form>
        <button onClick={onClose} className="p-1 ml-2" type="button">
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div className="p-2 border-b border-gray-700">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full h-8 border border-gray-700 bg-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border-gray-700 z-[999]">
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value} className="focus:bg-gray-800 focus:text-white">
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="max-h-80 overflow-y-auto">
        <SearchResults 
          results={results} 
          query={query} 
          onResultClick={onResultClick} 
          searchHistory={searchHistory}
        />
      </div>
    </div>
  );
};

export default MobileSearchPanel;
