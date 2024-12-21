import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdventureCategorySection from "./AdventureCategorySection";

interface ModelInfo {
  name: string;
  price: string;
}

interface CategoryData {
  [key: string]: ModelInfo[];
}

interface AdventureCategoryCardProps {
  categories: CategoryData;
}

const AdventureCategoryCard = ({ categories }: AdventureCategoryCardProps) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl" style={{ color: "#5B9BD5" }}>
          Adventure RV Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
          <img 
            src="/lovable-uploads/c1732ddf-458c-4eeb-b6ad-7a817ae9ba17.png"
            alt="Adventure RV at sunset with campfire"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {Object.entries(categories).map(([category, models]) => (
            <AdventureCategorySection
              key={`category-section-${category}`}
              category={category}
              models={models}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AdventureCategoryCard;