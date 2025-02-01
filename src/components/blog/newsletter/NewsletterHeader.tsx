import { Mail } from "lucide-react";

const NewsletterHeader = () => {
  return (
    <>
      <div className="p-3 rounded-full bg-connectivity-accent/10 inline-block">
        <Mail className="w-6 h-6 text-connectivity-accent" />
      </div>
      
      <h2 className="text-3xl font-semibold text-white">
        Stay Updated with Smart RV News
      </h2>
      
      <div className="max-w-xl mx-auto">
        <p className="text-[#E2E8FF] text-lg whitespace-nowrap overflow-hidden text-ellipsis px-4">
          Get the latest tech tips, travel guides, and smart RV solutions delivered to your inbox.
        </p>
      </div>
    </>
  );
};

export default NewsletterHeader;