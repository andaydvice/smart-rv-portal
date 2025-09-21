import React from 'react';
import { ExternalLinkButton } from '@/components/ui/external-link-button';

interface AffiliatePartnerButtonProps {
  partner: string;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  path?: string;
}

export const AffiliatePartnerButton: React.FC<AffiliatePartnerButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  return (
    <ExternalLinkButton
      href="https://goodsam.com"
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </ExternalLinkButton>
  );
};