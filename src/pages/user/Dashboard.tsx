import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { Calculator, Heart, Settings, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useFavorites } from "@/components/storage/useFavorites";

const UserDashboard = () => {
  const { user } = useAuth();
  const { history } = useCalculatorHistory();
  const { favorites } = useFavorites();

  const recentCalculations = history.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#080F1F] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-[#E2E8FF]">Your personalized RV dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#091020] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#E2E8FF] text-sm">Saved Calculations</p>
                  <p className="text-2xl font-bold text-white">{history.length}</p>
                </div>
                <Calculator className="h-8 w-8 text-[#60A5FA]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#091020] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#E2E8FF] text-sm">Favorite Facilities</p>
                  <p className="text-2xl font-bold text-white">{favorites.length}</p>
                </div>
                <Heart className="h-8 w-8 text-[#60A5FA]" />
              </div>
            </CardContent>
          </Card>

          <Link to="/user/calculations" className="block">
            <Card className="bg-[#091020] border-gray-700 hover:border-[#60A5FA] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#E2E8FF] text-sm">View All</p>
                    <p className="text-lg font-bold text-white">Calculations</p>
                  </div>
                  <Activity className="h-8 w-8 text-[#60A5FA]" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/favorites" className="block">
            <Card className="bg-[#091020] border-gray-700 hover:border-[#60A5FA] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#E2E8FF] text-sm">View All</p>
                    <p className="text-lg font-bold text-white">Favorites</p>
                  </div>
                  <Heart className="h-8 w-8 text-[#60A5FA]" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/account" className="block">
            <Card className="bg-[#091020] border-gray-700 hover:border-[#60A5FA] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#E2E8FF] text-sm">Account</p>
                    <p className="text-lg font-bold text-white">Settings</p>
                  </div>
                  <Settings className="h-8 w-8 text-[#60A5FA]" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#60A5FA]">Recent Calculations</CardTitle>
              <CardDescription className="text-[#E2E8FF]">Your latest saved calculations</CardDescription>
            </CardHeader>
            <CardContent>
              {recentCalculations.length === 0 ? (
                <div className="text-center py-8">
                  <Calculator className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No saved calculations yet</p>
                  <Link 
                    to="/calculators"
                    className="inline-flex items-center px-4 py-2 bg-[#60A5FA] text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Start Calculating
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentCalculations.map((calc) => (
                    <div key={calc.id} className="p-3 bg-[#131a2a] rounded-lg border border-gray-600">
                      <p className="text-white font-medium capitalize">{calc.calculator_type.replace('_', ' ')}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(calc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  <Link 
                    to="/user/calculations" 
                    className="block text-center text-[#60A5FA] hover:underline mt-4"
                  >
                    View all calculations →
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#60A5FA]">Quick Actions</CardTitle>
              <CardDescription className="text-[#E2E8FF]">Common tasks and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link 
                to="/calculators"
                className="block p-3 bg-[#131a2a] rounded-lg border border-gray-600 hover:border-[#60A5FA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calculator className="h-5 w-5 text-[#60A5FA]" />
                  <span className="text-white">RV Calculators</span>
                </div>
              </Link>
              
              <Link 
                to="/storage-facilities"
                className="block p-3 bg-[#131a2a] rounded-lg border border-gray-600 hover:border-[#60A5FA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-[#60A5FA]" />
                  <span className="text-white">Storage Facilities</span>
                </div>
              </Link>

              <Link 
                to="/weather"
                className="block p-3 bg-[#131a2a] rounded-lg border border-gray-600 hover:border-[#60A5FA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-[#60A5FA]" />
                  <span className="text-white">Weather Dashboard</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;