
import Footer2 from "./Footer2";

export const SimpleFooter = () => {
  return (
    <Footer2 
      siteName="Simple Footer" 
      description="A minimal footer with just company info and copyright"
    />
  );
};

export const FooterWithLinks = () => {
  const links = [
    {
      title: "Products",
      links: [
        { text: "RV Models", href: "/models" },
        { text: "Accessories", href: "/accessories" },
        { text: "Smart Systems", href: "/systems" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Documentation", href: "/docs" },
        { text: "FAQs", href: "/faqs" },
        { text: "Support", href: "/support" }
      ]
    }
  ];
  
  return (
    <Footer2 
      siteName="Footer With Links" 
      description="A footer with navigation links for better site accessibility"
      links={links}
    />
  );
};

export const FullFooter = () => {
  const links = [
    {
      title: "Products",
      links: [
        { text: "RV Models", href: "/models" },
        { text: "Accessories", href: "/accessories" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Careers", href: "/careers" },
        { text: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Blog", href: "/blog" },
        { text: "Support", href: "/support" },
        { text: "Community", href: "/community" }
      ]
    }
  ];
  
  const socials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];
  
  return (
    <Footer2 
      siteName="Complete Footer" 
      description="A comprehensive footer with links and social media"
      links={links}
      socials={socials}
    />
  );
};
