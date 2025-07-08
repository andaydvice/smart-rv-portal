import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Route, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Heart, 
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  ArrowRight
} from 'lucide-react';

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  users: number;
  conversionRate: number;
  averageTime: string;
  dropoffRate: number;
  optimizations: JourneyOptimization[];
}

interface JourneyOptimization {
  id: string;
  title: string;
  impact: string;
  difficulty: 'low' | 'medium' | 'high';
  status: 'suggested' | 'testing' | 'implemented';
  confidence: number;
}

interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  value: number;
  behavior: string;
  journey: string[];
  conversionRate: number;
  retentionRate: number;
}

const CustomerJourneyOptimizer = () => {
  const [journeyStages, setJourneyStages] = useState<JourneyStage[]>([
    {
      id: 'awareness',
      name: 'Awareness',
      description: 'Initial discovery through search, social media, or referrals',
      users: 24580,
      conversionRate: 18.4,
      averageTime: '2.3 minutes',
      dropoffRate: 81.6,
      optimizations: [
        {
          id: 'opt1',
          title: 'Implement exit-intent popup with value proposition',
          impact: '+4.2% conversion',
          difficulty: 'low',
          status: 'suggested',
          confidence: 89
        },
        {
          id: 'opt2',
          title: 'Add video testimonials on landing pages',
          impact: '+2.8% conversion',
          difficulty: 'medium',
          status: 'testing',
          confidence: 76
        }
      ]
    },
    {
      id: 'consideration',
      name: 'Consideration',
      description: 'Browsing products, reading reviews, comparing options',
      users: 4523,
      conversionRate: 34.7,
      averageTime: '8.7 minutes',
      dropoffRate: 65.3,
      optimizations: [
        {
          id: 'opt3',
          title: 'Personalized product recommendations',
          impact: '+12.4% conversion',
          difficulty: 'medium',
          status: 'implemented',
          confidence: 94
        },
        {
          id: 'opt4',
          title: 'Dynamic pricing based on browsing behavior',
          impact: '+8.9% conversion',
          difficulty: 'high',
          status: 'suggested',
          confidence: 82
        }
      ]
    },
    {
      id: 'decision',
      name: 'Decision',
      description: 'Adding to cart, initiating checkout process',
      users: 1569,
      conversionRate: 67.2,
      averageTime: '4.2 minutes',
      dropoffRate: 32.8,
      optimizations: [
        {
          id: 'opt5',
          title: 'Streamline checkout to 2 steps',
          impact: '+15.6% conversion',
          difficulty: 'medium',
          status: 'testing',
          confidence: 91
        },
        {
          id: 'opt6',
          title: 'Add trust badges and security indicators',
          impact: '+6.3% conversion',
          difficulty: 'low',
          status: 'implemented',
          confidence: 88
        }
      ]
    },
    {
      id: 'purchase',
      name: 'Purchase',
      description: 'Completing the transaction',
      users: 1054,
      conversionRate: 92.1,
      averageTime: '2.8 minutes',
      dropoffRate: 7.9,
      optimizations: [
        {
          id: 'opt7',
          title: 'One-click upsells after purchase',
          impact: '+24.7% revenue',
          difficulty: 'low',
          status: 'suggested',
          confidence: 86
        }
      ]
    },
    {
      id: 'retention',
      name: 'Retention',
      description: 'Post-purchase engagement and repeat purchases',
      users: 971,
      conversionRate: 28.4,
      averageTime: 'N/A',
      dropoffRate: 71.6,
      optimizations: [
        {
          id: 'opt8',
          title: 'Automated email sequence with product tips',
          impact: '+18.2% retention',
          difficulty: 'medium',
          status: 'testing',
          confidence: 79
        },
        {
          id: 'opt9',
          title: 'Loyalty program with exclusive offers',
          impact: '+31.5% repeat purchases',
          difficulty: 'high',
          status: 'suggested',
          confidence: 83
        }
      ]
    }
  ]);

  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([
    {
      id: 'new_rv_owners',
      name: 'New RV Owners',
      size: 8420,
      value: 1840,
      behavior: 'Research-heavy, price-sensitive, seeks educational content',
      journey: ['awareness', 'consideration', 'decision'],
      conversionRate: 12.4,
      retentionRate: 68.2
    },
    {
      id: 'experienced_rvers',
      name: 'Experienced RVers',
      size: 12100,
      value: 2650,
      behavior: 'Quick decision makers, brand loyal, high-value purchases',
      journey: ['awareness', 'decision', 'purchase'],
      conversionRate: 28.7,
      retentionRate: 84.5
    },
    {
      id: 'luxury_travelers',
      name: 'Luxury Travelers',
      size: 3420,
      value: 4200,
      behavior: 'Premium-focused, convenience-driven, social proof important',
      journey: ['consideration', 'decision', 'purchase', 'retention'],
      conversionRate: 45.8,
      retentionRate: 91.3
    },
    {
      id: 'weekend_warriors',
      name: 'Weekend Warriors',
      size: 15680,
      value: 980,
      behavior: 'Seasonal purchases, deal-seekers, mobile-first',
      journey: ['awareness', 'consideration'],
      conversionRate: 8.9,
      retentionRate: 52.7
    }
  ]);

  const getOptimizationColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-600 text-white';
      case 'testing': return 'bg-yellow-600 text-white';
      case 'suggested': return 'bg-[#5B9BD5] text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low': return 'border-green-600 text-green-400';
      case 'medium': return 'border-yellow-600 text-yellow-400';
      case 'high': return 'border-red-600 text-red-400';
      default: return 'border-gray-600 text-gray-400';
    }
  };

  const implementOptimization = (stageId: string, optimizationId: string) => {
    setJourneyStages(prev => 
      prev.map(stage => 
        stage.id === stageId 
          ? {
              ...stage,
              optimizations: stage.optimizations.map(opt => 
                opt.id === optimizationId 
                  ? { ...opt, status: 'testing' as const }
                  : opt
              )
            }
          : stage
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Customer Journey Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Route className="h-6 w-6 text-[#5B9BD5]" />
            AI-Powered Customer Journey Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{journeyStages.reduce((sum, stage) => sum + stage.users, 0).toLocaleString()}</p>
              <p className="text-sm text-gray-400">Total Users Tracked</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {((journeyStages.find(s => s.id === 'purchase')?.users || 0) / journeyStages[0].users * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-400">Overall Conversion</p>
            </div>
            
            <div className="text-center">
              <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {journeyStages.reduce((sum, stage) => sum + stage.optimizations.length, 0)}
              </p>
              <p className="text-sm text-gray-400">Active Optimizations</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">+23.4%</p>
              <p className="text-sm text-gray-400">Revenue Impact</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Stages Flow */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Customer Journey Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {journeyStages.map((stage, index) => (
              <div key={stage.id} className="relative">
                <div className="flex items-start gap-6">
                  {/* Stage Icon */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#5B9BD5] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    {index < journeyStages.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-600 mt-2"></div>
                    )}
                  </div>

                  {/* Stage Content */}
                  <div className="flex-1">
                    <div className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{stage.name}</h3>
                          <p className="text-gray-400 text-sm">{stage.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{stage.users.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">users</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Conversion Rate</p>
                          <p className="text-lg font-bold text-white">{stage.conversionRate}%</p>
                          <Progress value={stage.conversionRate} className="h-2 mt-1" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Average Time</p>
                          <p className="text-lg font-bold text-white">{stage.averageTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Drop-off Rate</p>
                          <p className="text-lg font-bold text-red-400">{stage.dropoffRate}%</p>
                        </div>
                      </div>

                      {/* Optimizations */}
                      <div className="space-y-3">
                        <h4 className="text-[#5B9BD5] font-medium">AI Optimizations</h4>
                        {stage.optimizations.map((optimization) => (
                          <div key={optimization.id} className="p-3 bg-[#091020] rounded border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-white font-medium">{optimization.title}</h5>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getDifficultyColor(optimization.difficulty)}>
                                  {optimization.difficulty}
                                </Badge>
                                <Badge className={getOptimizationColor(optimization.status)}>
                                  {optimization.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="text-[#5B9BD5] font-medium">{optimization.impact}</span>
                                <span className="text-sm text-gray-400">{optimization.confidence}% confidence</span>
                              </div>
                              {optimization.status === 'suggested' && (
                                <Button
                                  size="sm"
                                  onClick={() => implementOptimization(stage.id, optimization.id)}
                                  className="bg-[#5B9BD5] hover:bg-[#4B8FE3]"
                                >
                                  Implement
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Segments */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Customer Segment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customerSegments.map((segment) => (
              <div key={segment.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{segment.name}</h4>
                  <Badge variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                    {segment.size.toLocaleString()} users
                  </Badge>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-300">{segment.behavior}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Avg Value</p>
                      <p className="text-lg font-bold text-white">${segment.value}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Conversion</p>
                      <p className="text-lg font-bold text-white">{segment.conversionRate}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Typical Journey</p>
                    <div className="flex items-center gap-2">
                      {segment.journey.map((stageName, index) => (
                        <React.Fragment key={stageName}>
                          <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
                            {stageName}
                          </Badge>
                          {index < segment.journey.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-1">Retention Rate</p>
                    <Progress value={segment.retentionRate} className="h-2" />
                    <p className="text-sm text-white mt-1">{segment.retentionRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Journey Insights */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">AI Journey Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-lg border border-green-600/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h4 className="text-green-400 font-medium">High-Impact Opportunity</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Luxury Travelers segment shows 45.8% conversion rate but only 13% of traffic. 
                Targeting this segment with premium content could increase revenue by $34,000/month.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 rounded-lg border border-yellow-600/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <h4 className="text-yellow-400 font-medium">Optimization Alert</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Weekend Warriors have 52.7% retention rate (lowest). 
                Implementing seasonal email campaigns could improve retention by 15-20%.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-lg border border-blue-600/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <h4 className="text-blue-400 font-medium">Timing Optimization</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Consideration stage averages 8.7 minutes. Users spending 12+ minutes have 67% higher conversion rates. 
                Consider progressive disclosure to increase engagement time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerJourneyOptimizer;