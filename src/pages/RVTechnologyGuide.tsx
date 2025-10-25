import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { PreloadedHeaderImage } from '@/components/ui/PreloadedHeaderImage';
import { 
  Cpu, Wifi, Battery, Smartphone, Monitor, Shield, Zap, Signal, CheckCircle, AlertTriangle, Users,
  Car, Truck, Home, Calendar, MapPin, Scale, Settings, DollarSign, Plug, BookOpen, FileText, Play,
  TestTube, Target, Globe, Heart, Brain, TrendingUp, GraduationCap, Database, ClipboardCheck,
  ShoppingCart, Search, Building, Star
} from 'lucide-react';
import SpecificationsTable from '@/components/models/compare/SpecificationsTable';
import FeaturesComparisonTable from '@/components/models/compare/FeaturesComparisonTable';
import models from '@/components/models/compare/ModelComparisonData';
import RVTechnologyHeader from '@/components/rv-technology/RVTechnologyHeader';
import RVConnectivityHero from '@/components/rv-technology/RVConnectivityHero';
import RVPowerManagementHero from '@/components/rv-technology/RVPowerManagementHero';
import RVControlMonitoringHero from '@/components/rv-technology/RVControlMonitoringHero';
import RVTechnologyTiersHero from '@/components/rv-technology/RVTechnologyTiersHero';
import rvTechComparisonImage from '@/assets/rv-technology-comparison-dashboard.webp';
import aiEducationalConsultantHero from '@/assets/ai-educational-consultant-hero.webp';
import intelligentRvFinderHero from '@/assets/intelligent-rv-finder-hero.webp';
import aiEnhancedFeatureMatcherHero from '@/assets/ai-enhanced-feature-matcher-hero.webp';
import aiLifestyleTechnologyPlannerHero from '@/assets/ai-lifestyle-technology-planner-hero.webp';
import aiTechnologyResearchChecklistHero from '@/assets/ai-technology-research-checklist-hero.webp';
import rvCategoryComparisonImage from '@/assets/rv-category-comparison.webp';
import rvDealershipBackground from '@/assets/rv-dealership-background.webp';
import rvTechnologyPlanningImage from '@/assets/rv-technology-planning.webp';
import rvTechnologyDecisionsImage from '@/assets/rv-technology-decisions.webp';
import rvTechnologyGuideHero from '@/assets/rv-technology-guide-hero.webp';
import { BlogPostImage } from '@/components/blog/post/BlogPostImage';
import { RVTechNavigation } from '@/components/rv-technology/RVTechNavigation';
import { RVTechSummary } from '@/components/rv-technology/RVTechSummary';
import { ScrollToTopButton } from '@/components/rv-technology/ScrollToTopButton';
import { ToolPreviewCard } from '@/components/rv-technology/ToolPreviewCard';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RVTechnologyGuide = () => {
  return (
    <Layout>
      <Helmet>
        <title>RV Technology Buyer's Education Guide | Smart RV Technology Hub</title>
        <meta 
          name="description" 
          content="Complete guide to understanding modern RV technology options. Learn about connectivity, power management, and control systems to make informed buying decisions." 
        />
        <meta 
          name="keywords" 
          content="RV technology guide, RV connectivity, RV power systems, RV automation, RV buyer education, smart RV features" 
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-technology-guide" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#080F1F] to-[#151A22] text-white">
        {/* Header Image */}
        <RVTechnologyHeader />

        {/* Sticky Navigation */}
        <RVTechNavigation />

        {/* Page Indicator */}
        <section className="py-4 px-4 bg-[#151A22]/50 border-b border-[#5B9BD5]/20">
          <Container>
            <div className="flex items-center justify-end max-w-6xl mx-auto">
              <div className="flex items-center gap-2 text-xs text-[#E2E8FF]">
                <span className="px-3 py-1 bg-[#5B9BD5]/20 rounded-full border border-[#5B9BD5]/40">
                  Page 1 of 3
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Content Summary */}
        <RVTechSummary />

        {/* Hero Section with Enhanced Visuals */}
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#5B9BD5]/5 via-transparent to-[#5B9BD5]/5" />
          <Container>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="flex justify-center mb-8 animate-fade-in">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#5B9BD5]/30 to-[#60A5FA]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative p-6 bg-gradient-to-br from-[#5B9BD5]/20 to-[#60A5FA]/20 rounded-full border border-[#5B9BD5]/30 backdrop-blur-sm hover:scale-110 transition-transform duration-300">
                    <Cpu className="h-16 w-16 text-[#5B9BD5] animate-pulse" />
                  </div>
                </div>
              </div>
              
              <div className="mb-6 space-y-2">
                <div className="h-1 w-24 bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] mx-auto rounded-full" />
                <div className="h-0.5 w-12 bg-[#5B9BD5]/50 mx-auto rounded-full" />
              </div>
              
              {/* Hero Image */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="relative rounded-2xl overflow-hidden border border-[#5B9BD5]/20 shadow-2xl">
                  <PreloadedHeaderImage 
                    src={rvTechnologyGuideHero}
                    alt="Modern RV interior with advanced technology dashboard and smart control systems"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    width={1920}
                    height={1080}
                    priority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-[#E2E8FF] mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Your comprehensive guide to navigating the complex world of RV technology features and making informed purchasing decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <ExternalLinkButton 
                  href="https://www.rvt.com/buy/" 
                  variant="default" 
                  size="lg"
                  className="text-lg bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#5B9BD5]/25"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Research Current Options
                </ExternalLinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* Interactive Technology Assessment */}
        <section id="technology-assessment" className="py-16 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#151A22]/20 to-transparent" />
          <Container>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#5B9BD5]" />
                  <Smartphone className="h-8 w-8 text-[#5B9BD5]" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#5B9BD5]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white bg-gradient-to-r from-white to-[#E2E8FF] bg-clip-text text-transparent">
                  Interactive RV Technology Tools
                </h2>
                <p className="text-xl text-[#E2E8FF] leading-relaxed">
                  Use our free AI-powered tools to discover the perfect RV technology setup for your needs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <ToolPreviewCard
                  title="AI Technology Readiness Assessment"
                  description="Get personalized RV technology recommendations based on your experience level and travel goals. Our AI analyzes your needs and suggests the perfect technology features."
                  imageSrc={rvTechnologyPlanningImage}
                  imageAlt="AI Technology Readiness Assessment tool interface"
                  toolPath="/tools/readiness-assessment"
                  icon={Brain}
                />
                <ToolPreviewCard
                  title="AI Technology Checklist"
                  description="Generate a personalized research checklist for your RV technology needs. Get downloadable checklists with questions to ask dealers and features to evaluate."
                  imageSrc={aiTechnologyResearchChecklistHero}
                  imageAlt="AI Technology Research Checklist interface"
                  toolPath="/tools/technology-checklist"
                  icon={ClipboardCheck}
                />
              </div>
              
              <div className="text-center">
                <Button
                  onClick={() => window.location.href = '/tools'}
                  className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] text-white text-lg px-8 py-6"
                >
                  View All RV Technology Tools
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Additional Tools Section */}
        <section className="py-16 px-4 relative bg-[#080F1F]/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                More Interactive Tools
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-2xl mx-auto">
                Explore additional AI-powered tools to help you research and plan your RV technology setup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <ToolPreviewCard
                title="Intelligent RV Finder"
                description="Discover your perfect RV with AI-powered recommendations based on your lifestyle and budget."
                imageSrc={intelligentRvFinderHero}
                imageAlt="Intelligent RV Finder interface showing personalized recommendations"
                toolPath="/tools/intelligent-rv-finder"
                icon={Target}
              />
              
              <ToolPreviewCard
                title="AI Educational Consultant"
                description="Ask questions and get detailed information about RV technology from our AI assistant."
                imageSrc={aiEducationalConsultantHero}
                imageAlt="AI Educational Consultant interface"
                toolPath="/tools/educational-consultant"
                icon={GraduationCap}
              />
              
              <ToolPreviewCard
                title="AI Feature Matcher"
                description="Describe your RV usage plans and discover which technology features match your needs."
                imageSrc={aiEnhancedFeatureMatcherHero}
                imageAlt="AI Enhanced Feature Matcher interface"
                toolPath="/tools/feature-matcher"
                icon={Search}
              />
              
              <ToolPreviewCard
                title="AI Lifestyle Planner"
                description="Discover the perfect RV technology setup for your specific lifestyle and travel plans."
                imageSrc={aiLifestyleTechnologyPlannerHero}
                imageAlt="AI Lifestyle Planner interface"
                toolPath="/tools/lifestyle-planner"
                icon={Heart}
              />
            </div>
          </Container>
        </section>




        {/* Understanding Modern RV Technology */}
        <section id="understanding-technology" className="py-16 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#151A22]/20 to-transparent" />
          <Container>
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#5B9BD5]" />
                  <Monitor className="h-8 w-8 text-[#5B9BD5]" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#5B9BD5]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white bg-gradient-to-r from-white to-[#E2E8FF] bg-clip-text text-transparent">
                  Understanding Modern RV Technology
                </h2>
              </div>
              
              <div className="grid gap-8">
                <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-8 rounded-2xl border border-[#5B9BD5]/20 shadow-xl hover:shadow-[#5B9BD5]/10 transition-all duration-300 hover:border-[#5B9BD5]/40">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#5B9BD5]/20 rounded-lg">
                        <Signal className="h-6 w-6 text-[#5B9BD5]" />
                      </div>
                      <p className="text-[#E2E8FF] text-lg leading-relaxed">
                        The recreational vehicle industry has seen significant technological advancement over the past decade.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#60A5FA]/20 rounded-lg">
                        <Smartphone className="h-6 w-6 text-[#60A5FA]" />
                      </div>
                      <p className="text-[#E2E8FF] text-lg leading-relaxed">
                        Modern RVs increasingly offer connectivity solutions, power management systems, and digital control interfaces that were uncommon in earlier models.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#5B9BD5]/20 rounded-lg">
                        <Shield className="h-6 w-6 text-[#5B9BD5]" />
                      </div>
                      <p className="text-[#E2E8FF] text-lg leading-relaxed">
                        This educational guide helps potential RV buyers understand technology categories and learn what questions to ask when evaluating different options.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <ExternalLinkButton 
                    href="https://www.rvt.com/buy/" 
                    variant="outline" 
                    size="md"
                    className="border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10 hover:border-[#5B9BD5] transition-all duration-300"
                  >
                    <Wifi className="mr-2 h-4 w-4" />
                    Browse available RV inventory at RVT.com
                  </ExternalLinkButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Connectivity Technology Section */}
        <div id="connectivity">
          <RVConnectivityHero />
        
          <section className="py-16 px-4 bg-[#151A22]/50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="group bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#5B9BD5]/10 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#5B9BD5]/20 rounded-lg group-hover:bg-[#5B9BD5]/30 transition-colors duration-300">
                        <Wifi className="h-6 w-6 text-[#5B9BD5]" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">WiFi Signal Enhancement</h4>
                    </div>
                    <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                      Most newer RVs include some form of WiFi signal boosting capability.
                    </p>
                    <p className="text-[#E2E8FF] leading-relaxed mb-4">
                      These systems typically use external antennas to improve reception from campground networks or cellular data.
                    </p>
                    <div className="mt-4 space-y-2 p-4 bg-[#5B9BD5]/5 rounded-lg border-l-4 border-[#5B9BD5]/50">
                      <h5 className="font-semibold text-white flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#5B9BD5]" />
                        Questions to ask dealers:
                      </h5>
                      <ul className="text-[#E2E8FF] text-sm space-y-1 ml-6">
                        <li>• What type of antenna system is included?</li>
                        <li>• Does the system support multiple device connections?</li>
                        <li>• How does the system handle signal switching between sources?</li>
                      </ul>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#60A5FA]/20 hover:border-[#60A5FA]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#60A5FA]/10 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#60A5FA]/20 rounded-lg group-hover:bg-[#60A5FA]/30 transition-colors duration-300">
                        <Smartphone className="h-6 w-6 text-[#60A5FA]" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">Cellular Data Integration</h4>
                    </div>
                    <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                      Many manufacturers now offer factory-installed cellular capabilities.
                    </p>
                    <p className="text-[#E2E8FF] leading-relaxed mb-4">
                      These systems may include built-in modems and data plans from various carriers.
                    </p>
                    <div className="mt-4 space-y-2 p-4 bg-[#60A5FA]/5 rounded-lg border-l-4 border-[#60A5FA]/50">
                      <h5 className="font-semibold text-white flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#60A5FA]" />
                        Questions to explore with dealers:
                      </h5>
                      <ul className="text-[#E2E8FF] text-sm space-y-1 ml-6">
                        <li>• Which cellular carriers are supported?</li>
                        <li>• What are the ongoing data plan costs and options?</li>
                        <li>• Can the system be used while driving?</li>
                      </ul>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#5B9BD5]/10 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#5B9BD5]/20 rounded-lg group-hover:bg-[#5B9BD5]/30 transition-colors duration-300">
                        <Signal className="h-6 w-6 text-[#5B9BD5]" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">Satellite Internet Preparation</h4>
                    </div>
                    <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                      Some models include preparation for satellite internet systems like Starlink.
                    </p>
                    <p className="text-[#E2E8FF] leading-relaxed mb-4">
                      This typically means pre-installed mounting points and cable routing.
                    </p>
                    <div className="mt-4 space-y-2 p-4 bg-[#5B9BD5]/5 rounded-lg border-l-4 border-[#5B9BD5]/50">
                      <h5 className="font-semibold text-white flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#5B9BD5]" />
                        Consider asking:
                      </h5>
                      <ul className="text-[#E2E8FF] text-sm space-y-1 ml-6">
                        <li>• What satellite systems are supported?</li>
                        <li>• What additional equipment would be needed?</li>
                        <li>• Are installation services available?</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <ExternalLinkButton 
                    href="https://www.rvt.com/buy/" 
                    variant="default" 
                    size="lg"
                    className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#5B9BD5]/25"
                  >
                    <Wifi className="mr-2 h-5 w-5" />
                    Explore Connectivity Options
                  </ExternalLinkButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        </div>

        {/* Power Management Section */}
        <div id="power-management">
          <RVPowerManagementHero />
        
          <section className="py-16 px-4">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="group bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#5B9BD5]/10 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#5B9BD5]/20 rounded-lg group-hover:bg-[#5B9BD5]/30 transition-colors duration-300">
                        <Battery className="h-6 w-6 text-[#5B9BD5]" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">Traditional Lead Acid Systems</h4>
                    </div>
                    <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                      Entry level RVs typically include lead acid or AGM battery systems.
                    </p>
                    <p className="text-[#E2E8FF] leading-relaxed">
                      These provide basic power storage with established charging patterns.
                    </p>
                  </div>

                  <div className="group bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#60A5FA]/20 hover:border-[#60A5FA]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#60A5FA]/10 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#60A5FA]/20 rounded-lg group-hover:bg-[#60A5FA]/30 transition-colors duration-300">
                        <Zap className="h-6 w-6 text-[#60A5FA]" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">Lithium Battery Integration</h4>
                    </div>
                    <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                      Higher end models increasingly feature lithium battery systems.
                    </p>
                    <p className="text-[#E2E8FF] leading-relaxed mb-4">
                      These generally offer longer cycle life and faster charging capabilities.
                    </p>
                    <div className="mt-4 space-y-2 p-4 bg-[#60A5FA]/5 rounded-lg border-l-4 border-[#60A5FA]/50">
                      <h5 className="font-semibold text-white flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#60A5FA]" />
                        Questions to discuss with manufacturers:
                      </h5>
                      <ul className="text-[#E2E8FF] text-sm space-y-1 ml-6">
                        <li>• What type of battery monitoring is included?</li>
                        <li>• How does the system handle charging from multiple sources?</li>
                        <li>• What warranty coverage applies to the battery system?</li>
                      </ul>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-[#091020] to-[#151A22] p-6 rounded-xl border border-[#5B9BD5]/20 hover:border-[#5B9BD5]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#5B9BD5]/10 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#5B9BD5]/20 rounded-lg group-hover:bg-[#5B9BD5]/30 transition-colors duration-300">
                        <Plug className="h-6 w-6 text-[#5B9BD5]" />
                      </div>
                      <h4 className="text-xl font-semibold text-white">Solar Power Integration</h4>
                    </div>
                    <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                      Many RVs now include solar panel preparation or factory installations.
                    </p>
                    <p className="text-[#E2E8FF] leading-relaxed mb-4">
                      Solar systems can supplement charging when adequate sunlight is available.
                    </p>
                    <div className="mt-4 space-y-2 p-4 bg-[#5B9BD5]/5 rounded-lg border-l-4 border-[#5B9BD5]/50">
                      <h5 className="font-semibold text-white flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#5B9BD5]" />
                        Consider exploring:
                      </h5>
                      <ul className="text-[#E2E8FF] text-sm space-y-1 ml-6">
                        <li>• What solar capacity is included or can be added?</li>
                        <li>• How does solar integrate with other charging sources?</li>
                        <li>• What monitoring capabilities are provided?</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <ExternalLinkButton 
                    href="https://www.rvt.com/buy/" 
                    variant="default" 
                    size="lg"
                    className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#5B9BD5]/25"
                  >
                    <Battery className="mr-2 h-5 w-5" />
                    Compare Power Options
                  </ExternalLinkButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        </div>

        {/* Continue Reading */}
        <section className="py-20 px-4 bg-[#151A22]">
          <Container>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Continue Your Technology Education</h2>
              <p className="text-gray-300 text-lg">Explore the next chapters of our comprehensive RV technology guide</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Link to="/rv-technology-guide/control-systems" className="group">
                <div className="bg-[#091020] rounded-lg p-8 border border-gray-800 hover:border-[#60A5FA] transition-all h-full">
                  <Monitor className="h-12 w-12 text-[#60A5FA] mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#60A5FA] transition-colors">Control Systems & Technology Tiers</h3>
                  <p className="text-gray-400 mb-6">Learn about control and monitoring systems, understand technology tier levels, and compare different RV categories and popular models.</p>
                  <div className="flex items-center text-[#60A5FA] font-semibold">
                    Continue Reading
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
              
              <Link to="/rv-technology-guide/research-decisions" className="group">
                <div className="bg-[#091020] rounded-lg p-8 border border-gray-800 hover:border-[#60A5FA] transition-all h-full">
                  <Brain className="h-12 w-12 text-[#60A5FA] mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#60A5FA] transition-colors">Research & Decision Framework</h3>
                  <p className="text-gray-400 mb-6">Understand technology trade-offs, develop research strategies, and build a comprehensive framework for making informed RV technology decisions.</p>
                  <div className="flex items-center text-[#60A5FA] font-semibold">
                    Continue Reading
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </Container>
        </section>
        
        <ScrollToTopButton />
      </div>
    </Layout>
  );
};

export default RVTechnologyGuide;