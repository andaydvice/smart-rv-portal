import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Battery, Navigation, Shield, Wifi, Check, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = [
  { category: "Smart Features", items: [
    { name: "Navigation System", luxury: "Advanced AI", adventure: "Off-Road Optimized", compact: "City Navigation" },
    { name: "Security System", luxury: "Premium Suite", adventure: "All-Terrain", compact: "Standard" },
    { name: "Power Management", luxury: "Extended Range", adventure: "Solar Integration", compact: "Efficient" },
    { name: "Internet Connectivity", luxury: "High-Speed 5G", adventure: "Satellite", compact: "4G/5G" },
  ]},
  { category: "Entertainment", items: [
    { name: "Smart TV", luxury: "65\" 4K OLED", adventure: "43\" 4K LED", compact: "32\" HD LED" },
    { name: "Audio System", luxury: "Premium Surround", adventure: "Outdoor Speakers", compact: "Stereo System" },
    { name: "Gaming Console", luxury: true, adventure: false, compact: false },
    { name: "Streaming Services", luxury: "All Premium", adventure: "Standard", compact: "Standard" },
  ]},
  { category: "Comfort", items: [
    { name: "Climate Control", luxury: "Multi-Zone", adventure: "Dual-Zone", compact: "Single-Zone" },
    { name: "Bed Size", luxury: "King", adventure: "Queen", compact: "Full" },
    { name: "Storage Space", luxury: "Premium", adventure: "Extended", compact: "Standard" },
    { name: "Kitchen Appliances", luxury: "Premium Smart", adventure: "Full Suite", compact: "Compact Smart" },
  ]},
];

const CompareModels = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Link to="/models">
              <Button variant="outline" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">Compare Models</h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Find the perfect smart RV that matches your lifestyle. Compare features and specifications across our range of models.
              </p>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
            >
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-gray-300">Features</TableHead>
                    <TableHead className="text-center text-gray-300">Luxury Class</TableHead>
                    <TableHead className="text-center text-gray-300">Adventure Class</TableHead>
                    <TableHead className="text-center text-gray-300">Compact Smart</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="font-medium text-gray-300">Starting Price</TableCell>
                    <TableCell className="text-center text-blue-400">$150,000</TableCell>
                    <TableCell className="text-center text-blue-400">$120,000</TableCell>
                    <TableCell className="text-center text-blue-400">$90,000</TableCell>
                  </TableRow>
                  {features.map((featureGroup) => (
                    <>
                      <TableRow className="hover:bg-transparent">
                        <TableCell 
                          colSpan={4} 
                          className="bg-gray-700/30 text-white font-semibold"
                        >
                          {featureGroup.category}
                        </TableCell>
                      </TableRow>
                      {featureGroup.items.map((feature) => (
                        <TableRow key={feature.name} className="hover:bg-gray-800/30">
                          <TableCell className="font-medium text-gray-300">
                            {feature.name}
                          </TableCell>
                          <TableCell className="text-center text-gray-300">
                            {typeof feature.luxury === 'boolean' 
                              ? (feature.luxury ? <Check className="w-5 h-5 mx-auto text-green-400" /> 
                                : <Minus className="w-5 h-5 mx-auto text-gray-500" />)
                              : feature.luxury}
                          </TableCell>
                          <TableCell className="text-center text-gray-300">
                            {typeof feature.adventure === 'boolean'
                              ? (feature.adventure ? <Check className="w-5 h-5 mx-auto text-green-400" />
                                : <Minus className="w-5 h-5 mx-auto text-gray-500" />)
                              : feature.adventure}
                          </TableCell>
                          <TableCell className="text-center text-gray-300">
                            {typeof feature.compact === 'boolean'
                              ? (feature.compact ? <Check className="w-5 h-5 mx-auto text-green-400" />
                                : <Minus className="w-5 h-5 mx-auto text-gray-500" />)
                              : feature.compact}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <p className="text-gray-300 mb-6">
                Ready to explore a specific model in detail?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/models/luxury">
                  <Button variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10">
                    View Luxury Class
                  </Button>
                </Link>
                <Link to="/models/adventure">
                  <Button variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10">
                    View Adventure Class
                  </Button>
                </Link>
                <Link to="/models/compact">
                  <Button variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10">
                    View Compact Smart
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareModels;