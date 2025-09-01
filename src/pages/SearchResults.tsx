
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, MapPin, Calendar, Settings, Info } from 'lucide-react';
import { SearchCategory } from '@/components/search';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
  iconType?: 'feature' | 'maintenance' | 'storage' | 'weather' | 'calculator';
  date?: string;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = (searchParams.get('category') as SearchCategory) || 'all';
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const navigate = useNavigate();

  // Mock search function to simulate results
  useEffect(() => {
    // In a real implementation, this would be an API call
    if (!query) return;
    
    // Mock data
    const mockResults: SearchResultItem[] = [
      {
        id: '1',
        title: 'Smart RV Security Systems',
        description: 'Learn about the latest in RV security technology and how it can protect your vehicle and belongings while you travel or when your RV is in storage.',
        category: 'features',
        url: '/features/security-system',
        iconType: 'feature',
      },
      {
        id: '2',
        title: 'Power Management Solutions',
        description: 'Optimize your RV power consumption and battery life with these smart power management techniques and technologies.',
        category: 'features',
        url: '/features/power-management',
        iconType: 'feature',
      },
      {
        id: '3',
        title: 'Winterization Checklist',
        description: 'Complete guide to preparing your RV for winter storage, including plumbing, battery, and exterior care tips.',
        category: 'maintenance',
        url: '/storage-preparation-checklist',
        iconType: 'maintenance',
        date: '2023-10-15',
      },
      {
        id: '4',
        title: 'Storage Facilities Near Seattle',
        description: 'Find the best RV storage options in the Seattle area with climate control and security features.',
        category: 'storage',
        url: '/storage-facilities?location=seattle',
        iconType: 'storage',
      },
      {
        id: '5',
        title: 'Weather Impact on RV Travel',
        description: 'Calculate how different weather conditions affect your RV trip planning, fuel efficiency, and safety.',
        category: 'weather',
        url: '/rv-weather',
        iconType: 'weather',
      },
      {
        id: '6',
        title: 'Fuel Efficiency Calculator',
        description: 'Estimate fuel costs and consumption for your next RV adventure based on your specific vehicle model and route.',
        category: 'calculators',
        url: '/calculators',
        iconType: 'calculator',
      },
      {
        id: '7',
        title: 'Voice Control System Setup Guide',
        description: 'Step-by-step instructions for setting up and configuring voice commands in your smart RV system.',
        category: 'features',
        url: '/voice-control',
        iconType: 'feature',
      },
      {
        id: '8',
        title: 'Troubleshooting Common Battery Issues',
        description: 'Solutions for the most frequent RV battery problems including charging issues and power drain.',
        category: 'maintenance',
        url: '/troubleshooting',
        iconType: 'maintenance',
        date: '2023-11-30',
      }
    ];
    
    // Filter by category if not 'all'
    const filteredByCategory = category === 'all' 
      ? mockResults 
      : mockResults.filter(result => result.category === category);
    
    // Filter by query text
    const filteredByQuery = filteredByCategory.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) || 
      result.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filteredByQuery);
  }, [query, category]);

  const handleCategoryChange = (newCategory: SearchCategory) => {
    navigate(`/search?query=${encodeURIComponent(query)}&category=${newCategory}`);
  };

  const getCategoryIcon = (iconType: string | undefined) => {
    switch (iconType) {
      case 'feature':
        return <Settings className="h-5 w-5 text-[#5B9BD5]" />;
      case 'maintenance':
        return <Info className="h-5 w-5 text-[#10B981]" />;
      case 'storage':
        return <MapPin className="h-5 w-5 text-[#8B5CF6]" />;
      case 'weather':
        return <Calendar className="h-5 w-5 text-[#F59E0B]" />;
      case 'calculator':
        return <Filter className="h-5 w-5 text-[#3B82F6]" />;
      default:
        return <SearchIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Search Results for "{query}"
          </h1>
          <p className="mt-2 text-gray-400">
            {results.length} results found in {category === 'all' ? 'all categories' : category}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-[#131a2a] rounded-lg border border-[#1a202c] p-4">
              <h3 className="text-lg font-medium text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {['all', 'features', 'maintenance', 'storage', 'weather', 'calculators'].map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? 'default' : 'outline'}
                    className={`w-full justify-start text-left ${
                      category === cat ? 'bg-[#5B9BD5]' : 'bg-transparent'
                    }`}
                    onClick={() => handleCategoryChange(cat as SearchCategory)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results list */}
          <div className="flex-1">
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <Link 
                    to={result.url} 
                    key={result.id} 
                    className="block bg-[#131a2a] rounded-lg border border-[#1a202c] p-4 hover:border-[#5B9BD5] transition-all"
                  >
                    <div className="flex items-start">
                      <div className="bg-[#1E2A3E] p-3 rounded-lg mr-4 flex-shrink-0">
                        {getCategoryIcon(result.iconType)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{result.title}</h3>
                        <p className="text-gray-400 mt-1">{result.description}</p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span className="uppercase bg-[#1E2A3E] px-2 py-1 rounded text-[#5B9BD5] mr-2">
                            {result.category}
                          </span>
                          {result.date && (
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {result.date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-[#131a2a] rounded-lg border border-[#1a202c] p-8 text-center">
                <SearchIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or browse our categories instead.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Context-aware affiliate recommendations */}
        <div className="mt-16">
          <OptimizedAffiliateGrid
            title="Find What You're Looking For"
            subtitle="Discover the best RV resources, tools, and services to enhance your search results and RV experience."
            partners={[
              {
                partner: 'rvshare',
                title: 'RV Rentals & Experiences',
                description: 'Find the perfect RV rental to test before you buy, or experience different RV types and features.',
                features: ['Try before buying', 'Various RV types', 'Owner experiences'],
                buttonText: 'Browse Rentals'
              },
              {
                partner: 'rvlife',
                title: 'RV Resources & Planning',
                description: 'Comprehensive trip planning tools, campground reviews, and RV lifestyle resources.',
                features: ['Trip planning tools', 'Campground database', 'RV community'],
                buttonText: 'Plan Your Trip'
              },
              {
                partner: 'goodsam',
                title: 'RV Services & Support',
                description: 'Emergency roadside assistance, discounts, and essential services for RV travelers.',
                features: ['24/7 roadside help', 'Travel discounts', 'RV insurance'],
                buttonText: 'Get Protected'
              }
            ]}
            gridCols="3"
          />
          
          <AffiliateDisclosure className="mt-8" />
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
