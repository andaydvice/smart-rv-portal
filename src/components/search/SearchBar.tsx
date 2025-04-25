
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scrollToTop } from "@/utils/scrollToTop";
import { useSearchHistory } from './useSearchHistory';
import { useDebounce } from './useDebounce';
import { SearchCategory } from './types';
import { mockSearch, findBestMatchingPage } from './searchUtils';
import SearchResults from './SearchResults';
import MobileSearchPanel from './MobileSearchPanel';
import { CATEGORIES } from './searchConstants';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const [results, setResults] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { searchHistory, addToHistory } = useSearchHistory();
  const debouncedQuery = useDebounce(query, 300);
  
  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Handle clicks outside of search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Perform search when query changes
  useEffect(() => {
    if (debouncedQuery) {
      const searchResults = mockSearch(debouncedQuery, category);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, category]);
  
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (query.trim()) {
      addToHistory(query);
      
      // Route to the best matching page or search results page
      const targetUrl = findBestMatchingPage(query, category, results);
      navigate(targetUrl);
      
      setIsOpen(false);
      setQuery('');
      scrollToTop();
    }
  };
  
  const handleResultClick = (url: string) => {
    addToHistory(query);
    navigate(url);
    setIsOpen(false);
    setQuery('');
    scrollToTop();
  };
  
  const handleCategoryChange = (value: string) => {
    setCategory(value as SearchCategory);
    if (query) {
      const newResults = mockSearch(query, value as SearchCategory);
      setResults(newResults);
    }
  };
  
  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        if (isMobileView) {
          mobileInputRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 100);
    }
  };
  
  return (
    <div className="relative z-[60]" ref={searchRef}>
      {isMobileView ? (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-2 text-gray-300 hover:text-white"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 z-[999]">
              <MobileSearchPanel 
                query={query}
                setQuery={setQuery}
                category={category}
                setCategory={handleCategoryChange}
                results={results}
                onResultClick={handleResultClick}
                onClose={() => setIsOpen(false)}
                onSubmit={handleSearchSubmit}
                searchHistory={searchHistory}
                inputRef={mobileInputRef}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center">
          <div className="relative flex items-center">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
            />
            <Input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={() => setIsOpen(true)}
              onFocus={() => setIsOpen(true)}
              placeholder="Search RV resources..." 
              className="h-9 w-60 rounded-md border border-gray-700 bg-[#131a2a] text-sm px-9 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#5B9BD5] z-50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
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
            <Select value={category} onValueChange={handleCategoryChange}>
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
            <div 
              className="absolute top-full right-0 mt-2 w-80 p-0 bg-gray-900/95 backdrop-blur-sm border border-gray-700 text-white shadow-lg z-[999] rounded-md"
            >
              <SearchResults 
                results={results} 
                query={query} 
                onResultClick={handleResultClick} 
                searchHistory={searchHistory}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
