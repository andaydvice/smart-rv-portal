
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
  // MODIFIED: Split content into sentences and render each as a paragraph.
  // 1. Replace all newline characters (and multiple spaces) with a single space to normalize the text.
  const normalizedContent = content.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g, ' ');
  
  // 2. Split the content by sentence-ending punctuation (. ! ?).
  // This regex tries to capture sentences including their terminators.
  // It matches sequences of non-terminators followed by a terminator, OR a sequence of non-terminators at the end of the string.
  const sentences = normalizedContent.match(/[^.?!]+[.?!]\s*|[^.?!]+$/g) || [];
  
  // 3. Trim whitespace from each sentence and filter out any empty strings.
  const paragraphs = sentences.map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);

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

      <div className="text-white/90 leading-relaxed space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};
