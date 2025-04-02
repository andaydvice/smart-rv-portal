
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { LucideIcon } from "lucide-react";

interface Feature {
  name: string;
  icon: LucideIcon;
  included: boolean;
}

interface FeaturesComparisonTableProps {
  models: {
    name: string;
    features: Feature[];
  }[];
}

const FeaturesComparisonTable = ({ models }: FeaturesComparisonTableProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-left">Features Comparison</h2>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse mb-16">
          <TableHeader>
            <TableRow className="bg-[#1E2A3E] text-left">
              <TableHead className="p-4 border-b border-gray-700">Feature</TableHead>
              {models.map(model => (
                <TableHead key={model.name} className="p-4 border-b border-gray-700">{model.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {models[0].features.map((feature, index) => (
              <TableRow key={feature.name} className="border-b border-gray-800 hover:bg-[#1E2A3E]/50">
                <TableCell className="p-4">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-[#5B9BD5]" />
                    <span>{feature.name}</span>
                  </div>
                </TableCell>
                {models.map(model => (
                  <TableCell key={`${model.name}-${feature.name}`} className="p-4 text-center">
                    {model.features[index].included ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500/20 text-green-500 rounded-full">✓</span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500/20 text-red-500 rounded-full">✗</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FeaturesComparisonTable;
