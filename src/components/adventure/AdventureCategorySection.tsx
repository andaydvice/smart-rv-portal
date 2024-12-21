import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AdventureModelItem from "./AdventureModelItem";
import AdventureCategoryImage from "./AdventureCategoryImage";

interface ModelInfo {
  name: string;
  price: string;
}

interface CategorySectionProps {
  category: string;
  models: ModelInfo[];
}

const AdventureCategorySection = ({ category, models }: CategorySectionProps) => (
  <div key={`category-section-${category}`}>
    <AccordionItem 
      value={category}
      className="border-gray-700"
    >
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        {category}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {models.map((model, modelIndex) => (
            <AdventureModelItem 
              key={`${category}-model-${modelIndex}`}
              name={model.name}
              price={model.price}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
    <AdventureCategoryImage category={category} />
  </div>
);

export default AdventureCategorySection;