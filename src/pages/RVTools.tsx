import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/ui/container';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { 
  Brain, Cpu, Search, Calendar, ClipboardCheck, MessageSquare
} from 'lucide-react';
import { AITechnologyReadinessAssessment } from '@/components/rv-technology/interactive/AITechnologyReadinessAssessment';
import { AIEducationalConsultant } from '@/components/rv-technology/interactive/AIEducationalConsultant';
import IntelligentRVFinder from '@/components/rv-technology/interactive/IntelligentRVFinder';
import { EnhancedFeatureMatcher } from '@/components/rv-technology/interactive/EnhancedFeatureMatcher';
import { AILifestylePlanner } from '@/components/rv-technology/interactive/AILifestylePlanner';
import { AITechnologyChecklist } from '@/components/rv-technology/interactive/AITechnologyChecklist';
import aiEducationalConsultantHero from '@/assets/ai-educational-consultant-hero.png';
import intelligentRvFinderHero from '@/assets/intelligent-rv-finder-hero.jpg';
import aiEnhancedFeatureMatcherHero from '@/assets/ai-enhanced-feature-matcher-hero.jpg';
import aiLifestyleTechnologyPlannerHero from '@/assets/ai-lifestyle-technology-planner-hero.png';
import aiTechnologyResearchChecklistHero from '@/assets/ai-technology-research-checklist-hero.jpg';

