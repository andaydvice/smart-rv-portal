import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, MapPin, Mic, Sparkles, Clock } from 'lucide-react';
import VoiceSearch from '@/components/mobile/VoiceSearch';
import { useSearch } from '@/components/search/hooks/useSearch';

interface SearchFilters {
  contentType: string[];
  priceRange: [number, number];
  location: {
    radius: number;
    coordinates?: { lat: number; lng: number };
  };
  rating: number;
  category: string[];
  dateRange: string;
  features: string[];
}

interface FacetedSearchProps {
  onResults?: (results: Record<string, any>[]) => void;
  className?: string;
}

export const FacetedSearch: React.FC<FacetedSearchProps> = ({ onResults, className }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    contentType: [],
    priceRange: [0, 10000],
    location: { radius: 50 },
    rating: 0,
    category: [],
    dateRange: 'any',
    features: [],
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { results, setResults } = useSearch();
  const [isLoading, setIsLoading] = useState(false);

  // Content type options
  const contentTypes = [
    { id: 'rv', label: 'RVs & Vehicles', icon: '🚐' },
    { id: 'facility', label: 'Storage Facilities', icon: '🏢' },
    { id: 'blog', label: 'Blog Posts', icon: '📰' },
    { id: 'calculator', label: 'Calculators', icon: '🧮' },
    { id: 'guide', label: 'Guides', icon: '📖' },
  ];

  // Categories for different content types
  const categories = {
    rv: ['Class A', 'Class B', 'Class C', 'Travel Trailer', 'Fifth Wheel', 'Toy Hauler'],
    facility: ['Indoor', 'Outdoor', 'Climate Controlled', 'Security', '24/7 Access'],
    blog: ['Technology', 'Travel', 'Maintenance', 'Safety', 'Reviews'],
    calculator: ['Cost', 'Fuel', 'Power', 'Towing', 'Solar'],
    guide: ['Setup', 'Maintenance', 'Safety', 'Technology', 'Travel Planning'],
  };

  // Features for filtering
  const features = [
    'Premium', 'Verified', 'Recently Updated', 'Popular', 'Editor\'s Choice',
    'WiFi', 'GPS', 'Solar Ready', 'Pet Friendly', 'Family Friendly'
  ];

  // Load search history
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('search-history') || '[]');
    setSearchHistory(history.slice(0, 5)); // Show last 5 searches
  }, []);

  // Generate search suggestions based on query
  useEffect(() => {
    if (query.length > 2) {
      const mockSuggestions = [
        `${query} reviews`,
        `${query} near me`,
        `${query} calculator`,
        `${query} guide`,
        `best ${query}`,
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Perform search when query or filters change
  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      
      // Simulate search API call
      setTimeout(() => {
        const mockResults = [
          { id: '1', title: 'Mock Result 1', description: 'Test description', url: '/test1', category: 'rv' as any },
          { id: '2', title: 'Mock Result 2', description: 'Test description', url: '/test2', category: 'facility' as any }
        ];
        setResults(mockResults);
        onResults?.(mockResults);
        setIsLoading(false);
      }, 500);
      
      // Save to search history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('search-history', JSON.stringify(newHistory));
    }
  }, [query, filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleContentTypeToggle = (type: string) => {
    setFilters(prev => ({
      ...prev,
      contentType: prev.contentType.includes(type)
        ? prev.contentType.filter(t => t !== type)
        : [...prev.contentType, type]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleVoiceResult = (text: string) => {
    setQuery(text);
    setIsVoiceSearchOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      contentType: [],
      priceRange: [0, 10000],
      location: { radius: 50 },
      rating: 0,
      category: [],
      dateRange: 'any',
      features: [],
    });
  };

  const relevantCategories = useMemo(() => {
    if (filters.contentType.length === 0) return [];
    return filters.contentType.flatMap(type => categories[type as keyof typeof categories] || []);
  }, [filters.contentType]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search RVs, facilities, guides, and more..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setIsVoiceSearchOpen(true)}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setQuery(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && !query && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Recent searches:</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setQuery(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showAdvanced && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="price">Price & Rating</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Content Types</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {contentTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={filters.contentType.includes(type.id)}
                          onCheckedChange={() => handleContentTypeToggle(type.id)}
                        />
                        <label htmlFor={type.id} className="text-sm flex items-center gap-2">
                          <span>{type.icon}</span>
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {relevantCategories.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {relevantCategories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={filters.category.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <label htmlFor={category} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Search Radius</h4>
                  <div className="space-y-2">
                    <Slider
                      value={[filters.location.radius]}
                      onValueChange={([value]) => 
                        handleFilterChange('location', { ...filters.location, radius: value })
                      }
                      max={200}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      Within {filters.location.radius} miles
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Date Range</h4>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => handleFilterChange('dateRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any time</SelectItem>
                      <SelectItem value="week">Past week</SelectItem>
                      <SelectItem value="month">Past month</SelectItem>
                      <SelectItem value="year">Past year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="price" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => handleFilterChange('priceRange', value)}
                      max={10000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    <Slider
                      value={[filters.rating]}
                      onValueChange={([value]) => handleFilterChange('rating', value)}
                      max={5}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      {filters.rating}+ stars
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Special Features</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={filters.features.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <label htmlFor={feature} className="text-sm">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {(filters.contentType.length > 0 || filters.category.length > 0 || filters.features.length > 0) && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">Active filters:</span>
              {filters.contentType.map(type => (
                <Badge key={type} variant="secondary" className="gap-1">
                  {contentTypes.find(ct => ct.id === type)?.label}
                  <button onClick={() => handleContentTypeToggle(type)}>×</button>
                </Badge>
              ))}
              {filters.category.map(cat => (
                <Badge key={cat} variant="secondary" className="gap-1">
                  {cat}
                  <button onClick={() => handleCategoryToggle(cat)}>×</button>
                </Badge>
              ))}
              {filters.features.map(feature => (
                <Badge key={feature} variant="secondary" className="gap-1">
                  {feature}
                  <button onClick={() => handleFeatureToggle(feature)}>×</button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voice Search Modal */}
      {isVoiceSearchOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Voice Search
              </CardTitle>
            </CardHeader>
            <CardContent>
            <VoiceSearch
              onSearch={handleVoiceResult}
              onClose={() => setIsVoiceSearchOpen(false)}
            />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 animate-spin" />
              <span>Searching across all content...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};