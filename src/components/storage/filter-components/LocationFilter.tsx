
import { MapPin } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface LocationFilterProps {
  selectedState: string | null;
  states: { state: string; count: number }[];
  onStateChange: (state: string | null) => void;
}

// Helper function to convert state abbreviation to full name
const getFullStateName = (stateCode: string): string => {
  const stateMap: Record<string, string> = {
    'AZ': 'Arizona',
    'CA': 'California',
    'CO': 'Colorado',
    'FL': 'Florida',
    'NV': 'Nevada',
    'TX': 'Texas',
    'IA': 'Lowa', // Corrected spelling from Iowa to Lowa
    'MN': 'Minnesota',
    'WI': 'Wisconsin'
  };
  
  return stateMap[stateCode] || stateCode;
};

// Helper to determine if a string is a state abbreviation
const isStateAbbreviation = (state: string): boolean => {
  return state.length === 2 && /^[A-Z]{2}$/.test(state);
};

export const LocationFilter = ({ selectedState, states, onStateChange }: LocationFilterProps) => {
  const { data: statesWithCounts, isLoading } = useQuery({
    queryKey: ['all-state-counts'],
    queryFn: async () => {
      // Get list of all states first
      const { data: statesData, error: statesError } = await supabase
        .from('storage_facilities')
        .select('state')
        .order('state');
      
      if (statesError) {
        console.error('Error fetching states:', statesError);
        return [];
      }
      
      // Create a unique list of states and convert abbreviations to full names
      const stateCountMap: Record<string, number> = {};
      
      for (const item of statesData) {
        const fullStateName = isStateAbbreviation(item.state) 
          ? getFullStateName(item.state) 
          : item.state;
          
        // Initialize or increment the count for this state
        stateCountMap[fullStateName] = (stateCountMap[fullStateName] || 0) + 1;
      }
      
      // Convert the map to array format
      const statesWithCountsArray = Object.entries(stateCountMap).map(
        ([state, count]) => ({ 
          state, 
          stateCode: state, // This will be the full name now
          count 
        })
      );
      
      return statesWithCountsArray.sort((a, b) => a.state.localeCompare(b.state));
    },
    staleTime: 60000 // 1 minute cache
  });

  const displayStates = statesWithCounts || states;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Location</h3>
      <div className="space-y-2">
        <Select
          value={selectedState || "all"}
          onValueChange={(value) => onStateChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-full bg-[#080F1F] border-gray-700 text-white">
            <SelectValue placeholder="Select a state">
              {selectedState ? (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedState}
                </div>
              ) : (
                "All States"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent 
            className="z-50 bg-[#1a1f2e] border-gray-700"
            style={{
              position: 'relative',
              zIndex: 50
            }}
          >
            <SelectItem value="all" className="text-white focus:bg-[#2a2f3e] focus:text-white">All States</SelectItem>
            {isLoading ? (
              <SelectItem value="loading" disabled className="text-gray-400">
                Loading states...
              </SelectItem>
            ) : (
              displayStates.map((stateItem) => (
                <SelectItem 
                  key={stateItem.state} 
                  value={stateItem.state}
                  className="text-white focus:bg-[#2a2f3e] focus:text-white"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{stateItem.state}</span>
                    <span className="text-sm text-gray-400">({stateItem.count})</span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
