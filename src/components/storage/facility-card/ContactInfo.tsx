
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';

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
