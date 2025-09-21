/**
 * SEO Dashboard Component
 * Provides comprehensive SEO performance monitoring and reporting
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  Eye,
  MousePointer,
  DollarSign,
  BarChart3,
  Settings,
  Download,
  RefreshCw
} from 'lucide-react';
import { runSEOAudit, analyzeTestResults } from '@/utils/SEOTestingFramework';

interface SEODashboardProps {
  className?: string;
}

interface SEOMetrics {
  overallScore: number;
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
    rating: 'good' | 'needs-improvement' | 'poor';
  };
  searchVisibility: {
    impressions: number;
    clicks: number;
    ctr: number;
    position: number;
  };
  technicalSEO: {
    indexedPages: number;
    crawlErrors: number;
    sitemapStatus: 'healthy' | 'issues' | 'missing';
    structuredDataCoverage: number;
  };
  contentAnalysis: {
    totalPages: number;
    optimizedPages: number;
    duplicateContent: number;
    missingMetaData: number;
  };
  affiliatePerformance: {
    totalClicks: number;
    conversions: number;
    revenue: number;
    topPerformers: Array<{
      name: string;
      clicks: number;
      conversions: number;
      revenue: number;
    }>;
  };
}

export const SEODashboard: React.FC<SEODashboardProps> = ({ className = '' }) => {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [auditResults, setAuditResults] = useState<any>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Run SEO audit
      const audit = await runSEOAudit();
      setAuditResults(audit);

      // Analytics removed - no affiliate tracking

      // Simulate comprehensive metrics (in production, this would come from multiple APIs)
      const dashboardMetrics: SEOMetrics = {
        overallScore: audit.score,
        coreWebVitals: {
          lcp: audit.metrics.core_web_vitals.lcp,
          fid: audit.metrics.core_web_vitals.fid,
          cls: audit.metrics.core_web_vitals.cls,
          rating: getCoreWebVitalsRating(audit.metrics.core_web_vitals)
        },
        searchVisibility: {
          impressions: Math.floor(Math.random() * 10000) + 5000,
          clicks: Math.floor(Math.random() * 1000) + 500,
          ctr: Math.random() * 5 + 2,
          position: Math.random() * 20 + 5
        },
        technicalSEO: {
          indexedPages: 45,
          crawlErrors: 3,
          sitemapStatus: 'healthy',
          structuredDataCoverage: 85
        },
        contentAnalysis: {
          totalPages: 45,
          optimizedPages: 38,
          duplicateContent: 2,
          missingMetaData: 5
        },
        affiliatePerformance: {
          totalClicks: 0,
          conversions: 0,
          revenue: 0,
          topPerformers: []
        }
      };

      setMetrics(dashboardMetrics);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCoreWebVitalsRating = (vitals: any): 'good' | 'needs-improvement' | 'poor' => {
    const lcp = vitals.lcp || 0;
    const cls = vitals.cls || 0;
    const fid = vitals.fid || 0;

    if (lcp <= 2500 && cls <= 0.1 && fid <= 100) return 'good';
    if (lcp <= 4000 && cls <= 0.25 && fid <= 300) return 'needs-improvement';
    return 'poor';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getVitalsColor = (rating: string): string => {
    switch (rating) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">SEO Dashboard</h1>
          <RefreshCw className="h-6 w-6 text-gray-400 animate-spin" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-connectivity-darkBg border-gray-700">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <Alert className="border-red-500 bg-red-500/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load SEO dashboard data. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">SEO Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadDashboardData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Overall SEO Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(metrics.overallScore)}`}>
                  {metrics.overallScore}/100
                </p>
              </div>
              <Search className="h-8 w-8 text-text-connectivity-accent" />
            </div>
            <Progress value={metrics.overallScore} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Core Web Vitals</p>
                <p className={`text-lg font-semibold ${getVitalsColor(metrics.coreWebVitals.rating)}`}>
                  {metrics.coreWebVitals.rating.replace('-', ' ').toUpperCase()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-text-connectivity-accent" />
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">LCP:</span>
                <span>{(metrics.coreWebVitals.lcp / 1000).toFixed(1)}s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">CLS:</span>
                <span>{metrics.coreWebVitals.cls.toFixed(3)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Search Impressions</p>
                <p className="text-2xl font-bold text-white">
                  {metrics.searchVisibility.impressions.toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-text-connectivity-accent" />
            </div>
            <div className="mt-3 flex items-center text-sm">
              <span className="text-gray-400">CTR: </span>
              <span className="ml-1 text-green-500">
                {metrics.searchVisibility.ctr.toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Affiliate Revenue</p>
                <p className="text-2xl font-bold text-white">
                  ${metrics.affiliatePerformance.revenue.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-text-connectivity-accent" />
            </div>
            <div className="mt-3 flex items-center text-sm">
              <span className="text-gray-400">Clicks: </span>
              <span className="ml-1">{metrics.affiliatePerformance.totalClicks}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-connectivity-darkBg border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">SEO Issues</CardTitle>
                <CardDescription>Critical issues that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                {auditResults?.issues.slice(0, 5).map((issue: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 mb-4 last:mb-0">
                    <div className={`mt-1 ${
                      issue.type === 'error' ? 'text-red-500' : 
                      issue.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                    }`}>
                      {issue.type === 'error' ? <AlertTriangle className="h-4 w-4" /> : 
                       issue.type === 'warning' ? <Clock className="h-4 w-4" /> : 
                       <CheckCircle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{issue.message}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {issue.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-connectivity-darkBg border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Search Performance</CardTitle>
                <CardDescription>Search visibility metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Position</span>
                  <span className="text-white font-semibold">
                    {metrics.searchVisibility.position.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Clicks</span>
                  <span className="text-white font-semibold">
                    {metrics.searchVisibility.clicks.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Click-through Rate</span>
                  <span className="text-green-500 font-semibold">
                    {metrics.searchVisibility.ctr.toFixed(2)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Technical SEO Health</CardTitle>
              <CardDescription>Website technical performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-white">
                    {metrics.technicalSEO.indexedPages}
                  </p>
                  <p className="text-sm text-gray-400">Indexed Pages</p>
                </div>
                <div className="text-center p-4 border border-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-red-500">
                    {metrics.technicalSEO.crawlErrors}
                  </p>
                  <p className="text-sm text-gray-400">Crawl Errors</p>
                </div>
                <div className="text-center p-4 border border-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-white">
                    {metrics.technicalSEO.structuredDataCoverage}%
                  </p>
                  <p className="text-sm text-gray-400">Schema Coverage</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sitemap Status</span>
                  <Badge variant={metrics.technicalSEO.sitemapStatus === 'healthy' ? 'default' : 'destructive'}>
                    {metrics.technicalSEO.sitemapStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Content Analysis</CardTitle>
              <CardDescription>Content optimization insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {metrics.contentAnalysis.totalPages}
                  </p>
                  <p className="text-sm text-gray-400">Total Pages</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">
                    {metrics.contentAnalysis.optimizedPages}
                  </p>
                  <p className="text-sm text-gray-400">Optimized</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-500">
                    {metrics.contentAnalysis.duplicateContent}
                  </p>
                  <p className="text-sm text-gray-400">Duplicates</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">
                    {metrics.contentAnalysis.missingMetaData}
                  </p>
                  <p className="text-sm text-gray-400">Missing Meta</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Core Web Vitals Details</CardTitle>
              <CardDescription>Performance metrics breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Largest Contentful Paint (LCP)</span>
                  <span className="text-white">
                    {(metrics.coreWebVitals.lcp / 1000).toFixed(2)}s
                  </span>
                </div>
                <Progress 
                  value={Math.max(0, 100 - (metrics.coreWebVitals.lcp / 2500 * 100))} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">First Input Delay (FID)</span>
                  <span className="text-white">
                    {metrics.coreWebVitals.fid.toFixed(0)}ms
                  </span>
                </div>
                <Progress 
                  value={Math.max(0, 100 - (metrics.coreWebVitals.fid / 100 * 100))} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Cumulative Layout Shift (CLS)</span>
                  <span className="text-white">
                    {metrics.coreWebVitals.cls.toFixed(3)}
                  </span>
                </div>
                <Progress 
                  value={Math.max(0, 100 - (metrics.coreWebVitals.cls / 0.1 * 100))} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliate" className="space-y-6">
          <Card className="bg-connectivity-darkBg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Affiliate Performance</CardTitle>
              <CardDescription>Top performing affiliate products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.affiliatePerformance.topPerformers.map((performer, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{performer.name}</p>
                      <p className="text-sm text-gray-400">
                        {performer.clicks} clicks • {performer.conversions} conversions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        ${performer.revenue.toFixed(2)}
                      </p>
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