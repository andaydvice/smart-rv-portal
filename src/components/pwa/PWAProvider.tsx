import React from 'react';
import { AppInstallPrompt } from './AppInstallPrompt';
import { PushNotificationProvider } from './PushNotificationService';

interface PWAProviderProps {
  children: React.ReactNode;
}

export const PWAProvider: React.FC<PWAProviderProps> = ({ children }) => {
  return (
    <PushNotificationProvider>
      {children}
      <AppInstallPrompt />
    </PushNotificationProvider>
  );
};