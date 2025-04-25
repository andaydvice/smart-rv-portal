
import React from 'react';
import { Search } from 'lucide-react';
import { SearchResult } from './types';
import { highlightMatch } from './searchUtils';

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
  // Render highlighted text with spans
  const renderHighlightedText = (text: string, query: string) => {
    const highlight = highlightMatch(text, query);
    
    if (typeof highlight === 'string') {
      return highlight;
    }
    
    return (
      <>
        {highlight.before}
        <span className="bg-[#1E2A3E] text-[#5B9BD5]">{highlight.match}</span>
        {highlight.after}
      </>
    );
  };

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
                onClick={() => onResultClick(`/search?query=${encodeURIComponent(term)}`)}
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
        <div className="text-xs text-gray-500 mt-1">Try different keywords or categories</div>
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
          <div className="text-sm font-medium">
            {renderHighlightedText(result.title, query)}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            {renderHighlightedText(result.description, query)}
          </div>
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

export default SearchResults;
