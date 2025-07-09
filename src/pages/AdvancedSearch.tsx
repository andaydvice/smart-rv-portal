import React, { useState, useEffect } from 'react';
import { FacetedSearch } from '@/components/search/FacetedSearch';
import { AIRecommendations } from '@/components/search/AIRecommendations';
import { GeolocationSuggestions } from '@/components/search/GeolocationSuggestions';
import SearchResults from '@/components/search/SearchResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, MapPin, TrendingUp, Filter } from 'lucide-react';

interface AdvancedSearchHubProps {
  initialQuery?: string;
  initialFilters?: any;
}

export const AdvancedSearchHub: React.FC<AdvancedSearchHubProps> = ({
  initialQuery = '',
  initialFilters = {}
}) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('search');
  const [userBehavior, setUserBehavior] = useState({
    viewHistory: [],
    searchHistory: [],
    favorites: [],
    location: undefined
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load user behavior data
  useEffect(() => {
    loadUserBehaviorData();
  }, []);

  const loadUserBehaviorData = () => {
    const viewHistory = JSON.parse(localStorage.getItem('view-history') || '[]');
    const searchHistory = JSON.parse(localStorage.getItem('search-history') || '[]');
    const favorites = JSON.parse(localStorage.getItem('user-favorites') || '[]');
    
    setUserBehavior({
      viewHistory,
      searchHistory,
      favorites,
      location: undefined // Will be set by geolocation component
    });
  };

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setActiveTab('results');
  };

  const handleRecommendationClick = (recommendation: any) => {
    // Track recommendation interaction
    const interaction = {
      type: 'recommendation_click',
      recommendationId: recommendation.id,
      timestamp: Date.now()
    };
    
    const interactions = JSON.parse(localStorage.getItem('user-interactions') || '[]');
    interactions.push(interaction);
    localStorage.setItem('user-interactions', JSON.stringify(interactions.slice(-100)));
    
    // Navigate to recommendation
    console.log('Navigating to recommendation:', recommendation);
  };

  const handleLocationSuggestionClick = (suggestion: any) => {
    // Track location suggestion interaction
    const interaction = {
      type: 'location_suggestion_click',
      suggestionId: suggestion.id,
      timestamp: Date.now()
    };
    
    const interactions = JSON.parse(localStorage.getItem('user-interactions') || '[]');
    interactions.push(interaction);
    localStorage.setItem('user-interactions', JSON.stringify(interactions.slice(-100)));
    
    console.log('Location suggestion clicked:', suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-connectivity-darkBg via-[#0A1121] to-[#080F1F]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Advanced Search & Discovery
          </h1>
          <p className="text-lg text-connectivity-lightText max-w-3xl mx-auto">
            Find exactly what you need with AI-powered search, voice commands, and location-based suggestions.
          </p>
        </div>

        {/* Main Search Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and Filters - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <FacetedSearch 
              onResults={handleSearchResults}
            />
            
            {/* Search Results */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="search" className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="results" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Results
                </TabsTrigger>
                <TabsTrigger value="trending" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="nearby" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Nearby
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="search">
                <Card>
                  <CardHeader>
                    <CardTitle>Search Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">🎯 Specific Searches</h4>
                        <p className="text-sm text-muted-foreground">
                          "Class A motorhome under $100k" or "Storage facilities with security cameras"
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">🎤 Voice Commands</h4>
                        <p className="text-sm text-muted-foreground">
                          Click the microphone icon and say "Find RV parks near me with full hookups"
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">📍 Location Search</h4>
                        <p className="text-sm text-muted-foreground">
                          Enable location for personalized nearby facilities and services
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">🔍 Advanced Filters</h4>
                        <p className="text-sm text-muted-foreground">
                          Use filters to narrow down by price, rating, features, and more
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results">
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{result.title || 'Search Result'}</h3>
                      <p className="text-sm text-muted-foreground">{result.description || 'No description'}</p>
                    </div>
                  ))}
                  {searchResults.length === 0 && !isLoading && (
                    <p className="text-center text-muted-foreground py-8">No results found</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="trending">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Trending Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">🔥 Most Searched This Week</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {['Solar panels', 'Class B RVs', 'Storage facilities', 'Towing guides', 'RV insurance'].map((trend, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {trend}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">📈 Rising Searches</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {['Electric RVs', 'Remote work setup', 'Winter storage', 'Smart technology'].map((trend, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {trend} +{(index + 1) * 25}%
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="nearby">
                <GeolocationSuggestions 
                  onSuggestionClick={handleLocationSuggestionClick}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Recommendations - Right Column */}
          <div className="space-y-6">
            <AIRecommendations 
              userBehavior={userBehavior}
              onRecommendationClick={handleRecommendationClick}
            />
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Search Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Content</span>
                  <span>10,000+ items</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Storage Facilities</span>
                  <span>2,500+ locations</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>RV Models</span>
                  <span>500+ options</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Guides & Articles</span>
                  <span>1,000+ resources</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Your Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {userBehavior.searchHistory.slice(0, 3).map((search, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    🔍 {search}
                  </div>
                ))}
                {userBehavior.searchHistory.length === 0 && (
                  <p className="text-sm text-muted-foreground">No recent searches</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchHub;