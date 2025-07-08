import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import AdminRoute from '@/components/auth/AdminRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  MousePointer, 
  Clock,
  TrendingDown,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Mock data for demonstration - in real app, this would come from your analytics service
const generateMockData = () => ({
  // User Analytics
  userStats: {
    totalUsers: 12847,
    activeUsers: 3456,
    newUsers: 289,
    retentionRate: 78.2
  },
  
  // Traffic Analytics
  trafficData: [
    { date: '2024-01-01', visitors: 2400, pageViews: 4800, bounceRate: 35 },
    { date: '2024-01-02', visitors: 1398, pageViews: 3200, bounceRate: 42 },
    { date: '2024-01-03', visitors: 9800, pageViews: 18600, bounceRate: 28 },
    { date: '2024-01-04', visitors: 3908, pageViews: 7500, bounceRate: 38 },
    { date: '2024-01-05', visitors: 4800, pageViews: 9200, bounceRate: 31 },
    { date: '2024-01-06', visitors: 3800, pageViews: 7100, bounceRate: 33 },
    { date: '2024-01-07', visitors: 4300, pageViews: 8600, bounceRate: 29 }
  ],

  // Revenue Analytics
  revenueData: [
    { month: 'Jan', affiliate: 4000, ads: 2400, subscriptions: 2400 },
    { month: 'Feb', affiliate: 3000, ads: 1398, subscriptions: 2210 },
    { month: 'Mar', affiliate: 2000, ads: 9800, subscriptions: 2290 },
    { month: 'Apr', affiliate: 2780, ads: 3908, subscriptions: 2000 },
    { month: 'May', affiliate: 1890, ads: 4800, subscriptions: 2181 },
    { month: 'Jun', affiliate: 2390, ads: 3800, subscriptions: 2500 }
  ],

  // Device Analytics
  deviceData: [
    { name: 'Desktop', value: 45.2, color: '#5B9BD5' },
    { name: 'Mobile', value: 38.7, color: '#60A5FA' },
    { name: 'Tablet', value: 16.1, color: '#93C5FD' }
  ],

  // Content Performance
  contentPerformance: [
    { title: 'Top 10 Smart RV Upgrades', views: 15420, engagement: 85.2, revenue: 2340 },
    { title: 'Solar Power for RVs Guide', views: 12890, engagement: 78.9, revenue: 1890 },
    { title: 'RV Storage Solutions', views: 10560, engagement: 82.1, revenue: 1560 },
    { title: 'Remote Work RV Setup', views: 9870, engagement: 88.4, revenue: 2100 },
    { title: 'RV Security Systems', views: 8940, engagement: 76.8, revenue: 1420 }
  ],

  // Performance Metrics
  performanceMetrics: {
    avgLoadTime: 2.1,
    firstContentfulPaint: 1.4,
    largestContentfulPaint: 2.3,
    cumulativeLayoutShift: 0.08,
    timeToInteractive: 3.2
  }
});

