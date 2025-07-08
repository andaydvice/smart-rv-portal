import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, User, MapPin, Clock, Star } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'rv' | 'facility' | 'blog' | 'calculator' | 'guide';
  title: string;
  description: string;
  image?: string;
  score: number;
  reason: string;
  category: string;
  location?: string;
  rating?: number;
  price?: number;
  url: string;
}

interface AIRecommendationsProps {
  userBehavior?: {
    viewHistory: string[];
    searchHistory: string[];
    favorites: string[];
    location?: { lat: number; lng: number };
  };
  currentContext?: {
    page: string;
    content: string;
    category: string;
  };
  onRecommendationClick?: (recommendation: Recommendation) => void;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  userBehavior, 
  currentContext,
  onRecommendationClick 
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'trending' | 'nearby'>('personal');

  // Mock AI recommendation generation based on user behavior
  useEffect(() => {
    generateRecommendations();
  }, [userBehavior, currentContext, activeTab]);

  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      let recs: Recommendation[] = [];
      
      switch (activeTab) {
        case 'personal':
          recs = generatePersonalRecommendations();
          break;
        case 'trending':
          recs = generateTrendingRecommendations();
          break;
        case 'nearby':
          recs = generateNearbyRecommendations();
          break;
      }
      
      setRecommendations(recs);
      setIsLoading(false);
    }, 1000);
  };

  const generatePersonalRecommendations = (): Recommendation[] => {
    // Analyze user behavior patterns
    const interests = analyzeUserInterests();
    
    return [
      {
        id: '1',
        type: 'rv',
        title: 'Class A Luxury Motorhome',
        description: 'Based on your interest in luxury features and full-time living setups',
        score: 0.95,
        reason: 'Matches your preference for luxury amenities and spacious layouts',
        category: 'Luxury RV',
        rating: 4.8,
        price: 250000,
        url: '/models/luxury'
      },
      {
        id: '2',
        type: 'calculator',
        title: 'Solar Panel Calculator',
        description: 'Perfect for planning your off-grid power setup',
        score: 0.88,
        reason: 'You\'ve shown interest in sustainable RV living',
        category: 'Power Management',
        url: '/calculators/power'
      },
      {
        id: '3',
        type: 'blog',
        title: 'Smart RV Technology Guide',
        description: 'Latest innovations in RV automation and connectivity',
        score: 0.82,
        reason: 'Aligns with your technology-focused browsing pattern',
        category: 'Technology',
        rating: 4.6,
        url: '/blog/smart-rv-technology'
      },
      {
        id: '4',
        type: 'facility',
        title: 'Premium Indoor Storage',
        description: 'Climate-controlled facility with 24/7 security',
        score: 0.79,
        reason: 'Based on your searches for secure storage options',
        category: 'Storage',
        location: 'Within 25 miles',
        rating: 4.9,
        price: 150,
        url: '/storage-facilities'
      }
    ];
  };

  const generateTrendingRecommendations = (): Recommendation[] => {
    return [
      {
        id: '5',
        type: 'blog',
        title: 'Top RV Trends for 2024',
        description: 'Most popular features and destinations this year',
        score: 0.94,
        reason: 'Trending content with high engagement',
        category: 'Trends',
        rating: 4.7,
        url: '/blog/rv-trends-2024'
      },
      {
        id: '6',
        type: 'rv',
        title: 'Compact Travel Trailers',
        description: 'Best-selling lightweight models for easy towing',
        score: 0.91,
        reason: '300% increase in searches this month',
        category: 'Travel Trailer',
        rating: 4.5,
        price: 35000,
        url: '/models/compact'
      },
      {
        id: '7',
        type: 'calculator',
        title: 'Towing Capacity Calculator',
        description: 'Most used calculator for new RV buyers',
        score: 0.85,
        reason: 'High user engagement and positive feedback',
        category: 'Towing',
        url: '/calculators/towing'
      }
    ];
  };

  const generateNearbyRecommendations = (): Recommendation[] => {
    return [
      {
        id: '8',
        type: 'facility',
        title: 'Mountain View RV Storage',
        description: 'Highly-rated facility in your area',
        score: 0.92,
        reason: 'Top-rated facility within 15 miles',
        category: 'Storage',
        location: '12 miles away',
        rating: 4.8,
        price: 120,
        url: '/storage-facilities'
      },
      {
        id: '9',
        type: 'guide',
        title: 'Local RV Service Centers',
        description: 'Trusted maintenance and repair shops nearby',
        score: 0.87,
        reason: 'Highly recommended by local RV community',
        category: 'Maintenance',
        location: 'Multiple locations nearby',
        rating: 4.6,
        url: '/documentation'
      }
    ];
  };

  const analyzeUserInterests = () => {
    // Mock analysis of user behavior
    return ['luxury', 'technology', 'solar', 'storage'];
  };

  const getReasonIcon = (reason: string) => {
    if (reason.includes('preference') || reason.includes('interest')) return <User className="h-3 w-3" />;
    if (reason.includes('trending') || reason.includes('popular')) return <TrendingUp className="h-3 w-3" />;
    if (reason.includes('nearby') || reason.includes('miles')) return <MapPin className="h-3 w-3" />;
    return <Sparkles className="h-3 w-3" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      rv: 'bg-blue-500',
      facility: 'bg-green-500',
      blog: 'bg-purple-500',
      calculator: 'bg-orange-500',
      guide: 'bg-pink-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const handleRecommendationClick = (rec: Recommendation) => {
    // Track click for improving recommendations
    const clickData = {
      recommendationId: rec.id,
      type: rec.type,
      score: rec.score,
      reason: rec.reason,
      timestamp: Date.now()
    };
    
    const clicks = JSON.parse(localStorage.getItem('recommendation-clicks') || '[]');
    clicks.push(clickData);
    localStorage.setItem('recommendation-clicks', JSON.stringify(clicks.slice(-100))); // Keep last 100 clicks
    
    onRecommendationClick?.(rec);
    
    // Navigate to recommendation
    window.location.href = rec.url;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-connectivity-accent" />
          AI Recommendations
        </CardTitle>
        
        {/* Recommendation Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'personal' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('personal')}
            className="gap-1"
          >
            <User className="h-3 w-3" />
            For You
          </Button>
          <Button
            variant={activeTab === 'trending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('trending')}
            className="gap-1"
          >
            <TrendingUp className="h-3 w-3" />
            Trending
          </Button>
          <Button
            variant={activeTab === 'nearby' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('nearby')}
            className="gap-1"
          >
            <MapPin className="h-3 w-3" />
            Nearby
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleRecommendationClick(rec)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getTypeColor(rec.type)}`} />
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      {rec.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">{rec.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getReasonIcon(rec.reason)}
                        <span>{rec.reason}</span>
                      </div>
                      {rec.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{rec.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {rec.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <div className="w-16 bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-connectivity-accent h-1 rounded-full" 
                            style={{ width: `${rec.score * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(rec.score * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {rec.price && (
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${rec.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {rec.type === 'facility' ? '/month' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && recommendations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Browse more content to get personalized recommendations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};