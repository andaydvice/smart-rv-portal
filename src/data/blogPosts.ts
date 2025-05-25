
import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
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
  },
  {
    category: 'tech',
    author: {
      initials: 'SS',
      name: 'Security Specialist'
    },
    title: 'Smart RV Security Systems: Peace of Mind on the Road',
    description: 'Explore the latest advancements in RV security to protect your mobile home.',
    image: '/lovable-uploads/24586e9a-422f-45ee-aaaa-2ffa5f0e2274.png',
    slug: 'smart-rv-security-systems',
    content: 'Ensuring the security of your RV is paramount, whether you\'re on a remote adventure or parked at a bustling campsite. Modern smart RV security systems offer a range of features, from advanced surveillance cameras and motion detectors to smart locks and real-time alerts sent directly to your smartphone. Discover how these technologies can provide you with peace of mind, allowing you to fully enjoy your travels without worrying about the safety of your mobile home and belongings. We delve into the key components of a robust RV security setup, installation tips, and how to choose the system that best fits your needs and budget.'
  },
  // MODIFIED: Added new blog post for top-10-rv-parks-in-the-usa
  {
    category: 'travel',
    author: {
      initials: 'TP',
      name: 'Travel Planner'
    },
    title: 'Top 10 RV Parks in the USA',
    description: 'Discover the best RV parks across the United States for your next adventure.',
    image: '/lovable-uploads/1e3c2aa7-d13d-4cbd-a98a-37066b326f1d.png', // Placeholder image
    slug: 'top-10-rv-parks-in-the-usa',
    content: 'Planning your next RV trip? Explore our curated list of the top 10 RV parks in the USA, offering stunning views, excellent amenities, and unforgettable experiences. From coastal retreats to mountain getaways, find the perfect spot for your mobile home.'
  },
  // MODIFIED: Added new blog post for solar-power-for-rvs
  {
    category: 'tech',
    author: {
      initials: 'SE',
      name: 'Solar Enthusiast'
    },
    title: 'Comprehensive Guide to Solar Power for RVs',
    description: 'Everything you need to know about harnessing solar energy for your RV lifestyle.',
    image: '/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png', // Placeholder image (re-used existing solar image)
    slug: 'solar-power-for-rvs',
    content: 'Unlock the potential of solar power for your RV. This comprehensive guide covers panel types, battery systems, installation tips, and how to optimize your setup for off-grid adventures. Make your RV travels more sustainable and self-sufficient with solar energy.'
  }
];
