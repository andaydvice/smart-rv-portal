import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ExternalLinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

export const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
  href,
  children,
  variant = 'default',
  size = 'md',
  className = '',
  showIcon = true
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[40px] touch-manipulation',
    md: 'px-4 py-2 min-h-[44px] sm:min-h-[48px] touch-manipulation',
    lg: 'px-6 py-3 text-lg min-h-[48px] sm:min-h-[56px] touch-manipulation'
  };

  return (
    <Button
      asChild
      variant={variant}
      className={`${sizeClasses[size]} ${className}`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2"
      >
        {children}
        {showIcon && <ExternalLink className="h-4 w-4" />}
      </a>
    </Button>
  );
};