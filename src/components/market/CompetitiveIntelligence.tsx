import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Globe, 
  Eye, 
  DollarSign,
  Target,
  BarChart3,
  Lightbulb,
  Shield
} from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  domain: string;
  marketShare: number;
  avgPrice: number;
  priceChange: number;
  trafficTrend: 'up' | 'down' | 'stable';
  contentGaps: number;
  threatLevel: 'low' | 'medium' | 'high';
  lastAnalyzed: string;
}

interface MarketOpportunity {
  id: string;
  title: string;
  market: string;
  potentialRevenue: number;
  difficulty: 'low' | 'medium' | 'high';
  timeToCapture: string;
  description: string;
  competitorGap: string;
}

interface PriceAlert {
  id: string;
  product: string;
  competitor: string;
  oldPrice: number;
  newPrice: number;
  change: number;
  impact: 'positive' | 'negative' | 'neutral';
  timestamp: string;
}

const CompetitiveIntelligence = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: '1',
      name: 'RV Trader',
      domain: 'rvtrader.com',
      marketShare: 34.2,
      avgPrice: 125000,
      priceChange: -2.3,
      trafficTrend: 'down',
      contentGaps: 23,
      threatLevel: 'high',
      lastAnalyzed: '2 hours ago'
    },
    {
      id: '2',
      name: 'Camping World',
      domain: 'campingworld.com',
      marketShare: 28.7,
      avgPrice: 118000,
      priceChange: 1.8,
      trafficTrend: 'up',
      contentGaps: 45,
      threatLevel: 'medium',
      lastAnalyzed: '1 hour ago'
    },
    {
      id: '3',
      name: 'PPL Motor Homes',
      domain: 'pplmotorhomes.com',
      marketShare: 18.9,
      avgPrice: 142000,
      priceChange: -0.5,
      trafficTrend: 'stable',
      contentGaps: 67,
      threatLevel: 'low',
      lastAnalyzed: '3 hours ago'
    },
    {
      id: '4',
      name: 'RV.com',
      domain: 'rv.com',
      marketShare: 12.4,
      avgPrice: 135000,
      priceChange: 3.2,
      trafficTrend: 'up',
      contentGaps: 89,
      threatLevel: 'medium',
      lastAnalyzed: '45 minutes ago'
    }
  ]);

  const [marketOpportunities, setMarketOpportunities] = useState<MarketOpportunity[]>([
    {
      id: '1',
      title: 'Electric RV Market Gap',
      market: 'Sustainable RV Solutions',
      potentialRevenue: 2400000,
      difficulty: 'medium',
      timeToCapture: '6-9 months',
      description: 'Electric RV components and solar integration guides are underserved',
      competitorGap: 'No major competitor offers comprehensive electric RV content'
    },
    {
      id: '2',
      title: 'European RV Market Entry',
      market: 'International Expansion',
      potentialRevenue: 1800000,
      difficulty: 'high',
      timeToCapture: '12-18 months',
      description: 'European RV standards and regulations content opportunity',
      competitorGap: 'US-focused competitors lack European market knowledge'
    },
    {
      id: '3',
      title: 'RV Maintenance Subscription',
      market: 'Service-Based Revenue',
      potentialRevenue: 960000,
      difficulty: 'low',
      timeToCapture: '3-6 months',
      description: 'Monthly RV maintenance reminder and guide service',
      competitorGap: 'No competitor offers automated maintenance scheduling'
    }
  ]);

  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      product: 'Class A Motorhomes',
      competitor: 'RV Trader',
      oldPrice: 125000,
      newPrice: 122000,
      change: -2.4,
      impact: 'negative',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      product: 'Solar Panel Kits',
      competitor: 'Camping World',
      oldPrice: 2400,
      newPrice: 2650,
      change: 10.4,
      impact: 'positive',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      product: 'RV Insurance',
      competitor: 'Good Sam',
      oldPrice: 180,
      newPrice: 165,
      change: -8.3,
      impact: 'negative',
      timestamp: '6 hours ago'
    }
  ]);

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'high': return 'border-red-600 text-red-400';
      case 'medium': return 'border-yellow-600 text-yellow-400';
      case 'low': return 'border-green-600 text-green-400';
      default: return 'border-gray-600 text-gray-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'border-green-600 text-green-400';
      case 'negative': return 'border-red-600 text-red-400';
      case 'neutral': return 'border-gray-600 text-gray-400';
      default: return 'border-gray-600 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Competitive Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Shield className="h-6 w-6 text-[#5B9BD5]" />
            Competitive Intelligence Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <Eye className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{competitors.length}</p>
              <p className="text-sm text-gray-400">Tracked Competitors</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">23</p>
              <p className="text-sm text-gray-400">Market Opportunities</p>
            </div>
            
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">89%</p>
              <p className="text-sm text-gray-400">Content Coverage</p>
            </div>
            
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">$5.16M</p>
              <p className="text-sm text-gray-400">Market Opportunity</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search competitors, products, or markets..."
                className="pl-10 bg-[#131a2a] border-gray-700 text-white"
              />
            </div>
            <Button variant="outline" className="border-gray-600">
              Add Competitor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <BarChart3 className="h-6 w-6 text-[#5B9BD5]" />
            Competitor Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitors.map((competitor) => (
              <div key={competitor.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium text-lg">{competitor.name}</h4>
                    <Badge className={getThreatColor(competitor.threatLevel)}>
                      {competitor.threatLevel} threat
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    Last analyzed: {competitor.lastAnalyzed}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Market Share</p>
                    <p className="text-xl font-bold text-white">{competitor.marketShare}%</p>
                    <Progress value={competitor.marketShare} className="h-2 mt-1" />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Avg Price</p>
                    <p className="text-xl font-bold text-white">${competitor.avgPrice.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {competitor.priceChange > 0 ? (
                        <TrendingUp className="h-4 w-4 text-red-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-green-400" />
                      )}
                      <span className={`text-sm ${competitor.priceChange > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {Math.abs(competitor.priceChange)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Traffic Trend</p>
                    <div className="flex items-center gap-2">
                      {competitor.trafficTrend === 'up' && <TrendingUp className="h-5 w-5 text-green-400" />}
                      {competitor.trafficTrend === 'down' && <TrendingDown className="h-5 w-5 text-red-400" />}
                      {competitor.trafficTrend === 'stable' && <div className="h-5 w-5 bg-gray-400 rounded-full" />}
                      <span className="text-white font-medium capitalize">{competitor.trafficTrend}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Content Gaps</p>
                    <p className="text-xl font-bold text-[#5B9BD5]">{competitor.contentGaps}</p>
                    <p className="text-xs text-gray-400">opportunities</p>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <Button size="sm" variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Opportunities */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Lightbulb className="h-6 w-6 text-[#5B9BD5]" />
            Market Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{opportunity.title}</h4>
                  <Badge variant="outline" className={getDifficultyColor(opportunity.difficulty)}>
                    {opportunity.difficulty}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Market</p>
                    <p className="text-[#5B9BD5] font-medium">{opportunity.market}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Potential Revenue</p>
                    <p className="text-xl font-bold text-white">${(opportunity.potentialRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Time to Capture</p>
                    <p className="text-white">{opportunity.timeToCapture}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Description</p>
                    <p className="text-sm text-gray-300">{opportunity.description}</p>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-[#5B9BD5] font-medium">Competitive Gap:</p>
                    <p className="text-xs text-gray-300">{opportunity.competitorGap}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Alerts */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <AlertCircle className="h-6 w-6 text-[#5B9BD5]" />
            Real-time Price Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {priceAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getImpactColor(alert.impact)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium">{alert.product}</h4>
                      <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
                        {alert.competitor}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">
                        ${alert.oldPrice.toLocaleString()} → ${alert.newPrice.toLocaleString()}
                      </span>
                      <span className={`font-medium ${alert.change > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {alert.change > 0 ? '+' : ''}{alert.change}%
                      </span>
                      <span className="text-gray-400">{alert.timestamp}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                    Analyze Impact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitiveIntelligence;