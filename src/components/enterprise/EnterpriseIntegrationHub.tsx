import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Key, 
  Webhook, 
  Database, 
  Shield, 
  Zap,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertTriangle,
  Globe,
  Settings,
  FileText,
  Clock,
  Activity
} from 'lucide-react';

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  status: 'active' | 'deprecated' | 'beta';
  usage: number;
  lastUsed: Date;
  authentication: 'none' | 'api_key' | 'bearer' | 'oauth';
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'error';
  lastDelivery: Date;
  successRate: number;
  retryPolicy: 'exponential' | 'linear' | 'none';
}

interface Integration {
  id: string;
  name: string;
  type: 'CRM' | 'ERP' | 'Analytics' | 'Payment' | 'Email' | 'Social';
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  dataFlow: 'bidirectional' | 'inbound' | 'outbound';
  recordsSynced: number;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  environment: 'production' | 'staging' | 'development';
  usage: number;
  rateLimit: number;
  expiresAt?: Date;
  lastUsed: Date;
}

const EnterpriseIntegrationHub = () => {
  const [apiEndpoints, setApiEndpoints] = useState<APIEndpoint[]>([
    {
      id: '1',
      name: 'Customer Data API',
      method: 'GET',
      endpoint: '/api/v1/customers',
      description: 'Retrieve customer information and preferences',
      status: 'active',
      usage: 45678,
      lastUsed: new Date('2024-07-08T10:30:00'),
      authentication: 'api_key'
    },
    {
      id: '2',
      name: 'Product Catalog API',
      method: 'GET',
      endpoint: '/api/v1/products',
      description: 'Access complete product catalog with real-time inventory',
      status: 'active',
      usage: 32145,
      lastUsed: new Date('2024-07-08T09:15:00'),
      authentication: 'bearer'
    },
    {
      id: '3',
      name: 'Order Management API',
      method: 'POST',
      endpoint: '/api/v1/orders',
      description: 'Create and manage customer orders',
      status: 'active',
      usage: 12890,
      lastUsed: new Date('2024-07-08T08:45:00'),
      authentication: 'oauth'
    },
    {
      id: '4',
      name: 'Analytics Data API',
      method: 'GET',
      endpoint: '/api/v1/analytics',
      description: 'Access business intelligence and analytics data',
      status: 'beta',
      usage: 5643,
      lastUsed: new Date('2024-07-07T16:20:00'),
      authentication: 'api_key'
    }
  ]);

  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: '1',
      name: 'Order Notifications',
      url: 'https://api.partner-crm.com/webhooks/orders',
      events: ['order.created', 'order.updated', 'order.cancelled'],
      status: 'active',
      lastDelivery: new Date('2024-07-08T10:30:00'),
      successRate: 98.7,
      retryPolicy: 'exponential'
    },
    {
      id: '2',
      name: 'Customer Updates',
      url: 'https://marketing.platform.com/api/customers',
      events: ['customer.created', 'customer.updated'],
      status: 'active',
      lastDelivery: new Date('2024-07-08T09:45:00'),
      successRate: 99.2,
      retryPolicy: 'exponential'
    },
    {
      id: '3',
      name: 'Inventory Sync',
      url: 'https://inventory.system.com/webhooks/stock',
      events: ['product.stock_updated', 'product.discontinued'],
      status: 'error',
      lastDelivery: new Date('2024-07-07T14:20:00'),
      successRate: 87.3,
      retryPolicy: 'linear'
    }
  ]);

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Salesforce CRM',
      type: 'CRM',
      provider: 'Salesforce',
      status: 'connected',
      lastSync: new Date('2024-07-08T10:00:00'),
      dataFlow: 'bidirectional',
      recordsSynced: 15420
    },
    {
      id: '2',
      name: 'QuickBooks Online',
      type: 'ERP',
      provider: 'Intuit',
      status: 'connected',
      lastSync: new Date('2024-07-08T08:30:00'),
      dataFlow: 'outbound',
      recordsSynced: 8934
    },
    {
      id: '3',
      name: 'Google Analytics',
      type: 'Analytics',
      provider: 'Google',
      status: 'connected',
      lastSync: new Date('2024-07-08T11:15:00'),
      dataFlow: 'inbound',
      recordsSynced: 98756
    },
    {
      id: '4',
      name: 'Stripe Payments',
      type: 'Payment',
      provider: 'Stripe',
      status: 'connected',
      lastSync: new Date('2024-07-08T10:45:00'),
      dataFlow: 'bidirectional',
      recordsSynced: 3421
    },
    {
      id: '5',
      name: 'Mailchimp',
      type: 'Email',
      provider: 'Mailchimp',
      status: 'error',
      lastSync: new Date('2024-07-07T09:20:00'),
      dataFlow: 'outbound',
      recordsSynced: 0
    }
  ]);

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_51H***************************',
      permissions: ['read:customers', 'write:orders', 'read:products'],
      environment: 'production',
      usage: 89.7,
      rateLimit: 10000,
      lastUsed: new Date('2024-07-08T10:30:00')
    },
    {
      id: '2',
      name: 'Staging Environment',
      key: 'sk_test_51H***************************',
      permissions: ['read:all', 'write:all'],
      environment: 'staging',
      usage: 34.2,
      rateLimit: 5000,
      expiresAt: new Date('2024-12-31T23:59:59'),
      lastUsed: new Date('2024-07-08T09:15:00')
    },
    {
      id: '3',
      name: 'Development Key',
      key: 'sk_dev_51H***************************',
      permissions: ['read:test_data'],
      environment: 'development',
      usage: 12.1,
      rateLimit: 1000,
      lastUsed: new Date('2024-07-07T16:45:00')
    }
  ]);

  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
    retryPolicy: 'exponential' as const
  });

  const [integrationMetrics, setIntegrationMetrics] = useState({
    totalEndpoints: 24,
    totalWebhooks: 8,
    activeIntegrations: 15,
    dailyApiCalls: 156789,
    successRate: 99.4,
    avgResponseTime: 145
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected': return 'bg-green-600';
      case 'inactive':
      case 'disconnected': return 'bg-gray-600';
      case 'error': return 'bg-red-600';
      case 'beta': return 'bg-blue-600';
      case 'deprecated': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-400';
      case 'POST': return 'text-blue-400';
      case 'PUT': return 'text-yellow-400';
      case 'DELETE': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Code className="h-6 w-6 text-[#5B9BD5]" />
            Enterprise Integration & API Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="text-center">
              <Code className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{integrationMetrics.totalEndpoints}</p>
              <p className="text-sm text-gray-400">API Endpoints</p>
            </div>
            
            <div className="text-center">
              <Webhook className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{integrationMetrics.totalWebhooks}</p>
              <p className="text-sm text-gray-400">Webhooks</p>
            </div>
            
            <div className="text-center">
              <Database className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{integrationMetrics.activeIntegrations}</p>
              <p className="text-sm text-gray-400">Integrations</p>
            </div>
            
            <div className="text-center">
              <Activity className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{integrationMetrics.dailyApiCalls.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Daily API Calls</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{integrationMetrics.successRate}%</p>
              <p className="text-sm text-gray-400">Success Rate</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{integrationMetrics.avgResponseTime}ms</p>
              <p className="text-sm text-gray-400">Avg Response</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="apis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-[#091020] border border-gray-700">
          <TabsTrigger 
            value="apis" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            API Endpoints
          </TabsTrigger>
          <TabsTrigger 
            value="webhooks" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Webhooks
          </TabsTrigger>
          <TabsTrigger 
            value="integrations" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="keys" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            API Keys
          </TabsTrigger>
          <TabsTrigger 
            value="docs" 
            className="data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
          >
            Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="apis">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">RESTful API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint) => (
                  <div key={endpoint.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <h4 className="text-white font-medium">{endpoint.name}</h4>
                        <Badge className={`${getStatusColor(endpoint.status)} text-white`}>
                          {endpoint.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(endpoint.endpoint)}
                          className="border-gray-600 text-gray-400"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#5B9BD5] hover:bg-[#4B8FE3]"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Test
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <code className="text-sm bg-[#091020] px-2 py-1 rounded text-[#5B9BD5]">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{endpoint.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Usage</p>
                        <p className="text-white font-medium">{endpoint.usage.toLocaleString()} calls</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Authentication</p>
                        <p className="text-white font-medium capitalize">{endpoint.authentication.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Last Used</p>
                        <p className="text-white font-medium">{endpoint.lastUsed.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Rate Limit</p>
                        <p className="text-white font-medium">10,000/hour</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Webhook Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Create New Webhook */}
              <div className="p-4 bg-[#131a2a] rounded-lg border border-gray-700 mb-6">
                <h4 className="text-white font-medium mb-4">Create New Webhook</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Webhook name"
                    value={newWebhook.name}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-[#091020] border-gray-600 text-white"
                  />
                  <Input
                    placeholder="Webhook URL"
                    value={newWebhook.url}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                    className="bg-[#091020] border-gray-600 text-white"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Select
                    value={newWebhook.retryPolicy}
                    onValueChange={(value: any) => setNewWebhook(prev => ({ ...prev, retryPolicy: value }))}
                  >
                    <SelectTrigger className="w-48 bg-[#091020] border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#131a2a] border-gray-600">
                      <SelectItem value="exponential">Exponential Backoff</SelectItem>
                      <SelectItem value="linear">Linear Backoff</SelectItem>
                      <SelectItem value="none">No Retry</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                    Create Webhook
                  </Button>
                </div>
              </div>

              {/* Existing Webhooks */}
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Webhook className="h-5 w-5 text-[#5B9BD5]" />
                        <h4 className="text-white font-medium">{webhook.name}</h4>
                        <Badge className={`${getStatusColor(webhook.status)} text-white`}>
                          {webhook.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{webhook.successRate}%</p>
                        <p className="text-sm text-gray-400">Success Rate</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <code className="text-sm bg-[#091020] px-2 py-1 rounded text-[#5B9BD5]">
                        {webhook.url}
                      </code>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {webhook.events.map((event, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                          {event}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Last Delivery</p>
                        <p className="text-white font-medium">{webhook.lastDelivery.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Retry Policy</p>
                        <p className="text-white font-medium capitalize">{webhook.retryPolicy.replace('_', ' ')}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                          Test
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                          Logs
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Third-Party Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-[#5B9BD5]" />
                        <div>
                          <h4 className="text-white font-medium">{integration.name}</h4>
                          <p className="text-sm text-gray-400">{integration.provider}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(integration.status)} text-white`}>
                        {integration.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{integration.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Flow:</span>
                        <span className="text-white capitalize">{integration.dataFlow}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Records Synced:</span>
                        <span className="text-white">{integration.recordsSynced.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Sync:</span>
                        <span className="text-white">{integration.lastSync.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                        {integration.status === 'connected' ? 'Sync Now' : 'Reconnect'}
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">API Key Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Key className="h-5 w-5 text-[#5B9BD5]" />
                        <h4 className="text-white font-medium">{key.name}</h4>
                        <Badge className={`${key.environment === 'production' ? 'bg-red-600' : key.environment === 'staging' ? 'bg-yellow-600' : 'bg-green-600'} text-white`}>
                          {key.environment}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{key.usage}%</p>
                        <p className="text-sm text-gray-400">Usage</p>
                      </div>
                    </div>
                    
                    <div className="mb-3 flex items-center gap-2">
                      <code className="flex-1 text-sm bg-[#091020] px-2 py-1 rounded text-[#5B9BD5]">
                        {key.key}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(key.key)}
                        className="border-gray-600 text-gray-400"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-400">Rate Limit</p>
                        <p className="text-white font-medium">{key.rateLimit.toLocaleString()}/hour</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Last Used</p>
                        <p className="text-white font-medium">{key.lastUsed.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Expires</p>
                        <p className="text-white font-medium">{key.expiresAt ? key.expiresAt.toLocaleDateString() : 'Never'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Permissions</p>
                        <p className="text-white font-medium">{key.permissions.length} scopes</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {key.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs">
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">API Documentation & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'API Reference', type: 'Interactive Docs', status: 'Updated', icon: FileText },
                  { name: 'Getting Started Guide', type: 'Tutorial', status: 'Complete', icon: Activity },
                  { name: 'Authentication Guide', type: 'Security', status: 'Updated', icon: Shield },
                  { name: 'Rate Limiting', type: 'Best Practices', status: 'Complete', icon: Clock },
                  { name: 'Webhook Examples', type: 'Code Samples', status: 'Updated', icon: Code },
                  { name: 'SDK Downloads', type: 'Libraries', status: 'Available', icon: Globe }
                ].map((doc, index) => (
                  <div key={index} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <doc.icon className="h-5 w-5 text-[#5B9BD5]" />
                      <div>
                        <h4 className="text-white font-medium">{doc.name}</h4>
                        <p className="text-sm text-gray-400">{doc.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-green-600 text-white">
                        {doc.status}
                      </Badge>
                    </div>
                    <Button size="sm" className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseIntegrationHub;
