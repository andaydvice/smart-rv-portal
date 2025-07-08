import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import AdminRoute from '@/components/auth/AdminRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Users, 
  Search, 
  Shield, 
  UserCheck, 
  UserX, 
  Crown,
  AlertCircle,
  CheckCircle,
  MoreVertical,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
  roles?: Array<{
    role: string;
  }>;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load users data
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get all users from auth.users (admin only)
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;

      // Get user profiles and roles
      const userIds = authUsers.users.map(user => user.id);
      
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('id, first_name, last_name')
        .in('id', userIds);

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .in('user_id', userIds);

      if (profilesError) console.warn('Error loading profiles:', profilesError);
      if (rolesError) console.warn('Error loading roles:', rolesError);

      // Combine the data
      const enrichedUsers: UserData[] = authUsers.users.map(user => ({
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        email_confirmed_at: user.email_confirmed_at,
        profiles: profiles?.find(p => p.id === user.id) || null,
        roles: roles?.filter(r => r.user_id === user.id) || []
      }));

      setUsers(enrichedUsers);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) return;

    try {
      setError(null);
      setSuccess(null);

      // Remove existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', selectedUser.id);

      if (deleteError) throw deleteError;

      // Add new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: selectedUser.id,
          role: newRole as 'admin' | 'moderator' | 'user'
        });

      if (insertError) throw insertError;

      setSuccess(`Role updated successfully for ${selectedUser.email}`);
      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      });

      // Reload users data
      await loadUsers();
      
      setIsRoleDialogOpen(false);
      setSelectedUser(null);
      setNewRole('');
    } catch (err: any) {
      setError(err.message || 'Failed to update user role');
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const getRoleDisplay = (roles: Array<{role: string}>) => {
    if (!roles || roles.length === 0) {
      return <Badge variant="outline" className="text-gray-400">No Role</Badge>;
    }

    const role = roles[0].role;
    const roleConfig = {
      admin: { label: 'Admin', className: 'bg-red-600 text-white', icon: Crown },
      moderator: { label: 'Moderator', className: 'bg-yellow-600 text-white', icon: Shield },
      user: { label: 'User', className: 'bg-blue-600 text-white', icon: UserCheck }
    };

    const config = roleConfig[role as keyof typeof roleConfig];
    if (!config) return <Badge variant="outline">{role}</Badge>;

    const IconComponent = config.icon;
    return (
      <Badge className={config.className}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (user: UserData) => {
    if (!user.email_confirmed_at) {
      return <Badge variant="destructive" className="bg-red-600/20 text-red-400 border-red-600">Unverified</Badge>;
    }
    return <Badge className="bg-green-600/20 text-green-400 border-green-600">Verified</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.profiles?.first_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.profiles?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'all' || 
      (roleFilter === 'no-role' && (!user.roles || user.roles.length === 0)) ||
      (user.roles?.some(r => r.role === roleFilter));

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B9BD5] mx-auto"></div>
            <p className="mt-4 text-white">Loading users...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <AdminRoute>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  User Management
                </h1>
                <p className="text-gray-300">
                  Manage user accounts, roles, and permissions
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="h-5 w-5" />
                <span>{users.length} Total Users</span>
              </div>
            </div>

            {/* Alerts */}
            {error && (
              <Alert className="mb-6 border-red-600 bg-red-600/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-600 bg-green-600/10">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Filters */}
            <Card className="bg-[#091020] border-gray-700 mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by email or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-[#131a2a] border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-48 bg-[#131a2a] border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#131a2a] border-gray-700">
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="no-role">No Role</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={loadUsers}
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:text-white"
                  >
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Users ({filteredUsers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">User</TableHead>
                        <TableHead className="text-gray-300">Role</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Created</TableHead>
                        <TableHead className="text-gray-300">Last Sign In</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-gray-700">
                          <TableCell>
                            <div>
                              <div className="font-medium text-white">
                                {user.profiles?.first_name && user.profiles?.last_name
                                  ? `${user.profiles.first_name} ${user.profiles.last_name}`
                                  : 'No Name Set'
                                }
                              </div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getRoleDisplay(user.roles || [])}</TableCell>
                          <TableCell>{getStatusBadge(user)}</TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {user.last_sign_in_at 
                              ? new Date(user.last_sign_in_at).toLocaleDateString()
                              : 'Never'
                            }
                          </TableCell>
                          <TableCell>
                            <Dialog open={isRoleDialogOpen && selectedUser?.id === user.id} 
                                    onOpenChange={(open) => {
                                      setIsRoleDialogOpen(open);
                                      if (!open) {
                                        setSelectedUser(null);
                                        setNewRole('');
                                      }
                                    }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-600 text-gray-300 hover:text-white"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setNewRole(user.roles?.[0]?.role || '');
                                  }}
                                >
                                  <Shield className="h-4 w-4 mr-1" />
                                  Manage Role
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-[#091020] border-gray-700">
                                <DialogHeader>
                                  <DialogTitle className="text-white">Manage User Role</DialogTitle>
                                  <DialogDescription className="text-gray-400">
                                    Update the role for {user.email}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Select value={newRole} onValueChange={setNewRole}>
                                    <SelectTrigger className="bg-[#131a2a] border-gray-700 text-white">
                                      <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#131a2a] border-gray-700">
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="moderator">Moderator</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setIsRoleDialogOpen(false)}
                                    className="border-gray-600 text-gray-300 hover:text-white"
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    onClick={handleRoleChange}
                                    className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                                  >
                                    Update Role
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <UserX className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No users found matching your criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </AdminRoute>
  );
};

export default UserManagement;