import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import RevenueIntelligenceEngine from '@/components/revenue/RevenueIntelligenceEngine';
import CompetitiveIntelligence from '@/components/market/CompetitiveIntelligence';
import EnterpriseAnalytics from '@/components/enterprise/EnterpriseAnalytics';
import CustomerJourneyOptimizer from '@/components/retention/CustomerJourneyOptimizer';
import MarketingAutomationPlatform from '@/components/automation/MarketingAutomationPlatform';
import AIPersonalRVAssistant from '@/components/ai/AIPersonalRVAssistant';
import AugmentedRealityFeatures from '@/components/ar/AugmentedRealityFeatures';
import PerformanceIntelligence from '@/components/analytics/PerformanceIntelligence';
import SocialCommerceHub from '@/components/social/SocialCommerceHub';
import AdvancedAnalyticsDashboard from '@/components/analytics/AdvancedAnalyticsDashboard';
import EnterpriseIntegrationHub from '@/components/enterprise/EnterpriseIntegrationHub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Shield, BarChart3, Route, Zap, Bot, Scan, Gauge, Users, Database, Code } from 'lucide-react';

const EnterpriseIntelligence = () => {
  return (
    <Layout>
      <Navbar />
      <main className="relative w-full flex-grow bg-gradient-to-b from-[#080F1F] to-[#151A22] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Enterprise Revenue Intelligence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI-powered revenue optimization, competitive intelligence, and customer journey analytics 
              for enterprise-scale growth and market expansion.
            </p>
          </div>

          <Tabs defaultValue="revenue" className="space-y-8">
            <TabsList className="grid w-full grid-cols-11 bg-[#091020] border border-gray-700">
              <TabsTrigger 
                value="revenue" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Brain className="h-4 w-4" />
                Revenue AI
              </TabsTrigger>
              <TabsTrigger 
                value="competitive" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Shield className="h-4 w-4" />
                Competitive
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="journey" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Route className="h-4 w-4" />
                Journey
              </TabsTrigger>
              <TabsTrigger 
                value="automation" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Zap className="h-4 w-4" />
                Automation
              </TabsTrigger>
              <TabsTrigger 
                value="ai-assistant" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Bot className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger 
                value="ar-features" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Scan className="h-4 w-4" />
                AR Features
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Gauge className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Users className="h-4 w-4" />
                Social
              </TabsTrigger>
              <TabsTrigger 
                value="advanced-analytics" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Database className="h-4 w-4" />
                Advanced Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="integrations" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Code className="h-4 w-4" />
                Integrations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="revenue">
              <RevenueIntelligenceEngine />
            </TabsContent>

            <TabsContent value="competitive">
              <CompetitiveIntelligence />
            </TabsContent>

            <TabsContent value="analytics">
              <EnterpriseAnalytics />
            </TabsContent>

            <TabsContent value="journey">
              <CustomerJourneyOptimizer />
            </TabsContent>

            <TabsContent value="automation">
              <MarketingAutomationPlatform />
            </TabsContent>

            <TabsContent value="ai-assistant">
              <AIPersonalRVAssistant />
            </TabsContent>

            <TabsContent value="ar-features">
              <AugmentedRealityFeatures />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceIntelligence />
            </TabsContent>

            <TabsContent value="social">
              <SocialCommerceHub />
            </TabsContent>

            <TabsContent value="advanced-analytics">
              <AdvancedAnalyticsDashboard />
            </TabsContent>

            <TabsContent value="integrations">
              <EnterpriseIntegrationHub />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Layout>
  );
};

export default EnterpriseIntelligence;