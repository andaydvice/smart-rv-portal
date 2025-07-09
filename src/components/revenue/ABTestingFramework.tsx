import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TestTube, Play, Pause, BarChart3, 
  Users, TrendingUp, Target, CheckCircle
} from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'paused' | 'draft';
  type: 'cta_button' | 'product_placement' | 'pricing_display' | 'content_layout';
  startDate: string;
  endDate?: string;
  participants: number;
  variants: ABTestVariant[];
  significance: number;
  winner?: string;
  description: string;
  expectedRevenue: number;
}

interface ABTestVariant {
  id: string;
  name: string;
  traffic: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  isControl: boolean;
  confidence: number;
}

export const ABTestingFramework: React.FC = () => {
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: 'test-001',
      name: 'Solar Panel CTA Button Colors',
      status: 'running',
      type: 'cta_button',
      startDate: '2024-01-15',
      participants: 2847,
      significance: 95.2,
      description: 'Testing blue vs orange CTA buttons for solar panel affiliate links',
      expectedRevenue: 1240,
      variants: [
        {
          id: 'control',
          name: 'Blue Button (Control)',
          traffic: 1423,
          conversions: 89,
          conversionRate: 6.26,
          revenue: 3420.50,
          isControl: true,
          confidence: 95.2
        },
        {
          id: 'variant-a',
          name: 'Orange Button',
          traffic: 1424,
          conversions: 104,
          conversionRate: 7.30,
          revenue: 3980.20,
          isControl: false,
          confidence: 97.1
        }
      ]
    },
    {
      id: 'test-002',
      name: 'RV Insurance Banner Placement',
      status: 'completed',
      type: 'product_placement',
      startDate: '2024-01-01',
      endDate: '2024-01-14',
      participants: 5234,
      significance: 98.7,
      winner: 'variant-b',
      description: 'Testing header vs sidebar placement for insurance affiliate banners',
      expectedRevenue: 2100,
      variants: [
        {
          id: 'control',
          name: 'Header Placement',
          traffic: 2617,
          conversions: 78,
          conversionRate: 2.98,
          revenue: 4680.00,
          isControl: true,
          confidence: 98.7
        },
        {
          id: 'variant-b',
          name: 'Sidebar Placement',
          traffic: 2617,
          conversions: 124,
          conversionRate: 4.74,
          revenue: 7440.00,
          isControl: false,
          confidence: 99.1
        }
      ]
    },
    {
      id: 'test-003',
      name: 'Product Recommendation Algorithm',
      status: 'paused',
      type: 'content_layout',
      startDate: '2024-01-10',
      participants: 1156,
      significance: 67.3,
      description: 'Testing AI-powered vs manual product recommendations',
      expectedRevenue: 890,
      variants: [
        {
          id: 'control',
          name: 'Manual Recommendations',
          traffic: 578,
          conversions: 23,
          conversionRate: 3.98,
          revenue: 1120.50,
          isControl: true,
          confidence: 67.3
        },
        {
          id: 'variant-c',
          name: 'AI-Powered Recommendations',
          traffic: 578,
          conversions: 31,
          conversionRate: 5.36,
          revenue: 1450.20,
          isControl: false,
          confidence: 72.1
        }
      ]
    }
  ]);

  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-600';
      case 'completed': return 'bg-blue-600';
      case 'paused': return 'bg-yellow-600';
      case 'draft': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cta_button': return 'CTA Button';
      case 'product_placement': return 'Product Placement';
      case 'pricing_display': return 'Pricing Display';
      case 'content_layout': return 'Content Layout';
      default: return type;
    }
  };

  const handleTestAction = (testId: string, action: 'pause' | 'resume' | 'stop') => {
    setTests(prev => prev.map(test => {
      if (test.id === testId) {
        switch (action) {
          case 'pause':
            return { ...test, status: 'paused' as const };
          case 'resume':
            return { ...test, status: 'running' as const };
          case 'stop':
            return { ...test, status: 'completed' as const, endDate: new Date().toISOString().split('T')[0] };
          default:
            return test;
        }
      }
      return test;
    }));
  };

  const calculateLift = (control: ABTestVariant, variant: ABTestVariant) => {
    return ((variant.conversionRate - control.conversionRate) / control.conversionRate * 100);
  };

  const runningTests = tests.filter(t => t.status === 'running').length;
  const completedTests = tests.filter(t => t.status === 'completed').length;
  const totalRevenueLift = tests.reduce((sum, test) => {
    if (test.status === 'completed' && test.winner) {
      const winner = test.variants.find(v => v.id === test.winner);
      const control = test.variants.find(v => v.isControl);
      if (winner && control) {
        return sum + (winner.revenue - control.revenue);
      }
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* A/B Testing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Running Tests</p>
                <p className="text-2xl font-bold text-white">{runningTests}</p>
                <p className="text-xs text-green-400">Active experiments</p>
              </div>
              <TestTube className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Completed Tests</p>
                <p className="text-2xl font-bold text-white">{completedTests}</p>
                <p className="text-xs text-connectivity-lightText">This month</p>
              </div>
              <CheckCircle className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Revenue Lift</p>
                <p className="text-2xl font-bold text-white">
                  ${totalRevenueLift.toLocaleString()}
                </p>
                <p className="text-xs text-green-400">From winning variants</p>
              </div>
              <TrendingUp className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-connectivity-darkBg border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-connectivity-lightText text-sm">Total Participants</p>
                <p className="text-2xl font-bold text-white">
                  {tests.reduce((sum, test) => sum + test.participants, 0).toLocaleString()}
                </p>
                <p className="text-xs text-connectivity-lightText">Across all tests</p>
              </div>
              <Users className="h-8 w-8 text-connectivity-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Tests */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TestTube className="h-5 w-5 text-connectivity-accent" />
            A/B Test Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test.id}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                onClick={() => setSelectedTest(selectedTest === test.id ? null : test.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{test.name}</h4>
                    <Badge className={`${getStatusColor(test.status)} text-white`}>
                      {test.status}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {getTypeLabel(test.type)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {test.status === 'running' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTestAction(test.id, 'pause');
                          }}
                          className="border-gray-600"
                        >
                          <Pause className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTestAction(test.id, 'stop');
                          }}
                          className="border-gray-600"
                        >
                          Stop
                        </Button>
                      </>
                    )}
                    {test.status === 'paused' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTestAction(test.id, 'resume');
                        }}
                        className="border-gray-600"
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-sm text-connectivity-lightText mb-3">
                  {test.description}
                </p>

                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-connectivity-lightText">Participants</p>
                    <p className="text-white font-medium">{test.participants.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Significance</p>
                    <p className={`font-medium ${test.significance >= 95 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {test.significance}%
                    </p>
                  </div>
                  <div>
                    <p className="text-connectivity-lightText">Expected Revenue</p>
                    <p className="text-white font-medium">${test.expectedRevenue}</p>
                  </div>
                </div>

                {selectedTest === test.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h5 className="text-white font-medium mb-3">Variant Performance</h5>
                    <div className="space-y-3">
                      {test.variants.map((variant) => {
                        const control = test.variants.find(v => v.isControl);
                        const lift = control && !variant.isControl ? calculateLift(control, variant) : 0;
                        
                        return (
                          <div key={variant.id} className="p-3 bg-gray-900 rounded">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">{variant.name}</span>
                                {variant.isControl && (
                                  <Badge variant="secondary" className="text-xs">Control</Badge>
                                )}
                                {test.winner === variant.id && (
                                  <Badge className="bg-green-600 text-white text-xs">Winner</Badge>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-white font-bold">${variant.revenue.toLocaleString()}</p>
                                {!variant.isControl && (
                                  <p className={`text-xs ${lift > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {lift > 0 ? '+' : ''}{lift.toFixed(1)}% lift
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-4 text-xs">
                              <div>
                                <p className="text-gray-400">Traffic</p>
                                <p className="text-white">{variant.traffic}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Conversions</p>
                                <p className="text-white">{variant.conversions}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Conv. Rate</p>
                                <p className="text-white">{variant.conversionRate}%</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Confidence</p>
                                <p className={`${variant.confidence >= 95 ? 'text-green-400' : 'text-yellow-400'}`}>
                                  {variant.confidence}%
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <Progress value={variant.conversionRate * 10} className="h-1" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-connectivity-darkBg border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-connectivity-accent hover:bg-connectivity-accent/80 h-auto p-4 flex-col items-start">
              <Target className="h-5 w-5 mb-2" />
              <span className="font-medium">New CTA Test</span>
              <span className="text-xs opacity-80">Test button colors & text</span>
            </Button>
            
            <Button className="bg-connectivity-accent hover:bg-connectivity-accent/80 h-auto p-4 flex-col items-start">
              <BarChart3 className="h-5 w-5 mb-2" />
              <span className="font-medium">Placement Test</span>
              <span className="text-xs opacity-80">Test affiliate placements</span>
            </Button>
            
            <Button className="bg-connectivity-accent hover:bg-connectivity-accent/80 h-auto p-4 flex-col items-start">
              <Users className="h-5 w-5 mb-2" />
              <span className="font-medium">Audience Test</span>
              <span className="text-xs opacity-80">Test targeting segments</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};