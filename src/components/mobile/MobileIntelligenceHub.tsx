import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Target, 
  TrendingUp, 
  Users,
  Clock,
  BarChart3,
  Eye,
  MousePointer,
  Zap,
  AlertCircle,
  CheckCircle,
  Download
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface DeviceMetrics {
  device: string;
  users: number;
  revenue: number;
  conversionRate: number;
  bounceRate: number;
  sessionDuration: number;
  pageViews: number;
}

interface MobileOptimization {
  id: string;
  category: string;
  issue: string;
  impact: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  recommendation: string;
  estimatedLift: number;
  effort: 'low' | 'medium' | 'high';
}

interface UserJourney {
  step: string;
  mobile: number;
  tablet: number;
  desktop: number;
  dropoffRate: number;
}

const MobileIntelligenceHub = () => {
  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetrics[]>([
    { device: 'Mobile', users: 45680, revenue: 1234500, conversionRate: 2.8, bounceRate: 67.2, sessionDuration: 145, pageViews: 3.2 },
    { device: 'Tablet', users: 12340, revenue: 456700, conversionRate: 3.4, bounceRate: 58.1, sessionDuration: 210, pageViews: 4.1 },
    { device: 'Desktop', users: 23890, revenue: 987650, conversionRate: 4.2, bounceRate: 45.3, sessionDuration: 285, pageViews: 5.8 }
  ]);

  const [optimizations, setOptimizations] = useState<MobileOptimization[]>([
    {
      id: '1',
      category: 'Page Speed',
      issue: 'Slow loading product images',
      impact: 'high',
      status: 'pending',
      recommendation: 'Implement WebP format and lazy loading',
      estimatedLift: 15.2,
      effort: 'medium'
    },
    {
      id: '2',
      category: 'UX Design',
      issue: 'Small tap targets on mobile',
      impact: 'medium',
      status: 'in_progress',
      recommendation: 'Increase button sizes to 44px minimum',
      estimatedLift: 8.7,
      effort: 'low'
    },
    {
      id: '3',
      category: 'Form Optimization',
      issue: 'Complex checkout process',
      impact: 'high',
      status: 'completed',
      recommendation: 'Implement one-click checkout',
      estimatedLift: 22.1,
      effort: 'high'
    },
    {
      id: '4',
      category: 'Navigation',
      issue: 'Hidden menu items',
      impact: 'medium',
      status: 'pending',
      recommendation: 'Implement bottom navigation bar',
      estimatedLift: 11.3,
      effort: 'medium'
    }
  ]);

  const [userJourney, setUserJourney] = useState<UserJourney[]>([
    { step: 'Landing', mobile: 100, tablet: 100, desktop: 100, dropoffRate: 12.5 },
    { step: 'Product View', mobile: 87.5, tablet: 89.2, desktop: 92.1, dropoffRate: 23.4 },
    { step: 'Add to Cart', mobile: 67.0, tablet: 73.8, desktop: 78.9, dropoffRate: 45.2 },
    { step: 'Checkout', mobile: 36.7, tablet: 42.5, desktop: 48.3, dropoffRate: 15.8 },
    { step: 'Purchase', mobile: 31.0, tablet: 35.8, desktop: 40.7, dropoffRate: 0 }
  ]);

  const [selectedDevice, setSelectedDevice] = useState('all');
  const [mobileMetrics, setMobileMetrics] = useState({
    totalMobileUsers: 45680,
    mobileRevenue: 1234500,
    avgMobileConversion: 2.8,
    mobilePageSpeed: 3.2,
    mobileUsability: 89.5,
    appInstalls: 12450
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in_progress': return 'bg-blue-600';
      case 'pending': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const COLORS = ['#5B9BD5', '#4B8FE3', '#60A5FA', '#3B82F6'];

  return (
    <div className="space-y-6">
      {/* Mobile Intelligence Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Smartphone className="h-6 w-6 text-[#5B9BD5]" />
            Mobile Intelligence & Optimization Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="text-center">
              <Smartphone className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{mobileMetrics.totalMobileUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Mobile Users</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${(mobileMetrics.mobileRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-400">Mobile Revenue</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{mobileMetrics.avgMobileConversion}%</p>
              <p className="text-sm text-gray-400">Conversion Rate</p>
            </div>
            
            <div className="text-center">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{mobileMetrics.mobilePageSpeed}s</p>
              <p className="text-sm text-gray-400">Page Speed</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{mobileMetrics.mobileUsability}%</p>
              <p className="text-sm text-gray-400">Usability Score</p>
            </div>
            
            <div className="text-center">
              <Download className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{mobileMetrics.appInstalls.toLocaleString()}</p>
              <p className="text-sm text-gray-400">App Installs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#091020] border border-gray-700">
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Device Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="optimization" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Optimization
          </TabsTrigger>
          <TabsTrigger 
            value="journey" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            User Journey
          </TabsTrigger>
          <TabsTrigger 
            value="insights" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Mobile Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Cross-Device Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deviceMetrics.map((device, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      {device.device === 'Mobile' && <Smartphone className="h-6 w-6 text-[#5B9BD5]" />}
                      {device.device === 'Tablet' && <Tablet className="h-6 w-6 text-green-400" />}
                      {device.device === 'Desktop' && <Monitor className="h-6 w-6 text-purple-400" />}
                      <h4 className="text-white font-medium">{device.device}</h4>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Users:</span>
                        <span className="text-white font-medium">{device.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="text-white font-medium">${(device.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conversion:</span>
                        <span className="text-white font-medium">{device.conversionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bounce Rate:</span>
                        <span className="text-white font-medium">{device.bounceRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Session:</span>
                        <span className="text-white font-medium">{device.sessionDuration}s</span>
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
              <CardTitle className="text-white">Mobile Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizations.map((opt) => (
                  <div key={opt.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={`${getImpactColor(opt.impact)} text-white`}>
                          {opt.impact} impact
                        </Badge>
                        <h4 className="text-white font-medium">{opt.category}</h4>
                        <Badge className={`${getStatusColor(opt.status)} text-white`}>
                          {opt.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">+{opt.estimatedLift}%</p>
                        <p className="text-xs text-gray-400">Est. Lift</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-white font-medium mb-1">Issue:</p>
                      <p className="text-gray-300 text-sm">{opt.issue}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-white font-medium mb-1">Recommendation:</p>
                      <p className="text-gray-300 text-sm">{opt.recommendation}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {opt.effort} effort
                      </Badge>
                      <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                        {opt.status === 'pending' ? 'Start Optimization' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Cross-Device User Journey Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userJourney}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="step" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="mobile" stroke="#5B9BD5" strokeWidth={2} name="Mobile" />
                    <Line type="monotone" dataKey="tablet" stroke="#10B981" strokeWidth={2} name="Tablet" />
                    <Line type="monotone" dataKey="desktop" stroke="#8B5CF6" strokeWidth={2} name="Desktop" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {userJourney.map((step, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <h4 className="text-white font-medium mb-3">{step.step}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mobile:</span>
                        <span className="text-white">{step.mobile}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tablet:</span>
                        <span className="text-white">{step.tablet}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Desktop:</span>
                        <span className="text-white">{step.desktop}%</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-600 pt-2">
                        <span className="text-gray-400">Drop-off:</span>
                        <span className={`${step.dropoffRate > 20 ? 'text-red-400' : 'text-green-400'}`}>
                          {step.dropoffRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI-Powered Mobile Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Mobile-First Revenue Opportunity",
                    insight: "Optimizing mobile checkout could increase revenue by $245K annually",
                    action: "Implement one-tap payment options",
                    priority: "High",
                    confidence: 92
                  },
                  {
                    title: "Cross-Device Attribution Gap",
                    insight: "32% of mobile users complete purchases on desktop within 48 hours",
                    action: "Enhance cross-device tracking and retargeting",
                    priority: "Medium",
                    confidence: 87
                  },
                  {
                    title: "Page Speed Impact",
                    insight: "1-second improvement in mobile load time = 8% conversion increase",
                    action: "Optimize images and implement CDN",
                    priority: "High",
                    confidence: 95
                  },
                  {
                    title: "App Installation Opportunity",
                    insight: "App users show 3.2x higher lifetime value than mobile web",
                    action: "Implement smart app install prompts",
                    priority: "Medium",
                    confidence: 78
                  }
                ].map((insight, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{insight.title}</h4>
                      <Badge className={`${insight.priority === 'High' ? 'bg-red-600' : 'bg-yellow-600'} text-white`}>
                        {insight.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{insight.insight}</p>
                    
                    <div className="mb-3">
                      <p className="text-white text-sm font-medium">Recommended Action:</p>
                      <p className="text-gray-300 text-sm">{insight.action}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Confidence: {insight.confidence}%</span>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                        View Details
                      </Button>
                    </div>
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

export default MobileIntelligenceHub;