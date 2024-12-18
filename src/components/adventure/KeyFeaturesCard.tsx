import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KeyFeaturesCardProps {
  features: string[];
}

const KeyFeaturesCard = ({ features }: KeyFeaturesCardProps) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl" style={{ color: "#5B9BD5" }}>
          Key Adventure Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
            >
              <p className="text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyFeaturesCard;