import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { BlogPostHeader } from "@/components/blog/post/BlogPostHeader";
import { BlogPostImage } from "@/components/blog/post/BlogPostImage";
import { BlogPostContent } from "@/components/blog/post/BlogPostContent";
import { PageErrorBoundary } from "@/components/common/PageErrorBoundary";
import Footer2 from "@/components/ui/Footer2";
import { useToast } from "@/hooks/use-toast";

  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Blog", href: "/blog" },
        { text: "Features", href: "/features" }
      ]
    },
    {
      title: "Blog Categories",
      links: [
        { text: "Technology", href: "/blog?category=tech" },
        { text: "Travel", href: "/blog?category=travel" },
        { text: "All Posts", href: "/blog" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];
  
const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    // Featured posts
    {
      category: 'Culture',
      author: {
        initials: 'ST',
        name: 'Smart Tech'
      },
      title: 'RV Smart Tech',
      description: 'Experience the future of RV living with cutting edge smart technology.',
      image: '/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png',
      slug: 'rv-smart-tech',
      content: 'Experience the future of RV living with cutting edge smart technology that transforms your mobile lifestyle. Our innovative systems seamlessly integrate automation, monitoring, and control features to enhance every aspect of your RV experience.'
    },
    {
      category: 'Technology',
      author: {
        initials: 'IS',
        name: 'Indoor Storage'
      },
      title: 'Indoor RV Storage',
      description: 'Discover premium climate controlled indoor RV storage solutions.',
      image: '/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.png',
      slug: 'indoor-rv-storage',
      content: 'Discover premium climate controlled indoor RV storage solutions that protect your investment year round. Our state of the art facilities offer advanced security systems and easy access, ensuring your RV stays in pristine condition between adventures.'
    },
    // Trending posts
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
      content: 'Transform your RV into a smart home on wheels with these essential tech upgrades. From automated systems to intelligent monitoring solutions, discover the latest innovations that are revolutionizing the RV experience.'
    },
    {
      category: 'tech',
      author: {
        initials: 'SP',
        name: 'Solar Power Expert'
      },
      title: 'Solar Power Solutions for Full Time RVers',
      description: 'Complete guide to planning and installing a solar power system in your RV.',
      image: '/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png',
      slug: 'solar-power-solutions',
      content: 'Complete guide to planning and installing a solar power system in your RV. Learn about panel selection, battery storage, installation considerations, and how to maximize your solar setup for full-time RV living.'
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
      content: 'Create the perfect mobile office setup in your RV with these essential tips. From connectivity solutions to workspace organization, learn how to maintain productivity while enjoying the freedom of RV living.'
    }
  ];

  console.log({
    pathname: window.location.pathname,
    slug: useParams().slug,
    postFound: blogPosts.some(p => p.slug === useParams().slug)
  });

  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-[#080F1F] text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 pt-32 flex-grow flex flex-col items-center justify-center text-center">
          <AlertTriangle className="h-16 w-16 text-[#EF4444] mb-6" />
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-[#E2E8FF] max-w-lg mb-8">
            We couldn't find the blog post you're looking for. It may have been moved or removed.
          </p>
          <Button
            variant="default"
            onClick={() => {
              toast({
                title: "Redirecting",
                description: "Taking you back to the blog"
              });
              navigate('/blog');
            }}
            className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog Posts
          </Button>
        </div>
        <Footer2 
          links={footerLinks}
          socials={footerSocials}
          description="Discover the latest in Smart RV technology and travel tips"
        />
      </div>
    );
  }

  return (
    <PageErrorBoundary>
      <div className="flex flex-col min-h-screen bg-[#080F1F]">
        <Helmet>
          <title>{post.title} - Smart RV Blog</title>
          <meta name="description" content={post.description} />
        </Helmet>
        
        <Navbar />
        <div className="container mx-auto px-4 py-8 space-y-8 pt-20 flex-grow">
          <BlogPostHeader />
          <BlogPostImage image={post.image} title={post.title} />
          <BlogPostContent 
            category={post.category}
            title={post.title}
            author={post.author}
            content={post.content}
          />
        </div>
        <Footer2 
          links={footerLinks}
          socials={footerSocials}
          description="Discover the latest in Smart RV technology and travel tips"
        />
      </div>
    </PageErrorBoundary>
  );
};

export default BlogPost;
