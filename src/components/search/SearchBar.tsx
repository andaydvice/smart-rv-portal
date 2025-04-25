
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { scrollToTop } from "@/utils/scrollToTop";
import { useSearchHistory } from './useSearchHistory';
import { findBestMatchingPage } from './searchUtils';
import { useSearch } from './hooks/useSearch';
import MobileSearchPanel from './MobileSearchPanel';
import DesktopSearch from './DesktopSearch';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { searchHistory, addToHistory } = useSearchHistory();
  const { query, setQuery, category, setCategory, results } = useSearch();
  
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
  
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (query.trim()) {
      addToHistory(query);
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
  
  const toggleSearch = () => {
    setIsOpen(!isOpen);
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
                setCategory={setCategory}
                results={results}
                onResultClick={handleResultClick}
                onClose={() => setIsOpen(false)}
                onSubmit={handleSearchSubmit}
                searchHistory={searchHistory}
                inputRef={useRef(null)}
              />
            </div>
          )}
        </>
      ) : (
        <DesktopSearch 
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          results={results}
          isOpen={isOpen}
          onResultClick={handleResultClick}
          searchHistory={searchHistory}
          onSubmit={handleSearchSubmit}
        />
      )}
    </div>
  );
};

export default SearchBar;
