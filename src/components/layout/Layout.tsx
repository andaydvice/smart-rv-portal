
import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import DebugOverlay from "../debug/DebugOverlay";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-deeper-background overflow-x-hidden w-full">
      <Navbar />
      <main className="w-full">
        {children}
      </main>
      <Footer />
      <DebugOverlay />
    </div>
  );
};

export default Layout;
