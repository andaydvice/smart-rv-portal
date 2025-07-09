import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, DollarSign, Target, Zap, 
  BarChart3, PieChart, ArrowUpRight, 
  Users, ShoppingCart, RefreshCw
} from 'lucide-react';

interface AffiliatePerformance {
  partnerId: string;
  partnerName: string;
  clicks: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  trending: 'up' | 'down' | 'stable';
  roas: number; // Return on Ad Spend
}

interface RevenueMetrics {
  totalRevenue: number;
  totalClicks: number;
  totalConversions: number;
  averageConversionRate: number;
  topPerformingPartner: string;
  growthRate: number;
  projectedMonthlyRevenue: number;
}

export const RevenueOptimizationEngine: React.FC = () => {
  const [metrics, setMetrics] = useState<RevenueMetrics>({
    totalRevenue: 15247.83,
    totalClicks: 18429,
    totalConversions: 342,
    averageConversionRate: 1.86,
    topPerformingPartner: 'Amazon RV Essentials',
    growthRate: 23.4,
    projectedMonthlyRevenue: 22890.15
  });

  const [affiliatePerformance, setAffiliatePerformance] = useState<AffiliatePerformance[]>([
    {
      partnerId: 'amazon-rv',
      partnerName: 'Amazon RV Essentials',
      clicks: 8234,
      conversions: 156,
      revenue: 6843.20,
      conversionRate: 1.89,
      averageOrderValue: 43.87,
      trending: 'up',
      roas: 4.2
    },
    {
      partnerId: 'progressive-insurance',
      partnerName: 'Progressive Insurance',
      clicks: 4521,
      conversions: 89,
      revenue: 4455.50,
      conversionRate: 1.97,
      averageOrderValue: 50.06,
      trending: 'up',
      roas: 3.8
    },
    {
      partnerId: 'camping-world',
      partnerName: 'Camping World',
      clicks: 3112,
      conversions: 62,
      revenue: 2580.40,
      conversionRate: 1.99,
      averageOrderValue: 41.62,
      trending: 'stable',
      roas: 3.1
    },
    {
      partnerId: 'good-sam',
      partnerName: 'Good Sam Services',
      clicks: 2562,
      conversions: 35,
      revenue: 1368.73,
      conversionRate: 1.37,
      averageOrderValue: 39.11,
      trending: 'down',
      roas: 2.3
    }
  ]);

  const [isOptimizing, setIsOptimizing] = useState(false);

  const runRevenueOptimization = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      // Update metrics with optimized values
      setMetrics(prev => ({
        ...prev,
        projectedMonthlyRevenue: prev.projectedMonthlyRevenue * 1.15,
        averageConversionRate: prev.averageConversionRate * 1.08,
        growthRate: prev.growthRate + 5.2
      }));
      
      setIsOptimizing(false);
    }, 3000);
  };

  const getTrendIcon = (trending: string) => {
    switch (trending) {
      case 'up': return <ArrowUpRight className="h-4 w-4 text-green-400" />;
      case 'down': return <ArrowUpRight className="h-4 w-4 text-red-400 rotate-180" />;
      default: return <ArrowUpRight className="h-4 w-4 text-yellow-400 rotate-90" />;
    }
  };

  const getTrendColor = (trending: string) => {
    switch (trending) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  ${metrics.totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +{metrics.growthRate}% this month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">
                  {metrics.averageConversionRate}%
                </p>
                <p className="text-xs text-connectivity-lightText">
                  {metrics.totalConversions} conversions
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
                <p className="text-connectivity-lightText text-sm">Total Clicks</p>
                <p className="text-2xl font-bold text-white">
                  {metrics.totalClicks.toLocaleString()}
                </p>
                <p className="text-xs text-connectivity-lightText">
                  Across all partners
                </p>
              </div>
              <Users className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Projected Revenue</p>
                <p className="text-2xl font-bold text-white">
                  ${metrics.projectedMonthlyRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-400">
                  Monthly projection
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Controls */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-connectivity-accent" />
            Revenue Optimization Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-connectivity-lightText mb-2">
                AI-powered optimization to maximize affiliate revenue and conversion rates
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-connectivity-lightText">
                  Last optimization: 2 hours ago
                </span>
                <Badge variant="secondary" className="bg-green-600 text-white">
                  +15% improvement detected
                </Badge>
              </div>
            </div>
            <Button
              onClick={runRevenueOptimization}
              disabled={isOptimizing}
              className="bg-connectivity-accent hover:bg-connectivity-accent/80"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Optimization
                </>
              )}
            </Button>
          </div>
          
          {isOptimizing && (
            <div className="mt-4">
              <p className="text-sm text-connectivity-lightText mb-2">
                Analyzing affiliate performance patterns...
              </p>
              <Progress value={75} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Affiliate Performance Analysis */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-connectivity-accent" />
            Affiliate Partner Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {affiliatePerformance.map((partner) => (
              <div
                key={partner.partnerId}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{partner.partnerName}</h4>
                    {getTrendIcon(partner.trending)}
                    <Badge 
                      variant="secondary" 
                      className={`${
                        partner.roas >= 4 ? 'bg-green-600' : 
                        partner.roas >= 3 ? 'bg-yellow-600' : 'bg-red-600'
                      } text-white`}
                    >
                      {partner.roas}x ROAS
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">
                      ${partner.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-connectivity-lightText">Revenue</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-connectivity-lightText">Clicks</p>
                    <p className="text-white font-medium">
                      {partner.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Conversions</p>
                    <p className="text-white font-medium">{partner.conversions}</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Conv. Rate</p>
                    <p className={`font-medium ${getTrendColor(partner.trending)}`}>
                      {partner.conversionRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">AOV</p>
                    <p className="text-white font-medium">
                      ${partner.averageOrderValue}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Progress 
                    value={(partner.revenue / metrics.totalRevenue) * 100} 
                    className="h-2" 
                  />
                  <p className="text-xs text-connectivity-lightText mt-1">
                    {((partner.revenue / metrics.totalRevenue) * 100).toFixed(1)}% of total revenue
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Recommendations */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-connectivity-accent" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-green-300 font-medium mb-1">High Priority</h4>
                  <p className="text-sm text-connectivity-lightText">
                    Increase Progressive Insurance placements by 25%. They show 97% higher conversion rate during weekends.
                  </p>
                  <p className="text-xs text-green-400 mt-1">
                    Potential revenue increase: +$1,240/month
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-yellow-300 font-medium mb-1">Medium Priority</h4>
                  <p className="text-sm text-connectivity-lightText">
                    A/B test Amazon product placements. Current CTR is 15% below industry average.
                  </p>
                  <p className="text-xs text-yellow-400 mt-1">
                    Potential revenue increase: +$840/month
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-blue-300 font-medium mb-1">Optimization</h4>
                  <p className="text-sm text-connectivity-lightText">
                    Good Sam Services shows declining performance. Consider reducing visibility or renegotiating terms.
                  </p>
                  <p className="text-xs text-blue-400 mt-1">
                    Potential cost savings: +$320/month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};