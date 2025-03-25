
import React from 'react';
import Navbar from '@/components/Navbar';
import Layout from '@/components/layout/Layout';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';
import Footer2 from "@/components/ui/Footer2";

const StoragePreparationChecklistPage: React.FC = () => {
  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Storage Facilities", href: "/storage-facilities" },
        { text: "Weather", href: "/rv-weather" }
      ]
    },
    {
      title: "Support",
      links: [
        { text: "Documentation", href: "/documentation" },
        { text: "Calculators", href: "/calculators" },
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

  return (
    <div className="flex flex-col min-h-screen bg-[#080F1F]">
      <Navbar />
      <div className="storage-preparation-checklist flex-grow">
        <StoragePreparationChecklist />
      </div>
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Properly prepare your RV for storage with our comprehensive checklist"
      />
    </div>
  );
};

export default StoragePreparationChecklistPage;
