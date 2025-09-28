import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  Settings, 
  Brain, 
  FileText, 
  Shield, 
  Database,
  Save,
  RotateCcw
} from "lucide-react";

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
  const queryClient = useQueryClient();

  // Fetch all admin settings
  const { data: settings = [], isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .order('setting_category', { ascending: true })
        .order('setting_key', { ascending: true });
      
      if (error) throw error;
      return data as AdminSetting[];
    }
  });

  // Update setting mutation
  const updateSetting = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: any }) => {
      const { error } = await supabase
        .from('admin_settings')
        .update({ 
          setting_value: value,
          updated_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('Setting updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update setting: ' + error.message);
    }
  });

  const handleToggleChange = (setting: AdminSetting, enabled: boolean) => {
    const newValue = { ...setting.setting_value, enabled };
    updateSetting.mutate({ id: setting.id, value: newValue });
  };

  const handleObjectValueChange = (setting: AdminSetting, key: string, value: any) => {
    const newValue = { ...setting.setting_value, [key]: value };
    updateSetting.mutate({ id: setting.id, value: newValue });
  };

  const handleArrayValueChange = (setting: AdminSetting, newArray: string[]) => {
    const newValue = { ...setting.setting_value, [Object.keys(setting.setting_value)[0]]: newArray };
    updateSetting.mutate({ id: setting.id, value: newValue });
  };

  const renderSettingControl = (setting: AdminSetting) => {
    const value = setting.setting_value;

    if (setting.data_type === 'boolean' && typeof value.enabled !== 'undefined') {
      return (
        <div className="flex items-center space-x-2">
          <Switch 
            checked={value.enabled} 
            onCheckedChange={(checked) => handleToggleChange(setting, checked)}
          />
          <Label>Enable {setting.setting_key.replace(/_/g, ' ')}</Label>
        </div>
      );
    }

    if (setting.data_type === 'object') {
      return (
        <div className="space-y-4">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="space-y-2">
              <Label className="text-sm font-medium capitalize">
                {key.replace(/_/g, ' ')}
              </Label>
              {typeof val === 'boolean' ? (
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={val as boolean}
                    onCheckedChange={(checked) => handleObjectValueChange(setting, key, checked)}
                  />
                  <span className="text-sm">{val ? 'Enabled' : 'Disabled'}</span>
                </div>
              ) : typeof val === 'number' ? (
                <Input
                  type="number"
                  value={val as number}
                  onChange={(e) => handleObjectValueChange(setting, key, parseFloat(e.target.value))}
                  className="w-full"
                />
              ) : Array.isArray(val) ? (
                <div className="space-y-2">
                  <Textarea
                    value={(val as string[]).join('\n')}
                    onChange={(e) => handleArrayValueChange(setting, e.target.value.split('\n').filter(Boolean))}
                    placeholder="One item per line"
                    className="min-h-[100px]"
                  />
                  <div className="flex flex-wrap gap-1">
                    {(val as string[]).map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <Input
                  value={val as string}
                  onChange={(e) => handleObjectValueChange(setting, key, e.target.value)}
                  className="w-full"
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <Input
        value={typeof value === 'string' ? value : JSON.stringify(value)}
        onChange={(e) => updateSetting.mutate({ id: setting.id, value: e.target.value })}
        className="w-full"
      />
    );
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.setting_category]) {
      acc[setting.setting_category] = [];
    }
    acc[setting.setting_category].push(setting);
    return acc;
  }, {} as Record<string, AdminSetting[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai_behavior': return <Brain className="h-4 w-4" />;
      case 'document_processing': return <FileText className="h-4 w-4" />;
      case 'system': return <Shield className="h-4 w-4" />;
      case 'content': return <Database className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Settings
          </CardTitle>
          <CardDescription>Loading configuration settings...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Settings
          </CardTitle>
          <CardDescription>
            Configure system behavior, AI features, document processing, and content management
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue={Object.keys(groupedSettings)[0]} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {Object.keys(groupedSettings).map((category) => (
            <TabsTrigger key={category} value={category} className="flex items-center gap-2">
              {getCategoryIcon(category)}
              {getCategoryTitle(category)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedSettings).map(([category, categorySettings]) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6">
              {categorySettings.map((setting) => (
                <Card key={setting.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg capitalize">
                          {setting.setting_key.replace(/_/g, ' ')}
                        </CardTitle>
                        <CardDescription>{setting.description}</CardDescription>
                      </div>
                      {setting.is_sensitive && (
                        <Badge variant="destructive">Sensitive</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {renderSettingControl(setting)}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminSettings;