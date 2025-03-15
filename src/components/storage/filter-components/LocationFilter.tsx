
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
import { getStateCountsWithSQL } from '@/pages/StorageFacilities';

interface LocationFilterProps {
  selectedState: string | null;
  states: { state: string; count: number }[];
  onStateChange: (state: string | null) => void;
}

export const LocationFilter = ({ selectedState, states, onStateChange }: LocationFilterProps) => {
  // Fetch actual state counts directly from the database
  const { data: statesWithCounts, isLoading } = useQuery({
    queryKey: ['actual-state-counts'],
    queryFn: async () => {
      try {
        // Fetch states and count facilities by state
        const { data, error } = await supabase
          .from('storage_facilities')
          .select('state');
        
        if (error || !data) {
          console.error('Error with direct query:', error);
          // Fall back to the SQL client-side method
          return getStateCountsWithSQL();
        }
        
        // Count occurrences of each state
        const stateCounts = data.reduce((acc, item) => {
          const state = item.state;
          if (!state) return acc;
          
          acc[state] = (acc[state] || 0) + 1;
          return acc;
        }, {});
        
        // Transform to array format and normalize state names
        return Object.entries(stateCounts).map(([stateAbbr, count]) => {
          // Normalize state names
          const normalizedState = 
            stateAbbr === 'AZ' ? 'Arizona' : 
            stateAbbr === 'CA' ? 'California' : 
            stateAbbr === 'CO' ? 'Colorado' :
            stateAbbr === 'TX' ? 'Texas' :
            stateAbbr === 'FL' ? 'Florida' :
            stateAbbr === 'NV' ? 'Nevada' :
            stateAbbr === 'GA' ? 'Georgia' :
            stateAbbr === 'IA' ? 'Iowa' :
            stateAbbr === 'MN' ? 'Minnesota' :
            stateAbbr === 'WI' ? 'Wisconsin' :
            stateAbbr === 'OR' ? 'Oregon' :
            stateAbbr === 'PA' ? 'Pennsylvania' :
            stateAbbr === 'NY' ? 'New York' :
            stateAbbr === 'OH' ? 'Ohio' :
            stateAbbr === 'IN' ? 'Indiana' :
            stateAbbr;
          
          return {
            state: normalizedState,
            count: Number(count)
          };
        }).sort((a, b) => a.state.localeCompare(b.state));
      } catch (e) {
        console.error('Error fetching state counts:', e);
        // Fall back to SQL method if query fails
        return getStateCountsWithSQL();
      }
    },
    staleTime: 300000 // 5 minute cache
  });

  // Use the fetched counts or fall back to the provided states prop
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
