
interface Author {
  initials: string;
  name: string;
}

interface BlogPostContentProps {
  category: string;
  title: string;
  author: Author;
  content: string;
}

export const BlogPostContent = ({ category, title, author, content }: BlogPostContentProps) => {
  // MODIFIED: Split content into paragraphs and render each in a <p> tag
  // Assuming paragraphs are separated by one or more newline characters.
  // We'll split by one or more newlines and filter out any empty strings that might result from multiple newlines together.
  const paragraphs = content.split(/\n+/).filter(paragraph => paragraph.trim() !== '');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      
      <h1 className="text-4xl font-bold text-white">
        {title}
      </h1>

      <div className="flex items-center gap-2 text-white/80">
        <div className="bg-[#1B2028] w-8 h-8 rounded-full flex items-center justify-center">
          {author.initials}
        </div>
        <span>{author.name}</span>
      </div>

      {/* MODIFIED: Render content as paragraphs */}
      <div className="text-white/90 leading-relaxed space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

