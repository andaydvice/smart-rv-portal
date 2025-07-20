
import React from "react";
import Footer2 from "../ui/Footer2";
import Navbar from "../Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  console.log("🔍 DEBUG: Layout component rendering with Navbar");
  
  return (
    <div className="min-h-screen bg-deeper-background overflow-x-hidden w-full">
      <Navbar />
      <main className="w-full max-w-full pt-16 overflow-x-hidden">
        {children}
      </main>
      <Footer2 />
    </div>
  );
};

export default Layout;
