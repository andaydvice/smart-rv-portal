import React from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, Shield, Mail } from 'lucide-react';

const AccountInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  const accountCreated = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown';
  const lastSignIn = user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Unknown';
  const twoFactorEnabled = !!user.user_metadata?.twofactor_enabled;

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-[#60A5FA] flex items-center">
          <User className="h-6 w-6 mr-2" />
          Account Information
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your account details and security status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#60A5FA]" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#60A5FA]" />
            <div>
              <p className="text-sm text-gray-400">Account Created</p>
              <p className="text-white">{accountCreated}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#60A5FA]" />
            <div>
              <p className="text-sm text-gray-400">Last Sign In</p>
              <p className="text-white">{lastSignIn}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[#60A5FA]" />
            <div>
              <p className="text-sm text-gray-400">Two-Factor Auth</p>
              <p className={`font-medium ${twoFactorEnabled ? 'text-green-400' : 'text-yellow-400'}`}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;