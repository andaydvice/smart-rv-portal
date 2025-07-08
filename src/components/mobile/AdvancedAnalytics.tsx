import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, TrendingUp, Eye, MousePointer, 
  Smartphone, Clock, DollarSign, Target 
} from 'lucide-react';

interface MobileAnalyticsData {
  sessions: number;
  conversions: number;
  revenue: number;
  avgSessionTime: number;
  bounceRate: number;
  topPages: { page: string; views: number; conversions: number }[];
  deviceMetrics: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  conversionFunnel: {
    step: string;
    users: number;
    dropoffRate: number;
  }[];
}

const AdvancedAnalytics = () => {
  const [analytics, setAnalytics] = useState<MobileAnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('conversions');

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = () => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        sessions: 12847,
        conversions: 384,
        revenue: 15680,
        avgSessionTime: 245,
        bounceRate: 34.2,
        topPages: [
          { page: '/rv-apps-hub', views: 4521, conversions: 156 },
          { page: '/solar-power-guide', views: 3892, conversions: 98 },
          { page: '/calculators', views: 2634, conversions: 76 },
          { page: '/', views: 1890, conversions: 54 }
        ],
        deviceMetrics: {
          mobile: 68.4,
          tablet: 18.7,
          desktop: 12.9
        },
        conversionFunnel: [
          { step: 'Page View', users: 12847, dropoffRate: 0 },
          { step: 'Product Interest', users: 8456, dropoffRate: 34.2 },
          { step: 'Click Affiliate Link', users: 1247, dropoffRate: 85.3 },
          { step: 'Complete Purchase', users: 384, dropoffRate: 69.2 }
        ]
      });
    }, 1000);
  };

  if (!analytics) {
    return (
      <Card className="bg-[#091020] border-gray-700">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-[#5B9BD5]" />
              Mobile Analytics Dashboard
            </CardTitle>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#131a2a] border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
            >
              <option value="1d">Last 24h</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sessions"
          value={analytics.sessions.toLocaleString()}
          icon={<Eye className="h-5 w-5" />}
          color="text-blue-400"
          trend="+12.3%"
          isPositive={true}
        />
        <MetricCard
          title="Conversions"
          value={analytics.conversions.toLocaleString()}
          icon={<Target className="h-5 w-5" />}
          color="text-green-400"
          trend="+8.7%"
          isPositive={true}
        />
        <MetricCard
          title="Revenue"
          value={`$${analytics.revenue.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          color="text-yellow-400"
          trend="+15.2%"
          isPositive={true}
        />
        <MetricCard
          title="Avg Session"
          value={`${Math.floor(analytics.avgSessionTime / 60)}m ${analytics.avgSessionTime % 60}s`}
          icon={<Clock className="h-5 w-5" />}
          color="text-purple-400"
          trend="-3.4%"
          isPositive={false}
        />
      </div>

      {/* Device Breakdown */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-[#5B9BD5]" />
            Device Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analytics.deviceMetrics).map(([device, percentage]) => (
              <div key={device} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="capitalize text-white font-medium">{device}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#5B9BD5] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-300 text-sm font-medium w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-[#131a2a] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-medium">Mobile-First Impact</span>
            </div>
            <p className="text-gray-300 text-sm">
              Mobile users convert 23% higher than desktop visitors with our optimized experience.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Pages */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-3 bg-[#131a2a] rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center border-[#5B9BD5] text-[#5B9BD5]">
                    {index + 1}
                  </Badge>
                  <div>
                    <div className="text-white font-medium">{page.page}</div>
                    <div className="text-gray-400 text-sm">{page.views.toLocaleString()} views</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">{page.conversions}</div>
                  <div className="text-gray-400 text-sm">conversions</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Mobile Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.conversionFunnel.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex items-center justify-between p-4 bg-[#131a2a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-[#5B9BD5] font-bold text-lg">{index + 1}</div>
                    <div>
                      <div className="text-white font-medium">{step.step}</div>
                      <div className="text-gray-400 text-sm">
                        {step.users.toLocaleString()} users
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {step.dropoffRate > 0 && (
                      <div className="text-red-400 text-sm">
                        -{step.dropoffRate}% dropoff
                      </div>
                    )}
                    <div className="text-white font-bold">
                      {((step.users / analytics.conversionFunnel[0].users) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                {index < analytics.conversionFunnel.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-4 bg-gray-600"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 rounded-lg border border-[#5B9BD5]/20">
            <h4 className="text-white font-medium mb-2">💡 Optimization Opportunities</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Reduce product interest dropoff with better CTAs</li>
              <li>• A/B testing is improving affiliate clicks by 8.7%</li>
              <li>• Mobile checkout optimization could boost conversions 15%</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity */}
      <RealTimeActivity />
    </div>
  );
};

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  color, 
  trend, 
  isPositive 
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend: string;
  isPositive: boolean;
}) => (
  <Card className="bg-[#091020] border-gray-700">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`${color}`}>{icon}</div>
        <div className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend}
        </div>
      </div>
      <div className="text-white text-2xl font-bold mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
    </CardContent>
  </Card>
);

const RealTimeActivity = () => {
  const [activities, setActivities] = useState([
    { type: 'conversion', message: 'User purchased RV LIFE Pro GPS', time: '2m ago' },
    { type: 'view', message: 'Product viewed: WeBoost Drive Reach', time: '3m ago' },
    { type: 'conversion', message: 'User subscribed to Campendium', time: '5m ago' },
    { type: 'view', message: 'Page visited: Solar Power Guide', time: '7m ago' }
  ]);

  return (
    <Card className="bg-[#091020] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Real-time Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-2">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'conversion' ? 'bg-green-400' : 'bg-blue-400'
              }`} />
              <div className="flex-1">
                <div className="text-white text-sm">{activity.message}</div>
                <div className="text-gray-400 text-xs">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalytics;