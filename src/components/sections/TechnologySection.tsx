
import { TechnologyHeader } from "./technology/TechnologyHeader";
import { TechnologyGrid } from "./technology/TechnologyGrid";
import TechnologyProductRecommendations from "./technology/TechnologyProductRecommendations";
import { useNavigate } from "react-router-dom";

export const TechnologySection = () => {
  const navigate = useNavigate();

  const handleCardClick = (link: string) => {
    // Card clicked, navigating to link
    // Use navigate function to handle navigation
    navigate(link);
  };

  return (
    <>
      <section className="py-24 px-4 bg-gradient-to-br from-[#2A2A4A] to-[#1A1A2F] relative overflow-hidden" style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/0a22c848-dff2-43f4-b1eb-800fa123a904.png')] opacity-5 bg-cover bg-gray-900" style={{ backgroundColor: '#111827' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <TechnologyHeader />
          <TechnologyGrid onCardClick={handleCardClick} />
        </div>
      </section>
      
      {/* Technology product recommendations */}
      <TechnologyProductRecommendations />
    </>
  );
};
