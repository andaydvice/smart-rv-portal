import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  ShoppingCart,
  Eye,
  Target,
  Brain,
  Download,
  RefreshCw,
  Calendar,
  Filter
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, Pie, Cell } from 'recharts';

interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  growth: number;
}

interface CustomerSegment {
  segment: string;
  count: number;
  revenue: number;
  percentage: number;
  growthRate: number;
}

interface PredictiveInsight {
  id: string;
  type: 'revenue' | 'demand' | 'trend' | 'market';
  title: string;
  prediction: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  description: string;
}

interface MarketTrend {
  category: string;
  currentValue: number;
  projectedValue: number;
  growth: number;
  trend: 'up' | 'down' | 'stable';
}

const AdvancedAnalyticsDashboard = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([
    { month: 'Jan', revenue: 285000, orders: 1420, avgOrderValue: 200.70, growth: 12.3 },
    { month: 'Feb', revenue: 312000, orders: 1560, avgOrderValue: 200.00, growth: 9.5 },
    { month: 'Mar', revenue: 345000, orders: 1725, avgOrderValue: 200.00, growth: 10.6 },
    { month: 'Apr', revenue: 378000, orders: 1890, avgOrderValue: 200.00, growth: 9.6 },
    { month: 'May', revenue: 420000, orders: 2100, avgOrderValue: 200.00, growth: 11.1 },
    { month: 'Jun', revenue: 465000, orders: 2325, avgOrderValue: 200.00, growth: 10.7 }
  ]);

  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([
    { segment: 'Luxury RV Owners', count: 2840, revenue: 1420000, percentage: 35.2, growthRate: 18.5 },
    { segment: 'Weekend Warriors', count: 4120, revenue: 1236000, percentage: 30.6, growthRate: 12.3 },
    { segment: 'Full-Time RVers', count: 1890, revenue: 945000, percentage: 23.4, growthRate: 15.7 },
    { segment: 'New RV Enthusiasts', count: 980, revenue: 441000, percentage: 10.8, growthRate: 24.1 }
  ]);

  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([
    {
      id: '1',
      type: 'revenue',
      title: 'Q4 Revenue Projection',
      prediction: '+23% increase expected',
      confidence: 87.2,
      impact: 'high',
      timeframe: 'Next 3 months',
      description: 'Based on seasonal trends and current growth patterns, Q4 should see significant revenue growth driven by holiday RV purchases.'
    },
    {
      id: '2',
      type: 'demand',
      title: 'Solar Panel Demand Surge',
      prediction: '+45% demand increase',
      confidence: 92.1,
      impact: 'high',
      timeframe: 'Next 6 weeks',
      description: 'Solar panel product demand is projected to surge due to energy cost concerns and sustainability trends.'
    },
    {
      id: '3',
      type: 'trend',
      title: 'Smart Home Integration',
      prediction: '78% adoption by 2025',
      confidence: 74.8,
      impact: 'medium',
      timeframe: 'Next 12 months',
      description: 'Smart home features in RVs are becoming mainstream, with significant adoption expected in the premium segment.'
    },
    {
      id: '4',
      type: 'market',
      title: 'International Market Growth',
      prediction: '+156% expansion potential',
      confidence: 69.3,
      impact: 'high',
      timeframe: 'Next 18 months',
      description: 'European and Australian markets show strong growth potential for smart RV technology adoption.'
    }
  ]);

  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([
    { category: 'Smart Technology', currentValue: 2.8, projectedValue: 4.2, growth: 50.0, trend: 'up' },
    { category: 'Solar Solutions', currentValue: 1.9, projectedValue: 3.1, growth: 63.2, trend: 'up' },
    { category: 'Security Systems', currentValue: 1.2, projectedValue: 1.8, growth: 50.0, trend: 'up' },
    { category: 'Entertainment', currentValue: 0.8, projectedValue: 1.1, growth: 37.5, trend: 'up' },
    { category: 'Basic Accessories', currentValue: 3.5, projectedValue: 2.9, growth: -17.1, trend: 'down' }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [analyticsMetrics, setAnalyticsMetrics] = useState({
    totalRevenue: 2205000,
    totalCustomers: 9830,
    avgLifetimeValue: 3420,
    predictedGrowth: 18.7,
    marketShare: 12.4,
    customerSatisfaction: 94.2
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      default: return <Target className="h-4 w-4 text-gray-400" />;
    }
  };

  const COLORS = ['#5B9BD5', '#4B8FE3', '#60A5FA', '#3B82F6', '#2563EB'];

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <BarChart className="h-6 w-6 text-[#5B9BD5]" />
            Advanced Data Analytics & Business Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${(analyticsMetrics.totalRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-400">Total Revenue</p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{analyticsMetrics.totalCustomers.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Total Customers</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${analyticsMetrics.avgLifetimeValue}</p>
              <p className="text-sm text-gray-400">Avg LTV</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{analyticsMetrics.predictedGrowth}%</p>
              <p className="text-sm text-gray-400">Predicted Growth</p>
            </div>
            
            <div className="text-center">
              <PieChart className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{analyticsMetrics.marketShare}%</p>
              <p className="text-sm text-gray-400">Market Share</p>
            </div>
            
            <div className="text-center">
              <Eye className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{analyticsMetrics.customerSatisfaction}%</p>
              <p className="text-sm text-gray-400">Satisfaction</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-48 bg-[#131a2a] border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#131a2a] border-gray-600">
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-gray-600 text-gray-400">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            
            <Button variant="outline" className="border-gray-600 text-gray-400">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            
            <Button variant="outline" className="border-gray-600 text-gray-400">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-[#091020] border border-gray-700">
          <TabsTrigger 
            value="revenue" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Revenue Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="customers" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Customer Insights
          </TabsTrigger>
          <TabsTrigger 
            value="predictive" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Predictive Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="market" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Market Intelligence
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Revenue Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#5B9BD5" 
                      fill="#5B9BD5" 
                      fillOpacity={0.3}
                      name="Revenue ($)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {revenueData.slice(-3).map((data, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <h4 className="text-white font-medium mb-2">{data.month} Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="text-white font-medium">${data.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Orders:</span>
                        <span className="text-white font-medium">{data.orders.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth:</span>
                        <span className={`font-medium ${data.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {data.growth > 0 ? '+' : ''}{data.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Customer Segmentation & Behavior</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-80">
                  <h4 className="text-white font-medium mb-4">Customer Segments by Revenue</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="revenue"
                      >
                        {customerSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Segment Performance</h4>
                  {customerSegments.map((segment, index) => (
                    <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-medium">{segment.segment}</h5>
                        <Badge className={`${getImpactColor('high')} text-white`}>
                          +{segment.growthRate}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-gray-400">Customers</p>
                          <p className="text-white font-medium">{segment.count.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Revenue</p>
                          <p className="text-white font-medium">${(segment.revenue / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Share</p>
                          <p className="text-white font-medium">{segment.percentage}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Brain className="h-6 w-6 text-[#5B9BD5]" />
                AI-Powered Predictive Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveInsights.map((insight) => (
                  <div key={insight.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Brain className="h-5 w-5 text-[#5B9BD5]" />
                        <h4 className="text-white font-medium">{insight.title}</h4>
                        <Badge className={`${getImpactColor(insight.impact)} text-white`}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{insight.confidence}%</p>
                        <p className="text-xs text-gray-400">Confidence</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-400">Prediction</p>
                        <p className="text-white font-medium">{insight.prediction}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Timeframe</p>
                        <p className="text-white font-medium">{insight.timeframe}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Type</p>
                        <p className="text-white font-medium capitalize">{insight.type}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{insight.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Market Intelligence & Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTrendIcon(trend.trend)}
                        <h4 className="text-white font-medium">{trend.category}</h4>
                      </div>
                      <Badge className={`${trend.growth > 0 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                        {trend.growth > 0 ? '+' : ''}{trend.growth}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Current Value</p>
                        <p className="text-white font-medium">${trend.currentValue}B</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Projected Value</p>
                        <p className="text-white font-medium">${trend.projectedValue}B</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Growth Rate</p>
                        <p className={`font-medium ${trend.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {trend.growth > 0 ? '+' : ''}{trend.growth}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Automated Reports & Dashboards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Executive Summary', type: 'Weekly', status: 'Ready', size: '2.3 MB' },
                  { name: 'Revenue Deep Dive', type: 'Monthly', status: 'Generating', size: '5.1 MB' },
                  { name: 'Customer Analysis', type: 'Quarterly', status: 'Ready', size: '3.8 MB' },
                  { name: 'Market Intelligence', type: 'Monthly', status: 'Ready', size: '4.2 MB' },
                  { name: 'Predictive Forecast', type: 'Weekly', status: 'Ready', size: '1.9 MB' },
                  { name: 'Performance Metrics', type: 'Daily', status: 'Ready', size: '0.8 MB' }
                ].map((report, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{report.name}</h4>
                      <Badge className={`${report.status === 'Ready' ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                        {report.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{report.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white">{report.size}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-3 bg-[#5B9BD5] hover:bg-[#4B8FE3]"
                      disabled={report.status !== 'Ready'}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
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

export default AdvancedAnalyticsDashboard;