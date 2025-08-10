
import React from "react";
import Footer2 from "../ui/Footer2";
import Navbar from "../Navbar";
import { Helmet } from "react-helmet-async";

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    <div className="min-h-screen bg-deeper-background overflow-x-hidden w-full">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080F1F" />
        <meta property="og:type" content="website" />
        {/* canonical managed per-page; removed from layout to prevent duplication */}
      </Helmet>
      <Navbar />
      <main className="w-full max-w-full pt-16 overflow-x-hidden bg-deeper-background">
        {children}
      </main>
      <Footer2 />
    </div>
  );
};

export default Layout;
