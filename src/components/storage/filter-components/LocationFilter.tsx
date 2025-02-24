
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

// State name normalization mapping
const stateNormalization: { [key: string]: string } = {
  'TX': 'Texas',
  'Texas': 'Texas',
  'FL': 'Florida',
  'Florida': 'Florida',
  'AZ': 'Arizona',
  'Arizona': 'Arizona'
};

export const LocationFilter = ({ selectedState, states, onStateChange }: LocationFilterProps) => {
  // Query to get actual state counts from storage_facilities table
  const { data: statesWithCounts } = useQuery({
    queryKey: ['state-counts'],
    queryFn: async () => {
      console.log('Fetching state counts...');
      
      const { data, error } = await supabase
        .from('storage_facilities')
        .select('state, id');

      if (error) {
        console.error('Error fetching state counts:', error);
        return [];
      }

      // Log raw data
      console.log('Raw state data:', data);

      // Count occurrences of each state with normalization
      const stateCounts = data.reduce((acc: { [key: string]: number }, curr) => {
        const normalizedState = stateNormalization[curr.state] || curr.state;
        acc[normalizedState] = (acc[normalizedState] || 0) + 1;
        console.log(`Processing state: ${curr.state} -> ${normalizedState}, current count: ${acc[normalizedState]}`);
        return acc;
      }, {});

      // Log state counts
      console.log('Normalized state counts:', stateCounts);

      // Convert to array format and sort alphabetically
      const result = Object.entries(stateCounts).map(([state, count]) => ({
        state,
        count
      })).sort((a, b) => a.state.localeCompare(b.state));

      console.log('Final state data:', result);
      return result;
    },
    staleTime: 0, // Force refresh every time
    refetchOnWindowFocus: true
  });

  // Log what's being displayed
  console.log('Display states:', displayStates);
  console.log('Selected state:', selectedState);

  const displayStates = statesWithCounts || states;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Location</h3>
      <div className="space-y-2">
        <Select
          value={selectedState || "all"}
          onValueChange={(value) => {
            console.log('State selected:', value);
            onStateChange(value === "all" ? null : value);
          }}
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
            {displayStates.map((state) => (
              <SelectItem 
                key={state.state} 
                value={state.state}
                className="text-white focus:bg-[#2a2f3e] focus:text-white"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{state.state}</span>
                  <span className="text-sm text-gray-400">({state.count})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
