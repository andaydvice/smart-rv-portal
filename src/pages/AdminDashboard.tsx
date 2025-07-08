import React from 'react';
import Layout from '@/components/layout/Layout';
import AdminRoute from '@/components/auth/AdminRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Shield, 
  BarChart3, 
  Users, 
  Settings, 
  Database,
  Search,
  Smartphone,
  TrendingUp,
  Clock,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

const AdminDashboard = () => {
  const { user } = useAuth();

  const adminTools = [
    {
      title: "Enterprise Intelligence",
      description: "AI-powered revenue optimization and competitive analysis",
      icon: Brain,
      href: "/enterprise-intelligence",
      status: "active",
      features: ["Revenue AI", "Analytics", "Automation", "Performance Intelligence"]
    },
    {
      title: "User Management",
      description: "Manage user accounts and admin privileges",
      icon: Users,
      href: "/admin/users",
      status: "coming-soon",
      features: ["User Roles", "Admin Access", "Activity Logs"]
    },
    {
      title: "Content Analytics",
      description: "Track content performance and SEO metrics",
      icon: BarChart3,
      href: "/admin/analytics",
      status: "active",
      features: ["Page Analytics", "SEO Tracking", "Conversion Metrics"]
    },
    {
      title: "Mobile Analytics",
      description: "Mobile user behavior and performance insights",
      icon: Smartphone,
      href: "/admin/mobile-analytics",
      status: "active",
      features: ["Mobile Traffic", "App Performance", "User Journey"]
    },
    {
      title: "SEO Dashboard",
      description: "Search engine optimization monitoring and tools",
      icon: Search,
      href: "/admin/seo",
      status: "active",
      features: ["Keyword Rankings", "Site Health", "Content Optimization"]
    },
    {
      title: "System Settings",
      description: "Configure site settings and preferences",
      icon: Settings,
      href: "/admin/settings",
      status: "coming-soon",
      features: ["Site Config", "API Keys", "Notifications"]
    }
  ];

  const quickStats = [
    {
      label: "Total Users",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users
    },
    {
      label: "Monthly Revenue",
      value: "$24,580",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp
    },
    {
      label: "System Health",
      value: "99.8%",
      change: "Stable",
      trend: "stable",
      icon: Activity
    },
    {
      label: "Active Sessions",
      value: "156",
      change: "+5",
      trend: "up",
      icon: Clock
    }
  ];

  const recentAlerts = [
    {
      type: "info",
      message: "Database backup completed successfully",
      time: "2 hours ago"
    },
    {
      type: "warning",
      message: "High traffic detected on /storage-facilities",
      time: "4 hours ago"
    },
    {
      type: "success",
      message: "New user registrations increased by 15%",
      time: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'coming-soon': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'success': return <Activity className="h-4 w-4 text-green-400" />;
      default: return <AlertCircle className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <AdminRoute>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-300">
                Welcome back, {user?.email}. Here's what's happening with your site.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="bg-[#091020] border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {getTrendIcon(stat.trend)}
                            <span className="text-sm text-gray-300">{stat.change}</span>
                          </div>
                        </div>
                        <IconComponent className="h-8 w-8 text-[#5B9BD5]" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Admin Tools */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-white mb-6">Admin Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {adminTools.map((tool, index) => {
                    const IconComponent = tool.icon;
                    return (
                      <Card key={index} className="bg-[#091020] border-gray-700 hover:border-[#5B9BD5]/50 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <IconComponent className="h-8 w-8 text-[#5B9BD5]" />
                            <Badge className={getStatusColor(tool.status)} variant="secondary">
                              {tool.status === 'active' ? 'Active' : 'Coming Soon'}
                            </Badge>
                          </div>
                          <CardTitle className="text-white">{tool.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tool.features.map((feature, fIndex) => (
                              <Badge key={fIndex} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          {tool.status === 'active' ? (
                            <Button asChild className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                              <Link to={tool.href}>Open {tool.title}</Link>
                            </Button>
                          ) : (
                            <Button disabled className="w-full">
                              Coming Soon
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity & Alerts */}
              <div className="space-y-6">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAlerts.map((alert, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#131a2a]">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <p className="text-sm text-white">{alert.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:text-white">
                      <Database className="h-4 w-4 mr-2" />
                      Backup Database
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:text-white">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Scan
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:text-white">
                      <Activity className="h-4 w-4 mr-2" />
                      System Health Check
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </AdminRoute>
  );
};

export default AdminDashboard;