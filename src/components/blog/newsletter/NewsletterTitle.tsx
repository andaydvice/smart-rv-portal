import { motion } from "framer-motion";

interface NewsletterTitleProps {
  subscriptionCount: number | null;
}

export const NewsletterTitle = ({ subscriptionCount }: NewsletterTitleProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-4xl font-bold text-white">
        Stay Updated with Smart RV Insights
      </h2>
      <p className="text-lg text-white/90">
        {subscriptionCount !== null 
          ? `Join ${subscriptionCount} subscribers receiving our latest updates on RV technology, travel tips, and smart living solutions.`
          : "Join our community receiving the latest updates on RV technology, travel tips, and smart living solutions."}
      </p>
    </div>
  );
};