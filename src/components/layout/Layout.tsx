
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer2 from "../ui/Footer2";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  // We've removed the scrollToTop call here since it's now handled by the RouterProvider
  useEffect(() => {
    console.log('Layout component rendered for path:', pathname);
  }, [pathname]);

  // Define standardized footer links for all pages
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Features", href: "/features" },
        { text: "Models", href: "/models" },
        { text: "Technology", href: "/technology" },
        { text: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Features",
      links: [
        { text: "Navigation System", href: "/features/navigation-system" },
        { text: "Security System", href: "/features/security-system" },
        { text: "Power Management", href: "/features/power-management" },
        { text: "Internet Connectivity", href: "/features/internet-connectivity" },
        { text: "Smart Kitchen", href: "/features/smart-kitchen" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Calculators", href: "/calculators" },
        { text: "Documentation", href: "/documentation" },
        { text: "Weather", href: "/weather" },
        { text: "Storage Facilities", href: "/storage-facilities" },
        { text: "Storage Checklist", href: "/storage-preparation-checklist" }
      ]
    },
    {
      title: "Support",
      links: [
        { text: "Contact Us", href: "/contact" },
        { text: "Troubleshooting", href: "/troubleshooting" },
        { text: "Schedule Demo", href: "/schedule-demo" },
        { text: "Voice Control", href: "/voice-control" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  console.log('Rendering Layout component');
  return (
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden bg-gray-900">
      <div className="flex-grow">
        {children}
      </div>
      <Footer2
        links={footerLinks}
        socials={footerSocials}
        description="Revolutionizing the future of recreational vehicles with smart technology."
      />
    </div>
  );
};

export default Layout;
