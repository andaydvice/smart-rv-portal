import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Target, Eye, TrendingUp, Clock, Users, Sparkles } from 'lucide-react';

interface DynamicContent {
  id: string;
  type: 'hero' | 'product-card' | 'cta' | 'recommendation';
  variants: ContentVariant[];
  currentVariant: string;
  targetAudience: string;
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
  };
  rules: ContentRule[];
}

interface ContentVariant {
  id: string;
  name: string;
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    image?: string;
  };
  performance: {
    views: number;
    clicks: number;
    conversions: number;
  };
  isActive: boolean;
}

interface ContentRule {
  id: string;
  condition: string;
  action: string;
  priority: number;
  active: boolean;
}

interface PersonalizationSegment {
  id: string;
  name: string;
  criteria: string;
  userCount: number;
  conversionRate: number;
  averageValue: number;
}

export const DynamicContentEngine: React.FC = () => {
  const [dynamicContent, setDynamicContent] = useState<DynamicContent[]>([]);
  const [segments, setSegments] = useState<PersonalizationSegment[]>([]);
  const [activeTab, setActiveTab] = useState('content');
  const [realTimeOptimization, setRealTimeOptimization] = useState(true);

  useEffect(() => {
    initializeDynamicContent();
    loadPersonalizationSegments();
    if (realTimeOptimization) {
      startRealTimeOptimization();
    }
  }, []);

  const initializeDynamicContent = () => {
    const content: DynamicContent[] = [
      {
        id: 'hero-1',
        type: 'hero',
        variants: [
          {
            id: 'hero-luxury',
            name: 'Luxury Focus',
            content: {
              title: 'Experience Ultimate RV Luxury',
              subtitle: 'Premium motorhomes with cutting-edge technology',
              description: 'Discover our collection of luxury Class A motorhomes featuring smart home integration, premium interiors, and advanced safety systems.',
              buttonText: 'Explore Luxury Models',
              image: '/lovable-uploads/Luxury-Class-RVs-min.jpg'
            },
            performance: { views: 12450, clicks: 892, conversions: 67 },
            isActive: false
          },
          {
            id: 'hero-adventure',
            name: 'Adventure Focus',
            content: {
              title: 'Your Adventure Starts Here',
              subtitle: 'Smart RVs built for exploration',
              description: 'From weekend getaways to cross-country adventures, find the perfect RV equipped with modern technology and comfort.',
              buttonText: 'Start Your Journey',
              image: '/lovable-uploads/Premium-Travel-Trailers-min.jpg'
            },
            performance: { views: 15680, clicks: 1234, conversions: 89 },
            isActive: true
          },
          {
            id: 'hero-tech',
            name: 'Technology Focus',
            content: {
              title: 'The Future of RV Travel',
              subtitle: 'Smart technology meets mobile living',
              description: 'Experience next-generation RVs with AI-powered systems, automated controls, and connected living solutions.',
              buttonText: 'Discover Smart Features'
            },
            performance: { views: 8930, clicks: 743, conversions: 45 },
            isActive: false
          }
        ],
        currentVariant: 'hero-adventure',
        targetAudience: 'general',
        performance: {
          impressions: 37060,
          clicks: 2869,
          conversions: 201,
          ctr: 7.7,
          conversionRate: 7.0
        },
        rules: [
          {
            id: 'rule-1',
            condition: 'user.interests.includes("luxury")',
            action: 'Show luxury-focused hero',
            priority: 1,
            active: true
          },
          {
            id: 'rule-2', 
            condition: 'user.searchHistory.includes("technology")',
            action: 'Show technology-focused hero',
            priority: 2,
            active: true
          }
        ]
      },
      {
        id: 'product-rec-1',
        type: 'recommendation',
        variants: [
          {
            id: 'rec-solar',
            name: 'Solar Focus',
            content: {
              title: 'Complete Solar Power Setup',
              description: 'Everything you need for off-grid adventures',
              buttonText: 'Shop Solar Solutions'
            },
            performance: { views: 5420, clicks: 432, conversions: 23 },
            isActive: true
          },
          {
            id: 'rec-security',
            name: 'Security Focus',
            content: {
              title: 'Advanced RV Security Systems',
              description: 'Protect your investment with smart monitoring',
              buttonText: 'Explore Security'
            },
            performance: { views: 3890, clicks: 298, conversions: 18 },
            isActive: false
          }
        ],
        currentVariant: 'rec-solar',
        targetAudience: 'tech-savvy',
        performance: {
          impressions: 9310,
          clicks: 730,
          conversions: 41,
          ctr: 7.8,
          conversionRate: 5.6
        },
        rules: [
          {
            id: 'rule-3',
            condition: 'user.behavior.pageViews.includes("/features/solar")',
            action: 'Show solar recommendations',
            priority: 1,
            active: true
          }
        ]
      }
    ];

    setDynamicContent(content);
  };

  const loadPersonalizationSegments = () => {
    const segments: PersonalizationSegment[] = [
      {
        id: 'luxury-buyers',
        name: 'Luxury Buyers',
        criteria: 'Budget > $200k, Views luxury models',
        userCount: 1240,
        conversionRate: 12.4,
        averageValue: 285000
      },
      {
        id: 'tech-enthusiasts',
        name: 'Tech Enthusiasts',
        criteria: 'High engagement with tech features',
        userCount: 2890,
        conversionRate: 8.7,
        averageValue: 145000
      },
      {
        id: 'first-time-buyers',
        name: 'First-Time Buyers',
        criteria: 'New to RVs, reads guides',
        userCount: 4560,
        conversionRate: 4.2,
        averageValue: 85000
      },
      {
        id: 'weekend-warriors',
        name: 'Weekend Warriors',
        criteria: 'Interested in compact models',
        userCount: 3720,
        conversionRate: 6.8,
        averageValue: 125000
      }
    ];

    setSegments(segments);
  };

  const startRealTimeOptimization = () => {
    // Simulate real-time optimization
    const interval = setInterval(() => {
      optimizeContent();
    }, 30000); // Run every 30 seconds

    return () => clearInterval(interval);
  };

  const optimizeContent = () => {
    setDynamicContent(prev => prev.map(content => {
      // Simple optimization: activate best performing variant
      const bestVariant = content.variants.reduce((best, current) => {
        const bestCR = best.performance.conversions / best.performance.views;
        const currentCR = current.performance.conversions / current.performance.views;
        return currentCR > bestCR ? current : best;
      });

      // Update active variants
      const updatedVariants = content.variants.map(variant => ({
        ...variant,
        isActive: variant.id === bestVariant.id
      }));

      return {
        ...content,
        variants: updatedVariants,
        currentVariant: bestVariant.id
      };
    }));
  };

  const handleVariantToggle = (contentId: string, variantId: string) => {
    setDynamicContent(prev => prev.map(content => {
      if (content.id === contentId) {
        const updatedVariants = content.variants.map(variant => ({
          ...variant,
          isActive: variant.id === variantId
        }));
        
        return {
          ...content,
          variants: updatedVariants,
          currentVariant: variantId
        };
      }
      return content;
    }));
  };

  const getPerformanceColor = (value: number, type: 'ctr' | 'conversion') => {
    if (type === 'ctr') {
      if (value >= 8) return 'text-green-400';
      if (value >= 5) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      if (value >= 7) return 'text-green-400';
      if (value >= 4) return 'text-yellow-400';
      return 'text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Content Overview */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Zap className="h-6 w-6 text-connectivity-accent" />
            Dynamic Content Engine
            {realTimeOptimization && (
              <Badge className="bg-green-600 text-white animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                Live Optimization
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Eye className="h-8 w-8 text-connectivity-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {dynamicContent.reduce((sum, c) => sum + c.performance.impressions, 0).toLocaleString()}
              </p>
              <p className="text-sm text-connectivity-lightText">Total Impressions</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {dynamicContent.reduce((sum, c) => sum + c.performance.clicks, 0).toLocaleString()}
              </p>
              <p className="text-sm text-connectivity-lightText">Total Clicks</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {(dynamicContent.reduce((sum, c) => sum + c.performance.ctr, 0) / dynamicContent.length).toFixed(1)}%
              </p>
              <p className="text-sm text-connectivity-lightText">Avg CTR</p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {segments.reduce((sum, s) => sum + s.userCount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-connectivity-lightText">Segmented Users</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-connectivity-darkBg border border-gray-700">
          <TabsTrigger 
            value="content" 
            className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
          >
            Dynamic Content
          </TabsTrigger>
          <TabsTrigger 
            value="segments" 
            className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
          >
            User Segments
          </TabsTrigger>
          <TabsTrigger 
            value="optimization" 
            className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
          >
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="space-y-6">
            {dynamicContent.map((content) => (
              <Card key={content.id} className="bg-connectivity-darkBg border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white capitalize">
                      {content.type.replace('-', ' ')} - {content.id}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {content.targetAudience}
                      </Badge>
                      <Badge className={getPerformanceColor(content.performance.ctr, 'ctr')}>
                        {content.performance.ctr}% CTR
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-connectivity-lightText">Impressions:</span>
                        <span className="text-white font-medium ml-2">
                          {content.performance.impressions.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-connectivity-lightText">Clicks:</span>
                        <span className="text-white font-medium ml-2">
                          {content.performance.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-connectivity-lightText">Conversions:</span>
                        <span className="text-white font-medium ml-2">
                          {content.performance.conversions}
                        </span>
                      </div>
                      <div>
                        <span className="text-connectivity-lightText">Conv. Rate:</span>
                        <span className={`font-medium ml-2 ${getPerformanceColor(content.performance.conversionRate, 'conversion')}`}>
                          {content.performance.conversionRate}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-connectivity-accent font-medium mb-3">Content Variants</h4>
                      <div className="space-y-3">
                        {content.variants.map((variant) => {
                          const conversionRate = variant.performance.views > 0 
                            ? (variant.performance.conversions / variant.performance.views * 100).toFixed(1)
                            : '0.0';
                          
                          return (
                            <div
                              key={variant.id}
                              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                                variant.isActive 
                                  ? 'border-connectivity-accent bg-gray-800' 
                                  : 'border-gray-700 bg-gray-900 hover:bg-gray-800'
                              }`}
                              onClick={() => handleVariantToggle(content.id, variant.id)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <h5 className="text-white font-medium">{variant.name}</h5>
                                  {variant.isActive && (
                                    <Badge className="bg-connectivity-accent text-white">Active</Badge>
                                  )}
                                </div>
                                <div className="text-right text-sm">
                                  <div className="text-white font-medium">{conversionRate}%</div>
                                  <div className="text-connectivity-lightText">Conv. Rate</div>
                                </div>
                              </div>
                              
                              <div className="space-y-1 text-sm">
                                {variant.content.title && (
                                  <div>
                                    <span className="text-connectivity-lightText">Title: </span>
                                    <span className="text-white">{variant.content.title}</span>
                                  </div>
                                )}
                                {variant.content.description && (
                                  <div>
                                    <span className="text-connectivity-lightText">Description: </span>
                                    <span className="text-white">{variant.content.description}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                                <div>
                                  <span className="text-connectivity-lightText">Views: </span>
                                  <span className="text-white">{variant.performance.views.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-connectivity-lightText">Clicks: </span>
                                  <span className="text-white">{variant.performance.clicks.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-connectivity-lightText">Conversions: </span>
                                  <span className="text-white">{variant.performance.conversions}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="segments">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">User Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segments.map((segment) => (
                  <div
                    key={segment.id}
                    className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{segment.name}</h4>
                      <Badge variant="outline">
                        {segment.userCount.toLocaleString()} users
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-connectivity-lightText mb-3">{segment.criteria}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-connectivity-lightText">Conversion Rate:</span>
                        <div className={`text-lg font-bold ${getPerformanceColor(segment.conversionRate, 'conversion')}`}>
                          {segment.conversionRate}%
                        </div>
                      </div>
                      <div>
                        <span className="text-connectivity-lightText">Avg. Value:</span>
                        <div className="text-lg font-bold text-white">
                          ${(segment.averageValue / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div>
                        <span className="text-connectivity-lightText">Total Value:</span>
                        <div className="text-lg font-bold text-white">
                          ${((segment.userCount * segment.averageValue * segment.conversionRate / 100) / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Clock className="h-6 w-6 text-connectivity-accent" />
                Real-Time Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Auto-Optimization</h4>
                    <p className="text-sm text-connectivity-lightText">
                      Automatically switches to best performing variants
                    </p>
                  </div>
                  <Button
                    variant={realTimeOptimization ? "default" : "outline"}
                    onClick={() => setRealTimeOptimization(!realTimeOptimization)}
                    className={realTimeOptimization ? "bg-connectivity-accent" : ""}
                  >
                    {realTimeOptimization ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-connectivity-accent font-medium">Optimization Rules</h4>
                  {dynamicContent.map((content) => (
                    <div key={content.id} className="space-y-2">
                      <h5 className="text-white font-medium capitalize">
                        {content.type.replace('-', ' ')} Rules
                      </h5>
                      {content.rules.map((rule) => (
                        <div
                          key={rule.id}
                          className="p-3 bg-gray-800 rounded-lg border border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              variant={rule.active ? "default" : "secondary"}
                              className={rule.active ? "bg-green-600 text-white" : ""}
                            >
                              {rule.active ? 'Active' : 'Inactive'}
                            </Badge>
                            <span className="text-xs text-connectivity-lightText">
                              Priority {rule.priority}
                            </span>
                          </div>
                          
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-connectivity-lightText">Condition: </span>
                              <code className="text-connectivity-accent text-xs bg-gray-900 px-1 rounded">
                                {rule.condition}
                              </code>
                            </div>
                            <div>
                              <span className="text-connectivity-lightText">Action: </span>
                              <span className="text-white">{rule.action}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};