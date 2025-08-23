import { useParams, useNavigate } from 'react-router-dom';
import SEO from "@/components/seo/SEO";
import { articleSchema, breadcrumbSchema } from "@/components/seo/schemas";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { BlogPostHeader as BackToBlogHeader } from "@/components/blog/post/BlogPostHeader";
import { BlogPostImage } from "@/components/blog/post/BlogPostImage";
import { BlogPostContent } from "@/components/blog/post/BlogPostContent";
import { PageErrorBoundary } from "@/components/common/PageErrorBoundary";
import Footer2 from "@/components/ui/Footer2";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
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
        <Navbar />
        <SEO
          title={post.title}
          description={post.description}
          keywords={`RV technology, ${post.category}, smart RV, digital nomad, ${post.title.toLowerCase().replace(/\s+/g, ', ')}`}
          author={post.author.name}
          ogImage={post.image}
          ogImageAlt={`${post.title} - Smart RV Technology Guide`}
          article={{
            publishedTime: new Date().toISOString(),
            author: post.author.name,
            section: post.category,
            tags: [post.category, 'RV Technology', 'Smart RV', 'Digital Nomad']
          }}
          structuredData={[
            articleSchema({
              title: post.title,
              description: post.description,
              author: post.author.name,
              publishedTime: new Date().toISOString(),
              image: post.image,
              url: typeof window !== 'undefined' ? window.location.href : '',
              category: post.category
            }),
            breadcrumbSchema([
              { name: 'Home', url: typeof window !== 'undefined' ? window.location.origin : '' },
              { name: 'Blog', url: typeof window !== 'undefined' ? `${window.location.origin}/blog` : '' },
              { name: post.title, url: typeof window !== 'undefined' ? window.location.href : '' }
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Recommended Smart RV Resources',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'RV Life Resources', url: 'https://rvlife.com?ref=smartportal' },
                { '@type': 'ListItem', position: 2, name: 'RV Life Technology', url: 'https://rvlife.com?ref=smarttech' },
                { '@type': 'ListItem', position: 3, name: 'Good Sam Services', url: 'https://goodsam.com?ref=smartrv' }
              ]
            }
          ]}
        />
        
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
          <OptimizedAffiliateGrid
            title="Recommended Smart RV Resources"
            subtitle="Discover products and services that enhance your smart RV lifestyle and adventures."
            partners={[
              { partner: 'rvlife', title: 'RV Life Resources', description: 'Trip planning and RV lifestyle guides' },
              { partner: 'rvlife', title: 'RV Technology', description: 'Latest RV tech and equipment reviews' },
              { partner: 'goodsam', title: 'Smart RV Community', description: 'Join the largest smart RV community for tips and support' }
            ]}
            gridCols="3"
          />
          
          {/* Affiliate disclosure */}
          <AffiliateDisclosure compact />
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
