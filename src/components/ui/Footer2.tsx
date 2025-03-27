
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// Type definitions for the footer props
interface FooterLink {
  text: string;
  href: string;
}

interface FooterSocial {
  icon: string;
  href: string;
}

interface FooterGroup {
  title: string;
  links: FooterLink[];
}

interface Footer2Props {
  siteName?: string;
  description?: string;
  links?: FooterGroup[];
  socials?: FooterSocial[];
  year?: number;
  className?: string;
}

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  mail: Mail
};

const Footer2 = ({
  siteName = "Smart RV",
  description = "Revolutionizing the future of recreational vehicles with smart technology.",
  links = [],
  socials = [],
  year = new Date().getFullYear(),
  className
}: Footer2Props) => {
  return (
    <footer className={cn("bg-gray-900 text-white mt-auto", className)}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-8", 
          links.length === 0 ? "md:grid-cols-2" : `md:grid-cols-${Math.min(links.length + 1, 4)}`
        )}>
          {/* Company Info */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-center md:text-left">{siteName}</h3>
            {description && (
              <p className="text-gray-400 text-center md:text-left">
                {description}
              </p>
            )}
            {socials.length > 0 && (
              <div className="flex justify-center md:justify-start space-x-4">
                {socials.map((social, index) => {
                  const IconComponent = iconMap[social.icon.toLowerCase()] || Mail;
                  return (
                    <a 
                      key={index} 
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors"
                      aria-label={`Visit our ${social.icon} page`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Link Groups */}
          {links.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-4 text-center md:text-left">{group.title}</h4>
              <ul className="space-y-2 w-full">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="text-center md:text-left">
                    {link.href.startsWith('http') ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.text}
                      </a>
                    ) : (
                      <Link 
                        to={link.href} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {year} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
