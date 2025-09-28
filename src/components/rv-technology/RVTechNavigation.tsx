import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationSections = [
  { id: 'technology-assessment', label: 'Assessment Tools', icon: '🧪' },
  { id: 'understanding-technology', label: 'Understanding Tech', icon: '🎓' },
  { id: 'connectivity', label: 'Connectivity', icon: '📡' },
  { id: 'power-management', label: 'Power Systems', icon: '🔋' },
  { id: 'control-monitoring', label: 'Control Systems', icon: '🖥️' },
  { id: 'technology-tiers', label: 'Technology Tiers', icon: '⭐' },
  { id: 'rv-categories', label: 'RV Categories', icon: '🚐' },
  { id: 'dealer-questions', label: 'Dealer Questions', icon: '❓' },
  { id: 'technology-tradeoffs', label: 'Trade-offs', icon: '⚖️' },
  { id: 'research-strategies', label: 'Research Tips', icon: '🔍' },
  { id: 'decision-framework', label: 'Decision Framework', icon: '🎯' },
  { id: 'resources', label: 'Resources', icon: '📚' }
];

export const RVTechNavigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);

      // Find the active section based on scroll position
      const sectionElements = navigationSections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const currentSection = sectionElements.find(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`w-full transition-all duration-300 z-50 ${
      isSticky 
        ? 'fixed top-0 bg-[#080F1F]/95 backdrop-blur-md border-b border-[#5B9BD5]/20 shadow-lg' 
        : 'relative bg-[#151A22]/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 overflow-x-auto">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-[#5B9BD5]/20 text-[#5B9BD5] border border-[#5B9BD5]/30'
                    : 'text-[#E2E8FF] hover:bg-[#5B9BD5]/10 hover:text-[#5B9BD5]'
                }`}
              >
                <span className="text-base">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-[#5B9BD5] font-semibold">RV Tech Guide</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#E2E8FF] hover:bg-[#5B9BD5]/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-[#E2E8FF]">
            <div className="w-20 h-1 bg-[#151A22] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] transition-all duration-300"
                style={{ 
                  width: `${(navigationSections.findIndex(s => s.id === activeSection) + 1) / navigationSections.length * 100}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#080F1F]/95 backdrop-blur-md border-b border-[#5B9BD5]/20 shadow-lg">
            <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-[#5B9BD5]/20 text-[#5B9BD5] border border-[#5B9BD5]/30'
                      : 'text-[#E2E8FF] hover:bg-[#5B9BD5]/10 hover:text-[#5B9BD5]'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};