import { Card } from "../ui/card";

const trendingPosts = [
  {
    id: 1,
    title: "World Of Bioluminescence",
    category: "Nature",
    author: "Emily Davis",
    readTime: "8 mins read",
    image: "https://images.unsplash.com/photo-1634226336006-f37e1e6bd760?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Mastering Productivity",
    category: "Business",
    author: "Marcus King",
    readTime: "5 mins read",
    image: "https://images.unsplash.com/photo-1516131206008-dd041a9764fd?auto=format&fit=crop&q=80"
  }
];

const TrendingPosts = () => {
  console.log('Rendering TrendingPosts component');
  
  return (
    <section className="py-20 bg-[#080F1F]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 mb-12">
          <button className="px-6 py-2 bg-[#151A22] text-white rounded-full">Trending</button>
          <button className="px-6 py-2 bg-transparent text-[#E2E8FF]/60 rounded-full hover:bg-[#151A22] transition-colors">
            Latest
          </button>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-8">
          Trending <span className="text-[#5B9BD5]">Posts</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingPosts.map((post) => (
            <Card 
              key={post.id}
              className="bg-transparent overflow-hidden group cursor-pointer"
            >
              <div className="relative h-[300px] rounded-2xl overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="bg-[#5B9BD5]/20 text-[#5B9BD5] px-4 py-2 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#5B9BD5] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#5B9BD5] flex items-center justify-center">
                      <span className="text-white text-sm">{post.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <span className="text-[#E2E8FF]">{post.author}</span>
                    <span className="text-[#E2E8FF]/60">•</span>
                    <span className="text-[#E2E8FF]/60">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPosts;