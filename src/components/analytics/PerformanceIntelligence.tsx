import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  TrendingUp, 
  Zap, 
  Target, 
  Clock, 
  Users, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Gauge
} from 'lucide-react';

interface CoreWebVital {
  metric: string;
  value: number;
  threshold: number;
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
}

interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'paused';
  variants: string[];
  conversions: { [key: string]: number };
  confidence: number;
  winner?: string;
}

interface ConversionFunnel {
  stage: string;
  visitors: number;
  conversions: number;
  rate: number;
}

const PerformanceIntelligence = () => {
  const [coreWebVitals, setCoreWebVitals] = useState<CoreWebVital[]>([
    {
      metric: 'Largest Contentful Paint (LCP)',
      value: 2.1,
      threshold: 2.5,
      status: 'good',
      description: 'Time for largest content element to load'
    },
    {
      metric: 'First Input Delay (FID)',
      value: 85,
      threshold: 100,
      status: 'good',
      description: 'Time from first user interaction to browser response'
    },
    {
      metric: 'Cumulative Layout Shift (CLS)',
      value: 0.08,
      threshold: 0.1,
      status: 'good',
      description: 'Visual stability of page elements'
    },
    {
      metric: 'Interaction to Next Paint (INP)',
      value: 180,
      threshold: 200,
      status: 'good',
      description: 'Responsiveness to user interactions'
    }
  ]);

  const [abTests, setAbTests] = useState<ABTest[]>([
    {
      id: '1',
      name: 'Product Card Design A/B Test',
      status: 'running',
      variants: ['Original', 'Enhanced'],
      conversions: { 'Original': 3.2, 'Enhanced': 4.1 },
      confidence: 87.5
    },
    {
      id: '2',
      name: 'CTA Button Color Test',
      status: 'completed',
      variants: ['Blue', 'Orange', 'Green'],
      conversions: { 'Blue': 2.8, 'Orange': 4.5, 'Green': 3.1 },
      confidence: 95.2,
      winner: 'Orange'
    },
    {
      id: '3',
      name: 'Newsletter Signup Form',
      status: 'running',
      variants: ['Popup', 'Inline', 'Sidebar'],
      conversions: { 'Popup': 1.9, 'Inline': 2.3, 'Sidebar': 1.6 },
      confidence: 72.1
    }
  ]);

  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnel[]>([
    { stage: 'Homepage Visit', visitors: 12450, conversions: 12450, rate: 100 },
    { stage: 'Product View', visitors: 8920, conversions: 8920, rate: 71.6 },
    { stage: 'Add to Cart', visitors: 3240, conversions: 3240, rate: 36.3 },
    { stage: 'Checkout Started', visitors: 1890, conversions: 1890, rate: 58.3 },
    { stage: 'Purchase Complete', visitors: 1240, conversions: 1240, rate: 65.6 }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    pageLoadTime: 1.8,
    bounceRate: 23.4,
    avgSessionDuration: 4.2,
    pagesPerSession: 3.1,
    conversionRate: 9.9,
    revenuePerVisitor: 18.45
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'needs-improvement': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'poor': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'border-green-600 text-green-400';
      case 'needs-improvement': return 'border-yellow-600 text-yellow-400';
      case 'poor': return 'border-red-600 text-red-400';
      default: return 'border-gray-600 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Gauge className="h-6 w-6 text-[#5B9BD5]" />
            Performance Intelligence Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{performanceMetrics.pageLoadTime}s</p>
              <p className="text-sm text-gray-400">Page Load Time</p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{performanceMetrics.bounceRate}%</p>
              <p className="text-sm text-gray-400">Bounce Rate</p>
            </div>
            
            <div className="text-center">
              <Activity className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{performanceMetrics.avgSessionDuration}m</p>
              <p className="text-sm text-gray-400">Avg Session</p>
            </div>
            
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{performanceMetrics.pagesPerSession}</p>
              <p className="text-sm text-gray-400">Pages/Session</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{performanceMetrics.conversionRate}%</p>
              <p className="text-sm text-gray-400">Conversion Rate</p>
            </div>
            
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${performanceMetrics.revenuePerVisitor}</p>
              <p className="text-sm text-gray-400">Revenue/Visitor</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vitals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#091020] border border-gray-700">
          <TabsTrigger 
            value="vitals" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Core Web Vitals
          </TabsTrigger>
          <TabsTrigger 
            value="abtests" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            A/B Tests
          </TabsTrigger>
          <TabsTrigger 
            value="funnel" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Conversion Funnel
          </TabsTrigger>
          <TabsTrigger 
            value="optimization" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vitals">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Core Web Vitals Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {coreWebVitals.map((vital, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(vital.status)}
                        <h4 className="text-white font-medium">{vital.metric}</h4>
                        <Badge variant="outline" className={getStatusColor(vital.status)}>
                          {vital.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{vital.value}{vital.metric.includes('LCP') ? 's' : vital.metric.includes('FID') || vital.metric.includes('INP') ? 'ms' : ''}</p>
                        <p className="text-sm text-gray-400">Threshold: {vital.threshold}{vital.metric.includes('LCP') ? 's' : vital.metric.includes('FID') || vital.metric.includes('INP') ? 'ms' : ''}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{vital.description}</p>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${vital.status === 'good' ? 'bg-green-400' : vital.status === 'needs-improvement' ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.min((vital.value / vital.threshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abtests">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">A/B Testing Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {abTests.map((test) => (
                  <div key={test.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-white font-medium">{test.name}</h4>
                        <Badge className={`${test.status === 'running' ? 'bg-green-600' : test.status === 'completed' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}>
                          {test.status}
                        </Badge>
                        {test.winner && (
                          <Badge className="bg-yellow-600 text-white">
                            Winner: {test.winner}
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{test.confidence}%</p>
                        <p className="text-sm text-gray-400">Confidence</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {test.variants.map((variant) => (
                        <div key={variant} className="p-3 bg-[#091020] rounded border border-gray-600">
                          <h5 className="text-white font-medium mb-2">{variant}</h5>
                          <p className="text-2xl font-bold text-[#5B9BD5]">{test.conversions[variant]}%</p>
                          <p className="text-sm text-gray-400">Conversion Rate</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Conversion Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((stage, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{stage.stage}</h4>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">{stage.rate}%</p>
                        <p className="text-sm text-gray-400">{stage.visitors.toLocaleString()} visitors</p>
                      </div>
                    </div>
                    
                    <Progress value={stage.rate} className="h-3" />
                    
                    {index < conversionFunnel.length - 1 && (
                      <div className="mt-2 text-sm text-gray-400">
                        Drop-off: {Math.round(((conversionFunnel[index].visitors - conversionFunnel[index + 1].visitors) / conversionFunnel[index].visitors) * 100)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-white font-medium">Image Optimization</h4>
                    <Badge className="bg-yellow-600 text-white">High Impact</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Convert images to WebP format and implement lazy loading to improve LCP by ~15%
                  </p>
                  <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                    Implement
                  </Button>
                </div>
                
                <div className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <h4 className="text-white font-medium">Code Splitting</h4>
                    <Badge className="bg-green-600 text-white">Medium Impact</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Implement route-based code splitting to reduce initial bundle size by ~25%
                  </p>
                  <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                    Implement
                  </Button>
                </div>
                
                <div className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-5 w-5 text-purple-400" />
                    <h4 className="text-white font-medium">CTA Button Optimization</h4>
                    <Badge className="bg-orange-600 text-white">Quick Win</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Based on A/B test results, implement orange CTA buttons site-wide for +28% conversion
                  </p>
                  <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                    Apply Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceIntelligence;