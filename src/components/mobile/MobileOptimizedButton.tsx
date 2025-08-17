import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { getTouchTargetClasses, getMobileFocusClasses } from '@/hooks/useMobileOptimization';

interface MobileOptimizedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  touchTarget?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  hapticFeedback?: boolean;
}

export const MobileOptimizedButton = forwardRef<HTMLButtonElement, MobileOptimizedButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'medium', 
    touchTarget = 'medium',
    children, 
    hapticFeedback = true,
    onClick,
    ...props 
  }, ref) => {
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Add haptic feedback for supported devices
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(10); // Light haptic feedback
      }
      
      onClick?.(e);
    };

    const baseClasses = cn(
      // Touch optimization
      getTouchTargetClasses(touchTarget),
      getMobileFocusClasses(),
      
      // Base styling
      'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out',
      'disabled:pointer-events-none disabled:opacity-50',
      'active:translate-y-px',
      
      // Size variants
      {
        'px-3 py-1.5 text-xs rounded-md': size === 'small',
        'px-4 py-2 text-sm rounded-lg': size === 'medium',
        'px-6 py-3 text-base rounded-xl': size === 'large',
      },
      
      // Color variants using semantic tokens
      {
        'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80': variant === 'primary',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70': variant === 'secondary',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80': variant === 'outline',
        'hover:bg-accent hover:text-accent-foreground active:bg-accent/80': variant === 'ghost',
      }
    );

    return (
      <button
        className={cn(baseClasses, className)}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MobileOptimizedButton.displayName = 'MobileOptimizedButton';