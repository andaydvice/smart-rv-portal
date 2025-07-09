import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Mail, Users, TrendingUp, Target, 
  ArrowRight, Calendar, Gift, Zap,
  Download, UserPlus, Eye, MousePointer
} from 'lucide-react';

interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'checklist' | 'guide' | 'calculator' | 'template';
  conversionRate: number;
  downloads: number;
  emailCaptures: number;
  value: number;
  status: 'active' | 'paused' | 'testing';
}

interface EmailCampaign {
  id: string;
  name: string;
  type: 'welcome' | 'nurture' | 'retargeting' | 'abandoned_cart';
  subscribers: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  revenue: number;
  status: 'active' | 'draft' | 'completed';
}

interface RetargetingSegment {
  id: string;
  name: string;
  criteria: string;
  size: number;
  conversionRate: number;
  averageValue: number;
  status: 'active' | 'paused';
}

export const LeadGenerationOptimizer: React.FC = () => {
  const [leadMagnets, setLeadMagnets] = useState<LeadMagnet[]>([
    {
      id: 'lm-001',
      title: 'Ultimate RV Buyer\'s Checklist',
      description: 'Complete 47-point checklist for first-time RV buyers',
      type: 'checklist',
      conversionRate: 18.7,
      downloads: 1247,
      emailCaptures: 1089,
      value: 25,
      status: 'active'
    },
    {
      id: 'lm-002',
      title: 'Solar Power Sizing Calculator',
      description: 'Interactive tool to calculate solar needs for any RV',
      type: 'calculator',
      conversionRate: 24.3,
      downloads: 892,
      emailCaptures: 823,
      value: 40,
      status: 'active'
    },
    {
      id: 'lm-003',
      title: 'Complete RV Maintenance Guide',
      description: '150-page comprehensive maintenance manual',
      type: 'ebook',
      conversionRate: 14.2,
      downloads: 634,
      emailCaptures: 567,
      value: 35,
      status: 'testing'
    }
  ]);

  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([
    {
      id: 'ec-001',
      name: 'New Subscriber Welcome Series',
      type: 'welcome',
      subscribers: 2847,
      openRate: 68.4,
      clickRate: 12.7,
      conversionRate: 3.8,
      revenue: 4250.30,
      status: 'active'
    },
    {
      id: 'ec-002',
      name: 'Solar Equipment Nurture Campaign',
      type: 'nurture',
      subscribers: 1204,
      openRate: 45.2,
      clickRate: 8.9,
      conversionRate: 5.2,
      revenue: 3180.75,
      status: 'active'
    },
    {
      id: 'ec-003',
      name: 'Abandoned Calculator Retargeting',
      type: 'retargeting',
      subscribers: 456,
      openRate: 52.1,
      clickRate: 15.3,
      conversionRate: 7.8,
      revenue: 1890.40,
      status: 'active'
    }
  ]);

  const [retargetingSegments, setRetargetingSegments] = useState<RetargetingSegment[]>([
    {
      id: 'rs-001',
      name: 'High-Value Product Viewers',
      criteria: 'Viewed products >$1000, no purchase in 7 days',
      size: 234,
      conversionRate: 12.4,
      averageValue: 1247,
      status: 'active'
    },
    {
      id: 'rs-002',
      name: 'Calculator Users',
      criteria: 'Used calculators but didn\'t download results',
      size: 567,
      conversionRate: 8.9,
      averageValue: 340,
      status: 'active'
    },
    {
      id: 'rs-003',
      name: 'Luxury RV Browsers',
      criteria: 'Spent >5min on luxury models, high income zip',
      size: 123,
      conversionRate: 15.7,
      averageValue: 2890,
      status: 'active'
    }
  ]);

  const [newEmail, setNewEmail] = useState('');
  const [metrics, setMetrics] = useState({
    totalLeads: 4892,
    emailGrowthRate: 23.4,
    averageLeadValue: 87.50,
    retargetingRevenue: 18934
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail) {
      // Simulate email capture
      setMetrics(prev => ({
        ...prev,
        totalLeads: prev.totalLeads + 1
      }));
      setNewEmail('');
      alert('Email captured successfully!');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook': return <Download className="h-4 w-4" />;
      case 'checklist': return <Target className="h-4 w-4" />;
      case 'guide': return <Target className="h-4 w-4" />;
      case 'calculator': return <Target className="h-4 w-4" />;
      case 'template': return <Target className="h-4 w-4" />;
      default: return <Download className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'paused': return 'bg-yellow-600';
      case 'testing': return 'bg-blue-600';
      case 'draft': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Lead Generation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Total Leads</p>
                <p className="text-2xl font-bold text-white">
                  {metrics.totalLeads.toLocaleString()}
                </p>
                <p className="text-xs text-green-400">
                  +{metrics.emailGrowthRate}% this month
                </p>
              </div>
              <Users className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Avg Lead Value</p>
                <p className="text-2xl font-bold text-white">
                  ${metrics.averageLeadValue}
                </p>
                <p className="text-xs text-connectivity-lightText">
                  Lifetime value
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Retargeting Revenue</p>
                <p className="text-2xl font-bold text-white">
                  ${metrics.retargetingRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-400">
                  This month
                </p>
              </div>
              <Target className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Active Campaigns</p>
                <p className="text-2xl font-bold text-white">
                  {emailCampaigns.filter(c => c.status === 'active').length}
                </p>
                <p className="text-xs text-connectivity-lightText">
                  Email campaigns
                </p>
              </div>
              <Mail className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Capture Optimization */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-connectivity-accent" />
            Lead Magnets Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leadMagnets.map((magnet) => (
              <div
                key={magnet.id}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(magnet.type)}
                    <h4 className="text-white font-medium">{magnet.title}</h4>
                    <Badge className={`${getStatusColor(magnet.status)} text-white`}>
                      {magnet.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{magnet.conversionRate}%</p>
                    <p className="text-sm text-connectivity-lightText">Conv. Rate</p>
                  </div>
                </div>
                
                <p className="text-sm text-connectivity-lightText mb-3">
                  {magnet.description}
                </p>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-connectivity-lightText">Downloads</p>
                    <p className="text-white font-medium">{magnet.downloads}</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Email Captures</p>
                    <p className="text-white font-medium">{magnet.emailCaptures}</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Value</p>
                    <p className="text-white font-medium">${magnet.value}</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Total Value</p>
                    <p className="text-green-400 font-medium">
                      ${(magnet.emailCaptures * magnet.value).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Progress value={magnet.conversionRate} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Campaigns */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-connectivity-accent" />
            Email Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{campaign.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {campaign.type.replace('_', ' ')}
                    </Badge>
                    <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">
                      ${campaign.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-connectivity-lightText">Revenue</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-connectivity-lightText">Subscribers</p>
                    <p className="text-white font-medium">{campaign.subscribers}</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Open Rate</p>
                    <p className="text-white font-medium">{campaign.openRate}%</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Click Rate</p>
                    <p className="text-white font-medium">{campaign.clickRate}%</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Conv. Rate</p>
                    <p className="text-green-400 font-medium">{campaign.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Per Subscriber</p>
                    <p className="text-white font-medium">
                      ${(campaign.revenue / campaign.subscribers).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-connectivity-lightText mb-1">Open Rate</p>
                    <Progress value={campaign.openRate} className="h-2" />
                  </div>
                  <div>
                    <p className="text-xs text-connectivity-lightText mb-1">Click Rate</p>
                    <Progress value={campaign.clickRate} className="h-2" />
                  </div>
                  <div>
                    <p className="text-xs text-connectivity-lightText mb-1">Conversion</p>
                    <Progress value={campaign.conversionRate * 10} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Retargeting Segments */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-connectivity-accent" />
            Retargeting Segments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {retargetingSegments.map((segment) => (
              <div
                key={segment.id}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{segment.name}</h4>
                    <Badge className={`${getStatusColor(segment.status)} text-white`}>
                      {segment.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{segment.size}</p>
                    <p className="text-sm text-connectivity-lightText">Users</p>
                  </div>
                </div>
                
                <p className="text-sm text-connectivity-lightText mb-3">
                  {segment.criteria}
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-connectivity-lightText">Conversion Rate</p>
                    <p className="text-green-400 font-medium">{segment.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Avg Order Value</p>
                    <p className="text-white font-medium">${segment.averageValue}</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Potential Revenue</p>
                    <p className="text-green-400 font-medium">
                      ${Math.round(segment.size * segment.conversionRate/100 * segment.averageValue).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Capture Demo */}
      <Card className="bg-gradient-to-r from-connectivity-accent/20 to-blue-900/20 border-connectivity-accent">
        <CardHeader>
          <CardTitle className="text-white">Try Our Lead Capture System</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email for exclusive RV deals"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 bg-gray-800 border-gray-600 text-white"
            />
            <Button 
              type="submit"
              className="bg-connectivity-accent hover:bg-connectivity-accent/80"
            >
              Get Free Guide
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>
          <p className="text-sm text-connectivity-lightText mt-2">
            Join 4,892+ RV enthusiasts getting exclusive deals and expert tips
          </p>
        </CardContent>
      </Card>
    </div>
  );
};