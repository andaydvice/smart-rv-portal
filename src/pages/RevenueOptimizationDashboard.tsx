import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RevenueOptimizationEngine } from '@/components/revenue/RevenueOptimizationEngine';
import { ABTestingFramework } from '@/components/revenue/ABTestingFramework';
import { SmartRecommendationEngine } from '@/components/revenue/SmartRecommendationEngine';
import { LeadGenerationOptimizer } from '@/components/revenue/LeadGenerationOptimizer';
import { scrollToTop } from '@/utils/scrollToTop';

const RevenueOptimizationDashboard = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Helmet>
        <title>Revenue Optimization Dashboard | Smart RV Hub</title>
        <meta name="description" content="Advanced revenue optimization, A/B testing, and affiliate intelligence dashboard" />
      </Helmet>
      
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-connectivity-darkBg via-[#0A1121] to-[#080F1F]">
          <Container className="py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Revenue Optimization Dashboard
              </h1>
              <p className="text-lg text-connectivity-lightText max-w-3xl mx-auto">
                Advanced affiliate intelligence, A/B testing, and conversion optimization to maximize revenue performance.
              </p>
            </div>

            <Tabs defaultValue="optimization" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-connectivity-darkBg border border-gray-700">
                <TabsTrigger 
                  value="optimization" 
                  className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
                >
                  Revenue Engine
                </TabsTrigger>
                <TabsTrigger 
                  value="testing" 
                  className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
                >
                  A/B Testing
                </TabsTrigger>
                <TabsTrigger 
                  value="recommendations" 
                  className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
                >
                  Smart Recommendations
                </TabsTrigger>
                <TabsTrigger 
                  value="leads" 
                  className="data-[state=active]:bg-connectivity-accent data-[state=active]:text-white"
                >
                  Lead Generation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="optimization">
                <RevenueOptimizationEngine />
              </TabsContent>

              <TabsContent value="testing">
                <ABTestingFramework />
              </TabsContent>

              <TabsContent value="recommendations">
                <SmartRecommendationEngine />
              </TabsContent>

              <TabsContent value="leads">
                <LeadGenerationOptimizer />
              </TabsContent>
            </Tabs>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default RevenueOptimizationDashboard;