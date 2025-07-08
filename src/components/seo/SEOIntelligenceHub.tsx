import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Eye, 
  BarChart3,
  Globe,
  FileText,
  Link,
  Star,
  Users,
  Clock,
  MousePointer,
  Zap,
  Brain,
  AlertTriangle
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

interface KeywordData {
  keyword: string;
  position: number;
  volume: number;
  difficulty: number;
  cpc: number;
  trend: 'up' | 'down' | 'stable';
  opportunity: number;
  clicks: number;
  impressions: number;
}

interface ContentPerformance {
  url: string;
  title: string;
  organicTraffic: number;
  rankings: number;
  backlinks: number;
  ctr: number;
  bounceRate: number;
  conversionRate: number;
  revenue: number;
}

interface CompetitorAnalysis {
  competitor: string;
  domain: string;
  organicKeywords: number;
  organicTraffic: number;
  backlinks: number;
  domainRating: number;
  overlap: number;
  opportunities: number;
}

interface SEOOpportunity {
  id: string;
  type: 'keyword' | 'content' | 'technical' | 'link';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  estimatedTraffic: number;
  priority: number;
}

const SEOIntelligenceHub = () => {
  const [keywordData, setKeywordData] = useState<KeywordData[]>([
    { keyword: 'smart RV technology', position: 3, volume: 8900, difficulty: 45, cpc: 2.45, trend: 'up', opportunity: 78, clicks: 1240, impressions: 12500 },
    { keyword: 'RV solar panels', position: 7, volume: 15600, difficulty: 52, cpc: 3.20, trend: 'up', opportunity: 85, clicks: 890, impressions: 18900 },
    { keyword: 'luxury RV features', position: 12, volume: 6200, difficulty: 38, cpc: 4.10, trend: 'stable', opportunity: 65, clicks: 320, impressions: 8900 },
    { keyword: 'RV security systems', position: 5, volume: 4500, difficulty: 41, cpc: 2.80, trend: 'up', opportunity: 72, clicks: 580, impressions: 6700 },
    { keyword: 'smart RV automation', position: 15, volume: 3200, difficulty: 35, cpc: 3.50, trend: 'down', opportunity: 60, clicks: 180, impressions: 4100 }
  ]);

  const [contentPerformance, setContentPerformance] = useState<ContentPerformance[]>([
    { url: '/smart-rv-technology', title: 'Complete Guide to Smart RV Technology', organicTraffic: 12450, rankings: 145, backlinks: 89, ctr: 3.8, bounceRate: 45.2, conversionRate: 2.9, revenue: 8900 },
    { url: '/solar-power-rvs', title: 'Solar Power Solutions for RVs', organicTraffic: 8900, rankings: 98, backlinks: 156, ctr: 4.2, bounceRate: 38.7, conversionRate: 3.5, revenue: 12400 },
    { url: '/rv-security-guide', title: 'Ultimate RV Security Systems Guide', organicTraffic: 6700, rankings: 67, backlinks: 45, ctr: 3.1, bounceRate: 52.1, conversionRate: 2.1, revenue: 4200 },
    { url: '/luxury-rv-features', title: 'Top Luxury RV Features for 2024', organicTraffic: 5200, rankings: 78, backlinks: 67, ctr: 2.9, bounceRate: 48.9, conversionRate: 2.6, revenue: 6800 }
  ]);

  const [competitors, setCompetitors] = useState<CompetitorAnalysis[]>([
    { competitor: 'RV Lifestyle', domain: 'rvlifestyle.com', organicKeywords: 45600, organicTraffic: 890000, backlinks: 12500, domainRating: 68, overlap: 34, opportunities: 1250 },
    { competitor: 'Camping World', domain: 'campingworld.com', organicKeywords: 78900, organicTraffic: 1500000, backlinks: 45600, domainRating: 78, overlap: 28, opportunities: 980 },
    { competitor: 'RV Travel', domain: 'rvtravel.com', organicKeywords: 34500, organicTraffic: 650000, backlinks: 8900, domainRating: 65, overlap: 42, opportunities: 1450 },
    { competitor: 'Motorhome Magazine', domain: 'motorhome.com', organicKeywords: 23400, organicTraffic: 450000, backlinks: 6700, domainRating: 62, overlap: 38, opportunities: 890 }
  ]);

  const [opportunities, setOpportunities] = useState<SEOOpportunity[]>([
    {
      id: '1',
      type: 'keyword',
      title: 'Target Featured Snippets',
      description: 'Optimize content for "how to" queries to capture featured snippets',
      impact: 'high',
      effort: 'medium',
      estimatedTraffic: 2500,
      priority: 95
    },
    {
      id: '2',
      type: 'content',
      title: 'Content Gap Analysis',
      description: 'Create content for high-volume keywords competitors rank for',
      impact: 'high',
      effort: 'high',
      estimatedTraffic: 4200,
      priority: 89
    },
    {
      id: '3',
      type: 'technical',
      title: 'Core Web Vitals Optimization',
      description: 'Improve page loading speed and user experience metrics',
      impact: 'medium',
      effort: 'medium',
      estimatedTraffic: 1800,
      priority: 82
    },
    {
      id: '4',
      type: 'link',
      title: 'Industry Partnership Links',
      description: 'Build relationships with RV manufacturers for quality backlinks',
      impact: 'high',
      effort: 'high',
      estimatedTraffic: 3500,
      priority: 87
    }
  ]);

  const [seoMetrics, setSeoMetrics] = useState({
    totalKeywords: 12450,
    avgPosition: 8.3,
    organicTraffic: 456700,
    organicRevenue: 234500,
    totalBacklinks: 8900,
    domainRating: 58
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      default: return <Target className="h-4 w-4 text-gray-400" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'keyword': return <Search className="h-4 w-4" />;
      case 'content': return <FileText className="h-4 w-4" />;
      case 'technical': return <Zap className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* SEO Intelligence Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Search className="h-6 w-6 text-[#5B9BD5]" />
            SEO Intelligence & Content Optimization Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="text-center">
              <Target className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{seoMetrics.totalKeywords.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Keywords</p>
            </div>
            
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{seoMetrics.avgPosition}</p>
              <p className="text-sm text-gray-400">Avg Position</p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{(seoMetrics.organicTraffic / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-400">Organic Traffic</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${(seoMetrics.organicRevenue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-400">Organic Revenue</p>
            </div>
            
            <div className="text-center">
              <Link className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{seoMetrics.totalBacklinks.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Backlinks</p>
            </div>
            
            <div className="text-center">
              <Star className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{seoMetrics.domainRating}</p>
              <p className="text-sm text-gray-400">Domain Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="keywords" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-[#091020] border border-gray-700">
          <TabsTrigger 
            value="keywords" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Keyword Intelligence
          </TabsTrigger>
          <TabsTrigger 
            value="content" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Content Performance
          </TabsTrigger>
          <TabsTrigger 
            value="competitors" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Competitor Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="opportunities" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            SEO Opportunities
          </TabsTrigger>
          <TabsTrigger 
            value="insights" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="keywords">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Keyword Performance & Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywordData.map((keyword, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTrendIcon(keyword.trend)}
                        <h4 className="text-white font-medium">{keyword.keyword}</h4>
                        <Badge className="bg-[#5B9BD5] text-white">
                          Position {keyword.position}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{keyword.opportunity}%</p>
                        <p className="text-xs text-gray-400">Opportunity</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Volume</p>
                        <p className="text-white font-medium">{keyword.volume.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Difficulty</p>
                        <p className="text-white font-medium">{keyword.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">CPC</p>
                        <p className="text-white font-medium">${keyword.cpc}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Clicks</p>
                        <p className="text-white font-medium">{keyword.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Impressions</p>
                        <p className="text-white font-medium">{keyword.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                          Optimize
                        </Button>
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
              <CardTitle className="text-white">Content Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentPerformance.map((content, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium">{content.title}</h4>
                        <p className="text-sm text-gray-400">{content.url}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${content.revenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Revenue</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Traffic</p>
                        <p className="text-white font-medium">{content.organicTraffic.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Rankings</p>
                        <p className="text-white font-medium">{content.rankings}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Backlinks</p>
                        <p className="text-white font-medium">{content.backlinks}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">CTR</p>
                        <p className="text-white font-medium">{content.ctr}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Conversion</p>
                        <p className="text-white font-medium">{content.conversionRate}%</p>
                      </div>
                      <div>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                          Analyze
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Competitive Intelligence Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitors.map((competitor, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium">{competitor.competitor}</h4>
                        <p className="text-sm text-gray-400">{competitor.domain}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{competitor.opportunities}</p>
                        <p className="text-xs text-gray-400">Opportunities</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Keywords</p>
                        <p className="text-white font-medium">{competitor.organicKeywords.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Traffic</p>
                        <p className="text-white font-medium">{(competitor.organicTraffic / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Backlinks</p>
                        <p className="text-white font-medium">{competitor.backlinks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Domain Rating</p>
                        <p className="text-white font-medium">{competitor.domainRating}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Overlap</p>
                        <p className="text-white font-medium">{competitor.overlap}%</p>
                      </div>
                      <div>
                        <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                          Compare
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI-Identified SEO Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(opp.type)}
                        <h4 className="text-white font-medium">{opp.title}</h4>
                        <Badge className={`${getImpactColor(opp.impact)} text-white`}>
                          {opp.impact} impact
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">+{opp.estimatedTraffic}</p>
                        <p className="text-xs text-gray-400">Est. Traffic</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{opp.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">Effort: 
                          <span className="text-white ml-1">{opp.effort}</span>
                        </span>
                        <span className="text-gray-400">Priority: 
                          <span className="text-white ml-1">{opp.priority}/100</span>
                        </span>
                      </div>
                      <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                        Implement
                      </Button>
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
              <CardTitle className="flex items-center gap-3 text-white">
                <Brain className="h-6 w-6 text-[#5B9BD5]" />
                AI-Powered SEO Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Seasonal Content Opportunity",
                    insight: "RV camping content shows 340% search increase in spring months",
                    action: "Create seasonal RV preparation guides for Q1 2024",
                    impact: "High",
                    confidence: 94
                  },
                  {
                    title: "Voice Search Optimization",
                    insight: "45% of RV-related queries use voice search with question modifiers",
                    action: "Optimize content for conversational queries and FAQ format",
                    impact: "Medium",
                    confidence: 87
                  },
                  {
                    title: "Local SEO Gap",
                    insight: "Competitors rank better for location-based RV services",
                    action: "Build location-specific landing pages and local citations",
                    impact: "High",
                    confidence: 91
                  },
                  {
                    title: "Featured Snippet Opportunity",
                    insight: "78% of target keywords have featured snippets available",
                    action: "Structure content to capture featured snippets with lists and tables",
                    impact: "Medium",
                    confidence: 89
                  }
                ].map((insight, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{insight.title}</h4>
                      <Badge className={`${insight.impact === 'High' ? 'bg-red-600' : 'bg-yellow-600'} text-white`}>
                        {insight.impact}
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
                        Execute
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

export default SEOIntelligenceHub;