const RVTools = () => {
  return (
    <>
      <Helmet>
        <title>Interactive RV Technology Tools | AI-Powered RV Research | Smart RV Technology Hub</title>
        <meta 
          name="description" 
          content="Use our suite of AI-powered interactive tools to research RV technology, find the perfect RV, assess technology readiness, and create personalized checklists for your RV purchase." 
        />
        <meta 
          name="keywords" 
          content="RV tools, AI RV finder, RV technology assessment, RV checklist, RV feature matcher, RV lifestyle planner, interactive RV tools" 
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-tools" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#080F1F] to-[#151A22] text-white">
        {/* Hero Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#5B9BD5]/10 via-transparent to-[#5B9BD5]/10" />
          <Container>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="flex justify-center mb-8 animate-fade-in">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#5B9BD5]/30 to-[#60A5FA]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative p-6 bg-gradient-to-br from-[#5B9BD5]/20 to-[#60A5FA]/20 rounded-full border border-[#5B9BD5]/30 backdrop-blur-sm">
                    <Brain className="h-20 w-20 text-[#5B9BD5] animate-pulse" />
                  </div>
                </div>
              </div>
              
              <div className="mb-6 space-y-2">
                <div className="h-1 w-24 bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] mx-auto rounded-full" />
                <div className="h-0.5 w-12 bg-[#5B9BD5]/50 mx-auto rounded-full" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white to-[#E2E8FF] bg-clip-text text-transparent">
                Interactive RV Technology Tools
              </h1>
              
              <p className="text-xl md:text-2xl text-[#E2E8FF] mb-10 leading-relaxed">
                AI-powered tools to help you research, compare, and select the perfect RV technology setup for your lifestyle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ExternalLinkButton 
                  href="https://www.rvt.com/buy/" 
                  variant="default" 
                  size="lg"
                  className="text-lg bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#5B9BD5]/25"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse RV Inventory
                </ExternalLinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* Tools Grid Overview */}
        <section className="py-12 px-4">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Cpu className="h-6 w-6 text-[#5B9BD5]" />
                    <h3 className="text-lg font-semibold text-white">Technology Assessment</h3>
                  </div>
                  <p className="text-[#E2E8FF] text-sm">
                    Discover your ideal RV technology setup based on your needs and experience level.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="h-6 w-6 text-[#60A5FA]" />
                    <h3 className="text-lg font-semibold text-white">AI Consultant</h3>
                  </div>
                  <p className="text-[#E2E8FF] text-sm">
                    Get personalized educational guidance about RV technology concepts.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Search className="h-6 w-6 text-[#10B981]" />
                    <h3 className="text-lg font-semibold text-white">Intelligent RV Finder</h3>
                  </div>
                  <p className="text-[#E2E8FF] text-sm">
                    Find RVs that match your lifestyle with AI-powered recommendations.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-6 w-6 text-[#F59E0B]" />
                    <h3 className="text-lg font-semibold text-white">Feature Matcher</h3>
                  </div>
                  <p className="text-[#E2E8FF] text-sm">
                    Match your RV usage plans with relevant technology features.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-6 w-6 text-[#EC4899]" />
                    <h3 className="text-lg font-semibold text-white">Lifestyle Planner</h3>
                  </div>
                  <p className="text-[#E2E8FF] text-sm">
                    Plan your perfect RV technology setup for your unique lifestyle.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <ClipboardCheck className="h-6 w-6 text-[#8B5CF6]" />
                    <h3 className="text-lg font-semibold text-white">Research Checklist</h3>
                  </div>
                  <p className="text-[#E2E8FF] text-sm">
                    Generate a personalized research checklist for your RV purchase.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Interactive Technology Assessment */}
        <section id="technology-assessment" className="py-16 px-4 relative bg-[#080F1F]/50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#5B9BD5]" />
                  <Cpu className="h-8 w-8 text-[#5B9BD5]" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#5B9BD5]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white bg-gradient-to-r from-white to-[#E2E8FF] bg-clip-text text-transparent">
                  AI Technology Readiness Assessment
                </h2>
                <p className="text-xl text-[#E2E8FF] leading-relaxed">
                  Take our quick assessment to discover RV technology features that match your needs and preferences.
                </p>
              </div>
              
              <AITechnologyReadinessAssessment />
            </div>
          </Container>
        </section>

        {/* AI Educational Consultant */}
        <section id="ai-consultant" className="py-16 px-4 relative">
          <Container>
            <div className="text-center mb-12">
              <div className="mb-8">
                <img 
                  src={aiEducationalConsultantHero} 
                  alt="AI Educational Consultant - Futuristic RV technology interface" 
                  className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                AI Educational Consultant
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Get personalized educational guidance about RV technology concepts through our AI assistant.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <AIEducationalConsultant />
            </div>
          </Container>
        </section>

        {/* Intelligent RV Finder */}
        <section id="rv-finder" className="py-16 px-4 relative bg-[#151A22]/90">
          <Container>
            <div className="text-center mb-12">
              <div className="mb-8">
                <img 
                  src={intelligentRvFinderHero} 
                  alt="Intelligent RV Finder - Multiple RVs on digital interface platform" 
                  className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Intelligent RV Finder
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Get personalized RV recommendations based on your lifestyle and needs, with real search results.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <IntelligentRVFinder />
            </div>
          </Container>
        </section>

        {/* Enhanced Feature Matcher */}
        <section id="feature-matcher" className="py-16 px-4 relative">
          <Container>
            <div className="text-center mb-12">
              <div className="mb-8">
                <img 
                  src={aiEnhancedFeatureMatcherHero} 
                  alt="AI Enhanced Feature Matcher - AI brain analyzing RV technology features" 
                  className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                AI Enhanced Feature Matcher
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Describe your RV plans and get educational insights about relevant technology features.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <EnhancedFeatureMatcher />
            </div>
          </Container>
        </section>

        {/* Lifestyle Technology Planner */}
        <section id="lifestyle-planner" className="py-16 px-4 relative bg-[#080F1F]/50">
          <Container>
            <div className="text-center mb-12">
              <div className="mb-8">
                <img 
                  src={aiLifestyleTechnologyPlannerHero} 
                  alt="AI Lifestyle Technology Planner - Modern RV interior with smart display showing lifestyle planning options" 
                  className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                AI Lifestyle Technology Planner
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Discover RV technology setups tailored to different lifestyle scenarios.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <AILifestylePlanner />
            </div>
          </Container>
        </section>

        {/* Technology Research Checklist */}
        <section id="research-checklist" className="py-16 px-4 relative">
          <Container>
            <div className="text-center mb-12">
              <div className="mb-8">
                <img 
                  src={aiTechnologyResearchChecklistHero} 
                  alt="AI Technology Research Checklist - Digital checklist interface with AI research capabilities" 
                  className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                AI Technology Research Checklist
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Generate a personalized research checklist to guide your RV technology decisions.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <AITechnologyChecklist />
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <Container>
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#091020] to-[#151A22] p-12 rounded-2xl border border-[#5B9BD5]/20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your RV Journey?
              </h2>
              <p className="text-xl text-[#E2E8FF] mb-8">
                Use these tools to research and plan, then browse available RVs to find your perfect match.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ExternalLinkButton 
                  href="https://www.rvt.com/buy/" 
                  variant="default" 
                  size="lg"
                  className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5]"
                >
                  Browse RV Inventory
                </ExternalLinkButton>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default RVTools;
