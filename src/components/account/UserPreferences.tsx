import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Settings, MapPin, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserPreferences = () => {
  const { preferences, updatePreferences, removeWeatherLocation, isUpdating } = useUserPreferences();
  const { toast } = useToast();

  const handleUnitChange = (unitType: string, value: string) => {
    updatePreferences({
      default_units: {
        ...preferences.default_units,
        [unitType]: value
      }
    });
    
    toast({
      title: "Preferences Updated",
      description: `Default ${unitType} unit changed to ${value}`,
    });
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    updatePreferences({
      notifications: {
        ...preferences.notifications,
        [type]: value
      }
    });
    
    toast({
      title: "Notification Settings Updated",
      description: `${type} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleRemoveLocation = (location: any) => {
    removeWeatherLocation(location);
    toast({
      title: "Location Removed",
      description: `${location.name} removed from saved locations`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Unit Preferences */}
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-[#60A5FA] flex items-center">
            <Settings className="h-6 w-6 mr-2" />
            Unit Preferences
          </CardTitle>
          <CardDescription className="text-gray-400">
            Set your default units for calculations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white">Distance</label>
              <Select
                value={preferences.default_units.distance}
                onValueChange={(value) => handleUnitChange('distance', value)}
              >
                <SelectTrigger className="bg-[#131a2a] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="miles">Miles</SelectItem>
                  <SelectItem value="kilometers">Kilometers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white">Weight</label>
              <Select
                value={preferences.default_units.weight}
                onValueChange={(value) => handleUnitChange('weight', value)}
              >
                <SelectTrigger className="bg-[#131a2a] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white">Temperature</label>
              <Select
                value={preferences.default_units.temperature}
                onValueChange={(value) => handleUnitChange('temperature', value)}
              >
                <SelectTrigger className="bg-[#131a2a] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Weather Locations */}
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-[#60A5FA] flex items-center">
            <MapPin className="h-6 w-6 mr-2" />
            Saved Weather Locations ({preferences.weather_locations?.length || 0})
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage your saved weather locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!preferences.weather_locations || preferences.weather_locations.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No saved weather locations yet</p>
              <Button 
                variant="outline" 
                className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
                onClick={() => window.location.href = '/weather'}
              >
                Browse Weather Locations
              </Button>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {preferences.weather_locations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#131a2a] rounded-lg border border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#60A5FA]" />
                    <div>
                      <p className="font-semibold text-white">{location.name}</p>
                      <p className="text-sm text-gray-400">
                        {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                        {location.country && ` • ${location.country}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => handleRemoveLocation(location)}
                    disabled={isUpdating}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-[#60A5FA]">Notification Preferences</CardTitle>
          <CardDescription className="text-gray-400">
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#131a2a] rounded-lg">
            <div>
              <p className="font-semibold text-white">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive updates and alerts via email</p>
            </div>
            <Button
              variant={preferences.notifications.email ? "default" : "outline"}
              onClick={() => handleNotificationChange('email', !preferences.notifications.email)}
              disabled={isUpdating}
            >
              {preferences.notifications.email ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-[#131a2a] rounded-lg">
            <div>
              <p className="font-semibold text-white">Browser Notifications</p>
              <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
            </div>
            <Button
              variant={preferences.notifications.browser ? "default" : "outline"}
              onClick={() => handleNotificationChange('browser', !preferences.notifications.browser)}
              disabled={isUpdating}
            >
              {preferences.notifications.browser ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPreferences;