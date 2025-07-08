import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Trash2, 
  Save,
  AlertCircle,
  CheckCircle,
  Camera
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AccountSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: ''
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) throw error;
        
        setProfileData({
          firstName: data?.first_name || '',
          lastName: data?.last_name || '',
          email: user.email || '',
          avatarUrl: data?.avatar_url || ''
        });
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data');
      } finally {
        setProfileLoading(false);
      }
    };
    
    loadProfile();
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          avatar_url: profileData.avatarUrl
        });
      
      if (error) throw error;
      
      setSuccess('Profile updated successfully!');
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
      
      if (error) throw error;
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccess('Password updated successfully!');
      toast({
        title: "Success",
        description: "Your password has been updated.",
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (firstName: string, lastName: string, email: string) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  if (profileLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B9BD5] mx-auto"></div>
            <p className="mt-4 text-white">Loading your account settings...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22]">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Account Settings
              </h1>
              <p className="text-gray-300">
                Manage your profile, security, and preferences
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

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-[#131a2a] border border-gray-700">
                <TabsTrigger 
                  value="profile"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy"
                  className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <p className="text-gray-400">Update your personal information and profile picture</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex items-center space-x-6">
                        <Avatar className="h-20 w-20">
                          <AvatarFallback className="bg-[#5B9BD5] text-white text-lg">
                            {getInitials(profileData.firstName, profileData.lastName, profileData.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Button type="button" variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                            <Camera className="h-4 w-4 mr-2" />
                            Change Picture
                          </Button>
                          <p className="text-sm text-gray-400 mt-1">JPG, PNG or GIF (max. 2MB)</p>
                        </div>
                      </div>

                      <Separator className="bg-gray-700" />

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="bg-[#131a2a] border-gray-700 text-white placeholder:text-gray-400"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="bg-[#131a2a] border-gray-700 text-white placeholder:text-gray-400"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className="bg-gray-800 border-gray-700 text-gray-400"
                        />
                        <p className="text-sm text-gray-400">Email cannot be changed from this page</p>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Password & Security</CardTitle>
                    <p className="text-gray-400">Manage your password and security settings</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-white">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="bg-[#131a2a] border-gray-700 text-white placeholder:text-gray-400"
                          placeholder="Enter new password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="bg-[#131a2a] border-gray-700 text-white placeholder:text-gray-400"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={loading || !passwordData.newPassword || !passwordData.confirmPassword}
                          className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Notification Preferences</CardTitle>
                    <p className="text-gray-400">Choose what notifications you want to receive</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Notification settings coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy">
                <Card className="bg-[#091020] border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Privacy & Data</CardTitle>
                    <p className="text-gray-400">Manage your privacy settings and data</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <Shield className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">Privacy settings coming soon</p>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      {/* Danger Zone */}
                      <div className="border border-red-600 rounded-lg p-4 bg-red-600/10">
                        <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                        <p className="text-gray-300 text-sm mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button 
                          variant="destructive" 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            toast({
                              title: "Feature Coming Soon",
                              description: "Account deletion will be available in a future update.",
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AccountSettings;