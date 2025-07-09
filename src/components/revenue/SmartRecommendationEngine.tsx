import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Zap, TrendingUp, Target, 
  Star, ShoppingCart, Users, Eye
} from 'lucide-react';

interface SmartRecommendation {
  id: string;
  productId: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  confidence: number;
  expectedConversion: number;
  affiliatePartner: string;
  personalizedReason: string;
  aiInsight: string;
  urgency: 'low' | 'medium' | 'high';
  potentialRevenue: number;
}

interface UserBehaviorData {
  pageViews: string[];
  searchHistory: string[];
  calculatorUsage: string[];
  timeSpent: { [key: string]: number };
  deviceType: string;
  location: string;
  sessionDuration: number;
  engagementScore: number;
}

export const SmartRecommendationEngine: React.FC = () => {
  const [userBehavior, setUserBehavior] = useState<UserBehaviorData>({
    pageViews: ['/calculators/rv-cost', '/features/solar-power', '/models/luxury'],
    searchHistory: ['solar panels for RV', 'luxury motorhome', 'RV battery systems'],
    calculatorUsage: ['solar-calculator', 'rv-cost-calculator'],
    timeSpent: {
      '/features/solar-power': 240,
      '/calculators/solar': 180,
      '/models/luxury': 120
    },
    deviceType: 'desktop',
    location: 'California',
    sessionDuration: 840,
    engagementScore: 8.7
  });

  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([
    {
      id: 'rec-001',
      productId: 'solar-kit-premium',
      title: 'Complete 400W Solar Power System',
      description: 'Perfect for luxury RVs - includes panels, charge controller, batteries, and inverter',
      price: '$2,899',
      image: '/lovable-uploads/solar-panel.jpg',
      category: 'Solar Equipment',
      confidence: 94,
      expectedConversion: 12.3,
      affiliatePartner: 'Renogy Solar',
      personalizedReason: 'High interest in solar content + luxury RV browsing',
      aiInsight: 'User spent 4+ minutes on solar calculator, indicating serious purchase intent',
      urgency: 'high',
      potentialRevenue: 348
    },
    {
      id: 'rec-002',
      productId: 'lithium-battery-bank',
      title: 'LiFePO4 Battery Bank 400Ah',
      description: 'High-capacity lithium batteries for extended off-grid adventures',
      price: '$1,599',
      image: '/lovable-uploads/battery-bank.jpg',
      category: 'Power Storage',
      confidence: 87,
      expectedConversion: 8.9,
      affiliatePartner: 'Battle Born Batteries',
      personalizedReason: 'Complementary to solar interest + calculator usage patterns',
      aiInsight: 'Battery systems are the #2 searched item after solar panels',
      urgency: 'medium',
      potentialRevenue: 192
    },
    {
      id: 'rec-003',
      productId: 'smart-monitoring',
      title: 'Victron SmartShunt Battery Monitor',
      description: 'Real-time battery monitoring with smartphone connectivity',
      price: '$199',
      image: '/lovable-uploads/battery-monitor.jpg',
      category: 'Monitoring',
      confidence: 82,
      expectedConversion: 15.7,
      affiliatePartner: 'Victron Energy',
      personalizedReason: 'Tech-savvy user profile + luxury feature interest',
      aiInsight: 'Monitoring tools have 40% higher conversion for tech-oriented users',
      urgency: 'medium',
      potentialRevenue: 24
    },
    {
      id: 'rec-004',
      productId: 'rv-insurance-luxury',
      title: 'Luxury RV Insurance Coverage',
      description: 'Comprehensive protection for high-value recreational vehicles',
      price: 'Quote varies',
      image: '/lovable-uploads/insurance-protection.jpg',
      category: 'Insurance',
      confidence: 76,
      expectedConversion: 6.4,
      affiliatePartner: 'Progressive RV',
      personalizedReason: 'Luxury RV interest indicates high-value vehicle ownership',
      aiInsight: 'Insurance converts better when paired with equipment purchases',
      urgency: 'low',
      potentialRevenue: 125
    }
  ]);

  const [engineMetrics, setEngineMetrics] = useState({
    totalRecommendations: 1247,
    clickThroughRate: 8.7,
    conversionRate: 3.2,
    averageOrderValue: 487,
    revenueGenerated: 18934,
    accuracyScore: 89.4
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const generateNewRecommendations = () => {
    // Simulate AI recommendation generation
    setRecommendations(prev => prev.map(rec => ({
      ...rec,
      confidence: Math.min(rec.confidence + Math.random() * 5, 100),
      expectedConversion: rec.expectedConversion + (Math.random() - 0.5) * 2
    })));
  };

  return (
    <div className="space-y-6">
      {/* Engine Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Accuracy Score</p>
                <p className="text-2xl font-bold text-white">{engineMetrics.accuracyScore}%</p>
                <p className="text-xs text-green-400">AI prediction accuracy</p>
              </div>
              <Brain className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Click-Through Rate</p>
                <p className="text-2xl font-bold text-white">{engineMetrics.clickThroughRate}%</p>
                <p className="text-xs text-connectivity-lightText">
                  {engineMetrics.totalRecommendations} shown
                </p>
              </div>
              <Eye className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">{engineMetrics.conversionRate}%</p>
                <p className="text-xs text-connectivity-lightText">
                  ${engineMetrics.averageOrderValue} AOV
                </p>
              </div>
              <Target className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Revenue Generated</p>
                <p className="text-2xl font-bold text-white">
                  ${engineMetrics.revenueGenerated.toLocaleString()}
                </p>
                <p className="text-xs text-green-400">This month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Behavior Analysis */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-connectivity-accent" />
            Current User Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Behavior Profile</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-connectivity-lightText">Engagement Score:</span>
                    <span className="text-white font-medium">{userBehavior.engagementScore}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-connectivity-lightText">Session Duration:</span>
                    <span className="text-white font-medium">
                      {Math.round(userBehavior.sessionDuration / 60)}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-connectivity-lightText">Device Type:</span>
                    <span className="text-white font-medium">{userBehavior.deviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-connectivity-lightText">Location:</span>
                    <span className="text-white font-medium">{userBehavior.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">Interest Indicators</h4>
                <div className="flex flex-wrap gap-1">
                  {userBehavior.searchHistory.slice(0, 3).map((search, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Page Engagement</h4>
                <div className="space-y-2">
                  {Object.entries(userBehavior.timeSpent).map(([page, time]) => (
                    <div key={page} className="flex justify-between items-center">
                      <span className="text-connectivity-lightText text-sm">{page}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm">{time}s</span>
                        <Progress value={(time / 300) * 100} className="w-16 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                <h4 className="text-blue-300 font-medium mb-1">AI Prediction</h4>
                <p className="text-sm text-connectivity-lightText">
                  High-value prospect with 87% likelihood to purchase solar equipment within 30 days
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-connectivity-accent" />
              AI-Powered Recommendations
            </CardTitle>
            <Button
              onClick={generateNewRecommendations}
              className="bg-connectivity-accent hover:bg-connectivity-accent/80"
            >
              <Zap className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-connectivity-accent" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{rec.title}</h4>
                      <Badge className={`${getUrgencyColor(rec.urgency)} text-white text-xs`}>
                        {rec.urgency}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-connectivity-lightText mb-3">
                      {rec.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-connectivity-lightText">Price: </span>
                        <span className="text-white font-medium">{rec.price}</span>
                      </div>
                      <div>
                        <span className="text-connectivity-lightText">Conv. Rate: </span>
                        <span className="text-white font-medium">{rec.expectedConversion}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-connectivity-lightText text-sm">AI Confidence:</span>
                        <span className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                          {rec.confidence}%
                        </span>
                      </div>
                      <Progress value={rec.confidence} className="h-2" />
                    </div>
                    
                    <div className="p-3 bg-gray-900 rounded text-sm">
                      <p className="text-green-300 font-medium mb-1">Why this recommendation?</p>
                      <p className="text-connectivity-lightText mb-2">{rec.personalizedReason}</p>
                      <p className="text-blue-300 text-xs italic">{rec.aiInsight}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-connectivity-lightText">
                        Partner: {rec.affiliatePartner}
                      </div>
                      <div className="text-xs text-green-400">
                        Est. Revenue: ${rec.potentialRevenue}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-3 bg-connectivity-accent hover:bg-connectivity-accent/80"
                      size="sm"
                    >
                      View Product
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Insights */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">AI Learning Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
              <h4 className="text-green-300 font-medium mb-1">Pattern Recognition</h4>
              <p className="text-sm text-connectivity-lightText">
                Users who spend 3+ minutes on solar calculators are 340% more likely to purchase within 30 days
              </p>
            </div>
            
            <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h4 className="text-blue-300 font-medium mb-1">Behavioral Insight</h4>
              <p className="text-sm text-connectivity-lightText">
                Luxury RV browsers have 67% higher average order values but need different messaging approaches
              </p>
            </div>
            
            <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
              <h4 className="text-purple-300 font-medium mb-1">Optimization Opportunity</h4>
              <p className="text-sm text-connectivity-lightText">
                Cross-selling battery systems with solar panels increases total order value by average of $892
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};