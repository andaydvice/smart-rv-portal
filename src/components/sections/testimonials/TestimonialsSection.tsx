import React from 'react';
import testimonials from '@/data/testimonials';

const isValidUrl = (url: string) => /^https?:\/\//i.test(url);

const TestimonialsSection: React.FC = () => {
  const items = testimonials.filter((t) => t.verified && isValidUrl(t.sourceUrl));
  if (items.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">What smart RVers say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t, idx) => (
            <article key={idx} className="rounded-xl border border-[#1a202c] bg-[#091020] p-6">
              <div className="text-xs text-[#E2E8FF]/80 mb-2">{t.persona}</div>
              <blockquote className="text-white text-base leading-relaxed mb-4">“{t.quote}”</blockquote>
              <div className="text-sm text-[#E2E8FF]">
                <span className="font-medium text-white">{t.author}</span>
                <span className="mx-2 text-[#E2E8FF]/60">•</span>
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="underline decoration-dotted underline-offset-4"
                >
                  {t.sourceName}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