const EnhancedAnalyticsDashboard = () => {
  const [data, setData] = useState(generateMockData());
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // In a real app, fetch actual analytics data here
    // For now, we'll use mock data
    setData(generateMockData());
  }, [timeRange]);

  const StatCard = ({ title, value, change, icon: Icon, positive = true }) => (
    <Card className="bg-[#091020] border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-white text-2xl font-bold">{value}</p>
            {change && (
              <div className={`flex items-center mt-2 ${positive ? 'text-green-400' : 'text-red-400'}`}>
                {positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                <span className="text-sm">{change}%</span>
              </div>
            )}
          </div>
          <div className="bg-[#5B9BD5]/10 p-3 rounded-lg">
            <Icon className="h-6 w-6 text-[#5B9BD5]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PerformanceIndicator = ({ label, value, target, unit = 's' }) => {
    const percentage = (value / target) * 100;
    const isGood = value <= target;
    
    return (
      <div className="bg-[#131a2a] p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">{label}</span>
          {isGood ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400" />
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white text-lg font-semibold">{value}{unit}</span>
          <span className="text-gray-400 text-sm">Target: {target}{unit}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full ${isGood ? 'bg-green-400' : 'bg-red-400'}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <AdminRoute>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Activity className="h-8 w-8 text-[#5B9BD5]" />
                Enhanced Analytics Dashboard
              </h1>
              <p className="text-gray-300">
                Comprehensive performance monitoring and business intelligence
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Users"
                value={data.userStats.totalUsers.toLocaleString()}
                change="12.5"
                icon={Users}
              />
              <StatCard
                title="Active Users"
                value={data.userStats.activeUsers.toLocaleString()}
                change="8.2"
                icon={Eye}
              />
              <StatCard
                title="Monthly Revenue"
                value={`$${(data.revenueData[data.revenueData.length - 1]?.affiliate + data.revenueData[data.revenueData.length - 1]?.ads + data.revenueData[data.revenueData.length - 1]?.subscriptions).toLocaleString()}`}
                change="15.3"
                icon={DollarSign}
              />
              <StatCard
                title="Retention Rate"
                value={`${data.userStats.retentionRate}%`}
                change="3.1"
                icon={TrendingUp}
              />
            </div>

            <Tabs defaultValue="traffic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-[#131a2a] border border-gray-700">
                <TabsTrigger 
                  value="traffic"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  Traffic
                </TabsTrigger>
                <TabsTrigger 
                  value="revenue"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  Revenue
                </TabsTrigger>
                <TabsTrigger 
                  value="content"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger 
                  value="performance"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  Performance
                </TabsTrigger>
                <TabsTrigger 
                  value="realtime"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  Real-time
                </TabsTrigger>
              </TabsList>

              {/* Traffic Analytics */}
              <TabsContent value="traffic">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-[#091020] border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Traffic Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data.trafficData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#FFFFFF'
                            }} 
                          />
                          <Area type="monotone" dataKey="visitors" stroke="#5B9BD5" fill="#5B9BD5" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="pageViews" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.4} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#091020] border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Device Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={data.deviceData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {data.deviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#FFFFFF'
                            }} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Revenue Analytics */}
              <TabsContent value="revenue">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Streams</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={data.revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#FFFFFF'
                          }} 
                        />
                        <Legend />
                        <Bar dataKey="affiliate" stackId="a" fill="#5B9BD5" name="Affiliate Revenue" />
                        <Bar dataKey="ads" stackId="a" fill="#60A5FA" name="Ad Revenue" />
                        <Bar dataKey="subscriptions" stackId="a" fill="#93C5FD" name="Subscriptions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Performance */}
              <TabsContent value="content">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Top Performing Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.contentPerformance.map((item, index) => (
                        <div key={index} className="bg-[#131a2a] p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white font-medium">{item.title}</h3>
                            <span className="text-green-400 font-semibold">${item.revenue}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Views: </span>
                              <span className="text-white">{item.views.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Engagement: </span>
                              <span className="text-white">{item.engagement}%</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Revenue: </span>
                              <span className="text-green-400">${item.revenue}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Metrics */}
              <TabsContent value="performance">
                <div className="space-y-6">
                  <Card className="bg-[#091020] border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Core Web Vitals</CardTitle>
                      <p className="text-gray-400">Critical performance metrics for user experience</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <PerformanceIndicator
                          label="Average Load Time"
                          value={data.performanceMetrics.avgLoadTime}
                          target={3.0}
                        />
                        <PerformanceIndicator
                          label="First Contentful Paint"
                          value={data.performanceMetrics.firstContentfulPaint}
                          target={1.5}
                        />
                        <PerformanceIndicator
                          label="Largest Contentful Paint"
                          value={data.performanceMetrics.largestContentfulPaint}
                          target={2.5}
                        />
                        <PerformanceIndicator
                          label="Time to Interactive"
                          value={data.performanceMetrics.timeToInteractive}
                          target={3.5}
                        />
                        <PerformanceIndicator
                          label="Cumulative Layout Shift"
                          value={data.performanceMetrics.cumulativeLayoutShift}
                          target={0.1}
                          unit=""
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Alert className="border-green-600 bg-green-600/10">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-300">
                      Your site is performing well! Most metrics are within target ranges.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>

              {/* Real-time Analytics */}
              <TabsContent value="realtime">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-[#091020] border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Live Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#5B9BD5] mb-2">247</div>
                        <div className="text-gray-400">Active users right now</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#091020] border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Real-time Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">User signed up</span>
                          <span className="text-gray-500 ml-auto">2s ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">Page view: /blog/rv-solar-power</span>
                          <span className="text-gray-500 ml-auto">5s ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-gray-300">Affiliate click: Solar Panel Kit</span>
                          <span className="text-gray-500 ml-auto">12s ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </AdminRoute>
  );
};

export default EnhancedAnalyticsDashboard;