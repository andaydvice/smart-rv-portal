
import React from 'react';
import { Phone, Mail, Shield } from 'lucide-react';

interface ContactInfoProps {
  phone?: string;
  email?: string;
  verifiedContact: boolean;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  phone,
  email,
  verifiedContact
}) => {
  const VerifiedBadge = ({ verified }: { verified: boolean }) => {
    if (!verified) return null;
    return (
      <div className="flex items-center gap-1 text-xs text-green-500">
        <Shield className="w-3 h-3" />
        <span>Verified</span>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {phone && (
        <div className="flex items-center gap-2 text-gray-300">
          <Phone className="w-4 h-4" />
          <span className="text-sm">
            {phone}
            {verifiedContact && (
              <VerifiedBadge verified={true} />
            )}
          </span>
        </div>
      )}
      {email && (
        <div className="flex items-center gap-2 text-gray-300">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{email}</span>
        </div>
      )}
    </div>
  );
};
