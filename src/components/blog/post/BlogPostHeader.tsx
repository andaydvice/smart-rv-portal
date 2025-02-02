import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const BlogPostHeader = () => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="ghost"
      onClick={() => navigate('/blog')}
      className="text-white hover:bg-connectivity-accent hover:text-white"
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      Back to Blog
    </Button>
  );
};