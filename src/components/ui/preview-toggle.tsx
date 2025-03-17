
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewToggleProps {
  isPreview: boolean;
  onChange?: (isPreview: boolean) => void;
  className?: string;
}

const PreviewToggle: React.FC<PreviewToggleProps> = ({
  isPreview,
  onChange,
  className,
}) => {
  const handleToggle = () => {
    if (onChange) {
      onChange(!isPreview);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      className={cn(
        "gap-2 transition-all duration-300",
        isPreview ? "bg-[#131a2a] hover:bg-[#1f2937] border border-gray-700" : "",
        className
      )}
      variant={isPreview ? "outline" : "default"}
    >
      {isPreview ? (
        <Eye className="h-4 w-4 text-[#5B9BD5]" />
      ) : (
        <EyeOff className="h-4 w-4" />
      )}
      <span>Preview Mode</span>
    </Button>
  );
};

export default PreviewToggle;
