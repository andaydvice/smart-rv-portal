
import React from 'react';
import { Shield } from 'lucide-react';

interface VerifiedBadgeProps {
  verified: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ verified }) => {
  if (!verified) return null;
  return (
    <div className="flex items-center gap-1 text-xs text-green-500">
      <Shield className="w-3 h-3" />
      <span>Verified</span>
    </div>
  );
};
