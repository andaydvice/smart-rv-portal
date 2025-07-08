import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, BellOff, Smartphone, DollarSign, Wrench, Star, X } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  category: 'deals' | 'maintenance' | 'recommendations' | 'updates';
}

const SmartNotificationCenter = () => {
  const {
    isSupported,
    permission,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe,
    sendDealAlert,
    sendMaintenanceReminder,
    sendPersonalizedRecommendation
  } = usePushNotifications();

  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'price_drops',
      title: 'Price Drop Alerts',
      description: 'Get notified when tracked products go on sale',
      icon: <DollarSign className="h-5 w-5 text-green-400" />,
      enabled: true,
      category: 'deals'
    },
    {
      id: 'new_deals',
      title: 'New Deal Notifications',
      description: 'Be first to know about exclusive RV deals',
      icon: <Star className="h-5 w-5 text-yellow-400" />,
      enabled: true,
      category: 'deals'
    },
    {
      id: 'maintenance_reminders',
      title: 'Maintenance Reminders',
      description: 'Seasonal RV maintenance and safety checks',
      icon: <Wrench className="h-5 w-5 text-blue-400" />,
      enabled: true,
      category: 'maintenance'
    },
    {
      id: 'personalized_recs',
      title: 'Personal Recommendations',
      description: 'Curated product suggestions based on your interests',
      icon: <Star className="h-5 w-5 text-purple-400" />,
      enabled: false,
      category: 'recommendations'
    }
  ]);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('notification_preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handlePermissionRequest = async () => {
    const granted = await requestPermission();
    if (granted) {
      await subscribe();
    }
  };

  const togglePreference = (id: string) => {
    const updated = preferences.map(pref => 
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    );
    setPreferences(updated);
    localStorage.setItem('notification_preferences', JSON.stringify(updated));
  };

  const sendTestNotification = (type: string) => {
    switch (type) {
      case 'deal':
        sendDealAlert('WeBoost Drive Reach RV', '25%', '/rv-apps-hub');
        break;
      case 'maintenance':
        sendMaintenanceReminder('winterizing your RV', 'Check antifreeze levels and tire pressure.');
        break;
      case 'recommendation':
        sendPersonalizedRecommendation('connectivity', ['Starlink for RV', 'Cell Signal Booster']);
        break;
    }
  };

  if (!isSupported) {
    return (
      <Card className="bg-[#091020] border-gray-700">
        <CardContent className="p-6 text-center">
          <BellOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Push notifications are not supported in this browser.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quick Access Toggle */}
      <Card className="bg-[#091020] border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-[#5B9BD5]" />
              <div>
                <h3 className="text-white font-medium">Smart Notifications</h3>
                <p className="text-gray-400 text-sm">
                  {permission === 'granted' ? 'Active' : 'Tap to enable'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {permission === 'granted' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#5B9BD5] hover:bg-[#5B9BD5]/10"
                >
                  Settings
                </Button>
              )}
              {permission !== 'granted' && (
                <Button
                  onClick={handlePermissionRequest}
                  className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-4 py-2"
                >
                  Enable
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expanded Settings */}
      {isExpanded && permission === 'granted' && (
        <Card className="bg-[#091020] border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {preferences.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-3 bg-[#131a2a] rounded-lg">
                <div className="flex items-center gap-3">
                  {pref.icon}
                  <div>
                    <h4 className="text-white font-medium">{pref.title}</h4>
                    <p className="text-gray-400 text-sm">{pref.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={pref.enabled}
                    onCheckedChange={() => togglePreference(pref.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => sendTestNotification(
                      pref.category === 'deals' ? 'deal' : 
                      pref.category === 'maintenance' ? 'maintenance' : 'recommendation'
                    )}
                    className="text-[#5B9BD5] hover:bg-[#5B9BD5]/10 text-xs"
                    disabled={!pref.enabled}
                  >
                    Test
                  </Button>
                </div>
              </div>
            ))}

            {/* Subscription Status */}
            <div className="mt-6 p-3 bg-[#131a2a] rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Subscription Status</h4>
                  <p className="text-gray-400 text-sm">
                    {subscription ? 'Active' : 'Not subscribed'}
                  </p>
                </div>
                {subscription && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={unsubscribe}
                    className="border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    Unsubscribe
                  </Button>
                )}
              </div>
            </div>

            {/* Smart Features */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 rounded-lg border border-[#5B9BD5]/20">
              <h4 className="text-white font-medium mb-2">🚀 Smart Features</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Price tracking with instant alerts</li>
                <li>• Seasonal maintenance reminders</li>
                <li>• Personalized product recommendations</li>
                <li>• Emergency service notifications</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartNotificationCenter;