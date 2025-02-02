import { ReactNode } from "react";
import MenuItem from "../navigation/MenuItem";

interface MobileMenuSectionProps {
  title: string;
  icon?: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const MobileMenuSection = ({ title, icon, isOpen, onToggle, children }: MobileMenuSectionProps) => (
  <MenuItem 
    title={title}
    icon={icon}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    {children}
  </MenuItem>
);

export default MobileMenuSection;