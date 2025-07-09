import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  Zap, 
  Mail, 
  TrendingUp, 
  Users, 
  Send,
  Clock,
  Target,
  BarChart3
} from 'lucide-react';

interface EmailSequence {
  id: string;
  name: string;
  triggerType: 'signup' | 'purchase' | 'abandonment' | 'engagement';
  isActive: boolean;
  emails: EmailTemplate[];
  subscribers: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
}

interface EmailTemplate {
  id: string;
  subject: string;
  content: string;
  delayHours: number;
  isAIGenerated: boolean;
}

interface ContentTemplate {
  id: string;
  type: 'blog' | 'email' | 'social' | 'product_description';
  title: string;
  content: string;
  keywords: string[];
  isGenerated: boolean;
  performance: {
    views: number;
    engagement: number;
    conversions: number;
  };
}

const MarketingAutomationPlatform = () => {
  const [emailSequences, setEmailSequences] = useState<EmailSequence[]>([
    {
      id: '1',
      name: 'RV Newbie Welcome Series',
      triggerType: 'signup',
      isActive: true,
      emails: [],
      subscribers: 1247,
      openRate: 67.3,
      clickRate: 24.1,
      conversionRate: 8.7
    },
    {
      id: '2',
      name: 'Solar Power Education Campaign',
      triggerType: 'engagement',
      isActive: true,
      emails: [],
      subscribers: 892,
      openRate: 71.2,
      clickRate: 31.4,
      conversionRate: 12.3
    },
    {
      id: '3',
      name: 'Abandoned Cart Recovery',
      triggerType: 'abandonment',
      isActive: true,
      emails: [],
      subscribers: 534,
      openRate: 45.8,
      clickRate: 18.9,
      conversionRate: 15.6
    }
  ]);

  const [contentTemplates, setContentTemplates] = useState<ContentTemplate[]>([
    {
      id: '1',
      type: 'blog',
      title: 'Top 10 Winter RV Camping Destinations',
      content: 'Discover the best winter RV camping spots across the USA...',
      keywords: ['winter RV camping', 'cold weather RVing', 'winter destinations'],
      isGenerated: true,
      performance: { views: 4521, engagement: 78.2, conversions: 23 }
    },
    {
      id: '2',
      type: 'email',
      title: 'Spring RV Maintenance Checklist',
      content: 'Get your RV ready for the camping season with this comprehensive checklist...',
      keywords: ['RV maintenance', 'spring preparation', 'RV checklist'],
      isGenerated: true,
      performance: { views: 2847, engagement: 85.4, conversions: 41 }
    }
  ]);

  const [newSequence, setNewSequence] = useState({
    name: '',
    triggerType: 'signup' as const,
    isActive: true
  });

  const [contentGeneration, setContentGeneration] = useState({
    type: 'blog' as const,
    topic: '',
    keywords: '',
    tone: 'professional' as const,
    audience: 'beginner' as const
  });

  const [automationMetrics, setAutomationMetrics] = useState({
    totalSequences: 3,
    activeSubscribers: 2673,
    avgOpenRate: 61.4,
    avgClickRate: 24.8,
    monthlyRevenue: 18450,
    contentGenerated: 127
  });

  const generateContent = async () => {
    // Simulate AI content generation
    const topics = [
      'Essential RV maintenance tips for beginners',
      'How to choose the right solar panel system for your RV',
      'Best RV-friendly national parks for 2024',
      'Complete guide to RV insurance and coverage',
      'Winter RV living: Heating solutions and insulation tips'
    ];

    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    const newContent: ContentTemplate = {
      id: Date.now().toString(),
      type: contentGeneration.type,
      title: contentGeneration.topic || randomTopic,
      content: `AI-generated content for: ${contentGeneration.topic || randomTopic}. This would be a comprehensive ${contentGeneration.type} optimized for SEO with keywords: ${contentGeneration.keywords}`,
      keywords: contentGeneration.keywords.split(',').map(k => k.trim()),
      isGenerated: true,
      performance: { views: 0, engagement: 0, conversions: 0 }
    };

    setContentTemplates(prev => [newContent, ...prev]);
    setContentGeneration({ type: 'blog', topic: '', keywords: '', tone: 'professional', audience: 'beginner' });
  };

  const createEmailSequence = () => {
    if (!newSequence.name) return;

    const sequence: EmailSequence = {
      id: Date.now().toString(),
      name: newSequence.name,
      triggerType: newSequence.triggerType,
      isActive: newSequence.isActive,
      emails: [],
      subscribers: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0
    };

    setEmailSequences(prev => [sequence, ...prev]);
    setNewSequence({ name: '', triggerType: 'signup', isActive: true });
  };

  return (
    <div className="space-y-6">
      {/* Automation Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Zap className="h-6 w-6 text-[#5B9BD5]" />
            Marketing Automation Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="text-center">
              <Mail className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{automationMetrics.totalSequences}</p>
              <p className="text-sm text-gray-400">Active Sequences</p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{automationMetrics.activeSubscribers.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Subscribers</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{automationMetrics.avgOpenRate}%</p>
              <p className="text-sm text-gray-400">Avg Open Rate</p>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{automationMetrics.avgClickRate}%</p>
              <p className="text-sm text-gray-400">Avg Click Rate</p>
            </div>
            
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">${automationMetrics.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Monthly Revenue</p>
            </div>
            
            <div className="text-center">
              <Brain className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{automationMetrics.contentGenerated}</p>
              <p className="text-sm text-gray-400">AI Content Pieces</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Sequences */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Mail className="h-6 w-6 text-[#5B9BD5]" />
            Automated Email Sequences
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Create New Sequence */}
          <div className="p-4 bg-[#131a2a] rounded-lg border border-gray-700 mb-6">
            <h4 className="text-white font-medium mb-4">Create New Email Sequence</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Sequence name"
                value={newSequence.name}
                onChange={(e) => setNewSequence(prev => ({ ...prev, name: e.target.value }))}
                className="bg-[#091020] border-gray-600 text-white"
              />
              <Select
                value={newSequence.triggerType}
                onValueChange={(value: any) => setNewSequence(prev => ({ ...prev, triggerType: value }))}
              >
                <SelectTrigger className="bg-[#091020] border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#131a2a] border-gray-600">
                  <SelectItem value="signup">New Signup</SelectItem>
                  <SelectItem value="purchase">Post-Purchase</SelectItem>
                  <SelectItem value="abandonment">Cart Abandonment</SelectItem>
                  <SelectItem value="engagement">Engagement Based</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Switch
                  checked={newSequence.isActive}
                  onCheckedChange={(checked) => setNewSequence(prev => ({ ...prev, isActive: checked }))}
                />
                <span className="text-sm text-gray-400">Active</span>
              </div>
              <Button
                onClick={createEmailSequence}
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3]"
              >
                Create Sequence
              </Button>
            </div>
          </div>

          {/* Existing Sequences */}
          <div className="space-y-4">
            {emailSequences.map((sequence) => (
              <div key={sequence.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{sequence.name}</h4>
                    <Badge className={`${sequence.isActive ? 'bg-green-600' : 'bg-gray-600'} text-white`}>
                      {sequence.isActive ? 'Active' : 'Paused'}
                    </Badge>
                    <Badge variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                      {sequence.triggerType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                      Edit
                    </Button>
                    <Switch checked={sequence.isActive} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Subscribers</p>
                    <p className="text-white font-medium">{sequence.subscribers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Open Rate</p>
                    <p className="text-white font-medium">{sequence.openRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Click Rate</p>
                    <p className="text-white font-medium">{sequence.clickRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Conversion Rate</p>
                    <p className="text-white font-medium">{sequence.conversionRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Content Generation */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Brain className="h-6 w-6 text-[#5B9BD5]" />
            AI Content Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Content Generation Form */}
          <div className="p-4 bg-[#131a2a] rounded-lg border border-gray-700 mb-6">
            <h4 className="text-white font-medium mb-4">Generate New Content</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select
                value={contentGeneration.type}
                onValueChange={(value: any) => setContentGeneration(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="bg-[#091020] border-gray-600 text-white">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#131a2a] border-gray-600">
                  <SelectItem value="blog">Blog Post</SelectItem>
                  <SelectItem value="email">Email Template</SelectItem>
                  <SelectItem value="social">Social Media Post</SelectItem>
                  <SelectItem value="product_description">Product Description</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={contentGeneration.audience}
                onValueChange={(value: any) => setContentGeneration(prev => ({ ...prev, audience: value }))}
              >
                <SelectTrigger className="bg-[#091020] border-gray-600 text-white">
                  <SelectValue placeholder="Target Audience" />
                </SelectTrigger>
                <SelectContent className="bg-[#131a2a] border-gray-600">
                  <SelectItem value="beginner">RV Beginners</SelectItem>
                  <SelectItem value="experienced">Experienced RVers</SelectItem>
                  <SelectItem value="technical">Technical Enthusiasts</SelectItem>
                  <SelectItem value="luxury">Luxury RV Owners</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Content topic or title"
                value={contentGeneration.topic}
                onChange={(e) => setContentGeneration(prev => ({ ...prev, topic: e.target.value }))}
                className="bg-[#091020] border-gray-600 text-white"
              />
              
              <Input
                placeholder="Keywords (comma-separated)"
                value={contentGeneration.keywords}
                onChange={(e) => setContentGeneration(prev => ({ ...prev, keywords: e.target.value }))}
                className="bg-[#091020] border-gray-600 text-white"
              />
              
              <Button
                onClick={generateContent}
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3] w-full"
              >
                <Brain className="h-4 w-4 mr-2" />
                Generate Content with AI
              </Button>
            </div>
          </div>

          {/* Generated Content */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Generated Content Library</h4>
            {contentTemplates.map((content) => (
              <div key={content.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h5 className="text-white font-medium">{content.title}</h5>
                    <Badge variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                      {content.type}
                    </Badge>
                    {content.isGenerated && (
                      <Badge className="bg-purple-600 text-white">
                        AI Generated
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                      Edit
                    </Button>
                    <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                      <Send className="h-3 w-3 mr-1" />
                      Publish
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{content.content}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Keywords: {content.keywords.join(', ')}</span>
                  <span>Views: {content.performance.views}</span>
                  <span>Engagement: {content.performance.engagement}%</span>
                  <span>Conversions: {content.performance.conversions}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingAutomationPlatform;
