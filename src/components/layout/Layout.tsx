
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer2 from "../ui/Footer2";
import { scrollToTop } from "@/utils/scrollToTop";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Layout component scroll reset for path:', pathname);
    scrollToTop();
  }, [pathname]);

  // Define the footer links and socials for all pages
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Features", href: "/features" },
        { text: "Models", href: "/models" }
      ]
    },
    {
      title: "Features",
      links: [
        { text: "Navigation System", href: "/features/navigation-system" },
        { text: "Security System", href: "/features/security-system" },
        { text: "Power Management", href: "/features/power-management" }
      ]
    },
    {
      title: "Support",
      links: [
        { text: "Documentation", href: "/documentation" },
        { text: "Troubleshooting", href: "/troubleshooting" },
        { text: "Contact", href: "/contact" }
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
