
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Car, 
  Zap, 
  Calculator, 
  BookOpen, 
  User, 
  DollarSign, 
  Phone, 
  HelpCircle,
  Settings
} from "lucide-react";

interface SimpleMobileMenuProps {
  isOpen: boolean;
}

const SimpleMobileMenu = ({ isOpen }: SimpleMobileMenuProps) => {
  const menuItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/models", label: "Models", icon: Car },
    { to: "/features", label: "Features", icon: Zap },
    { to: "/technology", label: "Technology", icon: Settings },
    { to: "/calculators", label: "Calculators", icon: Calculator },
    { to: "/storage-facilities", label: "Storage", icon: Home },
    { to: "/blog", label: "Blog", icon: BookOpen },
    { to: "/about", label: "About", icon: User },
    { to: "/pricing", label: "Pricing", icon: DollarSign },
    { to: "/troubleshooting", label: "Support", icon: HelpCircle },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800 shadow-xl z-50 md:hidden"
        >
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="p-4 space-y-1">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] hover:bg-gray-800/50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                    >
                      <IconComponent className="h-5 w-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleMobileMenu;
