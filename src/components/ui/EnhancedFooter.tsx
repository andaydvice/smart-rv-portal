import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Shield,
  Award,
  Clock,
  Star
} from 'lucide-react';
import { Logo } from '../Logo';

const EnhancedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = {
    "RV Models": [
      { title: "Compact Models", url: "/models/compact" },
      { title: "Luxury Models", url: "/models/luxury" },
      { title: "Adventure Models", url: "/models/adventure" },
      { title: "Compare Models", url: "/models/compare" }
    ],
    "Smart Features": [
      { title: "Smart Kitchen", url: "/features/smart-kitchen" },
      { title: "Remote Control", url: "/features/remote-control" },
      { title: "Power Management", url: "/features/power-management" },
      { title: "Security System", url: "/features/security-system" }
    ],
    "Resources": [
      { title: "RV Calculators", url: "/calculators" },
      { title: "Storage Facilities", url: "/storage-facilities" },
      { title: "Solar Power Guide", url: "/solar-power-guide" },
      { title: "Emergency Center", url: "/rv-emergency-center" }
    ],
    "Support": [
      { title: "Documentation", url: "/documentation" },
      { title: "Troubleshooting", url: "/troubleshooting" },
      { title: "Contact Us", url: "/contact" },
      { title: "About Us", url: "/about" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com/smartrvtech", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/smartrvtech", label: "Twitter" },
    { icon: Linkedin, url: "https://linkedin.com/company/smartrvtech", label: "LinkedIn" },
    { icon: Youtube, url: "https://youtube.com/@smartrvtech", label: "YouTube" }
  ];

  const trustBadges = [
    { icon: Shield, text: "SSL Secured" },
    { icon: Award, text: "BBB A+ Rated" },
    { icon: Star, text: "4.8/5 Rating" }
  ];

  return (
    <footer className="bg-[#080F1F] border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading provider of smart RV technology, luxury mobile living solutions, 
              and innovative features for the modern RV traveler.
            </p>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 text-[#5B9BD5] mr-3 flex-shrink-0" />
                <span className="text-sm">123 Innovation Drive, Austin, TX 78701</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 text-[#5B9BD5] mr-3 flex-shrink-0" />
                <a href="tel:+1-800-SMART-RV" className="text-sm hover:text-[#5B9BD5] transition-colors">
                  +1-800-SMART-RV
                </a>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 text-[#5B9BD5] mr-3 flex-shrink-0" />
                <a href="mailto:info@smartrvtech.com" className="text-sm hover:text-[#5B9BD5] transition-colors">
                  info@smartrvtech.com
                </a>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 text-[#5B9BD5] mr-3 flex-shrink-0" />
                <span className="text-sm">Mon-Fri: 8AM-6PM CST</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <div key={index} className="flex items-center text-gray-400">
                    <IconComponent className="h-4 w-4 text-[#5B9BD5] mr-2" />
                    <span className="text-xs">{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(navigationLinks).map(([category, links], index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-800 bg-[#151A22]/50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest RV technology news and exclusive offers
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-[#091020] border border-gray-600 rounded-l-lg text-white text-sm focus:outline-none focus:border-[#5B9BD5]"
              />
              <button className="px-6 py-2 bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white text-sm font-medium rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} Smart RV Technology. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              <Link to="/privacy" className="text-gray-400 hover:text-[#5B9BD5] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#5B9BD5] text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-[#5B9BD5] text-sm transition-colors">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-[#5B9BD5] text-sm transition-colors">
                Sitemap
              </Link>
              <Link to="/auth" className="text-gray-500 hover:text-[#5B9BD5] text-sm transition-colors">
                Admin
              </Link>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-400 hover:text-[#5B9BD5] transition-colors"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;