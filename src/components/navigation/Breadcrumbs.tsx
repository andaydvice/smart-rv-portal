import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData from '@/components/seo/StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const getBreadcrumbName = (path: string): string => {
    const nameMap: Record<string, string> = {
      'models': 'RV Models',
      'compact': 'Compact Models',
      'luxury': 'Luxury Models',
      'adventure': 'Adventure Models',
      'compare': 'Compare Models',
      'features': 'Features',
      'smart-kitchen': 'Smart Kitchen',
      'remote-control': 'Remote Control',
      'power-management': 'Power Management',
      'security-system': 'Security System',
      'blog': 'Blog',
      'calculators': 'Calculators',
      'storage-facilities': 'Storage Facilities',
      'storage-preparation-checklist': 'Storage Preparation',
      'rv-apps-hub': 'RV Apps Hub',
      'solar-power-guide': 'Solar Power Guide',
      'rv-emergency-center': 'Emergency Center',
      'about': 'About Us',
      'contact': 'Contact',
      'pricing': 'Pricing',
      'documentation': 'Documentation',
      'troubleshooting': 'Troubleshooting',
      'weather': 'Weather Dashboard',
      'rv-weather': 'RV Weather',
      'voice-control': 'Voice Control',
      'account': 'My Account'
    };

    return nameMap[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...pathnames.map((pathname, index) => {
      const url = `/${pathnames.slice(0, index + 1).join('/')}`;
      return {
        name: getBreadcrumbName(pathname),
        url
      };
    })
  ];

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <>
      <StructuredData 
        type="BreadcrumbList" 
        data={{ 
          items: breadcrumbItems.map(item => ({
            name: item.name,
            url: `${window.location.origin}${item.url}`
          }))
        }} 
      />
      
      <nav aria-label="Breadcrumb" className="py-4 px-4 bg-[#080F1F]/50">
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
                
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-300 font-medium flex items-center">
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="text-[#5B9BD5] hover:text-[#4B8FE3] transition-colors flex items-center"
                  >
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;