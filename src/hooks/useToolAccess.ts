import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ToolAccessState {
  queriesUsed: number;
  queriesRemaining: number;
  hasAccess: boolean;
  userEmail: string | null;
  firstName: string | null;
}

const STORAGE_KEY = 'tool_access_data';
const MAX_FREE_QUERIES = 3;

export const useToolAccess = () => {
  const [accessState, setAccessState] = useState<ToolAccessState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        return {
          queriesUsed: data.queriesUsed || 0,
          queriesRemaining: MAX_FREE_QUERIES - (data.queriesUsed || 0),
          hasAccess: data.hasAccess || false,
          userEmail: data.userEmail || null,
          firstName: data.firstName || null,
        };
      } catch {
        return {
          queriesUsed: 0,
          queriesRemaining: MAX_FREE_QUERIES,
          hasAccess: false,
          userEmail: null,
          firstName: null,
        };
      }
    }
    return {
      queriesUsed: 0,
      queriesRemaining: MAX_FREE_QUERIES,
      hasAccess: false,
      userEmail: null,
      firstName: null,
    };
  });

  // Check if user is already a newsletter subscriber
  useEffect(() => {
    const checkExistingSubscriber = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.hasAccess) return; // Already has access
      }

      // Check if there's a subscriber email in storage to verify
      const storedEmail = accessState.userEmail;
      if (storedEmail) {
        const { data: subscriber } = await supabase
          .from('newsletter_subscribers')
          .select('email, first_name')
          .eq('email', storedEmail)
          .maybeSingle();

        if (subscriber) {
          grantAccess(subscriber.email, subscriber.first_name || '');
        }
      }
    };

    checkExistingSubscriber();
  }, []);

  const saveToStorage = (data: ToolAccessState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setAccessState(data);
  };

  const incrementQueryCount = () => {
    const newQueriesUsed = accessState.queriesUsed + 1;
    saveToStorage({
      ...accessState,
      queriesUsed: newQueriesUsed,
      queriesRemaining: MAX_FREE_QUERIES - newQueriesUsed,
    });
  };

  const grantAccess = (email: string, firstName: string) => {
    saveToStorage({
      queriesUsed: 0,
      queriesRemaining: MAX_FREE_QUERIES,
      hasAccess: true,
      userEmail: email,
      firstName,
    });
  };

  const canMakeQuery = (): boolean => {
    return accessState.hasAccess || accessState.queriesUsed < MAX_FREE_QUERIES;
  };

  const shouldShowOptIn = (): boolean => {
    return !accessState.hasAccess && accessState.queriesUsed >= MAX_FREE_QUERIES;
  };

  const trackToolUsage = async (toolId: string, toolName: string) => {
    try {
      await supabase.from('tool_usage_metrics').insert({
        user_email: accessState.userEmail,
        tool_id: toolId,
        tool_name: toolName,
        query_count: 1,
      });
    } catch (error) {
      console.error('Failed to track tool usage:', error);
    }
  };

  return {
    queriesUsed: accessState.queriesUsed,
    queriesRemaining: accessState.queriesRemaining,
    hasAccess: accessState.hasAccess,
    userEmail: accessState.userEmail,
    firstName: accessState.firstName,
    incrementQueryCount,
    grantAccess,
    canMakeQuery,
    shouldShowOptIn,
    trackToolUsage,
  };
};
