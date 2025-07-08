
import React from "react";
import Footer2 from "../ui/Footer2";
import Navbar from "../Navbar";
import Breadcrumbs from "../navigation/Breadcrumbs";
import SitemapGenerator from "../seo/SiteMapGenerator";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-deeper-background overflow-x-hidden w-full">
      <SitemapGenerator />
      <Navbar />
      <Breadcrumbs />
      <main className="w-full max-w-full pt-16 overflow-x-hidden"> {/* Added pt-16 to ensure content starts below navbar */}
        {children}
      </main>
      <Footer2 />
    </div>
  );
};

export default Layout;
