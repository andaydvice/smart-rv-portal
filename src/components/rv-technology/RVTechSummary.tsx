import React from 'react';
import { Container } from '@/components/ui/container';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { 
  Clock, CheckCircle2, Users, Target, Lightbulb, MapPin, 
  Calculator, BookOpen, ShoppingCart, TrendingUp
} from 'lucide-react';

export const RVTechSummary = () => {
  const benefits = [
    {
      icon: <Target className="h-5 w-5" />,
      title: '4 Interactive Tools',
      description: 'Assessment quiz, feature matcher, lifestyle planner & checklist'
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: '12 Major Sections',
      description: 'Comprehensive coverage from basics to advanced decision making'
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: '50+ Research Questions',
      description: 'Specific questions to ask dealers for each technology category'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'All Experience Levels',
      description: 'From first-time buyers to RV technology enthusiasts'
    }
  ];

  const quickAccess = [
    {
      icon: <Calculator className="h-5 w-5" />,
      title: 'Technology Assessment',
      description: 'Find your perfect RV tech match',
      link: '#technology-assessment'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Power Management',
      description: 'Solar, batteries & electrical systems',
      link: '#power-management'
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Decision Framework',
      description: 'Make informed technology choices',
      link: '#decision-framework'
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-[#151A22]/80 to-[#091020]/80 border-y border-[#5B9BD5]/10">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#5B9BD5]/10 rounded-full border border-[#5B9BD5]/20">
              <Clock className="h-4 w-4 text-[#5B9BD5]" />
              <span className="text-[#5B9BD5] font-medium">15-20 min read</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              What You'll Learn From This Guide
            </h2>
            <p className="text-[#E2E8FF] text-lg max-w-3xl mx-auto">
              Everything you need to understand RV technology options and make confident purchasing decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#5B9BD5]/10 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#5B9BD5]/20 rounded-lg group-hover:bg-[#5B9BD5]/30 transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                </div>
                <p className="text-[#E2E8FF] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-8 rounded-2xl border border-[#5B9BD5]/20 mb-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Quick Access to Popular Sections
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {quickAccess.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="group flex items-center gap-3 p-4 bg-[#5B9BD5]/5 rounded-lg border border-[#5B9BD5]/10 hover:border-[#5B9BD5]/30 hover:bg-[#5B9BD5]/10 transition-all duration-300"
                >
                  <div className="p-2 bg-[#5B9BD5]/20 rounded-lg group-hover:bg-[#5B9BD5]/30 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-[#5B9BD5] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[#E2E8FF] text-sm">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ExternalLinkButton 
                href="https://www.rvt.com/buy/" 
                variant="default" 
                size="lg"
                className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#5B9BD5]/25"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Browse Current RV Inventory
              </ExternalLinkButton>
              <ExternalLinkButton 
                href="https://www.rvt.com/buy/" 
                variant="outline" 
                size="lg"
                className="border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10 hover:border-[#5B9BD5] transition-all duration-300"
              >
                <Lightbulb className="mr-2 h-5 w-5" />
                Get Expert Advice
              </ExternalLinkButton>
            </div>
            <p className="text-[#E2E8FF]/80 text-sm">
              Ready to start shopping? Use this guide to ask the right questions when evaluating RV technology options.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};