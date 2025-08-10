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
    quote: '',
    author: 'Industry Leader',
    sourceName: 'RV LIFE',
    sourceUrl: 'https://rvlife.com',
    verified: false,
  },
  {
    persona: 'Digital Nomads',
    quote: '',
    author: 'Full-time Traveler',
    sourceName: 'Technomadia',
    sourceUrl: 'https://www.technomadia.com',
    verified: false,
  },
  {
    persona: 'Families',
    quote: '',
    author: 'Family RVer',
    sourceName: 'The Dyrt',
    sourceUrl: 'https://thedyrt.com',
    verified: false,
  },
  {
    persona: 'Retirees',
    quote: '',
    author: 'Retired RVer',
    sourceName: 'Escapees RV Club',
    sourceUrl: 'https://escapees.com',
    verified: false,
  },
];

export default testimonials;
