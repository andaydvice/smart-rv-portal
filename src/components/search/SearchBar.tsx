
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
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

// Mock search service for demonstration
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
      title: 'Fuel Efficiency Calculator',
      description: 'Estimate fuel costs for your next RV adventure',
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
  
  // Filter by query text
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
      
      // In a real implementation, you'd navigate to search results page
      // For now, we'll navigate to a relevant page based on category
      if (results.length > 0) {
        navigate(results[0].url);
      } else {
        // Fallback navigation based on category
        switch(category) {
          case 'features':
            navigate('/features');
            break;
          case 'maintenance':
            navigate('/troubleshooting');
            break;
          case 'storage':
            navigate('/storage-facilities');
            break;
          case 'weather':
            navigate('/rv-weather');
            break;
          case 'calculators':
            navigate('/calculators');
            break;
          default:
            navigate('/blog'); // Fallback to blog which might have relevant content
        }
      }
      
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
        document.querySelector<HTMLInputElement>('.search-input')?.focus();
      }, 100);
    }
  };
  
  return (
    <div className="relative" ref={searchRef}>
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
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsOpen(true)}
                  placeholder="Search RV resources..." 
                  className="h-9 w-60 rounded-md border border-gray-700 bg-[#131a2a] text-sm px-9 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#5B9BD5] search-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                />
                {query && (
                  <button 
                    className="absolute right-10 top-1/2 transform -translate-y-1/2"
                    onClick={() => setQuery('')}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[15px] h-9 border-none bg-transparent absolute right-2 top-0 focus:ring-0 focus:ring-offset-0 pointer-events-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-sm text-white border-gray-700">
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
              className="w-80 p-0 bg-gray-900/95 backdrop-blur-sm border border-gray-700 text-white shadow-lg"
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
                onClick={() => onResultClick(`/blog?search=${encodeURIComponent(term)}`)}
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
}) => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg overflow-hidden">
      <div className="p-2 flex items-center border-b border-gray-700">
        <form onSubmit={onSubmit} className="flex-1 flex items-center">
          <Search className="h-4 w-4 text-gray-400 ml-1 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search RV resources..."
            className="flex-1 bg-transparent border-none text-white text-sm p-1 focus:outline-none search-input"
            autoFocus
          />
        </form>
        <button onClick={onClose} className="p-1 ml-2">
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div className="p-2 border-b border-gray-700">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full h-8 border border-gray-700 bg-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border-gray-700">
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
