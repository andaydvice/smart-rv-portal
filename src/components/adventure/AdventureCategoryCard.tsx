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
          {Object.entries(categories).map(([category, models], index) => (
            <>
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
                    {models.map((model, modelIndex) => (
                      <div 
                        key={modelIndex}
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
              {category === "Rugged Class B Vans (Adventure Vans)" && (
                <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
                  <img 
                    src="/lovable-uploads/3e50571f-8a07-463a-a6a9-6ae4b820bc44.png"
                    alt="Adventure RV at sunset by mountain stream"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              {category === "Off Road Travel Trailers" && (
                <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
                  <img 
                    src="/lovable-uploads/fc3d60d2-5d4e-41d4-8db6-ec11fd0a45b9.png"
                    alt="Adventure RV in desert setting with bike rack"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              {category === "Compact Adventure Class C" && (
                <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
                  <img 
                    src="/lovable-uploads/23ce0af4-35ca-4e7f-af56-c1a7c6eae380.png"
                    alt="Adventure RV at night in desert landscape"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AdventureCategoryCard;