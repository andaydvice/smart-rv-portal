import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Target, Users, TrendingUp, Star, Clock, MapPin, Sparkles } from 'lucide-react';

interface UserProfile {
  id: string;
  preferences: {
    rvType: string[];
    budget: string;
    interests: string[];
    experience: string;
    location: string;
    travelStyle: string;
  };
  behavior: {
    pageViews: string[];
    searchHistory: string[];
    purchases: any[];
    timeSpent: { [page: string]: number };
    clicks: any[];
  };
  demographics: {
    age?: number;
    location?: string;
    familySize?: number;
  };
}

interface PersonalizationRule {
  id: string;
  condition: string;
  action: string;
  priority: number;
  active: boolean;
}

interface ContentRecommendation {
  id: string;
  type: 'product' | 'article' | 'calculator' | 'guide';
  title: string;
  description: string;
  score: number;
  reason: string;
  category: string;
  url: string;
  image?: string;
}

interface PersonalizationInsight {
  metric: string;
  value: number;
  change: number;
  label: string;
  description: string;
}

export const PersonalizationEngine: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);
  const [personalizationRules, setPersonalizationRules] = useState<PersonalizationRule[]>([]);
  const [insights, setInsights] = useState<PersonalizationInsight[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLearning, setIsLearning] = useState(false);

  useEffect(() => {
    initializePersonalization();
    loadPersonalizationRules();
    generateInsights();
  }, []);

  const initializePersonalization = () => {
    // Load or create user profile
    const savedProfile = localStorage.getItem('user-personalization-profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // Create new profile from behavioral data
      const newProfile: UserProfile = {
        id: `user_${Date.now()}`,
        preferences: {
          rvType: [],
          budget: '',
          interests: [],
          experience: 'beginner',
          location: '',
          travelStyle: 'weekend'
        },
        behavior: {
          pageViews: JSON.parse(localStorage.getItem('view-history') || '[]'),
          searchHistory: JSON.parse(localStorage.getItem('search-history') || '[]'),
          purchases: [],
          timeSpent: {},
          clicks: []
        },
        demographics: {}
      };
      setUserProfile(newProfile);
      localStorage.setItem('user-personalization-profile', JSON.stringify(newProfile));
    }

    // Start behavioral learning
    startBehavioralLearning();
  };

  const startBehavioralLearning = () => {
    setIsLearning(true);
    
    // Track user interactions
    const trackInteraction = (type: string, data: any) => {
      const profile = JSON.parse(localStorage.getItem('user-personalization-profile') || '{}');
      
      // Update behavioral data
      if (type === 'page_view') {
        profile.behavior.pageViews.push(data.page);
        profile.behavior.timeSpent[data.page] = (profile.behavior.timeSpent[data.page] || 0) + data.duration;
      } else if (type === 'search') {
        profile.behavior.searchHistory.push(data.query);
      } else if (type === 'click') {
        profile.behavior.clicks.push(data);
      }

      // Analyze and update preferences
      updatePreferencesFromBehavior(profile);
      
      localStorage.setItem('user-personalization-profile', JSON.stringify(profile));
      setUserProfile(profile);
    };

    // Set up event listeners for learning
    window.addEventListener('beforeunload', () => {
      trackInteraction('page_view', {
        page: window.location.pathname,
        duration: Date.now() - (window as any).pageStartTime || 0
      });
    });

    (window as any).pageStartTime = Date.now();
  };

  const updatePreferencesFromBehavior = (profile: UserProfile) => {
    // Analyze page views to infer interests
    const pageCategories = {
      '/models/luxury': ['luxury', 'premium'],
      '/models/compact': ['budget-friendly', 'small-family'],
      '/features/solar': ['sustainable', 'off-grid'],
      '/calculators': ['planning', 'analytical'],
      '/blog': ['learning', 'research']
    };

    const interests = new Set(profile.preferences.interests);
    
    profile.behavior.pageViews.forEach(page => {
      const categories = pageCategories[page as keyof typeof pageCategories];
      if (categories) {
        categories.forEach(category => interests.add(category));
      }
    });

    profile.preferences.interests = Array.from(interests);

    // Infer budget from behavior
    if (profile.behavior.pageViews.some(p => p.includes('luxury'))) {
      profile.preferences.budget = 'high';
    } else if (profile.behavior.pageViews.some(p => p.includes('compact'))) {
      profile.preferences.budget = 'medium';
    }

    // Generate personalized recommendations
    generatePersonalizedRecommendations(profile);
  };

  const generatePersonalizedRecommendations = (profile: UserProfile) => {
    const recs: ContentRecommendation[] = [];

    // Interest-based recommendations
    if (profile.preferences.interests.includes('luxury')) {
      recs.push({
        id: '1',
        type: 'product',
        title: 'Premium Class A Motorhomes',
        description: 'Explore our luxury RV collection with premium amenities',
        score: 95,
        reason: 'Based on your interest in luxury features',
        category: 'Luxury RV',
        url: '/models/luxury',
        image: '/lovable-uploads/Luxury-Class-RVs-min.jpg'
      });
    }

    if (profile.preferences.interests.includes('sustainable')) {
      recs.push({
        id: '2',
        type: 'guide',
        title: 'Complete Solar Power Setup Guide',
        description: 'Learn how to go off-grid with solar power',
        score: 88,
        reason: 'Matches your interest in sustainable travel',
        category: 'Solar & Power',
        url: '/solar-power-guide'
      });
    }

    if (profile.preferences.interests.includes('planning')) {
      recs.push({
        id: '3',
        type: 'calculator',
        title: 'RV Trip Cost Calculator',
        description: 'Plan your budget for the perfect RV adventure',
        score: 82,
        reason: 'You enjoy planning and analytical tools',
        category: 'Planning Tools',
        url: '/calculators'
      });
    }

    // Behavioral recommendations
    const mostViewedCategory = getMostViewedCategory(profile.behavior.pageViews);
    if (mostViewedCategory) {
      recs.push({
        id: '4',
        type: 'article',
        title: `Advanced ${mostViewedCategory} Tips`,
        description: 'Take your knowledge to the next level',
        score: 76,
        reason: `You spend a lot of time reading about ${mostViewedCategory}`,
        category: mostViewedCategory,
        url: '/blog'
      });
    }

    setRecommendations(recs.sort((a, b) => b.score - a.score));
  };

  const getMostViewedCategory = (pageViews: string[]): string | null => {
    const categories: { [key: string]: number } = {};
    
    pageViews.forEach(page => {
      if (page.includes('luxury')) categories['Luxury'] = (categories['Luxury'] || 0) + 1;
      if (page.includes('technology')) categories['Technology'] = (categories['Technology'] || 0) + 1;
      if (page.includes('solar')) categories['Solar'] = (categories['Solar'] || 0) + 1;
      if (page.includes('storage')) categories['Storage'] = (categories['Storage'] || 0) + 1;
    });

    const max = Math.max(...Object.values(categories));
    return Object.keys(categories).find(key => categories[key] === max) || null;
  };

  const loadPersonalizationRules = () => {
    const rules: PersonalizationRule[] = [
      {
        id: '1',
        condition: 'user.interests.includes("luxury") && user.budget === "high"',
        action: 'Show premium product recommendations',
        priority: 1,
        active: true
      },
      {
        id: '2',
        condition: 'user.behavior.searchHistory.includes("solar")',
        action: 'Highlight solar-related content',
        priority: 2,
        active: true
      },
      {
        id: '3',
        condition: 'user.behavior.pageViews.length > 10',
        action: 'Offer personalized consultation',
        priority: 3,
        active: true
      },
      {
        id: '4',
        condition: 'user.preferences.experience === "beginner"',
        action: 'Show beginner-friendly guides first',
        priority: 4,
        active: true
      }
    ];

    setPersonalizationRules(rules);
  };

  const generateInsights = () => {
    const insights: PersonalizationInsight[] = [
      {
        metric: 'Personalization Score',
        value: 87,
        change: 12,
        label: 'Very High',
        description: 'Content is highly personalized based on user behavior'
      },
      {
        metric: 'Engagement Lift',
        value: 34,
        change: 8,
        label: '+34%',
        description: 'Increase in engagement from personalized content'
      },
      {
        metric: 'Conversion Rate',
        value: 5.8,
        change: 1.2,
        label: '5.8%',
        description: 'Conversion rate for personalized recommendations'
      },
      {
        metric: 'User Satisfaction',
        value: 92,
        change: 5,
        label: 'Excellent',
        description: 'User satisfaction with personalized experience'
      }
    ];

    setInsights(insights);
  };

  const handleUpdatePreferences = (newPreferences: Partial<UserProfile['preferences']>) => {
    if (!userProfile) return;

    const updatedProfile = {
      ...userProfile,
      preferences: { ...userProfile.preferences, ...newPreferences }
    };

    setUserProfile(updatedProfile);
    localStorage.setItem('user-personalization-profile', JSON.stringify(updatedProfile));
    generatePersonalizedRecommendations(updatedProfile);
  };

  return (
    <div className="space-y-6">
      {/* Personalization Overview */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Brain className="h-6 w-6 text-connectivity-accent" />
            AI Personalization Engine
            {isLearning && (
              <Badge className="bg-green-600 text-white animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                Learning
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {insights.map((insight, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {insight.metric === 'Personalization Score' || insight.metric === 'User Satisfaction' 
                    ? `${insight.value}%` 
                    : insight.label}
                </div>
                <div className="text-sm text-connectivity-lightText mb-2">{insight.metric}</div>
                <div className={`text-xs flex items-center justify-center gap-1 ${
                  insight.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className="h-3 w-3" />
                  {insight.change > 0 ? '+' : ''}{insight.change}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-connectivity-darkBg border border-gray-700">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
          >
            User Profile
          </TabsTrigger>
          <TabsTrigger 
            value="recommendations" 
            className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
          >
            Recommendations
          </TabsTrigger>
          <TabsTrigger 
            value="rules" 
            className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
          >
            Rules Engine
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">User Profile & Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              {userProfile && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-connectivity-accent font-medium mb-3">Detected Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.preferences.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-700 text-white">
                          {interest}
                        </Badge>
                      ))}
                      {userProfile.preferences.interests.length === 0 && (
                        <p className="text-connectivity-lightText text-sm">
                          Continue browsing to help us learn your interests
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-connectivity-accent font-medium mb-3">Behavioral Data</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-connectivity-lightText">Pages Viewed:</span>
                          <span className="text-white">{userProfile.behavior.pageViews.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-connectivity-lightText">Searches:</span>
                          <span className="text-white">{userProfile.behavior.searchHistory.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-connectivity-lightText">Experience:</span>
                          <span className="text-white capitalize">{userProfile.preferences.experience}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-connectivity-accent font-medium mb-3">Preferences</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-connectivity-lightText">Budget:</span>
                          <span className="text-white capitalize">
                            {userProfile.preferences.budget || 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-connectivity-lightText">Travel Style:</span>
                          <span className="text-white capitalize">{userProfile.preferences.travelStyle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-connectivity-lightText">Location:</span>
                          <span className="text-white">
                            {userProfile.preferences.location || 'Not set'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                    onClick={() => window.location.href = rec.url}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-white font-medium">{rec.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {rec.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-connectivity-lightText">
                              {rec.score}% match
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-connectivity-lightText mb-2">{rec.description}</p>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-connectivity-lightText">
                            <Target className="h-3 w-3" />
                            <span>{rec.reason}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Progress value={rec.score} className="w-16" />
                    </div>
                  </div>
                ))}
                
                {recommendations.length === 0 && (
                  <div className="text-center py-8 text-connectivity-lightText">
                    <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Continue browsing to get personalized recommendations</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Personalization Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {personalizationRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Personalization Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-connectivity-accent font-medium">Performance Metrics</h4>
                  {insights.map((insight, index) => (
                    <div key={index} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{insight.metric}</span>
                        <span className="text-connectivity-accent font-bold">{insight.label}</span>
                      </div>
                      <p className="text-xs text-connectivity-lightText">{insight.description}</p>
                      <Progress value={insight.value} className="mt-2 h-1" />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-connectivity-accent font-medium">Learning Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-connectivity-lightText">Profile Completeness</span>
                      <span className="text-white">73%</span>
                    </div>
                    <Progress value={73} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-connectivity-lightText">Behavior Data Quality</span>
                      <span className="text-white">89%</span>
                    </div>
                    <Progress value={89} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-connectivity-lightText">Recommendation Accuracy</span>
                      <span className="text-white">94%</span>
                    </div>
                    <Progress value={94} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};