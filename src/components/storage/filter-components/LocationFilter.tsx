
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
      // First try the RPC function (which may not exist)
      try {
        // Directly query the storage_facilities table and count by state
        const { data, error } = await supabase
          .from('storage_facilities')
          .select('state, count(*)', { count: 'exact' })
          .order('state');
        
        if (error || !data) {
          console.error('Error with direct query:', error);
          // Fall back to the SQL client-side method
          return getStateCountsWithSQL();
        }
        
        // Transform the data to match our expected format
        return data.map(item => {
          // Normalize state names
          const normalizedState = 
            item.state === 'AZ' ? 'Arizona' : 
            item.state === 'CA' ? 'California' : 
            item.state === 'CO' ? 'Colorado' :
            item.state === 'TX' ? 'Texas' :
            item.state === 'FL' ? 'Florida' :
            item.state === 'NV' ? 'Nevada' :
            item.state === 'GA' ? 'Georgia' :
            item.state === 'IA' ? 'Iowa' :
            item.state === 'MN' ? 'Minnesota' :
            item.state === 'WI' ? 'Wisconsin' :
            item.state === 'OR' ? 'Oregon' :
            item.state === 'PA' ? 'Pennsylvania' :
            item.state === 'NY' ? 'New York' :
            item.state === 'OH' ? 'Ohio' :
            item.state === 'IN' ? 'Indiana' :
            item.state;
          
          return {
            state: normalizedState,
            count: typeof item.count === 'number' ? item.count : parseInt(item.count)
          };
        }).sort((a, b) => a.state.localeCompare(b.state));
      } catch (e) {
        console.error('Error fetching state counts with RPC:', e);
        // Fall back to SQL method if RPC fails
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
