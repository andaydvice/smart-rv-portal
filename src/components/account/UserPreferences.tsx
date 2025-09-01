import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from 'lucide-react';

const UserPreferences = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-[#60A5FA] flex items-center">
            <Calculator className="h-6 w-6 mr-2" />
            Calculator Preferences
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your calculator preferences are automatically applied based on your usage patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Calculator className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">Calculator preferences are learned from your usage and automatically optimized for better results.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPreferences;