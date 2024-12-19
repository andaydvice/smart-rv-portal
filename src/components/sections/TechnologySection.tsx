import { TechnologyHeader } from "./technology/TechnologyHeader";
import { TechnologyGrid } from "./technology/TechnologyGrid";

const getFullPath = (path: string) => {
  try {
    const baseUrl = window.location.origin;
    console.log('Base URL:', baseUrl);
    console.log('Path:', path);
    const fullPath = `${baseUrl}${path}`;
    console.log('Full path generated:', fullPath);
    return fullPath;
  } catch (error) {
    console.error('Error generating full path:', error);
    return path;
  }
};

export const TechnologySection = () => {
  const handleCardClick = (link: string) => {
    console.log('Card clicked, link:', link);
    const fullPath = getFullPath(link);
    console.log('Navigating to:', fullPath);
    window.location.href = fullPath;
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#2A2A4A] to-[#1A1A2F] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/0a22c848-dff2-43f4-b1eb-800fa123a904.png')] opacity-5 bg-cover bg-fixed bg-gray-900" style={{ backgroundColor: '#111827' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <TechnologyHeader />
        <TechnologyGrid onCardClick={handleCardClick} />
      </div>
    </section>
  );
};