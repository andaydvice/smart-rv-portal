import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEOSuite from '@/components/seo/SEOSuite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Activity, FileText, Users, TrendingUp } from 'lucide-react';

const SEODashboard = () => {
  const [selectedPage, setSelectedPage] = useState('homepage');

  const pages = [
    { id: 'homepage', title: 'Homepage', type: 'homepage' as const, content: 'Smart RV Technology homepage content...' },
    { id: 'about', title: 'About Page', type: 'product' as const, content: 'About Smart RV Technology...' },
    { id: 'blog', title: 'Blog Section', type: 'blog' as const, content: 'RV technology blog content...' },
    { id: 'features', title: 'Features', type: 'category' as const, content: 'Smart RV features and capabilities...' }
  ];

  const selectedPageData = pages.find(p => p.id === selectedPage);

  return (
    <Layout>
      <div className="min-h-screen bg-[#080F1F] py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">SEO Management Dashboard</h1>
            <p className="text-gray-400">Monitor and optimize SEO performance across all pages</p>
          </div>

          {/* SEO Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#151A22] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Pages Optimized
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12</div>
                <Badge variant="secondary" className="mt-1">+2 this week</Badge>
              </CardContent>
            </Card>

            <Card className="bg-[#151A22] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Avg SEO Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">92%</div>
                <Badge variant="secondary" className="mt-1">+5% improvement</Badge>
              </CardContent>
            </Card>

            <Card className="bg-[#151A22] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Content Gaps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">3</div>
                <Badge variant="secondary" className="mt-1">High priority</Badge>
              </CardContent>
            </Card>

            <Card className="bg-[#151A22] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Voice Search Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">89%</div>
                <Badge variant="secondary" className="mt-1">Optimized</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Page Selection and SEO Analysis */}
          <Tabs defaultValue="analysis" className="space-y-6">
            <TabsList className="bg-[#151A22] border-gray-700">
              <TabsTrigger value="analysis">SEO Analysis</TabsTrigger>
              <TabsTrigger value="optimization">Bulk Optimization</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-6">
              <Card className="bg-[#151A22] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Page SEO Analysis</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {pages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => setSelectedPage(page.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedPage === page.id
                            ? 'bg-[#5B9BD5] text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {page.title}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedPageData && (
                    <SEOSuite
                      pageType={selectedPageData.type}
                      pageTitle={selectedPageData.title}
                      pageContent={selectedPageData.content}
                      customData={{
                        depthScore: 85,
                        wordCount: 1200,
                        lastUpdated: new Date().toISOString(),
                        contentGaps: [
                          `Advanced ${selectedPageData.title.toLowerCase()} techniques`,
                          `${selectedPageData.title} troubleshooting guide`,
                          `${selectedPageData.title} best practices checklist`
                        ]
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="optimization">
              <Card className="bg-[#151A22] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Bulk SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Bulk optimization tools coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card className="bg-[#151A22] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">SEO Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Detailed SEO reports coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SEODashboard;