
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationFilterProps {
  selectedState: string | null;
  states: { state: string, count: number }[];
  onStateChange: (state: string | null) => void;
}

export const LocationFilter = ({ selectedState, states, onStateChange }: LocationFilterProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white">Location</h3>
      <Select
        value={selectedState || "all"}
        onValueChange={(value) => onStateChange(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-full bg-[#080F1F] border-gray-700 text-white">
          <SelectValue placeholder="All States">
            {selectedState || "All States"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent 
          className="z-50 bg-[#1a1f2e] border-gray-700"
          style={{
            position: 'relative',
            zIndex: 50
          }}
        >
          <SelectItem 
            value="all"
            className="text-white focus:bg-[#2a2f3e] focus:text-white"
          >
            All States
          </SelectItem>
          {states.map((item) => (
            <SelectItem 
              key={item.state} 
              value={item.state}
              className="text-white focus:bg-[#2a2f3e] focus:text-white"
            >
              <div className="flex items-center justify-between w-full">
                <span>{item.state}</span>
                <span className="text-xs bg-[#2d3748] px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
