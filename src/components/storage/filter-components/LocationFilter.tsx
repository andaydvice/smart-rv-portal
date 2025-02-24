
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

export const LocationFilter = ({ selectedState, states, onStateChange }: LocationFilterProps) => {
  const { data: statesWithCounts } = useQuery({
    queryKey: ['state-counts'],
    queryFn: async () => {
      const { count: californiaCount } = await supabase
        .from('storage_facilities')
        .select('*', { count: 'exact', head: true })
        .or('state.eq.CA,state.eq.California');

      const { count: arizonaCount } = await supabase
        .from('storage_facilities')
        .select('*', { count: 'exact', head: true })
        .or('state.eq.AZ,state.eq.Arizona');

      const { count: texasCount } = await supabase
        .from('storage_facilities')
        .select('*', { count: 'exact', head: true })
        .or('state.eq.TX,state.eq.Texas');

      return [
        { state: 'California', count: californiaCount || 0 },
        { state: 'Arizona', count: arizonaCount || 0 },
        { state: 'Texas', count: texasCount || 0 }
      ].sort((a, b) => a.state.localeCompare(b.state));
    },
    staleTime: 300000 // 5 minute cache
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
