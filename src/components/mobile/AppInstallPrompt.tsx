import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface AppInstallPromptProps {
  className?: string;
}

const AppInstallPrompt = ({ className = "" }: AppInstallPromptProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      
      // Show prompt after a delay to not overwhelm the user
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    // Listen for the app being installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User ${outcome} the install prompt`);
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error during install prompt:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || 
      !showPrompt || 
      !deferredPrompt ||
      sessionStorage.getItem('installPromptDismissed')) {
    return null;
  }

  return (
    <Card className={cn(
      "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm",
      "bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3]",
      "border-0 shadow-xl animate-in slide-in-from-bottom-4 duration-500",
      "md:hidden", // Only show on mobile
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm mb-1">
              Install RV Hub App
            </h3>
            <p className="text-white/90 text-xs mb-3 leading-relaxed">
              Get instant access to RV tools, emergency services, and solar guides. Works offline!
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="bg-white text-[#5B9BD5] hover:bg-gray-100 font-medium px-4 py-2 h-8"
              >
                <Download className="h-3 w-3 mr-1" />
                Install
              </Button>
              
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 h-8 w-8"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Features list */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-white rounded-full"></span>
              Works offline
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-white rounded-full"></span>
              Push notifications
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-white rounded-full"></span>
              Quick access
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-white rounded-full"></span>
              No app store
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppInstallPrompt;