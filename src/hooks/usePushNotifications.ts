import { useState, useEffect } from 'react';

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if push notifications are supported
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);
      
      // Check for existing subscription
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          setSubscription(sub);
        });
      });
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const subscribe = async (): Promise<PushSubscription | null> => {
    if (!isSupported || permission !== 'granted') return null;

    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BFd1YUMwQ6T7eVr8Ks2J8K4hGqKqY9xo3DfYVb6T4uC1K2k8XlJ5P7sQvE9gR3nA2bY1fN8VkQ7zH6jP4oN5sT'
        )
      });

      setSubscription(subscription);
      
      // Store subscription on server (in real app)
      await storeSubscription(subscription);
      
      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return null;
    }
  };

  const unsubscribe = async (): Promise<boolean> => {
    if (!subscription) return false;

    try {
      await subscription.unsubscribe();
      setSubscription(null);
      
      // Remove subscription from server
      await removeSubscription(subscription);
      
      return true;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      return false;
    }
  };

  const sendLocalNotification = (payload: NotificationPayload) => {
    if (!isSupported || permission !== 'granted') return;

    const options: NotificationOptions = {
      body: payload.body,
      icon: payload.icon || '/icon-192x192.png',
      badge: payload.badge || '/badge-72x72.png',
      tag: payload.tag,
      data: payload.data,
      requireInteraction: false
    };

    new Notification(payload.title, options);
  };

  // Revenue-focused notification templates
  const sendDealAlert = (product: string, discount: string, affiliateLink: string) => {
    sendLocalNotification({
      title: '🔥 Price Drop Alert!',
      body: `${product} is now ${discount} off! Limited time deal.`,
      tag: 'deal-alert',
      data: { 
        type: 'deal', 
        product, 
        discount, 
        url: affiliateLink,
        timestamp: Date.now()
      },
      actions: [
        { action: 'view-deal', title: 'View Deal', icon: '/icons/shopping.png' },
        { action: 'dismiss', title: 'Dismiss', icon: '/icons/close.png' }
      ]
    });
  };

  const sendMaintenanceReminder = (task: string, seasonalTip: string) => {
    sendLocalNotification({
      title: '🔧 RV Maintenance Reminder',
      body: `Time for ${task}. ${seasonalTip}`,
      tag: 'maintenance',
      data: { 
        type: 'maintenance', 
        task, 
        tip: seasonalTip,
        url: '/calculators',
        timestamp: Date.now()
      },
      actions: [
        { action: 'view-tips', title: 'View Tips', icon: '/icons/tools.png' },
        { action: 'dismiss', title: 'Later', icon: '/icons/clock.png' }
      ]
    });
  };

  const sendPersonalizedRecommendation = (category: string, products: string[]) => {
    sendLocalNotification({
      title: '💡 Perfect for Your RV',
      body: `New ${category} recommendations based on your interests.`,
      tag: 'recommendation',
      data: { 
        type: 'recommendation', 
        category, 
        products,
        url: '/rv-apps-hub',
        timestamp: Date.now()
      },
      actions: [
        { action: 'view-products', title: 'View Products', icon: '/icons/star.png' },
        { action: 'dismiss', title: 'Not Now', icon: '/icons/close.png' }
      ]
    });
  };

  return {
    isSupported,
    permission,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe,
    sendLocalNotification,
    sendDealAlert,
    sendMaintenanceReminder,
    sendPersonalizedRecommendation
  };
};

// Helper functions
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function storeSubscription(subscription: PushSubscription): Promise<void> {
  try {
    // In a real app, send to your backend
    const subscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: arrayBufferToBase64(subscription.getKey('p256dh')),
        auth: arrayBufferToBase64(subscription.getKey('auth'))
      },
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    };

    // Store locally for now
    localStorage.setItem('push_subscription', JSON.stringify(subscriptionData));
    console.log('Push subscription stored:', subscriptionData);
  } catch (error) {
    console.error('Error storing subscription:', error);
  }
}

async function removeSubscription(subscription: PushSubscription): Promise<void> {
  try {
    // Remove from backend and local storage
    localStorage.removeItem('push_subscription');
    console.log('Push subscription removed');
  } catch (error) {
    console.error('Error removing subscription:', error);
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer | null): string {
  if (!buffer) return '';
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}