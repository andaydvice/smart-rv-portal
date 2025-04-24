
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scrollToTop } from "@/utils/scrollToTop";
import { useSearchHistory } from './useSearchHistory';
import { useDebounce } from './useDebounce';

export type SearchCategory = 'all' | 'features' | 'maintenance' | 'storage' | 'weather' | 'calculators';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
}

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'features', label: 'Features & Systems' },
  { value: 'maintenance', label: 'Maintenance & Troubleshooting' },
  { value: 'storage', label: 'Storage & Facilities' },
  { value: 'weather', label: 'Weather & Travel' },
  { value: 'calculators', label: 'Calculators & Tools' },
];

// Enhanced keyword mapping for better search prediction
const KEYWORD_MAPPING: Record<string, string> = {
  // Tools related keywords
  'tools': '/calculators',
  'tool': '/calculators',
  'calculator': '/calculators',
  'calculators': '/calculators',
  'calc': '/calculators',
  'rv tools': '/calculators',
  'rv calculator': '/calculators',
  
  // Weather related keywords
  'weather': '/rv-weather',
  'forecast': '/rv-weather',
  'climate': '/rv-weather',
  'temperature': '/rv-weather',
  'rv weather': '/rv-weather',
  
  // Storage related keywords
  'storage': '/storage-facilities',
  'facility': '/storage-facilities',
  'facilities': '/storage-facilities',
  'store': '/storage-facilities',
  'storing': '/storage-facilities',
  'rv storage': '/storage-facilities',
  
  // Maintenance/troubleshooting
  'maintenance': '/troubleshooting',
  'fix': '/troubleshooting',
  'repair': '/troubleshooting',
  'issue': '/troubleshooting',
  'troubleshoot': '/troubleshooting',
  'problem': '/troubleshooting',
  
  // Features
  'feature': '/features',
  'features': '/features',
  'system': '/features',
  'rv feature': '/features',
  'smart': '/features',
  
  // Specific features
  'security': '/features/security-system',
  'power': '/features/power-management',
  'entertainment': '/features/entertainment',
  'water': '/features/water-systems',
  
  // Storage preparation
  'checklist': '/storage-preparation-checklist',
  'preparation': '/storage-preparation-checklist',
  'winterize': '/storage-preparation-checklist',
  'winterization': '/storage-preparation-checklist',
  
  // Voice control
  'voice': '/voice-control',
  'command': '/voice-control',
  'voice control': '/voice-control',
  
  // Models
  'model': '/models',
  'models': '/models',
  'rv model': '/models',
  'rv type': '/models',
  'type': '/models',
  
  // Blog 
  'blog': '/blog',
  'post': '/blog',
  'article': '/blog'
};

