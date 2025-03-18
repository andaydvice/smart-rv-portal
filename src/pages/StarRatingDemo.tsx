
import React from 'react';
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/Navbar";
import { Container } from "@/components/ui/container";
import StarRatingDemo from "@/components/map/StarRatingDemo";

export default function StarRatingDemoPage() {
  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen w-full bg-[#080F1F] text-white py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#60A5FA]">
              Star Rating Component Demo
            </h1>
            <p className="text-lg text-center mb-10 max-w-2xl mx-auto text-gray-300">
              This interactive demo shows different variations of the star rating component
              used across our location details, including hover effects and rating selection.
            </p>
            
            <StarRatingDemo />
          </div>
        </Container>
      </div>
    </Layout>
  );
}
