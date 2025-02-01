import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  console.log("BlogPost - Slug:", slug);

  // Combined blog post data from both regular and trending posts
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
      content: 'Smart RVs are revolutionizing how we experience life on the road. With advanced technology integration and innovative design solutions, the future of mobile living is here. These vehicles combine comfort, efficiency, and intelligence to create an unparalleled travel experience.'
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
      content: 'The intersection of eco friendly design and intelligent mobile home solutions is creating a new paradigm in sustainable travel. Modern RVs are incorporating green technologies and smart systems to minimize environmental impact while maximizing comfort and convenience.'
    },
    {
      category: 'tech',
      author: {
        initials: 'TU',
        name: 'Tech Updates'
      },
      title: 'Top 10 Smart RV Upgrades',
      description: 'Transform your RV into a smart home on wheels with these essential tech upgrades.',
      image: '/lovable-uploads/d3b696f0-39e5-4cfa-b38c-6579325a495a.png',
      slug: 'top-10-smart-rv-upgrades',
      content: 'Transform your RV into a smart home on wheels with these essential tech upgrades. From automated climate control to smart security systems, these upgrades will revolutionize your RV experience.'
    },
    {
      category: 'tech',
      author: {
        initials: 'SP',
        name: 'Solar Pro'
      },
      title: 'Solar Power Solutions for Full Time RVers',
      description: 'Complete guide to planning and installing a solar power system in your RV.',
      image: '/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png',
      slug: 'solar-power-solutions',
      content: 'A comprehensive guide to planning and installing a solar power system in your RV. Learn about panel selection, battery storage, and system maintenance for sustainable off-grid living.'
    },
    {
      category: 'travel',
      author: {
        initials: 'RW',
        name: 'Remote Worker'
      },
      title: 'Remote Work from Your RV: Essential Setup Guide',
      description: 'Create the perfect mobile office setup in your RV with these tips.',
      image: '/lovable-uploads/ae930cf7-205f-41d3-9c9b-a4969e5c35e6.png',
      slug: 'remote-work-rv-setup',
      content: 'Create the perfect mobile office setup in your RV with these essential tips. From connectivity solutions to workspace organization, this guide covers everything you need to work effectively from your RV.'
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