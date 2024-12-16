import { ReactNode } from "react";
import MenuItem from "../navigation/MenuItem";

interface MobileMenuSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const MobileMenuSection = ({ title, isOpen, onToggle, children }: MobileMenuSectionProps) => (
  <MenuItem 
    title={title}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    {children}
  </MenuItem>
);

export default MobileMenuSection;