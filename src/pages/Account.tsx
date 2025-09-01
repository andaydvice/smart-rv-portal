
import React from "react";
import TwoFactorSettings from "@/components/auth/TwoFactorSettings";
import { useAuth } from "@/components/auth/AuthContext";
import PasswordStrengthSettings from "@/components/auth/PasswordStrengthSettings";
import SecurityVerificationLogs from "@/components/auth/SecurityVerificationLogs";
import { Shield, Lock, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

const AccountPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-12">
        <p className="text-white">Please log in to access account settings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080F1F] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-[#E2E8FF] mb-8">Manage your security preferences and account information</p>

        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Password</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="security">
            <div className="space-y-6">
              <TwoFactorSettings />
            </div>
          </TabsContent>
          
          <TabsContent value="password">
            <div className="space-y-6">
              <PasswordStrengthSettings />
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="space-y-6">
              <SecurityVerificationLogs />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16">
          <OptimizedAffiliateGrid
            title="Recommended RV Services"
            subtitle="These are partner recommendations to help enhance your RV experience"
            partners={[
              {
                partner: 'goodsam',
                title: 'Good Sam Membership',
                description: 'Save on camping, fuel, and RV services while getting 24/7 roadside assistance.',
                features: ['10% camping discounts', '24/7 roadside assistance', 'Fuel savings', 'Emergency support']
              },
              {
                partner: 'rvlife',
                title: 'RV LIFE Pro',
                description: 'Premium trip planning tools and exclusive campground access for serious RV travelers.',
                features: ['Advanced trip planner', 'Exclusive campgrounds', 'Expert travel tips', 'Route optimization']
              },
              {
                partner: 'rvshare',
                title: 'RVshare Hosting',
                description: 'Earn income by renting your RV when not in use, with full insurance coverage.',
                features: ['Earn extra income', 'Insurance included', 'Easy booking system', 'Host support']
              }
            ]}
            gridCols="3"
          />
        </div>
        
        <AffiliateDisclosure className="mt-8" />
      </div>
    </div>
  );
};

export default AccountPage;
