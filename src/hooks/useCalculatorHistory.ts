import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';

interface CalculatorResult {
  id: string;
  calculator_type: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  created_at: string;
}

export const useCalculatorHistory = (calculatorType?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch calculator history
  const { data: history = [], isLoading } = useQuery({
    queryKey: ['calculator-history', user?.id, calculatorType],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from('calculator_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (calculatorType) {
        query = query.eq('calculator_type', calculatorType);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as CalculatorResult[];
    },
    enabled: !!user
  });

  // Save calculation mutation
  const saveCalculation = useMutation({
    mutationFn: async ({ 
      calculatorType, 
      inputs, 
      results 
    }: { 
      calculatorType: string; 
      inputs: Record<string, any>; 
      results: Record<string, any>; 
    }) => {
      if (!user) throw new Error('Must be logged in to save calculations');
      
      const { error } = await supabase
        .from('calculator_history')
        .insert({
          user_id: user.id,
          calculator_type: calculatorType,
          inputs,
          results
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculator-history'] });
    }
  });

  // Delete calculation mutation
  const deleteCalculation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase
        .from('calculator_history')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculator-history'] });
    }
  });

  return {
    history,
    isLoading,
    saveCalculation: saveCalculation.mutate,
    deleteCalculation: deleteCalculation.mutate,
    isSaving: saveCalculation.isPending,
    isDeleting: deleteCalculation.isPending,
    isAuthenticated: !!user
  };
};