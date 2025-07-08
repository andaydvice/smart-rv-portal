import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Users, 
  DollarSign, 
  Target,
  FileText,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface AnalyticsMetric {
  name: string;
  value: number;
  change: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

interface CustomReport {
  id: string;
  name: string;
  type: 'revenue' | 'traffic' | 'conversion' | 'customer';
  schedule: 'daily' | 'weekly' | 'monthly';
  lastGenerated: string;
  recipients: number;
  status: 'active' | 'paused';
}

interface IntegrationStatus {
  name: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
  dataPoints: number;
  health: number;
}

const EnterpriseAnalytics = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([
    {
      name: 'Total Revenue',
      value: 284750,
      change: 23.4,
      target: 300000,
      unit: '$',
      trend: 'up'
    },
    {
      name: 'Customer Acquisition Cost',
      value: 45,
      change: -12.8,
      target: 40,
      unit: '$',
      trend: 'down'
    },
    {
      name: 'Customer Lifetime Value',
      value: 1875,
      change: 18.2,
      target: 2000,
      unit: '$',
      trend: 'up'
    },
    {
      name: 'Monthly Active Users',
      value: 18420,
      change: 31.5,
      target: 20000,
      unit: '',
      trend: 'up'
    },
    {
      name: 'Conversion Rate',
      value: 4.8,
      change: 0.8,
      target: 5.5,
      unit: '%',
      trend: 'up'
    },
    {
      name: 'Churn Rate',
      value: 3.2,
      change: -0.9,
      target: 2.5,
      unit: '%',
      trend: 'down'
    }
  ]);

  const [customReports, setCustomReports] = useState<CustomReport[]>([
    {
      id: '1',
      name: 'Executive Revenue Summary',
      type: 'revenue',
      schedule: 'weekly',
      lastGenerated: '2 days ago',
      recipients: 5,
      status: 'active'
    },
    {
      id: '2',
      name: 'Affiliate Performance Report',
      type: 'revenue',
      schedule: 'monthly',
      lastGenerated: '5 days ago',
      recipients: 12,
      status: 'active'
    },
    {
      id: '3',
      name: 'Customer Journey Analytics',
      type: 'customer',
      schedule: 'weekly',
      lastGenerated: '1 day ago',
      recipients: 8,
      status: 'active'
    },
    {
      id: '4',
      name: 'Traffic Source Analysis',
      type: 'traffic',
      schedule: 'daily',
      lastGenerated: '6 hours ago',
      recipients: 15,
      status: 'paused'
    }
  ]);

  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    {
      name: 'Google Analytics 4',
      status: 'connected',
      lastSync: '5 minutes ago',
      dataPoints: 24580,
      health: 98
    },
    {
      name: 'Facebook Ads',
      status: 'connected',
      lastSync: '12 minutes ago',
      dataPoints: 15420,
      health: 94
    },
    {
      name: 'HubSpot CRM',
      status: 'syncing',
      lastSync: '2 hours ago',
      dataPoints: 8930,
      health: 89
    },
    {
      name: 'Salesforce',
      status: 'disconnected',
      lastSync: '3 days ago',
      dataPoints: 0,
      health: 0
    },
    {
      name: 'QuickBooks',
      status: 'connected',
      lastSync: '1 hour ago',
      dataPoints: 3420,
      health: 96
    },
    {
      name: 'Stripe',
      status: 'connected',
      lastSync: '3 minutes ago',
      dataPoints: 12100,
      health: 100
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-600 text-white';
      case 'syncing': return 'bg-yellow-600 text-white';
      case 'disconnected': return 'bg-red-600 text-white';
      case 'active': return 'bg-green-600 text-white';
      case 'paused': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'revenue': return 'border-green-600 text-green-400';
      case 'traffic': return 'border-blue-600 text-blue-400';
      case 'conversion': return 'border-purple-600 text-purple-400';
      case 'customer': return 'border-yellow-600 text-yellow-400';
      default: return 'border-gray-600 text-gray-400';
    }
  };

  const generateReport = (reportId: string) => {
    setCustomReports(prev => 
      prev.map(report => 
        report.id === reportId 
          ? { ...report, lastGenerated: 'Just now' }
          : report
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Enterprise Analytics Header */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <BarChart3 className="h-6 w-6 text-[#5B9BD5]" />
            Enterprise Analytics Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <FileText className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{customReports.length}</p>
              <p className="text-sm text-gray-400">Custom Reports</p>
            </div>
            
            <div className="text-center">
              <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{integrations.filter(i => i.status === 'connected').length}</p>
              <p className="text-sm text-gray-400">Active Integrations</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">94.8%</p>
              <p className="text-sm text-gray-400">Data Accuracy</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">Real-time</p>
              <p className="text-sm text-gray-400">Data Processing</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#091020] border border-gray-700">
          <TabsTrigger 
            value="metrics" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Key Metrics
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Custom Reports
          </TabsTrigger>
          <TabsTrigger 
            value="integrations" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="insights" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-[#091020] border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium">{metric.name}</h4>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    ) : metric.trend === 'down' ? (
                      <TrendingUp className="h-5 w-5 text-red-400 rotate-180" />
                    ) : (
                      <div className="h-5 w-5 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">
                      {metric.unit}{metric.value.toLocaleString()}{metric.unit === '%' ? '' : ''}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        metric.change > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                      <span className="text-sm text-gray-400">vs last period</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Target</span>
                        <span className="text-white">{metric.unit}{metric.target.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(metric.value / metric.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Custom Reports</CardTitle>
                <Button className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                  Create New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customReports.map((report) => (
                  <div key={report.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-white font-medium">{report.name}</h4>
                        <Badge variant="outline" className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generateReport(report.id)}
                          className="border-[#5B9BD5] text-[#5B9BD5]"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Schedule:</span>
                        <span className="text-white ml-2 capitalize">{report.schedule}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Generated:</span>
                        <span className="text-white ml-2">{report.lastGenerated}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Recipients:</span>
                        <span className="text-white ml-2">{report.recipients} users</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">System Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{integration.name}</h4>
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Health Score</span>
                        <span className="text-white font-medium">{integration.health}%</span>
                      </div>
                      <Progress value={integration.health} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Data Points</span>
                        <span className="text-white">{integration.dataPoints.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Last Sync</span>
                        <span className="text-[#5B9BD5]">{integration.lastSync}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI-Generated Business Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-lg border border-green-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <h4 className="text-green-400 font-medium">Revenue Opportunity</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Your mobile traffic has increased 45% but mobile conversion rate is 23% lower than desktop. 
                    Implementing progressive web app features could increase revenue by $18,400/month.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 rounded-lg border border-yellow-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-yellow-400 font-medium">Customer Retention Alert</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Customer churn increased 12% among users who don't engage with email campaigns. 
                    Consider personalized email automation to reduce churn by an estimated 8%.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-lg border border-blue-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    <h4 className="text-blue-400 font-medium">Market Expansion</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Canadian traffic has grown 67% with minimal marketing investment. 
                    Localizing content for Canadian market could capture $24,000+ additional monthly revenue.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-lg border border-purple-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    <h4 className="text-purple-400 font-medium">Customer Segmentation</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Premium RV owners (Class A) have 3.2x higher lifetime value but represent only 18% of your audience. 
                    Targeting this segment could increase average order value by 45%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseAnalytics;