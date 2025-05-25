
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdventureCategory, AdventureModel } from "@/data/adventure-data"; // Assuming types are exported from data file

interface AdventureCategoryCardProps {
  categories: AdventureCategory[];
}

const AdventureCategoryCard = ({ categories }: AdventureCategoryCardProps) => {
  return (
    <div>
      {categories.map((category, catIndex) => (
        <Card key={catIndex} className="mb-8 bg-gray-800/50 border-gray-700 shadow-lg">
          <CardHeader className="border-b border-gray-700 pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl mb-1" style={{ color: "#5B9BD5" }}>
                  {category.name}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  {category.description}
                </CardDescription>
              </div>
              {category.image && (
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="mt-4 md:mt-0 md:ml-6 w-full md:w-48 h-32 object-cover rounded-md border border-gray-600"
                />
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {category.models && category.models.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.models.map((model: AdventureModel, modelIndex: number) => (
                  <div 
                    key={modelIndex}
                    className="bg-connectivity-darkBg p-5 rounded-lg border border-gray-700 hover:border-connectivity-accent/70 transition-all duration-300 flex flex-col h-full shadow-md"
                  >
                    <h4 className="text-xl font-semibold text-white mb-1.5">{model.name}</h4>
                    <p className="text-connectivity-accent font-medium mb-3 text-sm">{model.priceRange}</p>
                    
                    {model.highlight && (
                      <p className="text-gray-300 text-sm mb-2 leading-relaxed flex-grow">
                        {model.highlight}
                      </p>
                    )}
                    
                    {model.notes && (
                      <p className="text-xs text-gray-500 mt-auto pt-2">
                        Note: {model.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No models listed for this category yet.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdventureCategoryCard;
