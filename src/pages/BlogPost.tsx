import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  console.log("BlogPost - Slug:", slug);

  const blogPosts = [
    {
      category: 'tech',
      author: {
        initials: 'JD',
        name: 'John Doe'
      },
      title: 'The Future of Mobile Living',
      description: 'Smart RVs are revolutionizing how we experience life on the road.',
      image: '/lovable-uploads/80ea47f5-5b04-409f-8eb7-1da434a9e0de.png',
      slug: 'future-of-mobile-living',
      content: 'Smart RVs are revolutionizing how we experience life on the road. With advanced technology integration and innovative design solutions, the future of mobile living is here.'
    },
    {
      category: 'travel',
      author: {
        initials: 'AS',
        name: 'Alice Smith'
      },
      title: 'Sustainable Travel Redefined',
      description: 'Where eco friendly design meets intelligent mobile home solutions.',
      image: '/lovable-uploads/72144d64-5f93-4ee2-8187-e495f556f206.png',
      slug: 'sustainable-travel-redefined',
      content: 'The intersection of eco friendly design and intelligent mobile home solutions is creating a new paradigm in sustainable travel.'
    },
    {
      category: 'tech',
      author: {
        initials: 'ST',
        name: 'Smart Tech'
      },
      title: 'RV Smart Tech',
      description: 'Discover the latest smart technology innovations for your RV.',
      image: '/lovable-uploads/80ea47f5-5b04-409f-8eb7-1da434a9e0de.png',
      slug: 'rv-smart-tech',
      content: 'Explore the cutting-edge smart technology innovations transforming the RV experience. From automated systems to intelligent monitoring solutions, learn how modern tech is making RV living more comfortable and efficient.'
    },
    {
      category: 'tech',
      author: {
        initials: 'IS',
        name: 'Indoor Storage'
      },
      title: 'Indoor RV Storage',
      description: 'Everything you need to know about indoor RV storage solutions.',
      image: '/lovable-uploads/72144d64-5f93-4ee2-8187-e495f556f206.png',
      slug: 'indoor-rv-storage',
      content: 'A comprehensive guide to indoor RV storage solutions. Learn about climate-controlled facilities, maintenance considerations, and how to protect your investment during storage periods.'
    }
  ];

  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#080F1F] text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 pt-20">
          <h1>Blog post not found</h1>
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="mt-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080F1F]">
      <Helmet>
        <title>{post.title} - Smart RV Blog</title>
        <meta name="description" content={post.description} />
      </Helmet>
      
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-8 pt-20">
        <Button
          variant="ghost"
          onClick={() => navigate('/blog')}
          className="text-white hover:text-white/80"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <div className="rounded-3xl overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-white/80">
            <div className="bg-[#1B2028] w-8 h-8 rounded-full flex items-center justify-center">
              {post.author.initials}
            </div>
            <span>{post.author.name}</span>
          </div>

          <div className="text-white/90 leading-relaxed">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
