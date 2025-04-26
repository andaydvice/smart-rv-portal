
import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import DebugOverlay from "../debug/DebugOverlay";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-deeper-background overflow-x-hidden w-full">
      <Navbar />
      <main className="w-full max-w-full pt-16 overflow-x-hidden"> {/* Added pt-16 to ensure content starts below navbar */}
        {children}
      </main>
      <Footer />
      <DebugOverlay />
    </div>
  );
};

export default Layout;
