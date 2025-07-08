import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Heart, 
  MessageCircle,
  Gift,
  Clock,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Mail,
  Bell,
  Star,
  Calendar
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, FunnelChart, Funnel } from 'recharts';

interface CustomerSegment {
  segment: string;
  count: number;
  revenue: number;
  retentionRate: number;
  churnRisk: 'low' | 'medium' | 'high';
  ltv: number;
  lastActivity: string;
  engagementScore: number;
}

interface RetentionCampaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  segment: string;
  status: 'active' | 'paused' | 'completed';
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: number;
  roi: number;
}

interface ChurnPrediction {
  userId: string;
  customerName: string;
  churnProbability: number;
  riskFactors: string[];
  recommendedActions: string[];
  potentialValue: number;
  daysToChurn: number;
  lastPurchase: string;
}

interface LifecycleStage {
  stage: string;
  count: number;
  percentage: number;
  avgRevenue: number;
  nextStageConversion: number;
  timeInStage: number;
  actions: string[];
}

const RetentionIntelligenceHub = () => {
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([
    { segment: 'VIP Customers', count: 1250, revenue: 890000, retentionRate: 94.5, churnRisk: 'low', ltv: 4500, lastActivity: '2 days ago', engagementScore: 92 },
    { segment: 'Regular Buyers', count: 3400, revenue: 1200000, retentionRate: 78.2, churnRisk: 'medium', ltv: 2800, lastActivity: '1 week ago', engagementScore: 74 },
    { segment: 'Occasional Shoppers', count: 5600, revenue: 450000, retentionRate: 45.7, churnRisk: 'high', ltv: 890, lastActivity: '3 weeks ago', engagementScore: 42 },
    { segment: 'New Customers', count: 2890, revenue: 320000, retentionRate: 65.3, churnRisk: 'medium', ltv: 1200, lastActivity: '5 days ago', engagementScore: 67 },
    { segment: 'At-Risk', count: 1890, revenue: 180000, retentionRate: 23.1, churnRisk: 'high', ltv: 450, lastActivity: '2 months ago', engagementScore: 28 }
  ]);

  const [campaigns, setCampaigns] = useState<RetentionCampaign[]>([
    { id: '1', name: 'Win-Back Series', type: 'email', segment: 'At-Risk', status: 'active', sent: 1890, opened: 567, clicked: 189, converted: 45, revenue: 12500, roi: 485 },
    { id: '2', name: 'VIP Appreciation', type: 'email', segment: 'VIP Customers', status: 'active', sent: 1250, opened: 1125, clicked: 456, converted: 234, revenue: 89000, roi: 2340 },
    { id: '3', name: 'Product Recommendations', type: 'push', segment: 'Regular Buyers', status: 'active', sent: 3400, opened: 2380, clicked: 578, converted: 189, revenue: 45600, roi: 890 },
    { id: '4', name: 'Onboarding Journey', type: 'in_app', segment: 'New Customers', status: 'active', sent: 2890, opened: 2456, clicked: 1234, converted: 456, revenue: 67800, roi: 1245 }
  ]);

  const [churnPredictions, setChurnPredictions] = useState<ChurnPrediction[]>([
    { userId: '1', customerName: 'Sarah Johnson', churnProbability: 89, riskFactors: ['No purchase in 45 days', 'Decreased email engagement', 'Support ticket unresolved'], recommendedActions: ['Send personalized offer', 'Follow up on support ticket'], potentialValue: 2400, daysToChurn: 7, lastPurchase: '45 days ago' },
    { userId: '2', customerName: 'Mike Chen', churnProbability: 76, riskFactors: ['Price sensitivity', 'Browsing competitors'], recommendedActions: ['Offer loyalty discount', 'Share exclusive content'], potentialValue: 1800, daysToChurn: 14, lastPurchase: '30 days ago' },
    { userId: '3', customerName: 'Lisa Williams', churnProbability: 82, riskFactors: ['Low app usage', 'Missed last 3 campaigns'], recommendedActions: ['Re-engagement campaign', 'App usage incentive'], potentialValue: 3200, daysToChurn: 10, lastPurchase: '38 days ago' }
  ]);

  const [lifecycleStages, setLifecycleStages] = useState<LifecycleStage[]>([
    { stage: 'Prospects', count: 8900, percentage: 45.2, avgRevenue: 0, nextStageConversion: 12.4, timeInStage: 15, actions: ['Lead nurturing', 'Content marketing'] },
    { stage: 'New Customers', count: 2890, percentage: 14.7, avgRevenue: 450, nextStageConversion: 34.5, timeInStage: 30, actions: ['Onboarding', 'First purchase incentive'] },
    { stage: 'Active Customers', count: 5200, percentage: 26.4, avgRevenue: 1200, nextStageConversion: 18.7, timeInStage: 90, actions: ['Cross-sell', 'Loyalty program'] },
    { stage: 'VIP Customers', count: 1250, percentage: 6.3, avgRevenue: 4500, nextStageConversion: 85.2, timeInStage: 180, actions: ['Exclusive offers', 'Personal service'] },
    { stage: 'At-Risk', count: 1460, percentage: 7.4, avgRevenue: 180, nextStageConversion: 23.1, timeInStage: 60, actions: ['Win-back campaigns', 'Support outreach'] }
  ]);

  const [retentionMetrics, setRetentionMetrics] = useState({
    overallRetentionRate: 72.4,
    averageLTV: 2850,
    churnRate: 8.3,
    reactivationRate: 15.7,
    campaignROI: 1340,
    netPromoterScore: 68
  });

  const getChurnRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <MessageCircle className="h-4 w-4" />;
      case 'push': return <Bell className="h-4 w-4" />;
      case 'in_app': return <Target className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'paused': return 'bg-yellow-600';
      case 'completed': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Retention Intelligence Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Heart className="h-6 w-6 text-[#5B9BD5]" />
            Customer Retention & Lifecycle Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{retentionMetrics.overallRetentionRate}%</p>
              <p className="text-sm text-gray-400">Retention Rate</p>
            </div>
            
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${retentionMetrics.averageLTV}</p>
              <p className="text-sm text-gray-400">Avg LTV</p>
            </div>
            
            <div className="text-center">
              <TrendingDown className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{retentionMetrics.churnRate}%</p>
              <p className="text-sm text-gray-400">Churn Rate</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{retentionMetrics.reactivationRate}%</p>
              <p className="text-sm text-gray-400">Reactivation</p>
            </div>
            
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{retentionMetrics.campaignROI}%</p>
              <p className="text-sm text-gray-400">Campaign ROI</p>
            </div>
            
            <div className="text-center">
              <Star className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{retentionMetrics.netPromoterScore}</p>
              <p className="text-sm text-gray-400">NPS Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="segments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-[#091020] border border-gray-700">
          <TabsTrigger 
            value="segments" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Customer Segments
          </TabsTrigger>
          <TabsTrigger 
            value="campaigns" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Retention Campaigns
          </TabsTrigger>
          <TabsTrigger 
            value="churn" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Churn Prediction
          </TabsTrigger>
          <TabsTrigger 
            value="lifecycle" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Lifecycle Journey
          </TabsTrigger>
          <TabsTrigger 
            value="automation" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="segments">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Customer Segmentation Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegments.map((segment, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-[#5B9BD5]" />
                        <h4 className="text-white font-medium">{segment.segment}</h4>
                        <Badge className={`${getChurnRiskColor(segment.churnRisk)} text-white`}>
                          {segment.churnRisk} risk
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${(segment.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-gray-400">Revenue</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Customers</p>
                        <p className="text-white font-medium">{segment.count.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Retention</p>
                        <p className="text-white font-medium">{segment.retentionRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">LTV</p>
                        <p className="text-white font-medium">${segment.ltv}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Engagement</p>
                        <p className="text-white font-medium">{segment.engagementScore}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Last Activity</p>
                        <p className="text-white font-medium">{segment.lastActivity}</p>
                      </div>
                      <div>
                        <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                          Target
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Active Retention Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getCampaignTypeIcon(campaign.type)}
                        <h4 className="text-white font-medium">{campaign.name}</h4>
                        <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {campaign.segment}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{campaign.roi}%</p>
                        <p className="text-xs text-gray-400">ROI</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Sent</p>
                        <p className="text-white font-medium">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Opened</p>
                        <p className="text-white font-medium">{campaign.opened.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Clicked</p>
                        <p className="text-white font-medium">{campaign.clicked.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">{((campaign.clicked / campaign.opened) * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Converted</p>
                        <p className="text-white font-medium">{campaign.converted.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">{((campaign.converted / campaign.clicked) * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Revenue</p>
                        <p className="text-white font-medium">${campaign.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                          Optimize
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="churn">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                AI Churn Prediction & Prevention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {churnPredictions.map((prediction) => (
                  <div key={prediction.userId} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <div>
                          <h4 className="text-white font-medium">{prediction.customerName}</h4>
                          <p className="text-sm text-gray-400">Last purchase: {prediction.lastPurchase}</p>
                        </div>
                        <Badge className="bg-red-600 text-white">
                          {prediction.churnProbability}% risk
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${prediction.potentialValue}</p>
                        <p className="text-xs text-gray-400">Potential Value</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-white text-sm font-medium mb-2">Risk Factors:</p>
                      <div className="flex flex-wrap gap-2">
                        {prediction.riskFactors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="border-red-600 text-red-400">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-white text-sm font-medium mb-2">Recommended Actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {prediction.recommendedActions.map((action, index) => (
                          <Badge key={index} variant="outline" className="border-green-600 text-green-400">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        Estimated days to churn: {prediction.daysToChurn}
                      </span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Intervene Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifecycle">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Customer Lifecycle Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {lifecycleStages.map((stage, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="text-center mb-4">
                      <h4 className="text-white font-medium mb-2">{stage.stage}</h4>
                      <div className="text-2xl font-bold text-[#5B9BD5] mb-1">
                        {stage.count.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stage.percentage}% of total
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Revenue:</span>
                        <span className="text-white">${stage.avgRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Stage:</span>
                        <span className="text-white">{stage.nextStageConversion}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time in Stage:</span>
                        <span className="text-white">{stage.timeInStage} days</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-white text-sm font-medium mb-2">Actions:</p>
                      {stage.actions.map((action, actionIndex) => (
                        <Badge key={actionIndex} variant="outline" className="border-gray-600 text-gray-300 mr-1 mb-1">
                          {action}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button size="sm" className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                      Optimize Stage
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Automated Retention Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Churn Prevention Automation",
                    status: "Active",
                    triggers: ["Engagement drop", "Support tickets", "Price sensitivity"],
                    actions: ["Personalized offers", "Proactive support", "Loyalty rewards"],
                    prevented: 234,
                    revenue: 89000
                  },
                  {
                    name: "VIP Customer Journey",
                    status: "Active",
                    triggers: ["High LTV", "Multiple purchases", "Referrals"],
                    actions: ["Exclusive access", "Personal account manager", "Custom solutions"],
                    prevented: 45,
                    revenue: 156000
                  },
                  {
                    name: "Win-Back Automation",
                    status: "Active",
                    triggers: ["No activity 30+ days", "Unsubscribed", "Low engagement"],
                    actions: ["Progressive discounts", "Content re-engagement", "Survey feedback"],
                    prevented: 167,
                    revenue: 45600
                  },
                  {
                    name: "Onboarding Optimization",
                    status: "Active",
                    triggers: ["New registration", "First purchase", "Feature adoption"],
                    actions: ["Welcome series", "Tutorial content", "Success milestones"],
                    prevented: 789,
                    revenue: 234000
                  }
                ].map((workflow, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{workflow.name}</h4>
                      <Badge className="bg-green-600 text-white">{workflow.status}</Badge>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-white text-sm font-medium mb-2">Triggers:</p>
                      <div className="flex flex-wrap gap-1">
                        {workflow.triggers.map((trigger, triggerIndex) => (
                          <Badge key={triggerIndex} variant="outline" className="border-blue-600 text-blue-400 text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-white text-sm font-medium mb-2">Actions:</p>
                      <div className="flex flex-wrap gap-1">
                        {workflow.actions.map((action, actionIndex) => (
                          <Badge key={actionIndex} variant="outline" className="border-green-600 text-green-400 text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-400">Customers Retained</p>
                        <p className="text-white font-medium">{workflow.prevented}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Revenue Impact</p>
                        <p className="text-white font-medium">${workflow.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                      Configure Workflow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetentionIntelligenceHub;