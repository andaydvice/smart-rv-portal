import { useState, useEffect } from 'react';

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, any>;
}

export interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
  isActive: boolean;
}

export const useABTesting = (testId: string) => {
  const [activeVariant, setActiveVariant] = useState<ABTestVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeTest = async () => {
      try {
        // Check if user already has a variant assigned
        const existingVariant = localStorage.getItem(`ab_test_${testId}`);
        
        if (existingVariant) {
          setActiveVariant(JSON.parse(existingVariant));
          setIsLoading(false);
          return;
        }

        // Get test configuration (in real implementation, this would come from backend)
        const testConfig = getTestConfig(testId);
        
        if (!testConfig || !testConfig.isActive) {
          setIsLoading(false);
          return;
        }

        // Assign variant based on weights
        const variant = assignVariant(testConfig.variants);
        
        // Store assignment
        localStorage.setItem(`ab_test_${testId}`, JSON.stringify(variant));
        setActiveVariant(variant);

        // Track assignment
        trackVariantAssignment(testId, variant.id);
        
      } catch (error) {
        console.error('AB Testing initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTest();
  }, [testId]);

  const trackConversion = (conversionType: string, value?: number) => {
    if (!activeVariant) return;

    // Track conversion event
    const event = {
      testId,
      variantId: activeVariant.id,
      conversionType,
      value: value || 1,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      sessionId: getSessionId()
    };

    // Store locally and batch send
    const conversions = JSON.parse(localStorage.getItem('ab_conversions') || '[]');
    conversions.push(event);
    localStorage.setItem('ab_conversions', JSON.stringify(conversions));

    // Batch send conversions periodically
    batchSendConversions();
  };

  return {
    variant: activeVariant,
    isLoading,
    trackConversion,
    config: activeVariant?.config || {}
  };
};

// Test configurations
const testConfigs: Record<string, ABTest> = {
  'affiliate_cta_buttons': {
    id: 'affiliate_cta_buttons',
    name: 'Affiliate CTA Button Optimization',
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Original Blue Button',
        weight: 0.4,
        config: {
          buttonColor: 'bg-[#5B9BD5]',
          buttonText: 'View Deal',
          buttonStyle: 'rounded-lg'
        }
      },
      {
        id: 'urgent_red',
        name: 'Urgent Red Button',
        weight: 0.3,
        config: {
          buttonColor: 'bg-red-600',
          buttonText: 'Get Deal Now',
          buttonStyle: 'rounded-lg border-2 border-red-400'
        }
      },
      {
        id: 'success_green',
        name: 'Success Green Button',
        weight: 0.3,
        config: {
          buttonColor: 'bg-green-600',
          buttonText: 'Claim Deal',
          buttonStyle: 'rounded-lg shadow-lg shadow-green-500/25'
        }
      }
    ]
  },
  'product_card_layout': {
    id: 'product_card_layout',
    name: 'Product Card Layout Test',
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Standard Layout',
        weight: 0.5,
        config: {
          layout: 'standard',
          showBadges: true,
          showFeatures: true
        }
      },
      {
        id: 'minimal',
        name: 'Minimal Layout',
        weight: 0.5,
        config: {
          layout: 'minimal',
          showBadges: false,
          showFeatures: false,
          emphasizePrice: true
        }
      }
    ]
  },
  'mobile_navigation': {
    id: 'mobile_navigation',
    name: 'Mobile Navigation Test',
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Standard Navigation',
        weight: 0.5,
        config: {
          showQuickAccess: false,
          stickyHeader: false
        }
      },
      {
        id: 'enhanced',
        name: 'Enhanced Navigation',
        weight: 0.5,
        config: {
          showQuickAccess: true,
          stickyHeader: true,
          quickAccessItems: ['apps', 'deals', 'calculator']
        }
      }
    ]
  }
};

function getTestConfig(testId: string): ABTest | null {
  return testConfigs[testId] || null;
}

function assignVariant(variants: ABTestVariant[]): ABTestVariant {
  const random = Math.random();
  let cumulativeWeight = 0;

  for (const variant of variants) {
    cumulativeWeight += variant.weight;
    if (random <= cumulativeWeight) {
      return variant;
    }
  }

  return variants[0]; // Fallback
}

function trackVariantAssignment(testId: string, variantId: string) {
  const event = {
    type: 'variant_assignment',
    testId,
    variantId,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    sessionId: getSessionId()
  };

  // Store assignment event
  const assignments = JSON.parse(localStorage.getItem('ab_assignments') || '[]');
  assignments.push(event);
  localStorage.setItem('ab_assignments', JSON.stringify(assignments));
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

function batchSendConversions() {
  // In a real implementation, this would send to analytics backend
  // For now, we'll just log and clear old events
  const conversions = JSON.parse(localStorage.getItem('ab_conversions') || '[]');
  const assignments = JSON.parse(localStorage.getItem('ab_assignments') || '[]');
  
  if (conversions.length > 0 || assignments.length > 0) {
    console.log('AB Test Data:', { conversions, assignments });
    
    // Clear old events (keep last 100)
    if (conversions.length > 100) {
      localStorage.setItem('ab_conversions', JSON.stringify(conversions.slice(-50)));
    }
    if (assignments.length > 100) {
      localStorage.setItem('ab_assignments', JSON.stringify(assignments.slice(-50)));
    }
  }
}
