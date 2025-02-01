import React from 'react';
import { Button } from "@/components/ui/button";

interface CategoryButtonsProps {
  activeCategory: 'all' | 'tech' | 'travel';
  onCategoryChange: (category: 'all' | 'tech' | 'travel') => void;
}

const CategoryButtons = ({ activeCategory, onCategoryChange }: CategoryButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant={activeCategory === 'all' ? "default" : "outline"}
        onClick={() => onCategoryChange('all')}
        className={`
          ${activeCategory === 'all' 
            ? 'bg-[#00ffff] text-black hover:bg-[#00ffff]/80' 
            : 'bg-[#151A22] border-[#00ffff] text-[#00ffff] hover:bg-[#1B2028] hover:text-[#00ffff]'
          }
          font-medium
        `}
      >
        All
      </Button>
      <Button 
        variant={activeCategory === 'tech' ? "default" : "outline"}
        onClick={() => onCategoryChange('tech')}
        className={`
          ${activeCategory === 'tech' 
            ? 'bg-[#00ffff] text-black hover:bg-[#00ffff]/80' 
            : 'bg-[#151A22] border-[#00ffff] text-[#00ffff] hover:bg-[#1B2028] hover:text-[#00ffff]'
          }
          font-medium
        `}
      >
        Tech
      </Button>
      <Button 
        variant={activeCategory === 'travel' ? "default" : "outline"}
        onClick={() => onCategoryChange('travel')}
        className={`
          ${activeCategory === 'travel' 
            ? 'bg-[#00ffff] text-black hover:bg-[#00ffff]/80' 
            : 'bg-[#151A22] border-[#00ffff] text-[#00ffff] hover:bg-[#1B2028] hover:text-[#00ffff]'
          }
          font-medium
        `}
      >
        Travel
      </Button>
    </div>
  );
};

export default CategoryButtons;