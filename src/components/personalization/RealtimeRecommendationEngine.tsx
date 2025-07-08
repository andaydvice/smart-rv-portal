import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Target, TrendingUp, Clock, Star, ChevronRight, Sparkles } from 'lucide-react';

interface RealtimeRecommendation {
  id: string;
  type: 'product' | 'content' | 'action' | 'upgrade';
  title: string;
  description: string;
  confidence: number;
  urgency: 'low' | 'medium' | 'high';
  category: string;
  value: number;
  reasoning: string;
  cta: string;
  url: string;
  image?: string;
  timeToShow: number;
  expiresAt?: number;
}

interface UserContext {
  currentPage: string;
  timeOnPage: number;
  scrollDepth: number;
  interactions: number;
  sessionDuration: number;
  previousPages: string[];
  searchTerms: string[];
  behaviorScore: number;
  intents: string[];
}

interface RecommendationMetrics {
  totalShown: number;
  totalClicked: number;
  totalConverted: number;
  clickThroughRate: number;
  conversionRate: number;
  averageValue: number;
  lifetimeValue: number;
}

export const RealtimeRecommendationEngine: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RealtimeRecommendation[]>([]);
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [metrics, setMetrics] = useState<RecommendationMetrics>({
    totalShown: 0,
    totalClicked: 0,
    totalConverted: 0,
    clickThroughRate: 0,
    conversionRate: 0,
    averageValue: 0,
    lifetimeValue: 0
  });
  const [isActive, setIsActive] = useState(true);
  const [learningMode, setLearningMode] = useState(true);

  useEffect(() => {
    if (isActive) {
      initializeRecommendationEngine();
      startRealTimeTracking();
    }
  }, [isActive]);

  const initializeRecommendationEngine = () => {
    // Load saved metrics
    const savedMetrics = localStorage.getItem('recommendation-metrics');
    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }

    // Initialize user context tracking
    trackUserContext();
    
    // Start recommendation generation
    generateInitialRecommendations();
  };

  const trackUserContext = () => {
    const context: UserContext = {
      currentPage: window.location.pathname,
      timeOnPage: Date.now(),
      scrollDepth: 0,
      interactions: 0,
      sessionDuration: getSessionDuration(),
      previousPages: JSON.parse(sessionStorage.getItem('visited-pages') || '[]'),
      searchTerms: JSON.parse(localStorage.getItem('search-history') || '[]').slice(-5),
      behaviorScore: 0,
      intents: []
    };

    setUserContext(context);
    startContextTracking(context);
  };

  const startContextTracking = (context: UserContext) => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      setUserContext(prev => prev ? { ...prev, scrollDepth: Math.max(prev.scrollDepth, scrollPercent) } : null);
    };

    // Track interactions
    const handleInteraction = () => {
      setUserContext(prev => prev ? { ...prev, interactions: prev.interactions + 1 } : null);
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    // Update time on page
    const timeInterval = setInterval(() => {
      setUserContext(prev => {
        if (!prev) return null;
        const updatedContext = {
          ...prev,
          timeOnPage: Date.now() - prev.timeOnPage,
          behaviorScore: calculateBehaviorScore(prev)
        };
        
        // Update intents based on behavior
        updatedContext.intents = inferUserIntents(updatedContext);
        
        return updatedContext;
      });
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      clearInterval(timeInterval);
    };
  };

  const calculateBehaviorScore = (context: UserContext): number => {
    let score = 0;
    
    // Time on page (max 30 points)
    const timeMinutes = (Date.now() - context.timeOnPage) / 60000;
    score += Math.min(timeMinutes * 5, 30);
    
    // Scroll depth (max 25 points)
    score += (context.scrollDepth / 100) * 25;
    
    // Interactions (max 20 points)
    score += Math.min(context.interactions * 2, 20);
    
    // Session duration (max 15 points)
    const sessionMinutes = context.sessionDuration / 60000;
    score += Math.min(sessionMinutes * 3, 15);
    
    // Previous page engagement (max 10 points)
    score += Math.min(context.previousPages.length * 2, 10);

    return Math.min(score, 100);
  };

  const inferUserIntents = (context: UserContext): string[] => {
    const intents: string[] = [];
    
    // High engagement = ready to purchase
    if (context.behaviorScore > 70) {
      intents.push('purchase-ready');
    }
    
    // Multiple page views = researching
    if (context.previousPages.length > 3) {
      intents.push('research-mode');
    }
    
    // Quick exit indicators
    if (context.timeOnPage < 30000 && context.scrollDepth < 25) {
      intents.push('exit-risk');
    }
    
    // Category interests based on pages
    if (context.previousPages.some(p => p.includes('luxury'))) {
      intents.push('luxury-interest');
    }
    
    if (context.searchTerms.some(t => t.includes('solar'))) {
      intents.push('solar-interest');
    }
    
    // First-time visitor
    if (context.previousPages.length === 0) {
      intents.push('first-visit');
    }

    return intents;
  };

  const generateInitialRecommendations = () => {
    // Generate recommendations based on current context
    const baseRecommendations: RealtimeRecommendation[] = [
      {
        id: 'welcome-guide',
        type: 'content',
        title: 'New to RV Life?',
        description: 'Complete beginner\'s guide to choosing your first RV',
        confidence: 85,
        urgency: 'medium',
        category: 'Education',
        value: 0,
        reasoning: 'First-time visitor with research behavior',
        cta: 'Get Free Guide',
        url: '/blog/rv-beginners-guide',
        timeToShow: 30000, // Show after 30 seconds
      },
      {
        id: 'exit-intent-offer',
        type: 'action',
        title: 'Wait! Don\'t Leave Empty-Handed',
        description: 'Get our exclusive RV buyer\'s checklist before you go',
        confidence: 75,
        urgency: 'high',
        category: 'Lead Magnet',
        value: 50,
        reasoning: 'Exit intent detected',
        cta: 'Download Free Checklist',
        url: '/resources/buyers-checklist',
        timeToShow: 0, // Show immediately on exit intent
      },
      {
        id: 'solar-upgrade',
        type: 'product',
        title: 'Complete Solar Power System',
        description: 'Everything you need for off-grid adventures - save 25%',
        confidence: 92,
        urgency: 'high',
        category: 'Solar Equipment',
        value: 1500,
        reasoning: 'High interest in solar content and energy independence',
        cta: 'Shop Solar Deals',
        url: '/solar-systems',
        image: '/lovable-uploads/solar-panel.jpg',
        timeToShow: 60000, // Show after 1 minute
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // Expires in 24 hours
      },
      {
        id: 'consultation-offer',
        type: 'action',
        title: 'Free RV Consultation',
        description: 'Speak with an expert to find your perfect RV match',
        confidence: 80,
        urgency: 'medium',
        category: 'Consultation',
        value: 200,
        reasoning: 'High engagement suggests serious buying intent',
        cta: 'Book Free Call',
        url: '/consultation',
        timeToShow: 120000, // Show after 2 minutes
      }
    ];

    setRecommendations(baseRecommendations);
  };

  const startRealTimeTracking = () => {
    const interval = setInterval(() => {
      if (userContext) {
        updateRecommendationsBasedOnContext();
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  };

  const updateRecommendationsBasedOnContext = () => {
    setRecommendations(prev => {
      return prev.map(rec => {
        // Update confidence based on current context
        let newConfidence = rec.confidence;
        
        if (userContext) {
          // Increase confidence for relevant recommendations
          if (rec.type === 'product' && userContext.intents.includes('purchase-ready')) {
            newConfidence = Math.min(newConfidence + 10, 100);
          }
          
          if (rec.category === 'Education' && userContext.intents.includes('first-visit')) {
            newConfidence = Math.min(newConfidence + 15, 100);
          }
          
          if (rec.urgency === 'high' && userContext.intents.includes('exit-risk')) {
            newConfidence = Math.min(newConfidence + 20, 100);
          }
        }

        return { ...rec, confidence: newConfidence };
      }).sort((a, b) => b.confidence - a.confidence);
    });
  };

  const handleRecommendationClick = (recommendation: RealtimeRecommendation) => {
    // Track click
    const updatedMetrics = {
      ...metrics,
      totalClicked: metrics.totalClicked + 1,
      clickThroughRate: ((metrics.totalClicked + 1) / metrics.totalShown) * 100,
      lifetimeValue: metrics.lifetimeValue + recommendation.value
    };
    
    setMetrics(updatedMetrics);
    localStorage.setItem('recommendation-metrics', JSON.stringify(updatedMetrics));
    
    // Track click event
    const clickEvent = {
      recommendationId: recommendation.id,
      type: recommendation.type,
      confidence: recommendation.confidence,
      userContext: userContext,
      timestamp: Date.now()
    };
    
    const clicks = JSON.parse(localStorage.getItem('recommendation-clicks') || '[]');
    clicks.push(clickEvent);
    localStorage.setItem('recommendation-clicks', JSON.stringify(clicks.slice(-100)));
    
    // Navigate to recommendation
    window.location.href = recommendation.url;
  };

  const handleRecommendationShow = (recommendation: RealtimeRecommendation) => {
    // Track impression
    const updatedMetrics = {
      ...metrics,
      totalShown: metrics.totalShown + 1,
      clickThroughRate: (metrics.totalClicked / (metrics.totalShown + 1)) * 100
    };
    
    setMetrics(updatedMetrics);
    localStorage.setItem('recommendation-metrics', JSON.stringify(updatedMetrics));
  };

  const getSessionDuration = (): number => {
    const sessionStart = sessionStorage.getItem('session-start');
    if (!sessionStart) {
      sessionStorage.setItem('session-start', Date.now().toString());
      return 0;
    }
    return Date.now() - parseInt(sessionStart);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Engine Status */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Zap className="h-6 w-6 text-connectivity-accent" />
            Real-time Recommendation Engine
            {isActive && (
              <Badge className="bg-green-600 text-white animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                Active
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {metrics.totalShown.toLocaleString()}
              </div>
              <div className="text-sm text-connectivity-lightText">Recommendations Shown</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {metrics.clickThroughRate.toFixed(1)}%
              </div>
              <div className="text-sm text-connectivity-lightText">Click-through Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {metrics.conversionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-connectivity-lightText">Conversion Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                ${metrics.lifetimeValue.toLocaleString()}
              </div>
              <div className="text-sm text-connectivity-lightText">Lifetime Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Context */}
      {userContext && (
        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Current User Context</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-connectivity-lightText">Behavior Score:</span>
                  <span className="text-white font-medium">{userContext.behaviorScore.toFixed(0)}/100</span>
                </div>
                <Progress value={userContext.behaviorScore} className="h-2" />
                
                <div className="flex justify-between">
                  <span className="text-connectivity-lightText">Time on Page:</span>
                  <span className="text-white font-medium">
                    {Math.round((Date.now() - userContext.timeOnPage) / 60000)}m
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-connectivity-lightText">Scroll Depth:</span>
                  <span className="text-white font-medium">{userContext.scrollDepth}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-connectivity-lightText">Interactions:</span>
                  <span className="text-white font-medium">{userContext.interactions}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-connectivity-lightText">Current Intents:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {userContext.intents.map((intent, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {intent.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-connectivity-lightText">Recent Searches:</span>
                  <div className="text-sm text-white mt-1">
                    {userContext.searchTerms.slice(-3).join(', ') || 'None'}
                  </div>
                </div>
                
                <div>
                  <span className="text-connectivity-lightText">Session Duration:</span>
                  <span className="text-white font-medium ml-2">
                    {Math.round(userContext.sessionDuration / 60000)}m
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Recommendations */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Active Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations
              .filter(rec => !rec.expiresAt || rec.expiresAt > Date.now())
              .slice(0, 5)
              .map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                  onClick={() => handleRecommendationClick(rec)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white font-medium">{rec.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${getUrgencyColor(rec.urgency)} text-white text-xs`}
                        >
                          {rec.urgency}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {rec.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-connectivity-lightText mb-2">{rec.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-connectivity-lightText">
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span className={getConfidenceColor(rec.confidence)}>
                            {rec.confidence}% confidence
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{rec.category}</span>
                        </div>
                        
                        {rec.value > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>${rec.value} value</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-connectivity-lightText mt-2 italic">
                        Reason: {rec.reasoning}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-connectivity-accent hover:bg-connectivity-accent/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRecommendationClick(rec);
                        }}
                      >
                        {rec.cta}
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            
            {recommendations.length === 0 && (
              <div className="text-center py-8 text-connectivity-lightText">
                <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No active recommendations. Continue browsing to get personalized suggestions.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};