
import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";

export default function StorageFacilities() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#080F1F] text-white pt-24">
        <Container>
          <div className="py-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Indoor RV Storage Facilities
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Find the perfect indoor storage solution for your RV across the USA including Oregon, Minnesota, Iowa, Wisconsin, California, Arizona, Colorado, Texas, Florida and Nevada.
            </p>
            <StorageFacilitiesMap />
          </div>
        </Container>
      </div>
    </>
  );
}
