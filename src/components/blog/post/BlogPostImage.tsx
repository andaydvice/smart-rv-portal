
interface BlogPostImageProps {
  image: string;
  title: string;
}

export const BlogPostImage = ({ image, title }: BlogPostImageProps) => {
  return (
    <div className="rounded-3xl overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-auto md:h-[600px] object-cover"
      />
    </div>
  );
};
