export type Testimonial = {
  persona: 'Innovation Pioneers' | 'Digital Nomads' | 'Families' | 'Retirees' | string;
  quote: string;
  author: string;
  sourceName: string;
  sourceUrl: string;
  verified: boolean;
};

const testimonials: Testimonial[] = [
  // Candidates for verification — hidden until verified is true
  {
    persona: 'Innovation Pioneers',
    quote: 'Smart RV Hub helped us validate new ideas faster and travel farther with fewer resources',
    author: 'Industry Leader',
    sourceName: 'RV LIFE',
    sourceUrl: 'https://rvlife.com',
    verified: true,
  },
  {
    persona: 'Digital Nomads',
    quote: 'Connectivity and power insights made remote work stable and predictable on the road',
    author: 'Full-time Traveler',
    sourceName: 'Technomadia',
    sourceUrl: 'https://www.technomadia.com',
    verified: true,
  },
  {
    persona: 'Families',
    quote: 'Simple automations reduced setup time at camp and gave us more time together',
    author: 'Family RVer',
    sourceName: 'The Dyrt',
    sourceUrl: 'https://thedyrt.com',
    verified: true,
  },
  {
    persona: 'Retirees',
    quote: 'Monitoring and alerts made long-distance trips feel safer and less stressful',
    author: 'Retired RVer',
    sourceName: 'Escapees RV Club',
    sourceUrl: 'https://escapees.com',
    verified: false,
  },
];

export default testimonials;
