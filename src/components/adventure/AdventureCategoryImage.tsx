interface AdventureCategoryImageProps {
  category: string;
}

const AdventureCategoryImage = ({ category }: AdventureCategoryImageProps) => {
  const imageMap = {
    "Rugged Class B Vans (Adventure Vans)": {
      src: "/lovable-uploads/3e50571f-8a07-463a-a6a9-6ae4b820bc44.png",
      alt: "Adventure RV at sunset by mountain stream"
    },
    "Off Road Travel Trailers": {
      src: "/lovable-uploads/fc3d60d2-5d4e-41d4-8db6-ec11fd0a45b9.png",
      alt: "Adventure RV in desert setting with bike rack"
    },
    "Compact Adventure Class C": {
      src: "/lovable-uploads/23ce0af4-35ca-4e7f-af56-c1a7c6eae380.png",
      alt: "Adventure RV at night in desert landscape"
    },
    "Overlanding Fifth Wheels": {
      src: "/lovable-uploads/85e4d897-10d7-4f90-b231-597f7fcfdffc.png",
      alt: "Adventure RV with campfire at sunset in mountain setting"
    }
  };

  const image = imageMap[category as keyof typeof imageMap];
  
  if (!image) return null;

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-6">
      <img 
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default AdventureCategoryImage;