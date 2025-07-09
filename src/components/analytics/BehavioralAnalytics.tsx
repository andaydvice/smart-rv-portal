import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, MousePointer, Clock, TrendingUp, Target, Zap } from 'lucide-react';

interface UserBehavior {
  userId: string;
  sessionId: string;
  pageViews: PageView[];
  interactions: Interaction[];
  scrollDepth: number;
  timeOnPage: number;
  exitIntent: boolean;
  conversionProbability: number;
  purchaseIntent: 'low' | 'medium' | 'high';
  interests: string[];
}

interface PageView {
  page: string;
  timestamp: number;
  duration: number;
  source: string;
}

interface Interaction {
  type: 'click' | 'hover' | 'scroll' | 'form_input';
  element: string;
  timestamp: number;
  value?: string;
}

interface HeatmapData {
  x: number;
  y: number;
  intensity: number;
  elementType: string;
}

const BehavioralAnalytics = () => {
  const [behaviorData, setBehaviorData] = useState<UserBehavior | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [predictiveInsights, setPredictiveInsights] = useState<Record<string, any> | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  // Initialize behavioral tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      startBehaviorTracking();
    }
  }, []);

  const startBehaviorTracking = () => {
    const sessionId = getSessionId();
    const userId = getUserId();
    
    const behavior: UserBehavior = {
      userId,
      sessionId,
      pageViews: [],
      interactions: [],
      scrollDepth: 0,
      timeOnPage: Date.now(),
      exitIntent: false,
      conversionProbability: 0,
      purchaseIntent: 'low',
      interests: []
    };

    // Track page view
    behavior.pageViews.push({
      page: window.location.pathname,
      timestamp: Date.now(),
      duration: 0,
      source: document.referrer || 'direct'
    });

    // Scroll depth tracking
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      behavior.scrollDepth = Math.max(behavior.scrollDepth, scrollPercent);
      
      // Track scroll interaction
      behavior.interactions.push({
        type: 'scroll',
        element: 'page',
        timestamp: Date.now(),
        value: scrollPercent.toString()
      });
    };

    // Click tracking
    const trackClicks = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementInfo = {
        tag: target.tagName.toLowerCase(),
        class: target.className,
        id: target.id,
        text: target.textContent?.substring(0, 50) || ''
      };

      behavior.interactions.push({
        type: 'click',
        element: JSON.stringify(elementInfo),
        timestamp: Date.now()
      });

      // Add to heatmap data
      setHeatmapData(prev => [...prev, {
        x: event.clientX,
        y: event.clientY,
        intensity: 1,
        elementType: target.tagName.toLowerCase()
      }]);

      // Track affiliate link clicks for revenue attribution
      if (target.closest('a[href*="amazon.com"], a[href*="rv"], a[data-affiliate]')) {
        trackConversionEvent('affiliate_click', target);
      }
    };

    // Exit intent detection
    const trackExitIntent = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        behavior.exitIntent = true;
        calculateConversionProbability(behavior);
      }
    };

    // Form interaction tracking
    const trackFormInputs = (event: Event) => {
      const target = event.target as HTMLInputElement;
      behavior.interactions.push({
        type: 'form_input',
        element: target.name || target.id || 'unknown',
        timestamp: Date.now(),
        value: target.type === 'password' ? '[password]' : target.value.substring(0, 20)
      });
    };

    // Event listeners
    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    document.addEventListener('click', trackClicks);
    document.addEventListener('mouseleave', trackExitIntent);
    document.addEventListener('input', trackFormInputs);

    setBehaviorData(behavior);
    setIsTracking(true);

    // Update behavior data periodically
    const interval = setInterval(() => {
      behavior.timeOnPage = Date.now() - behavior.timeOnPage;
      calculateConversionProbability(behavior);
      setBehaviorData({ ...behavior });
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', trackScrollDepth);
      document.removeEventListener('click', trackClicks);
      document.removeEventListener('mouseleave', trackExitIntent);
      document.removeEventListener('input', trackFormInputs);
    };
  };

  const calculateConversionProbability = (behavior: UserBehavior) => {
    let score = 0;
    
    // Time on page (max 30 points)
    const timeMinutes = (Date.now() - behavior.timeOnPage) / 60000;
    score += Math.min(timeMinutes * 5, 30);
    
    // Scroll depth (max 25 points)
    score += (behavior.scrollDepth / 100) * 25;
    
    // Interactions (max 20 points)
    score += Math.min(behavior.interactions.length * 2, 20);
    
    // Page views (max 15 points)
    score += Math.min(behavior.pageViews.length * 5, 15);
    
    // Affiliate link clicks (max 10 points)
    const affiliateClicks = behavior.interactions.filter(i => 
      i.element.includes('affiliate') || i.element.includes('amazon')
    ).length;
    score += Math.min(affiliateClicks * 5, 10);

    behavior.conversionProbability = Math.min(score, 100);
    
    // Set purchase intent
    if (score >= 70) behavior.purchaseIntent = 'high';
    else if (score >= 40) behavior.purchaseIntent = 'medium';
    else behavior.purchaseIntent = 'low';

    // Generate predictive insights
    generatePredictiveInsights(behavior);
  };

  const generatePredictiveInsights = (behavior: UserBehavior) => {
    const insights = {
      likelyToConvert: behavior.conversionProbability > 60,
      recommendedActions: [] as string[],
      nextBestAction: '',
      estimatedValue: 0,
      timeToConversion: 0
    };

    if (behavior.conversionProbability > 80) {
      insights.recommendedActions.push('Show exit-intent popup with discount');
      insights.nextBestAction = 'Present high-value offer';
      insights.estimatedValue = 150;
      insights.timeToConversion = 2;
    } else if (behavior.conversionProbability > 50) {
      insights.recommendedActions.push('Display social proof testimonials');
      insights.recommendedActions.push('Highlight free shipping');
      insights.nextBestAction = 'Reduce friction in checkout';
      insights.estimatedValue = 75;
      insights.timeToConversion = 5;
    } else {
      insights.recommendedActions.push('Provide more educational content');
      insights.recommendedActions.push('Offer product comparison tool');
      insights.nextBestAction = 'Build trust and authority';
      insights.estimatedValue = 30;
      insights.timeToConversion = 15;
    }

    setPredictiveInsights(insights);
  };

  const trackConversionEvent = (eventType: string, element: HTMLElement) => {
    const conversionData = {
      eventType,
      timestamp: Date.now(),
      element: element.tagName,
      page: window.location.pathname,
      sessionId: behaviorData?.sessionId,
      conversionProbability: behaviorData?.conversionProbability || 0
    };

    // Store conversion event
    const events = JSON.parse(localStorage.getItem('conversion_events') || '[]');
    events.push(conversionData);
    localStorage.setItem('conversion_events', JSON.stringify(events));
  };

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  };

  const getUserId = () => {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  };

  if (!behaviorData) {
    return (
      <Card className="bg-[#091020] border-gray-700">
        <CardContent className="p-6 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#5B9BD5] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Initializing behavioral analytics...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Real-time Behavior Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Eye className="h-6 w-6 text-[#5B9BD5]" />
            Real-time User Behavior
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#5B9BD5]" />
                <span className="text-gray-400">Time on Page</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {Math.round((Date.now() - behaviorData.timeOnPage) / 60000)}m
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4 text-[#5B9BD5]" />
                <span className="text-gray-400">Interactions</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {behaviorData.interactions.length}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#5B9BD5]" />
                <span className="text-gray-400">Scroll Depth</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={behaviorData.scrollDepth} className="flex-1" />
                <span className="text-white font-bold">{behaviorData.scrollDepth}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Probability */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Target className="h-6 w-6 text-[#5B9BD5]" />
            Conversion Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Conversion Probability</span>
              <Badge 
                variant={behaviorData.purchaseIntent === 'high' ? 'default' : 
                        behaviorData.purchaseIntent === 'medium' ? 'secondary' : 'outline'}
                className={
                  behaviorData.purchaseIntent === 'high' ? 'bg-green-600 text-white' :
                  behaviorData.purchaseIntent === 'medium' ? 'bg-yellow-600 text-white' :
                  'bg-gray-600 text-white'
                }
              >
                {behaviorData.purchaseIntent.toUpperCase()} INTENT
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {behaviorData.conversionProbability.toFixed(1)}% likely to convert
                </span>
              </div>
              <Progress 
                value={behaviorData.conversionProbability} 
                className="h-3"
              />
            </div>

            {predictiveInsights && (
              <div className="mt-4 p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <h4 className="text-[#5B9BD5] font-medium mb-2">
                  <Zap className="h-4 w-4 inline mr-1" />
                  Predictive Insights
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    <strong>Next Best Action:</strong> {predictiveInsights.nextBestAction}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Estimated Value:</strong> ${predictiveInsights.estimatedValue}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Time to Conversion:</strong> ~{predictiveInsights.timeToConversion} minutes
                  </p>
                  <div className="mt-3">
                    <p className="text-sm text-gray-400 mb-1">Recommended Actions:</p>
                    <ul className="space-y-1">
                      {predictiveInsights.recommendedActions.map((action: string, index: number) => (
                        <li key={index} className="text-xs text-gray-300">
                          • {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Visualization */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Click Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 bg-[#131a2a] rounded-lg overflow-hidden">
            {heatmapData.map((point, index) => (
              <div
                key={index}
                className="absolute w-4 h-4 rounded-full bg-red-500 opacity-60 pointer-events-none"
                style={{
                  left: `${(point.x / window.innerWidth) * 100}%`,
                  top: `${(point.y / 400) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
            {heatmapData.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Click anywhere on the page to see heatmap data</p>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Red dots show click locations. {heatmapData.length} clicks recorded.
          </p>
        </CardContent>
      </Card>

      {/* Recent Interactions */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Interactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {behaviorData.interactions.slice(-10).reverse().map((interaction, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">
                  {interaction.type.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-gray-500">
                  {new Date(interaction.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BehavioralAnalytics;