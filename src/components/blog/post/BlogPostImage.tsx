
import { OptimizedImage } from './OptimizedImage';

interface BlogPostImageProps {
  image: string;
  title: string;
}

export const BlogPostImage = ({ image, title }: BlogPostImageProps) => {
  return (
    <div className="rounded-3xl overflow-hidden">
      <OptimizedImage 
        src={image} 
        alt={title}
        className="w-full h-[600px] object-cover"
      />
    </div>
  );
};

