export type Testimonial = {
  persona: 'Innovation Pioneers' | 'Digital Nomads' | 'Families' | 'Retirees' | string;
  quote: string;
  author: string;
  sourceName: string;
  sourceUrl: string;
  verified: boolean;
};

const testimonials: Testimonial[] = [
  // Intentionally empty until fact-checked sources are added.
];

export default testimonials;
