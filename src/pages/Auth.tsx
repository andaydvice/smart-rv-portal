
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForms } from '@/components/auth/AuthForms';
import { useAuth } from '@/components/auth/AuthContext';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer2 from "@/components/ui/Footer2";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  console.log("Auth page - Current user:", user); // Debug log

  const from = location.state?.from?.pathname || '/';

  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Features", href: "/features" },
        { text: "Models", href: "/models" }
      ]
    },
    {
      title: "Support",
      links: [
        { text: "Contact", href: "/contact" },
        { text: "Documentation", href: "/documentation" },
        { text: "FAQs", href: "/faqs" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  useEffect(() => {
    if (user) {
      console.log("Auth page - Redirecting authenticated user to:", from); // Debug log
      navigate(from);
    }
  }, [user, navigate, from]);

  return (
    <div className="flex flex-col min-h-screen bg-[#080F1F]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">
              Join Smart RV Living
            </h1>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-blue-400">Why Create an Account?</h2>
              <ul className="space-y-4 text-left text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">✓</span>
                  <span>Access exclusive RV calculators and tools to plan your trips better</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">✓</span>
                  <span>Get personalized weather alerts and route recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">✓</span>
                  <span>Save your favorite storage facilities and camping spots</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">✓</span>
                  <span>Track your RV maintenance history and get reminders</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <Card className="p-6 bg-[#131a2a] border-gray-700">
              <AuthForms onSuccess={() => navigate(from)} />
            </Card>
            
            <div className="text-sm text-gray-400 px-4">
              <p>By creating an account, you'll get access to our premium features and tools designed specifically for RV enthusiasts. We respect your privacy and will never share your information.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Join our community of Smart RV enthusiasts and unlock premium features"
      />
    </div>
  );
};

export default Auth;
