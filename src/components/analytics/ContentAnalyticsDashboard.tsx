import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, TrendingDown, DollarSign, MousePointer, 
  Eye, Target, BarChart3, Calendar, Filter, RefreshCw
} from 'lucide-react';
import { useContentAnalytics } from '@/hooks/useContentAnalytics';

interface ContentAnalyticsDashboardProps {
  className?: string;
}

const ContentAnalyticsDashboard: React.FC<ContentAnalyticsDashboardProps> = ({ className = "" }) => {
  const { 
    analytics, 
    loading, 
    getTotalRevenue, 
    getAverageConversionRate, 
    getTopPerformers,
    getCategoryPerformance 
  } = useContentAnalytics();
  
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (loading) {
    return (
      <Card className={`bg-[#151A22] border-gray-700 ${className}`}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalRevenue = getTotalRevenue();
  const avgConversionRate = getAverageConversionRate();
  const topPerformers = getTopPerformers();
  const categoryPerformance = getCategoryPerformance();
  const totalClicks = analytics.reduce((sum, item) => sum + item.conversion_metrics.affiliate_clicks, 0);
  const totalViews = analytics.reduce((sum, item) => sum + item.engagement_metrics.page_views, 0);

  return (
    <Card className={`bg-[#151A22] border-gray-700 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#5B9BD5]" />
            Affiliate Performance Dashboard
          </CardTitle>
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#091020] border border-gray-600 rounded-lg px-3 py-1 text-white text-sm z-20"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={refreshing}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#1a202c]">
            <TabsTrigger value="overview" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">
              Performance
            </TabsTrigger>
            <TabsTrigger value="content" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">
              Content Analysis
            </TabsTrigger>
            <TabsTrigger value="optimization" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">
              Optimization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-[#091020] border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-400">
                        ${totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+12.5% vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#091020] border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Conversion Rate</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {avgConversionRate.toFixed(1)}%
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+2.1% vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#091020] border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Affiliate Clicks</p>
                      <p className="text-2xl font-bold text-purple-400">
                        {totalClicks.toLocaleString()}
                      </p>
                    </div>
                    <MousePointer className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+8.3% vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#091020] border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Page Views</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {totalViews.toLocaleString()}
                      </p>
                    </div>
                    <Eye className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+15.7% vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((content, index) => (
                    <div key={content.id} className="flex items-center justify-between p-4 bg-[#131a2a] rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-[#5B9BD5] font-bold text-lg">#{index + 1}</div>
                        <div>
                          <h4 className="text-white font-medium">{content.content_id}</h4>
                          <p className="text-gray-400 text-sm">{content.product_category} • {content.affiliate_partner}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">${content.conversion_metrics.revenue_generated}</p>
                        <p className="text-gray-400 text-sm">{content.conversion_metrics.conversion_rate}% conversion</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPerformance.map((category) => (
                    <div key={category.category} className="p-4 bg-[#131a2a] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium capitalize">{category.category.replace('-', ' ')}</h4>
                        <span className="text-green-400 font-bold">${category.revenue.toFixed(0)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Clicks</p>
                          <p className="text-white">{category.clicks}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Avg Conversion</p>
                          <p className="text-white">{category.averageConversion.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Content Pieces</p>
                          <p className="text-white">{category.count}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Content Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.slice(0, 10).map((content) => (
                    <div key={content.id} className="p-4 bg-[#131a2a] rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-white font-medium">{content.content_id}</h4>
                          <p className="text-gray-400 text-sm">{content.page_url}</p>
                        </div>
                        <div className="text-right">
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            content.optimization_score >= 80 ? 'bg-green-900 text-green-300' :
                            content.optimization_score >= 60 ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            Score: {content.optimization_score}/100
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Revenue</p>
                          <p className="text-green-400">${content.conversion_metrics.revenue_generated}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Conversion Rate</p>
                          <p className="text-blue-400">{content.conversion_metrics.conversion_rate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Trend</p>
                          <div className="flex items-center">
                            {content.performance_trend === 'improving' ? (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            ) : content.performance_trend === 'declining' ? (
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            ) : (
                              <div className="w-4 h-4 bg-gray-400 rounded-full" />
                            )}
                            <span className="ml-1 capitalize">{content.performance_trend}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization">
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analytics
                    .filter(content => content.recommendations && content.recommendations.length > 0)
                    .slice(0, 5)
                    .map((content) => (
                      <div key={content.id} className="p-4 bg-[#131a2a] rounded-lg">
                        <h4 className="text-white font-medium mb-2">{content.content_id}</h4>
                        <div className="space-y-2">
                          {content.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-[#5B9BD5] rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-300 text-sm">{rec}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <Button 
                            size="sm" 
                            className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                          >
                            Apply Recommendations
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentAnalyticsDashboard;