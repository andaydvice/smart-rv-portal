import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <AccordionItem 
              key={category} 
              value={category}
              className="border-gray-700"
            >
              <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {models.map((model, index) => (
                    <div 
                      key={index}
                      className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                    >
                      <h3 className="text-lg font-medium text-blue-200">
                        {model.name}
                      </h3>
                      <p className="text-gray-300 mt-1">
                        Starting at {model.price}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AdventureCategoryCard;