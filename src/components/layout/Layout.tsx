import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import DebugOverlay from "../debug/DebugOverlay";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-deeper-background">
      <Navbar />
      <div className="container mx-auto px-4">
        {children}
      </div>
      <Footer />
      <DebugOverlay />
    </div>
  );
};

export default Layout;
