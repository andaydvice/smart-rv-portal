import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SystemType {
  icon: LucideIcon;
  name: string;
  description: string;
  image: string;
  link?: string;
}

interface TechnologyCardProps {
  system: SystemType;
  index: number;
  onCardClick: (link: string) => void;
}

const CardContent = ({ system }: { system: SystemType }) => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="p-8">
      <system.icon className="w-16 h-16 mb-4 text-blue-400" />
      <h3 className="text-2xl font-bold mb-2 text-white">{system.name}</h3>
      <p className="text-gray-300 mb-4">{system.description}</p>
      <Button 
        variant="outline" 
        className="bg-white/5 text-white border-white/20 hover:bg-white/10 transition-colors"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when button is clicked
          window.location.href = "https://preview--smart-rv-portal.lovable.app/features/smart-kitchen";
        }}
      >
        Learn More
      </Button>
    </div>
  </>
);

export const TechnologyCard = ({ system, index, onCardClick }: TechnologyCardProps) => (
  <motion.div
    key={system.name}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer bg-gray-900"
    onClick={() => system.link && onCardClick(system.link)}
  >
    <CardContent system={system} />
  </motion.div>
);