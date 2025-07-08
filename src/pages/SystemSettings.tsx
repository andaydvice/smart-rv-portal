import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import AdminRoute from '@/components/auth/AdminRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Globe, 
  Shield, 
  Zap, 
  Save,
  AlertCircle,
  CheckCircle,
  Database,
  Mail,
  Bell,
  Palette
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SystemSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Site Configuration
  const [siteConfig, setSiteConfig] = useState({
    siteName: 'Smart RV',
    siteDescription: 'Your complete RV intelligence platform',
    adminEmail: 'admin@smartrv.com',
    supportEmail: 'support@smartrv.com',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true
  });

  // Feature Flags
  const [featureFlags, setFeatureFlags] = useState({
    enableBlogComments: true,
    enableReviews: true,
    enableAffiliate: true,
    enableAnalytics: true,
    enablePushNotifications: false,
    enableSocialLogin: false,
    enableAIAssistant: false,
    enableWeatherIntegration: true
  });

  // System Limits
  const [systemLimits, setSystemLimits] = useState({
    maxFileUploadSize: 10, // MB
    maxReviewLength: 1000,
    maxBlogPostLength: 50000,
    rateLimit: 100, // requests per hour
    sessionTimeout: 24, // hours
    maxLoginAttempts: 5
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemAlerts: true,
    securityAlerts: true,
    maintenanceAlerts: true,
    performanceAlerts: false,
    userActivityAlerts: false
  });

  const handleSiteConfigSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Simulate API call to save site configuration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Site configuration updated successfully!');
      toast({
        title: "Success",
        description: "Site configuration has been updated.",
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update site configuration');
      toast({
        title: "Error",
        description: "Failed to update site configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureFlagsSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Simulate API call to save feature flags
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Feature flags updated successfully!');
      toast({
        title: "Success",
        description: "Feature flags have been updated.",
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update feature flags');
      toast({
        title: "Error",
        description: "Failed to update feature flags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSystemLimitsSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Simulate API call to save system limits
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('System limits updated successfully!');
      toast({
        title: "Success",
        description: "System limits have been updated.",
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update system limits');
      toast({
        title: "Error",
        description: "Failed to update system limits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSettingsSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Simulate API call to save notification settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Notification settings updated successfully!');
      toast({
        title: "Success",
        description: "Notification settings have been updated.",
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update notification settings');
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminRoute>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22]">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Settings className="h-8 w-8 text-[#5B9BD5]" />
                System Settings
              </h1>
              <p className="text-gray-300">
                Configure global application settings and features
              </p>
            </div>

            {/* Global Alerts */}
            {error && (
              <Alert className="mb-6 border-red-600 bg-red-600/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-600 bg-green-600/10">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="site" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-[#131a2a] border border-gray-700">
                <TabsTrigger 
                  value="site"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Site Config
                </TabsTrigger>
                <TabsTrigger 
                  value="features"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Features
                </TabsTrigger>
                <TabsTrigger 
                  value="limits"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Limits
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
              </TabsList>

              {/* Site Configuration */}
              <TabsContent value="site">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Site Configuration</CardTitle>
                    <p className="text-gray-400">Basic site information and settings</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="siteName" className="text-white">Site Name</Label>
                        <Input
                          id="siteName"
                          value={siteConfig.siteName}
                          onChange={(e) => setSiteConfig(prev => ({ ...prev, siteName: e.target.value }))}
                          className="bg-[#131a2a] border-gray-700 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="adminEmail" className="text-white">Admin Email</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          value={siteConfig.adminEmail}
                          onChange={(e) => setSiteConfig(prev => ({ ...prev, adminEmail: e.target.value }))}
                          className="bg-[#131a2a] border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteDescription" className="text-white">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={siteConfig.siteDescription}
                        onChange={(e) => setSiteConfig(prev => ({ ...prev, siteDescription: e.target.value }))}
                        className="bg-[#131a2a] border-gray-700 text-white"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Maintenance Mode</Label>
                          <p className="text-sm text-gray-400">Temporarily disable the site for maintenance</p>
                        </div>
                        <Switch
                          checked={siteConfig.maintenanceMode}
                          onCheckedChange={(checked) => setSiteConfig(prev => ({ ...prev, maintenanceMode: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Allow Registration</Label>
                          <p className="text-sm text-gray-400">Enable new user registration</p>
                        </div>
                        <Switch
                          checked={siteConfig.allowRegistration}
                          onCheckedChange={(checked) => setSiteConfig(prev => ({ ...prev, allowRegistration: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Require Email Verification</Label>
                          <p className="text-sm text-gray-400">Users must verify their email before accessing the site</p>
                        </div>
                        <Switch
                          checked={siteConfig.requireEmailVerification}
                          onCheckedChange={(checked) => setSiteConfig(prev => ({ ...prev, requireEmailVerification: checked }))}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleSiteConfigSave}
                      disabled={loading}
                      className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Configuration
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Feature Flags */}
              <TabsContent value="features">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Feature Flags</CardTitle>
                    <p className="text-gray-400">Enable or disable application features</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Content Features</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-white">Blog Comments</Label>
                            <p className="text-sm text-gray-400">Allow users to comment on blog posts</p>
                          </div>
                          <Switch
                            checked={featureFlags.enableBlogComments}
                            onCheckedChange={(checked) => setFeatureFlags(prev => ({ ...prev, enableBlogComments: checked }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-white">Product Reviews</Label>
                            <p className="text-sm text-gray-400">Enable product review system</p>
                          </div>
                          <Switch
                            checked={featureFlags.enableReviews}
                            onCheckedChange={(checked) => setFeatureFlags(prev => ({ ...prev, enableReviews: checked }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-white">Affiliate Links</Label>
                            <p className="text-sm text-gray-400">Show affiliate product recommendations</p>
                          </div>
                          <Switch
                            checked={featureFlags.enableAffiliate}
                            onCheckedChange={(checked) => setFeatureFlags(prev => ({ ...prev, enableAffiliate: checked }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">System Features</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-white">Analytics</Label>
                            <p className="text-sm text-gray-400">Track user behavior and performance</p>
                          </div>
                          <Switch
                            checked={featureFlags.enableAnalytics}
                            onCheckedChange={(checked) => setFeatureFlags(prev => ({ ...prev, enableAnalytics: checked }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-white">Push Notifications</Label>
                            <p className="text-sm text-gray-400">Send push notifications to users</p>
                          </div>
                          <Switch
                            checked={featureFlags.enablePushNotifications}
                            onCheckedChange={(checked) => setFeatureFlags(prev => ({ ...prev, enablePushNotifications: checked }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-white">AI Assistant</Label>
                            <p className="text-sm text-gray-400">Enable AI-powered assistance features</p>
                          </div>
                          <Switch
                            checked={featureFlags.enableAIAssistant}
                            onCheckedChange={(checked) => setFeatureFlags(prev => ({ ...prev, enableAIAssistant: checked }))}
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleFeatureFlagsSave}
                      disabled={loading}
                      className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Feature Flags
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System Limits */}
              <TabsContent value="limits">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">System Limits</CardTitle>
                    <p className="text-gray-400">Configure system performance and security limits</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxFileUpload" className="text-white">Max File Upload (MB)</Label>
                        <Input
                          id="maxFileUpload"
                          type="number"
                          value={systemLimits.maxFileUploadSize}
                          onChange={(e) => setSystemLimits(prev => ({ ...prev, maxFileUploadSize: parseInt(e.target.value) }))}
                          className="bg-[#131a2a] border-gray-700 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="rateLimit" className="text-white">Rate Limit (requests/hour)</Label>
                        <Input
                          id="rateLimit"
                          type="number"
                          value={systemLimits.rateLimit}
                          onChange={(e) => setSystemLimits(prev => ({ ...prev, rateLimit: parseInt(e.target.value) }))}
                          className="bg-[#131a2a] border-gray-700 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout" className="text-white">Session Timeout (hours)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={systemLimits.sessionTimeout}
                          onChange={(e) => setSystemLimits(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                          className="bg-[#131a2a] border-gray-700 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maxLoginAttempts" className="text-white">Max Login Attempts</Label>
                        <Input
                          id="maxLoginAttempts"
                          type="number"
                          value={systemLimits.maxLoginAttempts}
                          onChange={(e) => setSystemLimits(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                          className="bg-[#131a2a] border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleSystemLimitsSave}
                      disabled={loading}
                      className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save System Limits
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Notification Settings</CardTitle>
                    <p className="text-gray-400">Configure system-wide notification preferences</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Email Notifications</Label>
                          <p className="text-sm text-gray-400">Send email notifications for important events</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">System Alerts</Label>
                          <p className="text-sm text-gray-400">Notify admins of system status changes</p>
                        </div>
                        <Switch
                          checked={notificationSettings.systemAlerts}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, systemAlerts: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Security Alerts</Label>
                          <p className="text-sm text-gray-400">Alert on suspicious activity and security events</p>
                        </div>
                        <Switch
                          checked={notificationSettings.securityAlerts}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, securityAlerts: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Performance Alerts</Label>
                          <p className="text-sm text-gray-400">Monitor and alert on performance issues</p>
                        </div>
                        <Switch
                          checked={notificationSettings.performanceAlerts}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, performanceAlerts: checked }))}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleNotificationSettingsSave}
                      disabled={loading}
                      className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </AdminRoute>
  );
};

export default SystemSettings;