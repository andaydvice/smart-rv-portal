import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';

interface UserPreferences {
  id?: string;
  weather_locations: Array<{
    name: string;
    lat: number;
    lon: number;
    country?: string;
  }>;
  default_units: {
    distance: 'miles' | 'kilometers';
    weight: 'lbs' | 'kg';
    temperature: 'fahrenheit' | 'celsius';
  };
  notifications: {
    email: boolean;
    browser: boolean;
  };
}

const defaultPreferences: UserPreferences = {
  weather_locations: [],
  default_units: {
    distance: 'miles',
    weight: 'lbs',
    temperature: 'fahrenheit'
  },
  notifications: {
    email: true,
    browser: false
  }
};

export const useUserPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user preferences
  const { data: preferences = defaultPreferences, isLoading } = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user) return defaultPreferences;
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      
      if (!data) {
        // Create default preferences for new user
        const { data: newPrefs, error: insertError } = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id,
            ...defaultPreferences
          })
          .select()
          .single();
        
        if (insertError) throw insertError;
        return newPrefs as unknown as UserPreferences;
      }
      
      return data as unknown as UserPreferences;
    },
    enabled: !!user
  });

  // Update preferences mutation
  const updatePreferences = useMutation({
    mutationFn: async (updates: Partial<UserPreferences>) => {
      if (!user) throw new Error('Must be logged in to update preferences');
      
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          ...updates
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
    }
  });

  // Add weather location
  const addWeatherLocation = (location: { name: string; lat: number; lon: number; country?: string }) => {
    const currentLocations = preferences.weather_locations || [];
    const exists = currentLocations.some(loc => 
      loc.lat === location.lat && loc.lon === location.lon
    );
    
    if (!exists) {
      updatePreferences.mutate({
        weather_locations: [...currentLocations, location]
      });
    }
  };

  // Remove weather location
  const removeWeatherLocation = (locationToRemove: { lat: number; lon: number }) => {
    const updatedLocations = (preferences.weather_locations || []).filter(loc => 
      !(loc.lat === locationToRemove.lat && loc.lon === locationToRemove.lon)
    );
    
    updatePreferences.mutate({
      weather_locations: updatedLocations
    });
  };

  return {
    preferences,
    isLoading,
    updatePreferences: updatePreferences.mutate,
    addWeatherLocation,
    removeWeatherLocation,
    isUpdating: updatePreferences.isPending,
    isAuthenticated: !!user
  };
};