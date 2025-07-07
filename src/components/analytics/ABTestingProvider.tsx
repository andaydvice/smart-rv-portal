import React, { createContext, useContext, useEffect, useState } from 'react';

interface ABTest {
  id: string;
  variants: string[];
  traffic: number; // Percentage of traffic to include
}

interface ABTestingContextType {
  getVariant: (testId: string) => string | null;
  trackConversion: (testId: string, variant: string, action: string, value?: number) => void;
  isInTest: (testId: string) => boolean;
}

const ABTestingContext = createContext<ABTestingContextType | null>(null);

const activeTests: ABTest[] = [
  {
    id: 'cta_placement',
    variants: ['top', 'bottom', 'floating'],
    traffic: 100
  },
  {
    id: 'cta_copy',
    variants: ['view_deal', 'get_discount', 'shop_now'],
    traffic: 100
  },
  {
    id: 'product_layout',
    variants: ['grid', 'list', 'card'],
    traffic: 50
  }
];

export const ABTestingProvider = ({ children }: { children: React.ReactNode }) => {
  const [userTests, setUserTests] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load existing test assignments
    const savedTests = localStorage.getItem('ab_tests');
    if (savedTests) {
      setUserTests(JSON.parse(savedTests));
    }

    // Assign user to new tests
    const newAssignments: Record<string, string> = { ...userTests };
    
    activeTests.forEach(test => {
      if (!newAssignments[test.id]) {
        // Check if user should be included in this test
        if (Math.random() * 100 < test.traffic) {
          // Randomly assign variant
          const variant = test.variants[Math.floor(Math.random() * test.variants.length)];
          newAssignments[test.id] = variant;
          
          // Track test assignment
          console.log('AB Test Assignment:', {
            testId: test.id,
            variant,
            timestamp: new Date().toISOString(),
            userId: localStorage.getItem('user_id') || 'anonymous'
          });
        }
      }
    });

    if (Object.keys(newAssignments).length > Object.keys(userTests).length) {
      setUserTests(newAssignments);
      localStorage.setItem('ab_tests', JSON.stringify(newAssignments));
    }
  }, []);

  const getVariant = (testId: string): string | null => {
    return userTests[testId] || null;
  };

  const trackConversion = (testId: string, variant: string, action: string, value?: number) => {
    const conversionData = {
      testId,
      variant,
      action,
      value,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem('user_id') || 'anonymous',
      page: window.location.pathname
    };

    console.log('AB Test Conversion:', conversionData);
    
    // Store conversion data
    const conversions = JSON.parse(localStorage.getItem('ab_conversions') || '[]');
    conversions.push(conversionData);
    localStorage.setItem('ab_conversions', JSON.stringify(conversions.slice(-100))); // Keep last 100
  };

  const isInTest = (testId: string): boolean => {
    return testId in userTests;
  };

  return (
    <ABTestingContext.Provider value={{ getVariant, trackConversion, isInTest }}>
      {children}
    </ABTestingContext.Provider>
  );
};

export const useABTesting = () => {
  const context = useContext(ABTestingContext);
  if (!context) {
    throw new Error('useABTesting must be used within ABTestingProvider');
  }
  return context;
};