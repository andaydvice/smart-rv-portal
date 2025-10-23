import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/LazyImage";
import { getOptimizedImageProps } from "@/utils/imageOptimization";

interface ModelInfo {
  name: string;
  price: string;
  highlight?: string; // MODIFIED: Added optional highlight
  notes?: string;     // MODIFIED: Added optional notes
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
          <LazyImage
            {...getOptimizedImageProps(
              "/lovable-uploads/c1732ddf-458c-4eeb-b6ad-7a817ae9ba17.png",
              "Adventure Smart RV at sunset with campfire",
              "feature",
              false
            )}
            className="w-full h-full object-cover"
          />
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {Object.entries(categories).map(([category, models], index) => (
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
                      <div 
                        key={`${category}-model-${modelIndex}`}
                        className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                      >
                        <h3 className="text-lg font-medium text-blue-200">
                          {model.name}
                        </h3>
                        {/* MODIFIED: Added highlight display */}
                        {model.highlight && (
                          <p className="text-gray-400 mt-1 text-sm">
                            {model.highlight}
                          </p>
                        )}
                        <p className="text-gray-300 mt-2">
                          Starting at {model.price}
                        </p>
                        {/* MODIFIED: Added notes display */}
                        {model.notes && (
                          <p className="text-gray-500 mt-1 text-xs italic">
                            Note: {model.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {category === "Rugged Class B Vans (Adventure Vans)" && (
                <div key={`image-${category}`} className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
                  <LazyImage
                    {...getOptimizedImageProps(
                      "/lovable-uploads/3e50571f-8a07-463a-a6a9-6ae4b820bc44.png",
                      "Adventure Smart RV at sunset by mountain stream",
                      "feature",
                      false
                    )}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {category === "Off Road Travel Trailers" && (
                <div key={`image-${category}`} className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
                  <LazyImage
                    {...getOptimizedImageProps(
                      "/lovable-uploads/fc3d60d2-5d4e-41d4-8db6-ec11fd0a45b9.png",
                      "Adventure Smart RV in desert setting with bike rack",
                      "feature",
                      false
                    )}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {category === "Compact Adventure Class C" && (
                <div key={`image-${category}`} className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
                  <LazyImage
                    {...getOptimizedImageProps(
                      "/lovable-uploads/23ce0af4-35ca-4e7f-af56-c1a7c6eae380.png",
                      "Adventure Smart RV at night in desert landscape",
                      "feature",
                      false
                    )}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {category === "Overlanding Fifth Wheels" && (
                <div key={`image-${category}`} className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
                  <LazyImage
                    {...getOptimizedImageProps(
                      "/lovable-uploads/85e4d897-10d7-4f90-b231-597f7fcfdffc.png",
                      "Adventure Smart RV with campfire at sunset in mountain setting",
                      "feature",
                      false
                    )}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AdventureCategoryCard;