// Mock search service with enhanced keyword matching
const mockSearch = (query: string, category: SearchCategory): SearchResult[] => {
  if (!query) return [];
  
  // Mock results based on the search query
  const allResults: SearchResult[] = [
    {
      id: '1',
      title: 'Smart RV Security Systems',
      description: 'Learn about the latest in RV security technology',
      category: 'features',
      url: '/features/security-system',
    },
    {
      id: '2',
      title: 'Power Management Solutions',
      description: 'Optimize your RV power consumption and battery life',
      category: 'features',
      url: '/features/power-management',
    },
    {
      id: '3',
      title: 'Winterization Checklist',
      description: 'Complete guide to preparing your RV for winter storage',
      category: 'maintenance',
      url: '/storage-preparation-checklist',
    },
    {
      id: '4',
      title: 'Storage Facilities Finder',
      description: 'Find the best RV storage options near you',
      category: 'storage',
      url: '/storage-facilities',
    },
    {
      id: '5',
      title: 'Weather Impact Calculator',
      description: 'Calculate how weather conditions affect your RV trip',
      category: 'weather',
      url: '/rv-weather',
    },
    {
      id: '6',
      title: 'RV Calculators & Tools',
      description: 'Essential tools for planning and managing your RV',
      category: 'calculators',
      url: '/calculators',
    },
    {
      id: '7',
      title: 'Voice Control Systems',
      description: 'Guide to setting up and using voice commands in your RV',
      category: 'features',
      url: '/voice-control',
    },
    {
      id: '8',
      title: 'Troubleshooting Common RV Problems',
      description: 'Solutions for the most frequent RV system issues',
      category: 'maintenance',
      url: '/troubleshooting',
    }
  ];
  
  // Filter by category if not 'all'
  const filteredByCategory = category === 'all' 
    ? allResults 
    : allResults.filter(result => result.category === category);
  
  // Filter by query text with enhanced relevance
  return filteredByCategory.filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase()) || 
    result.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); // Limit to 5 results
};

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Find the best matching page for a search term
  const findBestMatchingPage = (searchTerm: string, selectedCategory: SearchCategory): string => {
    const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
    
    // Direct keyword match
    if (KEYWORD_MAPPING[lowercaseSearchTerm]) {
      return KEYWORD_MAPPING[lowercaseSearchTerm];
    }
    
    // Try partial matches by checking if the search term contains a keyword
    for (const [keyword, url] of Object.entries(KEYWORD_MAPPING)) {
      if (lowercaseSearchTerm.includes(keyword)) {
        return url;
      }
    }
    
    // Category-based fallback
    switch (selectedCategory) {
      case 'features':
        return '/features';
      case 'maintenance':
        return '/troubleshooting';
      case 'storage':
        return '/storage-facilities';
      case 'weather':
        return '/rv-weather';
      case 'calculators':
        return '/calculators';
      default:
        // If there are results, use the first result's URL
        if (results.length > 0) {
          return results[0].url;
        }
        // Final fallback - search results page
        return `/search?query=${encodeURIComponent(searchTerm)}&category=${selectedCategory}`;
    }
  };
  
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (query.trim()) {
      addToHistory(query);
      
      // Route to the best matching page or search results page
      const targetUrl = findBestMatchingPage(query, category);
      navigate(targetUrl);
      
      setIsOpen(false);
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
        inputRef.current?.focus();
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
            <div className="absolute right-0 top-full mt-2 w-80 z-50">
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
                inputRef={inputRef}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <div className="relative flex items-center">
                <Search 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
                />
                <Input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsOpen(true)}
                  placeholder="Search RV resources..." 
                  className="h-9 w-60 rounded-md border border-gray-700 bg-[#131a2a] text-sm px-9 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#5B9BD5]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                  ref={inputRef}
                />
                {query && (
                  <button 
                    className="absolute right-10 top-1/2 transform -translate-y-1/2"
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
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 p-0 bg-gray-900/95 backdrop-blur-sm border border-gray-700 text-white shadow-lg z-[999]"
              align="start"
            >
              <SearchResults 
                results={results} 
                query={query} 
                onResultClick={handleResultClick} 
                searchHistory={searchHistory}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onResultClick: (url: string) => void;
  searchHistory: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  query, 
  onResultClick,
  searchHistory,
}) => {
  if (!query) {
    return (
      <div className="py-2">
        {searchHistory.length > 0 ? (
          <div>
            <div className="px-2 py-1.5 text-xs text-gray-400 font-medium">Recent Searches</div>
            {searchHistory.slice(0, 5).map((term, index) => (
              <div 
                key={index}
                className="px-3 py-1.5 hover:bg-gray-800 cursor-pointer text-sm flex items-center"
                onClick={() => onResultClick(`/search?search=${encodeURIComponent(term)}`)}
              >
                <Search className="h-3 w-3 mr-2 text-gray-400" />
                {term}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-3 py-4 text-center text-sm text-gray-400">
            Start typing to search
          </div>
        )}
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="py-6 text-center">
        <div className="text-sm text-gray-400">No results found</div>
      </div>
    );
  }
  
  return (
    <div>
      {results.map((result) => (
        <div 
          key={result.id}
          className="px-3 py-2 border-b border-gray-800 last:border-0 hover:bg-gray-800 cursor-pointer"
          onClick={() => onResultClick(result.url)}
        >
          <div className="text-sm font-medium">{result.title}</div>
          <div className="text-xs text-gray-400 mt-0.5">{result.description}</div>
          <div className="mt-1 flex items-center">
            <span className="text-xs uppercase bg-[#1E2A3E] px-1.5 py-0.5 rounded text-[#5B9BD5]">
              {result.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

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
        <form onSubmit={onSubmit} className="flex-1 flex items-center">
          <Search className="h-4 w-4 text-gray-400 ml-1 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search RV resources..."
            className="flex-1 bg-transparent border-none text-white text-sm p-1 focus:outline-none"
            autoFocus
            ref={inputRef}
          />
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

export default SearchBar;
