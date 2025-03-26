
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  path: string;
}

const NavigationSection = ({ title, expanded, onToggle, path }: NavigationSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          to={path}
          className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium flex-grow"
        >
          {title}
        </Link>
        <button
          onClick={onToggle}
          className="px-3 py-2 text-gray-300 hover:text-[#5B9BD5]"
          aria-expanded={expanded}
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {expanded && (
        <div className="pl-4 border-l border-gray-700 ml-4 mt-1 space-y-1">
          {/* This would be populated with section-specific links */}
          <p className="text-gray-400 px-3 py-1 text-sm">
            Expand this component as needed with section-specific links
          </p>
        </div>
      )}
    </div>
  );
};

export default NavigationSection;
