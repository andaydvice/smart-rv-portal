
import { TechnologyCard } from "./TechnologyCard";
import { Lock, Phone, Mic, Utensils } from "lucide-react";

const systems = [
  {
    icon: Lock,
    name: "Smart Security",
    description: "Advanced security systems with remote monitoring and smart locks",
    image: "/lovable-uploads/smart-security.jpg",
    link: "/features/security-system"
  },
  {
    icon: Phone,
    name: "Remote Control",
    description: "Control all RV systems from your smartphone",
    image: "/lovable-uploads/remote-control.jpg"
  },
  {
    icon: Mic,
    name: "Voice Control",
    description: "Hands free control with virtual assistant integration",
    image: "/lovable-uploads/voice-control.jpg"
  },
  {
    icon: Utensils,
    name: "Smart Kitchen",
    description: "Connected appliances with remote monitoring",
    image: "/lovable-uploads/smart-kitchen.jpg",
    link: "/features/smart-kitchen"
  },
];

interface TechnologyGridProps {
  onCardClick: (link: string) => void;
}

export const TechnologyGrid = ({ onCardClick }: TechnologyGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {systems.map((system, index) => (
      <TechnologyCard
        key={system.name}
        system={system}
        index={index}
        onCardClick={onCardClick}
      />
    ))}
  </div>
);
