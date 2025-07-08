import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface AppInstallPromptProps {
  onDismiss?: () => void;
}

export const AppInstallPrompt: React.FC<AppInstallPromptProps> = ({ onDismiss }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    if (isInStandaloneMode) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      setIsInstallable(true);
      
      // Show prompt after user has had some positive interactions
      setTimeout(() => {
        if (!localStorage.getItem('install-prompt-dismissed')) {
          setShowPrompt(true);
        }
      }, 30000); // Show after 30 seconds
    };

    // Check if user has visited multiple pages (positive engagement)
    const visitedPages = JSON.parse(localStorage.getItem('visited-pages') || '[]');
    if (visitedPages.length >= 3 && !localStorage.getItem('install-prompt-dismissed')) {
      setTimeout(() => setShowPrompt(true), 5000);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Track page visits for contextual prompting
  useEffect(() => {
    const currentPath = window.location.pathname;
    const visitedPages = JSON.parse(localStorage.getItem('visited-pages') || '[]');
    
    if (!visitedPages.includes(currentPath)) {
      visitedPages.push(currentPath);
      localStorage.setItem('visited-pages', JSON.stringify(visitedPages.slice(-10))); // Keep last 10 pages
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        // Track installation in analytics
        if ((window as any).gtag) {
          (window as any).gtag('event', 'pwa_install', {
            method: 'prompt',
            outcome: 'accepted'
          });
        }
      } else {
        console.log('User dismissed the install prompt');
        localStorage.setItem('install-prompt-dismissed', 'true');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
    onDismiss?.();
  };

  if (!showPrompt || (!isInstallable && !isIOS)) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm bg-background/95 backdrop-blur-md border border-border/50 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-connectivity-accent" />
            <CardTitle className="text-sm">Install RV Hub</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-xs mb-3">
          Get quick access to RV tools, calculators, and emergency resources. Works offline!
        </CardDescription>
        
        {isIOS ? (
          <div className="text-xs text-muted-foreground">
            To install: Tap the share button <span className="font-mono">□↑</span> and select "Add to Home Screen"
          </div>
        ) : (
          <div className="flex gap-2">
            <Button 
              onClick={handleInstallClick}
              size="sm"
              className="flex-1 bg-connectivity-accent hover:bg-connectivity-accent/90 text-white"
            >
              <Download className="h-4 w-4 mr-1" />
              Install
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDismiss}
              className="px-3"
            >
              Later
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};