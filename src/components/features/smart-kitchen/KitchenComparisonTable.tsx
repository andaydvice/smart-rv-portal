
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { OptimizedImage } from "@/components/blog/post/OptimizedImage";
import { motion } from "framer-motion";

const KitchenComparisonTable = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 px-4">
      {/* Smart Kitchen Feature Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl mx-auto mb-8"
      >
        <OptimizedImage
          src="/lovable-uploads/8fbad7d4-f6a2-4af0-b5e4-1a3c5417cfcb.png"
          alt="Smart RV Kitchen with Digital Controls and Mobile App Integration"
          className="w-full rounded-xl shadow-lg"
          width={1200}
          height={800}
        />
      </motion.div>
      
      <h2 className="text-3xl font-semibold text-center text-white mb-8">
        Traditional vs Smart RV Kitchen Comparison
      </h2>
      
      {/* Features Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
        <Table className="w-full bg-gray-800/50">
          <TableHeader className="bg-gray-800/80">
            <TableRow className="border-b border-gray-700">
              <TableHead className="w-1/3 p-4 text-left text-white font-semibold">Feature</TableHead>
              <TableHead className="w-1/3 p-4 text-left text-white font-semibold">Traditional RV Kitchen</TableHead>
              <TableHead className="w-1/3 p-4 text-left text-white font-semibold">Smart RV Kitchen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-700 hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Refrigerator</TableCell>
              <TableCell className="p-4 text-gray-300">Manual temperature control</TableCell>
              <TableCell className="p-4 text-blue-400">Remote monitoring and control via app</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-700 hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Food Storage</TableCell>
              <TableCell className="p-4 text-gray-300">Manual inventory tracking</TableCell>
              <TableCell className="p-4 text-blue-400">Automated inventory management with low-stock alerts</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-700 hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Cooking</TableCell>
              <TableCell className="p-4 text-gray-300">Standard propane stove</TableCell>
              <TableCell className="p-4 text-blue-400">Smart induction cooktop with temperature presets and timers</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-700 hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Water System</TableCell>
              <TableCell className="p-4 text-gray-300">Basic plumbing with manual monitoring</TableCell>
              <TableCell className="p-4 text-blue-400">Real-time water usage tracking and leak detection</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-700 hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Energy Usage</TableCell>
              <TableCell className="p-4 text-gray-300">Difficult to monitor</TableCell>
              <TableCell className="p-4 text-blue-400">Real-time energy consumption tracking and optimization</TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Convenience</TableCell>
              <TableCell className="p-4 text-gray-300">Manual operation of all appliances</TableCell>
              <TableCell className="p-4 text-blue-400">Voice control and smart home integration</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      {/* Cost Comparison Table */}
      <h3 className="text-2xl font-semibold text-center text-white mt-10 mb-5">
        Cost Comparison
      </h3>
      
      <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
        <Table className="w-full bg-gray-800/50">
          <TableHeader className="bg-gray-800/80">
            <TableRow className="border-b border-gray-700">
              <TableHead className="w-1/3 p-4 text-left text-white font-semibold">Cost Factor</TableHead>
              <TableHead className="w-1/3 p-4 text-left text-white font-semibold">Traditional RV Kitchen</TableHead>
              <TableHead className="w-1/3 p-4 text-left text-white font-semibold">Smart RV Kitchen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-700 hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Initial Investment</TableCell>
              <TableCell className="p-4 text-gray-300">$3,000 - $8,000</TableCell>
              <TableCell className="p-4 text-blue-400">$6,000 - $15,000</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-700 hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Energy Efficiency</TableCell>
              <TableCell className="p-4 text-gray-300">Standard</TableCell>
              <TableCell className="p-4 text-blue-400">15-30% energy savings</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-700 hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Maintenance Costs</TableCell>
              <TableCell className="p-4 text-gray-300">Regular</TableCell>
              <TableCell className="p-4 text-blue-400">Reduced due to preventative alerts</TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-700/30">
              <TableCell className="p-4 text-gray-300">Long-term Value</TableCell>
              <TableCell className="p-4 text-gray-300">Standard appreciation</TableCell>
              <TableCell className="p-4 text-blue-400">Higher resale value and longer lifespan</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <p className="text-sm text-gray-400 text-center italic mt-3">
        *Cost and feature comparisons based on average market prices and specifications for 2024 luxury RV models.
        Individual results may vary based on specific models and configurations.
      </p>
    </div>
  );
};

export default KitchenComparisonTable;
