import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { BlogPostHeader as BackToBlogHeader } from "@/components/blog/post/BlogPostHeader";
import { BlogPostImage } from "@/components/blog/post/BlogPostImage";
import { BlogPostContent } from "@/components/blog/post/BlogPostContent";
import { PageErrorBoundary } from "@/components/common/PageErrorBoundary";
import Footer2 from "@/components/ui/Footer2";
import BlogAffiliateSection from "@/components/affiliate/BlogAffiliateSection";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { useToast } from "@/hooks/use-toast";
import { blogPosts } from '@/data/blog'; // MODIFIED: Updated import path

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
          <BackToBlogHeader />
          <BlogPostImage image={post.image} title={post.title} />
          <BlogPostContent 
            category={post.category}
            title={post.title}
            author={post.author}
            description={post.description}
            content={post.content}
          />
          
          {/* Affiliate product recommendations */}
          <BlogAffiliateSection 
            category={post.category}
            postSlug={post.slug}
          />
          
          {/* Affiliate disclosure */}
          <AffiliateDisclosure />
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
