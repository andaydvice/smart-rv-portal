
import React from "react";
import TwoFactorSettings from "@/components/auth/TwoFactorSettings";
import { useAuth } from "@/components/auth/AuthContext";
import PasswordStrengthSettings from "@/components/auth/PasswordStrengthSettings";
import SecurityVerificationLogs from "@/components/auth/SecurityVerificationLogs";
import SavedCalculations from "@/components/account/SavedCalculations";
import UserPreferences from "@/components/account/UserPreferences";
import { Shield, Lock, History, Calculator, Settings, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/components/storage/useFavorites";

const AccountPage = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();

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

        <Tabs defaultValue="data" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>My Data</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="data">
            <SavedCalculations />
          </TabsContent>
          
          <TabsContent value="preferences">
            <UserPreferences />
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="bg-[#091020] border-gray-700 text-white p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 mr-2 text-[#60A5FA]" />
                <h2 className="text-2xl font-bold text-[#60A5FA]">Favorite Storage Facilities ({favorites.length})</h2>
              </div>
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No favorite storage facilities yet</p>
                  <button 
                    className="px-4 py-2 bg-[#60A5FA] text-white rounded hover:bg-blue-600"
                    onClick={() => window.location.href = '/storage'}
                  >
                    Browse Storage Facilities
                  </button>
                </div>
              ) : (
                <p className="text-gray-400">Your favorited storage facilities will be displayed here with enhanced features coming soon.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="space-y-6">
              <TwoFactorSettings />
              <PasswordStrengthSettings />
              <SecurityVerificationLogs />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountPage;
