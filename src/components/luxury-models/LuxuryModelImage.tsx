interface LuxuryModelImageProps {
  src: string;
  alt: string;
}

export const LuxuryModelImage = ({ src, alt }: LuxuryModelImageProps) => (
  <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 my-8">
    <a href={src} target="_blank" rel="noopener noreferrer">
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
        loading="lazy"
      />
    </a>
  </div>
);