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

      <div className="text-white/90 leading-relaxed">
        {content}
      </div>
    </div>
  );
};