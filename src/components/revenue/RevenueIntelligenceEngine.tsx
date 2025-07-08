import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Brain, 
  Zap, 
  ChartBar,
  Users,
  ShoppingCart,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface RevenueMetrics {
  currentMonthRevenue: number;
  predictedRevenue: number;
  customerLifetimeValue: number;
  conversionOptimization: number;
  marketPenetration: number;
  seasonalTrends: any[];
}

interface MLModel {
  name: string;
  accuracy: number;
  status: 'training' | 'deployed' | 'optimizing';
  lastUpdated: string;
  predictions: number;
}

const RevenueIntelligenceEngine = () => {
  const [metrics, setMetrics] = useState<RevenueMetrics>({
    currentMonthRevenue: 24500,
    predictedRevenue: 67800,
    customerLifetimeValue: 1250,
    conversionOptimization: 87,
    marketPenetration: 23,
    seasonalTrends: []
  });

  const [mlModels, setMLModels] = useState<MLModel[]>([
    {
      name: 'Customer Lifetime Value Predictor',
      accuracy: 94.2,
      status: 'deployed',
      lastUpdated: '2 hours ago',
      predictions: 15420
    },
    {
      name: 'Dynamic Pricing Optimizer',
      accuracy: 91.8,
      status: 'deployed',
      lastUpdated: '45 minutes ago',
      predictions: 8930
    },
    {
      name: 'Seasonal Demand Forecaster',
      accuracy: 88.5,
      status: 'training',
      lastUpdated: '12 minutes ago',
      predictions: 3420
    },
    {
      name: 'Affiliate Partner Scorer',
      accuracy: 96.1,
      status: 'optimizing',
      lastUpdated: '1 hour ago',
      predictions: 12100
    }
  ]);

  const [revenueOptimizations, setRevenueOptimizations] = useState([
    {
      id: 1,
      title: 'Increase Solar Panel Bundle Pricing',
      impact: '+$12,400/month',
      confidence: 89,
      type: 'pricing',
      status: 'ready_to_apply'
    },
    {
      id: 2,
      title: 'Target High-Value Customer Segment',
      impact: '+$8,900/month',
      confidence: 94,
      type: 'targeting',
      status: 'applied'
    },
    {
      id: 3,
      title: 'Optimize Checkout Flow for Mobile',
      impact: '+$15,200/month',
      confidence: 91,
      type: 'conversion',
      status: 'testing'
    },
    {
      id: 4,
      title: 'Seasonal Inventory Optimization',
      impact: '+$22,100/month',
      confidence: 87,
      type: 'inventory',
      status: 'ready_to_apply'
    }
  ]);

  const applyOptimization = (optimizationId: number) => {
    setRevenueOptimizations(prev => 
      prev.map(opt => 
        opt.id === optimizationId 
          ? { ...opt, status: 'applied' }
          : opt
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-600';
      case 'training': return 'bg-yellow-600';
      case 'optimizing': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getOptimizationColor = (status: string) => {
    switch (status) {
      case 'applied': return 'border-green-600 text-green-400';
      case 'testing': return 'border-yellow-600 text-yellow-400';
      case 'ready_to_apply': return 'border-[#5B9BD5] text-[#5B9BD5]';
      default: return 'border-gray-600 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue Intelligence Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Brain className="h-6 w-6 text-[#5B9BD5]" />
            AI Revenue Intelligence Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${metrics.currentMonthRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Current Month</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${metrics.predictedRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Predicted (3 Month)</p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${metrics.customerLifetimeValue}</p>
              <p className="text-sm text-gray-400">Avg Customer LTV</p>
            </div>
            
            <div className="text-center">
              <ChartBar className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{metrics.conversionOptimization}%</p>
              <p className="text-sm text-gray-400">Optimization Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ML Models Dashboard */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Zap className="h-6 w-6 text-[#5B9BD5]" />
            Machine Learning Models
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mlModels.map((model, index) => (
              <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{model.name}</h4>
                  <Badge className={`${getStatusColor(model.status)} text-white`}>
                    {model.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-white font-medium">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Predictions Made</span>
                    <span className="text-white">{model.predictions.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-[#5B9BD5]">{model.lastUpdated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Optimization Recommendations */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <TrendingUp className="h-6 w-6 text-[#5B9BD5]" />
            AI Revenue Optimizations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueOptimizations.map((optimization) => (
              <div 
                key={optimization.id} 
                className={`p-4 rounded-lg border ${getOptimizationColor(optimization.status)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{optimization.title}</h4>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-green-600 text-green-400">
                      {optimization.impact}
                    </Badge>
                    <Badge variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                      {optimization.confidence}% confidence
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Type:</span>
                    <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
                      {optimization.type}
                    </Badge>
                  </div>
                  
                  {optimization.status === 'ready_to_apply' && (
                    <Button
                      onClick={() => applyOptimization(optimization.id)}
                      size="sm"
                      className="bg-[#5B9BD5] hover:bg-[#4B8FE3]"
                    >
                      Apply Optimization
                    </Button>
                  )}
                  
                  {optimization.status === 'applied' && (
                    <Badge className="bg-green-600 text-white">Applied</Badge>
                  )}
                  
                  {optimization.status === 'testing' && (
                    <Badge className="bg-yellow-600 text-white">A/B Testing</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Platform Attribution */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <ShoppingCart className="h-6 w-6 text-[#5B9BD5]" />
            Cross-Platform Revenue Attribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#131a2a] rounded-lg">
              <h4 className="text-[#5B9BD5] font-medium mb-2">Direct Traffic</h4>
              <p className="text-2xl font-bold text-white">$18,400</p>
              <p className="text-sm text-gray-400">42% of revenue</p>
            </div>
            
            <div className="text-center p-4 bg-[#131a2a] rounded-lg">
              <h4 className="text-[#5B9BD5] font-medium mb-2">Social Media</h4>
              <p className="text-2xl font-bold text-white">$12,800</p>
              <p className="text-sm text-gray-400">29% of revenue</p>
            </div>
            
            <div className="text-center p-4 bg-[#131a2a] rounded-lg">
              <h4 className="text-[#5B9BD5] font-medium mb-2">Email Campaigns</h4>
              <p className="text-2xl font-bold text-white">$8,900</p>
              <p className="text-sm text-gray-400">20% of revenue</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-[#5B9BD5]/20 to-[#4B8FE3]/20 rounded-lg border border-[#5B9BD5]/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-[#5B9BD5]" />
              <h4 className="text-[#5B9BD5] font-medium">Attribution Insight</h4>
            </div>
            <p className="text-gray-300 text-sm">
              YouTube product reviews are driving 34% more qualified traffic than estimated. 
              Consider increasing video content budget by $2,400/month for potential +$15,600 revenue impact.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueIntelligenceEngine;