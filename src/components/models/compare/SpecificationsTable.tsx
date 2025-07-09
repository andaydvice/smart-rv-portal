
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";

interface SpecificationsTableProps {
  models: any[];
}

const SpecificationsTable = ({ models }: SpecificationsTableProps) => {
  return (
    <>
      {/* MODIFIED: Added text-white for better visibility */}
      <h2 className="text-3xl font-bold mb-8 text-left text-white">Technical Specifications</h2>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse mb-16">
          <TableHeader>
            <TableRow className="bg-[#1E2A3E] text-left">
              {/* MODIFIED: Added text-gray-300 for better visibility */}
              <TableHead className="p-4 border-b border-gray-700 text-gray-300">Specification</TableHead>
              {models.map(model => (
                // MODIFIED: Added text-gray-300 for better visibility
                <TableHead key={model.name} className="p-4 border-b border-gray-700 text-gray-300">{model.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(models[0].specs).map((specKey) => (
              <TableRow key={specKey} className="border-b border-gray-800 hover:bg-[#1E2A3E]/50">
                {/* MODIFIED: Added text-gray-300 for better visibility */}
                <TableCell className="p-4 font-medium capitalize text-gray-300">
                  {specKey.replace(/([A-Z])/g, ' $1').trim()}
                </TableCell>
                {models.map(model => (
                  // MODIFIED: Added text-gray-400 for better visibility
                  <TableCell key={`${model.name}-${specKey}`} className="p-4 text-gray-400">
                    {model.specs[specKey as keyof typeof model.specs]}
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

export default SpecificationsTable;
