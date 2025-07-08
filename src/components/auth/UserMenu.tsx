import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Settings, User, Shield } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const { user, isAdmin, signOut } = useAuth();

  if (!user) return null;

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#5B9BD5] text-white text-xs">
              {getInitials(user.email || 'U')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#091020] border-gray-700" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {user.email}
            </p>
            {isAdmin && (
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-[#5B9BD5]" />
                <p className="text-xs leading-none text-[#5B9BD5]">
                  Administrator
                </p>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        
        {isAdmin && (
          <>
            <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-[#131a2a]">
              <Link to="/admin" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-[#131a2a]">
              <Link to="/enterprise-intelligence" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                <span>Enterprise Intelligence</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
          </>
        )}
        
        <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-[#131a2a]">
          <Link to="/account-settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-700" />
        
        <DropdownMenuItem 
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;