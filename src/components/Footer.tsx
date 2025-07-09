
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

// This component is no longer used since we're now using Layout with Footer2
// It's kept for reference or fallback purposes

const Footer = () => {
  console.log("DEPRECATED: Using old Footer component - use Layout with Footer2 instead");
  
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-center md:text-left">Smart RV</h3>
            <p className="text-gray-400 text-center md:text-left">
              Revolutionizing the future of recreational vehicles with smart technology.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" className="hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" className="hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4 text-center md:text-left">Quick Links</h4>
            <ul className="space-y-2 w-full">
              <li className="text-center md:text-left">
                <Link to="/models" className="text-gray-400 hover:text-white transition-colors">
                  Models
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link to="/technology" className="text-gray-400 hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4 text-center md:text-left">Features</h4>
            <ul className="space-y-2 w-full">
              <li className="text-center md:text-left">
                <Link to="/features/navigation" className="text-gray-400 hover:text-white transition-colors">
                  Navigation System
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link to="/features/security" className="text-gray-400 hover:text-white transition-colors">
                  Security System
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link to="/features/power" className="text-gray-400 hover:text-white transition-colors">
                  Power Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4 text-center md:text-left">Contact Us</h4>
            <div className="space-y-2 text-gray-400 text-center md:text-left w-full">
              <p>1234 Smart Drive</p>
              <p>Tech Valley, CA 94025</p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@smartrv.com" className="hover:text-white transition-colors">
                  info@smartrv.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Smart RV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
