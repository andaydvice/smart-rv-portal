import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import AdvancedAnalytics from '@/components/mobile/AdvancedAnalytics';
import PersonalizationEngine from '@/components/mobile/PersonalizationEngine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Users, Target, TrendingUp } from 'lucide-react';
import { scrollToTop } from '@/utils/scrollToTop';

const MobileAnalyticsDashboard = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Mobile Analytics Dashboard - Smart RV Technology</title>
        <meta name="description" content="Advanced mobile analytics and conversion optimization dashboard for RV affiliate revenue tracking." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Container className="py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="h-8 w-8 text-[#5B9BD5]" />
              <h1 className="text-4xl font-bold text-white">Mobile Analytics Hub</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl">
              Comprehensive mobile-first analytics, A/B testing results, and conversion optimization insights for maximizing RV affiliate revenue.
            </p>
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-[#1a202c]">
              <TabsTrigger value="analytics" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="ab-testing" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">
                A/B Testing
              </TabsTrigger>
              <TabsTrigger value="personalization" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">
                Personalization
              </TabsTrigger>
              <TabsTrigger value="conversion" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">
                Conversion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics">
              <AdvancedAnalytics />
            </TabsContent>

            <TabsContent value="ab-testing">
              <ABTestingResults />
            </TabsContent>

            <TabsContent value="personalization">
              <PersonalizationEngine />
            </TabsContent>

            <TabsContent value="conversion">
              <ConversionOptimization />
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </Layout>
  );
};

const ABTestingResults = () => {
  const testResults = [
    {
      testName: 'Affiliate CTA Button Colors',
      status: 'Running',
      variants: [
        { name: 'Original Blue', conversions: 3.2, traffic: 40 },
        { name: 'Urgent Red', conversions: 4.1, traffic: 30 },
        { name: 'Success Green', conversions: 3.8, traffic: 30 }
      ],
      winner: 'Urgent Red (+28.1% improvement)',
      confidence: 95.3
    },
    {
      testName: 'Product Card Layout',
      status: 'Completed',
      variants: [
        { name: 'Standard Layout', conversions: 2.8, traffic: 50 },
        { name: 'Minimal Layout', conversions: 3.4, traffic: 50 }
      ],
      winner: 'Minimal Layout (+21.4% improvement)',
      confidence: 98.7
    },
    {
      testName: 'Mobile Navigation Enhancement',
      status: 'Running',
      variants: [
        { name: 'Standard Nav', conversions: 2.9, traffic: 50 },
        { name: 'Enhanced Nav', conversions: 3.3, traffic: 50 }
      ],
      winner: 'Enhanced Nav (+13.8% improvement)',
      confidence: 87.2
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-6 w-6 text-[#5B9BD5]" />
            A/B Testing Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {testResults.map((test, index) => (
              <div key={index} className="p-4 bg-[#131a2a] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">{test.testName}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    test.status === 'Running' 
                      ? 'bg-yellow-900 text-yellow-300' 
                      : 'bg-green-900 text-green-300'
                  }`}>
                    {test.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {test.variants.map((variant, vIndex) => (
                    <div key={vIndex} className="p-3 bg-[#1a202c] rounded border border-gray-600">
                      <h4 className="text-white font-medium mb-2">{variant.name}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Conversion Rate</span>
                          <span className="text-[#5B9BD5] font-bold">{variant.conversions}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Traffic Split</span>
                          <span className="text-gray-300">{variant.traffic}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-gradient-to-r from-green-900/20 to-green-800/20 rounded border border-green-800/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-green-400 font-medium">🏆 {test.winner}</div>
                      <div className="text-gray-400 text-sm">Confidence: {test.confidence}%</div>
                    </div>
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 rounded-lg border border-[#5B9BD5]/20">
            <h4 className="text-white font-medium mb-2">🚀 Testing Impact</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">+23.8%</div>
                <div className="text-gray-400 text-sm">Revenue Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">+18.2%</div>
                <div className="text-gray-400 text-sm">Conversion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">+31.5%</div>
                <div className="text-gray-400 text-sm">Mobile Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">+15.7%</div>
                <div className="text-gray-400 text-sm">User Retention</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ConversionOptimization = () => (
  <div className="space-y-6">
    <Card className="bg-[#091020] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-[#5B9BD5]" />
          Mobile Conversion Optimization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conversion Funnel Optimization */}
          <div className="p-4 bg-[#131a2a] rounded-lg">
            <h3 className="text-white font-semibold mb-4">Funnel Optimization</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Page Load Speed</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <span className="text-green-400 text-sm">92%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Mobile UX Score</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '88%' }} />
                  </div>
                  <span className="text-blue-400 text-sm">88%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">CTA Visibility</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                  <span className="text-yellow-400 text-sm">95%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Impact */}
          <div className="p-4 bg-[#131a2a] rounded-lg">
            <h3 className="text-white font-semibold mb-4">Revenue Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Monthly Revenue</span>
                <span className="text-green-400 font-bold">$18,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Growth Rate</span>
                <span className="text-blue-400 font-bold">+23.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Mobile Share</span>
                <span className="text-purple-400 font-bold">68.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Avg Order Value</span>
                <span className="text-yellow-400 font-bold">$127.35</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="mt-6 p-4 bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 rounded-lg border border-[#5B9BD5]/20">
          <h4 className="text-white font-medium mb-3">🎯 Next Optimization Opportunities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Implement exit-intent popups (+8% conversion)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Add social proof badges (+12% trust)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Optimize for voice search (+15% organic)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Implement progressive checkout (+6% completion)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Add urgency indicators (+9% immediate action)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Enhanced recommendation engine (+18% upsell)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default MobileAnalyticsDashboard;