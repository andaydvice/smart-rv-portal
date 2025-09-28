import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, RotateCcw } from "lucide-react";

interface AdminSetting {
  id: string;
  setting_category: string;
  setting_key: string;
  setting_value: any;
  description: string;
  data_type: string;
  is_sensitive: boolean;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [hasChanges, setHasChanges] = useState(false);
  const [settingValues, setSettingValues] = useState<Record<string, any>>({});

  // Fetch admin settings
  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .order('setting_category, setting_key');
      
      if (error) throw error;
      return data as AdminSetting[];
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (updates: { category: string; key: string; value: any }[]) => {
      const promises = updates.map(async (update) => {
        const { error } = await supabase
          .from('admin_settings')
          .update({ 
            setting_value: update.value,
            updated_at: new Date().toISOString(),
            updated_by: (await supabase.auth.getUser()).data.user?.id
          })
          .eq('setting_category', update.category)
          .eq('setting_key', update.key);
        
        if (error) throw error;
      });

      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      setHasChanges(false);
      setSettingValues({});
      toast({
        title: "Settings updated",
        description: "Admin settings have been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating settings",
        description: `Failed to update settings: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    const settingKey = `${category}.${key}`;
    setSettingValues(prev => ({
      ...prev,
      [settingKey]: value
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    const updates = Object.entries(settingValues).map(([settingKey, value]) => {
      const [category, key] = settingKey.split('.');
      return { category, key, value };
    });

    updateSettingsMutation.mutate(updates);
  };

  const handleResetSettings = () => {
    setSettingValues({});
    setHasChanges(false);
    toast({
      title: "Changes discarded",
      description: "All unsaved changes have been discarded.",
    });
  };

  const getSettingValue = (category: string, key: string, currentValue: any) => {
    const settingKey = `${category}.${key}`;
    return settingValues[settingKey] !== undefined ? settingValues[settingKey] : currentValue;
  };

  const renderBooleanSetting = (setting: AdminSetting, fieldKey: string, label: string) => {
    const currentValue = setting.setting_value[fieldKey] || false;
    const displayValue = getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value);
    
    return (
      <div className="flex items-center justify-between">
        <Label htmlFor={`${setting.setting_key}-${fieldKey}`} className="text-sm font-medium">
          {label}
        </Label>
        <Switch
          id={`${setting.setting_key}-${fieldKey}`}
          checked={displayValue[fieldKey] || false}
          onCheckedChange={(checked) => {
            const newValue = { ...displayValue, [fieldKey]: checked };
            handleSettingChange(setting.setting_category, setting.setting_key, newValue);
          }}
        />
      </div>
    );
  };

  const renderNumberSetting = (setting: AdminSetting, fieldKey: string, label: string) => {
    const displayValue = getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value);
    
    return (
      <div className="space-y-2">
        <Label htmlFor={`${setting.setting_key}-${fieldKey}`} className="text-sm font-medium">
          {label}
        </Label>
        <Input
          id={`${setting.setting_key}-${fieldKey}`}
          type="number"
          value={displayValue[fieldKey] || 0}
          onChange={(e) => {
            const newValue = { ...displayValue, [fieldKey]: parseInt(e.target.value) || 0 };
            handleSettingChange(setting.setting_category, setting.setting_key, newValue);
          }}
          className="max-w-xs"
        />
      </div>
    );
  };

  const renderArraySetting = (setting: AdminSetting, fieldKey: string, label: string) => {
    const displayValue = getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value);
    const arrayValue = displayValue[fieldKey] || [];
    
    return (
      <div className="space-y-2">
        <Label htmlFor={`${setting.setting_key}-${fieldKey}`} className="text-sm font-medium">
          {label}
        </Label>
        <Textarea
          id={`${setting.setting_key}-${fieldKey}`}
          value={arrayValue.join('\n')}
          onChange={(e) => {
            const newArray = e.target.value.split('\n').filter(line => line.trim());
            const newValue = { ...displayValue, [fieldKey]: newArray };
            handleSettingChange(setting.setting_category, setting.setting_key, newValue);
          }}
          placeholder="Enter one item per line"
          rows={4}
        />
      </div>
    );
  };

  const renderSettingCard = (setting: AdminSetting) => {
    return (
      <Card key={setting.id} className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">{setting.setting_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
          <CardDescription>{setting.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {setting.setting_category === 'ai_behavior' && setting.setting_key === 'enable_ai_features' && (
            renderBooleanSetting(setting, 'enabled', 'Enable AI Features')
          )}
          
          {setting.setting_category === 'ai_behavior' && setting.setting_key === 'response_templates' && (
            <>
              <div className="space-y-2">
                <Label>Default Greeting</Label>
                <Input
                  value={getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value).default_greeting || ''}
                  onChange={(e) => {
                    const newValue = { 
                      ...getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value), 
                      default_greeting: e.target.value 
                    };
                    handleSettingChange(setting.setting_category, setting.setting_key, newValue);
                  }}
                  placeholder="Enter default AI greeting"
                />
              </div>
              {renderArraySetting(setting, 'disclaimers', 'AI Disclaimers')}
            </>
          )}

          {setting.setting_category === 'ai_behavior' && setting.setting_key === 'content_filtering' && (
            <>
              {renderBooleanSetting(setting, 'enable_profanity_filter', 'Enable Profanity Filter')}
              {renderBooleanSetting(setting, 'enable_spam_detection', 'Enable Spam Detection')}
              {renderBooleanSetting(setting, 'auto_moderate', 'Auto Moderate Content')}
            </>
          )}

          {setting.setting_category === 'ai_behavior' && setting.setting_key === 'knowledge_base_settings' && (
            <>
              {renderBooleanSetting(setting, 'auto_update', 'Auto Update Knowledge Base')}
              {renderBooleanSetting(setting, 'include_user_generated', 'Include User Generated Content')}
              <div className="space-y-2">
                <Label>Confidence Threshold</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value).confidence_threshold || 0.8}
                  onChange={(e) => {
                    const newValue = { 
                      ...getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value), 
                      confidence_threshold: parseFloat(e.target.value) || 0.8 
                    };
                    handleSettingChange(setting.setting_category, setting.setting_key, newValue);
                  }}
                  className="max-w-xs"
                />
              </div>
            </>
          )}

          {setting.setting_category === 'document_processing' && setting.setting_key === 'upload_limits' && (
            <>
              {renderNumberSetting(setting, 'max_file_size_mb', 'Max File Size (MB)')}
              {renderNumberSetting(setting, 'max_files_per_user', 'Max Files Per User')}
              {renderArraySetting(setting, 'allowed_types', 'Allowed File Types')}
            </>
          )}

          {setting.setting_category === 'document_processing' && setting.setting_key === 'auto_approval' && (
            <>
              {renderBooleanSetting(setting, 'enable_auto_approval', 'Enable Auto Approval')}
              {renderBooleanSetting(setting, 'require_manual_review', 'Require Manual Review')}
              {renderArraySetting(setting, 'trusted_domains', 'Trusted Domains')}
            </>
          )}

          {setting.setting_category === 'system' && setting.setting_key === 'rate_limiting' && (
            <>
              {renderNumberSetting(setting, 'api_requests_per_minute', 'API Requests Per Minute')}
              {renderNumberSetting(setting, 'upload_requests_per_hour', 'Upload Requests Per Hour')}
              {renderNumberSetting(setting, 'search_requests_per_minute', 'Search Requests Per Minute')}
            </>
          )}

          {setting.setting_category === 'system' && setting.setting_key === 'user_management' && (
            <>
              {renderBooleanSetting(setting, 'allow_self_registration', 'Allow Self Registration')}
              {renderBooleanSetting(setting, 'require_email_verification', 'Require Email Verification')}
              <div className="space-y-2">
                <Label>Default Role</Label>
                <Select
                  value={getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value).default_role || 'user'}
                  onValueChange={(value) => {
                    const newValue = { 
                      ...getSettingValue(setting.setting_category, setting.setting_key, setting.setting_value), 
                      default_role: value 
                    };
                    handleSettingChange(setting.setting_category, setting.setting_key, newValue);
                  }}
                >
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {setting.setting_category === 'content' && setting.setting_key === 'newsletter_settings' && (
            <>
              {renderBooleanSetting(setting, 'allow_subscriptions', 'Allow Newsletter Subscriptions')}
              {renderBooleanSetting(setting, 'double_opt_in', 'Require Double Opt-in')}
              {renderNumberSetting(setting, 'max_subscribers', 'Max Subscribers')}
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!settings) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No settings found.</p>
        </CardContent>
      </Card>
    );
  }

  const categorizedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.setting_category]) {
      acc[setting.setting_category] = [];
    }
    acc[setting.setting_category].push(setting);
    return acc;
  }, {} as Record<string, AdminSetting[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
          <p className="text-muted-foreground">Configure AI behavior, document processing, and system settings</p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Button
              variant="outline"
              onClick={handleResetSettings}
              disabled={updateSettingsMutation.isPending}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Changes
            </Button>
          )}
          <Button
            onClick={handleSaveSettings}
            disabled={!hasChanges || updateSettingsMutation.isPending}
          >
            {updateSettingsMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ai_behavior" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ai_behavior">AI Behavior</TabsTrigger>
          <TabsTrigger value="document_processing">Documents</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="ai_behavior" className="space-y-4">
          {categorizedSettings.ai_behavior?.map(renderSettingCard)}
        </TabsContent>

        <TabsContent value="document_processing" className="space-y-4">
          {categorizedSettings.document_processing?.map(renderSettingCard)}
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          {categorizedSettings.system?.map(renderSettingCard)}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {categorizedSettings.content?.map(renderSettingCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;