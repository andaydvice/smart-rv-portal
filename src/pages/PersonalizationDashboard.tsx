import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalizationEngine } from '@/components/personalization/PersonalizationEngine';
import { DynamicContentEngine } from '@/components/personalization/DynamicContentEngine';
import { RealtimeRecommendationEngine } from '@/components/personalization/RealtimeRecommendationEngine';
import BehavioralAnalytics from '@/components/analytics/BehavioralAnalytics';
import { Brain, Zap, Target, TrendingUp } from 'lucide-react';
import { scrollToTop } from '@/utils/scrollToTop';

const PersonalizationDashboard = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Personalization Dashboard | Smart RV Hub</title>
        <meta name="description" content="Advanced AI-powered personalization and dynamic content optimization dashboard" />
      </Helmet>
      
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-connectivity-darkBg via-[#0A1121] to-[#080F1F]">
          <Container className="py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                AI Personalization Dashboard
              </h1>
              <p className="text-lg text-connectivity-lightText max-w-3xl mx-auto">
                Advanced machine learning algorithms deliver dynamic, personalized experiences that adapt in real-time to user behavior and preferences.
              </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-connectivity-darkBg border-gray-700">
                <CardContent className="p-6 text-center">
                  <Brain className="h-10 w-10 text-connectivity-accent mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">AI Engine</h3>
                  <p className="text-sm text-connectivity-lightText">
                    Machine learning powered personalization
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-connectivity-darkBg border-gray-700">
                <CardContent className="p-6 text-center">
                  <Zap className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Real-time</h3>
                  <p className="text-sm text-connectivity-lightText">
                    Dynamic content optimization
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-connectivity-darkBg border-gray-700">
                <CardContent className="p-6 text-center">
                  <Target className="h-10 w-10 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Targeted</h3>
                  <p className="text-sm text-connectivity-lightText">
                    Precision audience segmentation
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-connectivity-darkBg border-gray-700">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Optimized</h3>
                  <p className="text-sm text-connectivity-lightText">
                    Continuous performance improvement
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard */}
            <Tabs defaultValue="engine" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-connectivity-darkBg border border-gray-700">
                <TabsTrigger 
                  value="engine" 
                  className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
                >
                  Personalization Engine
                </TabsTrigger>
                <TabsTrigger 
                  value="content" 
                  className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
                >
                  Dynamic Content
                </TabsTrigger>
                <TabsTrigger 
                  value="recommendations" 
                  className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
                >
                  Real-time Recommendations
                </TabsTrigger>
                <TabsTrigger 
                  value="behavioral" 
                  className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
                >
                  Behavioral Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="engine">
                <PersonalizationEngine />
              </TabsContent>

              <TabsContent value="content">
                <DynamicContentEngine />
              </TabsContent>

              <TabsContent value="recommendations">
                <RealtimeRecommendationEngine />
              </TabsContent>

              <TabsContent value="behavioral">
                <BehavioralAnalytics />
              </TabsContent>
            </Tabs>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default PersonalizationDashboard;