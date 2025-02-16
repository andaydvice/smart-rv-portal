
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  // Check authentication status
  useEffect(() => {
    const { data: { user } } = supabase.auth.getUser();
    setUserId(user?.id || null);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user's favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data } = await supabase
        .from('storage_facility_favorites')
        .select('facility_id')
        .eq('user_id', userId);
      return data?.map(f => f.facility_id) || [];
    },
    enabled: !!userId
  });

  // Add to favorites
  const addFavoriteMutation = useMutation({
    mutationFn: async (facilityId: string) => {
      if (!userId) throw new Error('Must be logged in to favorite');
      const { error } = await supabase
        .from('storage_facility_favorites')
        .insert({ user_id: userId, facility_id: facilityId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
    }
  });

  // Remove from favorites
  const removeFavoriteMutation = useMutation({
    mutationFn: async (facilityId: string) => {
      if (!userId) throw new Error('Must be logged in to unfavorite');
      const { error } = await supabase
        .from('storage_facility_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('facility_id', facilityId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
    }
  });

  return {
    isAuthenticated: !!userId,
    favorites,
    isFavorite: (facilityId: string) => favorites.includes(facilityId),
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    isLoading: addFavoriteMutation.isPending || removeFavoriteMutation.isPending
  };
};
