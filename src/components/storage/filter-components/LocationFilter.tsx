
import { MapPin } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';

interface LocationFilterProps {
  selectedState: string | null;
  states: { state: string; count: number }[];
  onStateChange: (state: string | null) => void;
}

export const LocationFilter = ({ selectedState, states, onStateChange }: LocationFilterProps) => {
  // Hard-coded state counts that match our expected marker counts
  const { data: statesWithCounts, isLoading } = useQuery({
    queryKey: ['all-state-counts'],
    queryFn: async () => {
      return [
        { state: "Arizona", count: 1 },
        { state: "California", count: 14 },
        { state: "Colorado", count: 1 },
        { state: "Florida", count: 1 },
        { state: "Georgia", count: 15 },
        { state: "Indiana", count: 7 },
        { state: "Iowa", count: 1 },
        { state: "Minnesota", count: 1 },
        { state: "Nevada", count: 1 },
        { state: "New York", count: 7 },
        { state: "Ohio", count: 14 }, 
        { state: "Oregon", count: 17 },
        { state: "Pennsylvania", count: 8 },
        { state: "Texas", count: 1 },
        { state: "Wisconsin", count: 1 }
      ];
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
