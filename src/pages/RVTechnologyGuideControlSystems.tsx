import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { PreloadedHeaderImage } from '@/components/ui/PreloadedHeaderImage';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, AlertTriangle, Monitor, Smartphone, Battery, ChevronLeft, ChevronRight, Home
} from 'lucide-react';
import SpecificationsTable from '@/components/models/compare/SpecificationsTable';
import FeaturesComparisonTable from '@/components/models/compare/FeaturesComparisonTable';
import models from '@/components/models/compare/ModelComparisonData';
import RVControlMonitoringHero from '@/components/rv-technology/RVControlMonitoringHero';
import RVTechnologyTiersHero from '@/components/rv-technology/RVTechnologyTiersHero';
import rvTechComparisonImage from '@/assets/rv-technology-comparison-dashboard.jpg';
import rvCategoryComparisonImage from '@/assets/rv-category-comparison.png';
import rvDealershipBackground from '@/assets/rv-dealership-background.jpg';
import { ScrollToTopButton } from '@/components/rv-technology/ScrollToTopButton';
import { PageSummary } from '@/components/ui/PageSummary';

const RVTechnologyGuideControlSystems = () => {
  return (
    <Layout>
      <Helmet>
        <title>RV Control Systems & Technology Tiers | Smart RV Technology Hub</title>
        <meta 
          name="description" 
          content="Learn about RV control and monitoring systems, technology tiers, and how to evaluate different RV categories. Compare popular models and understand what to ask dealers." 
        />
        <meta 
          name="keywords" 
          content="RV control systems, RV monitoring, RV technology tiers, RV categories, motorhome technology" 
        />
        <link rel="canonical" href="https://smartrvhub.com/rv-technology-guide/control-systems" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#080F1F] to-[#151A22] text-white">
        
        {/* Breadcrumb Navigation */}
        <section className="py-6 px-4 bg-[#151A22]/50 border-b border-[#5B9BD5]/20">
          <Container>
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-[#E2E8FF]">
                <Link to="/" className="hover:text-[#5B9BD5] transition-colors">
                  <Home className="w-4 h-4" />
                </Link>
                <span>/</span>
                <Link to="/rv-technology-guide" className="hover:text-[#5B9BD5] transition-colors">
                  RV Technology Guide
                </Link>
                <span>/</span>
                <span className="text-[#5B9BD5]">Control Systems & Tiers</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#E2E8FF]">
                <span className="px-3 py-1 bg-[#5B9BD5]/20 rounded-full border border-[#5B9BD5]/40">
                  Page 2 of 3
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Control and Monitoring Systems */}
        <div id="control-monitoring">
          <RVControlMonitoringHero />

          {/* Page Overview */}
          <section className="py-12 px-4 bg-[#080F1F]">
            <Container>
              <div className="max-w-6xl mx-auto">
                <PageSummary
                  question="What control systems and technology tiers should you know about?"
                  answer="Learn about RV control and monitoring systems, understand technology tier differences (basic, intermediate, advanced), compare RV categories, and discover what questions to ask dealers. Includes model comparisons and practical buying guidance."
                  keyPoints={[
                    "Control Systems - Mobile app control, touchscreen panels, sensor networks, and smart automation options",
                    "Technology Tiers - Compare basic, intermediate, and advanced tech packages with pricing guidance",
                    "RV Categories - Class A, B, C motorhomes vs travel trailers and fifth wheels technology comparison",
                    "Model Comparisons - Side-by-side spec and feature comparisons of popular RV models",
                    "Dealer Questions - Essential questions to ask about technology, warranty, and service support",
                    "Future-Proofing - How to choose upgradeable systems and avoid obsolete technology"
                  ]}
                  readingTime="18 min read"
                  lastUpdated="October 2025"
                />
              </div>
            </Container>
          </section>

          <section className="py-16 px-4 bg-[#151A22]/50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-[#091020] p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                       <h4 className="text-xl font-semibold text-white">Actually Available in Most 2025 Models</h4>
                     </div>
                     <ul className="text-[#E2E8FF] space-y-2">
                       <li>• Mobile app control (varying reliability)</li>
                       <li>• Remote monitoring (premium models)</li>
                       <li>• Tank and battery monitoring (standard)</li>
                       <li>• Basic climate control automation</li>
                       <li>• GPS tracking (select models)</li>
                    </ul>
                  </div>

                  <div className="bg-[#091020] p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3" />
                      <h4 className="text-xl font-semibold text-white">Marketing Claims vs Reality</h4>
                    </div>
                     <ul className="text-[#E2E8FF] space-y-2">
                       <li>• Voice control integration (minimal actual implementation)</li>
                       <li>• Advanced AI automation (basic at best)</li>
                       <li>• Smart home integration (very limited)</li>
                       <li>• Predictive maintenance (not widely available)</li>
                       <li>• Advanced security features (mostly basic encryption)</li>
                     </ul>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-white">Digital Interface Evolution</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-[#091020] p-6 rounded-lg">
                      <h4 className="text-xl font-semibold text-white mb-4">Basic Digital Controls</h4>
                      <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                        Standard RVs typically include touchscreen interfaces for basic functions.
                      </p>
                       <p className="text-[#E2E8FF] leading-relaxed">
                         These may control lighting, slide outs, and awning operation.
                       </p>
                    </div>

                    <div className="bg-[#091020] p-6 rounded-lg">
                      <h4 className="text-xl font-semibold text-white mb-4">Mobile App Integration</h4>
                      <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                        Some manufacturers offer smartphone apps for remote monitoring.
                      </p>
                      <p className="text-[#E2E8FF] leading-relaxed">
                        Features often include tank levels, battery status, and GPS tracking.
                      </p>
                    </div>

                    <div className="bg-[#091020] p-6 rounded-lg">
                      <h4 className="text-xl font-semibold text-white mb-4">Automation Capabilities</h4>
                      <p className="text-[#E2E8FF] mb-4 leading-relaxed">
                        Premium models may include automated climate control and power management.
                      </p>
                      <p className="text-[#E2E8FF] leading-relaxed">
                        The sophistication of these systems varies significantly by manufacturer.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 bg-[#091020] p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-white mb-4">Questions to ask during evaluation:</h4>
                    <ul className="text-[#E2E8FF] space-y-2">
                      <li>• What functions can be controlled remotely?</li>
                      <li>• How reliable is the mobile app connectivity?</li>
                      <li>• What happens if the digital system malfunctions?</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <ExternalLinkButton 
                    href="https://www.rvt.com/buy/" 
                    variant="default" 
                    size="lg"
                  >
                    Research Control Systems
                  </ExternalLinkButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        </div>

        {/* Technology Tiers and Research Guidance */}
        <div id="technology-tiers">
          <RVTechnologyTiersHero />
        
          <section className="py-16 px-4">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">RV Buyer Technology Profiles</h3>
                  <p className="text-lg text-[#E2E8FF] max-w-3xl mx-auto">
                    Choose your research approach based on your priorities, budget, and technology preferences.
This comparison helps match your needs with the right RV technology level.
                  </p>
                </div>

                <div className="overflow-x-auto shadow-2xl rounded-xl">
                  <table className="w-full bg-gradient-to-br from-[#091020] to-[#0a1428] rounded-xl overflow-hidden border border-[#1a202c]">
                    <thead className="bg-gradient-to-r from-[#60A5FA] to-[#4B8FE3]">
                      <tr>
                        <th className="text-left p-6 text-white font-bold text-lg border-r border-white/20">Buyer Profile</th>
                        <th className="text-center p-6 text-white font-bold text-lg border-r border-white/20">Tech Enthusiast</th>
                        <th className="text-center p-6 text-white font-bold text-lg border-r border-white/20">Family Safety Focus</th>
                        <th className="text-center p-6 text-white font-bold text-lg border-r border-white/20">Budget Conscious</th>
                        <th className="text-center p-6 text-white font-bold text-lg">Luxury Comfort</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#1a202c] hover:bg-[#0f1a2e] transition-colors">
                        <td className="p-6 text-[#60A5FA] font-semibold text-lg bg-[#0a1428]/50">Technology Research Focus</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Latest Available Features</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Proven, reliable systems</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Essential functions</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Premium integration</td>
                      </tr>
                      <tr className="border-b border-[#1a202c] hover:bg-[#0f1a2e] transition-colors">
                        <td className="p-6 text-[#60A5FA] font-semibold text-lg bg-[#0a1428]/50">Features to Prioritise</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Connectivity, automation, integration</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Monitoring, basic smart controls</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Core features, manual backups</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Automated systems, premium support</td>
                      </tr>
                      <tr className="border-b border-[#1a202c] hover:bg-[#0f1a2e] transition-colors">
                        <td className="p-6 text-[#60A5FA] font-semibold text-lg bg-[#0a1428]/50">Manufacturer Research Areas</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Premium manufacturers</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Established brands with support</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Value focused manufacturers</td>
                        <td className="p-6 text-[#E2E8FF] text-center">Luxury manufacturers</td>
                      </tr>
                      <tr className="hover:bg-[#0f1a2e] transition-colors">
                        <td className="p-6 text-[#60A5FA] font-semibold text-lg bg-[#0a1428]/50">Research Budget Range</td>
                        <td className="p-6 text-[#E2E8FF] text-center font-semibold">$150K+</td>
                        <td className="p-6 text-[#E2E8FF] text-center font-semibold">$80K–150K</td>
                        <td className="p-6 text-[#E2E8FF] text-center font-semibold">$40K–80K</td>
                        <td className="p-6 text-[#E2E8FF] text-center font-semibold">$200K+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-[#E2E8FF] mt-6 italic">
                  *Budget ranges are general research starting points only.
Actual pricing varies significantly by model, region, dealer, and market conditions.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-white">Research Questions by Technology Priority</h3>
                
                <div className="space-y-6">
                  <div className="bg-[#091020] p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-white mb-4">Connectivity Research Questions:</h4>
                    <ul className="text-[#E2E8FF] space-y-2">
                       <li>• Need reliable internet for work? → Research dual carrier 4G LTE + satellite preparation options</li>
                       <li>• Casual social media use? → Research basic WiFi enhancement systems</li>
                       <li>• International travel? → Research premium models with multi carrier capabilities</li>
                    </ul>
                  </div>

                  <div className="bg-[#091020] p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-white mb-4">Power Management Research Questions:</h4>
                    <ul className="text-[#E2E8FF] space-y-2">
                       <li>• Extended off grid camping? → Research lithium + large solar array combinations</li>
                       <li>• Mostly campground stays? → Research standard power systems</li>
                       <li>• Full time living? → Research advanced battery monitoring and management</li>
                    </ul>
                  </div>

                  <div className="bg-[#091020] p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-white mb-4">Control System Research Questions:</h4>
                    <ul className="text-[#E2E8FF] space-y-2">
                       <li>• Tech savvy family? → Research available automation options (note: voice control not widely available)</li>
                       <li>• Simple operation preferred? → Research digital controls with manual backups</li>
                       <li>• Smart home integration? → Research available APIs (note: very limited options currently)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <ExternalLinkButton 
                  href="https://www.rvt.com/buy/" 
                  variant="default" 
                  size="lg"
                >
                  Research Current Technology Options
                </ExternalLinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* Futuristic Technology Comparison Hero */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden my-12">
          <PreloadedHeaderImage 
            src={rvTechComparisonImage}
            alt="Futuristic holographic dashboard displaying RV technology comparison data with floating interfaces and digital specifications"
            className="w-full h-full object-cover"
            width={1920}
            height={832}
            priority="high"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-5xl px-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
                Compare Popular RV Technology Packages
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
                See how leading RV models stack up in terms of technology features and specifications to help guide your decision making process.
              </p>
            </div>
          </div>
        </div>

        {/* Model Comparison Tables */}
        <section className="py-16 px-4">
          <Container>
            <div className="max-w-7xl mx-auto">
              
              <SpecificationsTable models={models} />
              
              <FeaturesComparisonTable models={models} />

              <div className="text-center mt-12">
                <ExternalLinkButton 
                  href="https://www.rvt.com/buy/" 
                  variant="default" 
                  size="lg"
                >
                  Research These Models on RVT.com
                </ExternalLinkButton>
              </div>
            </div>
          </Container>
        </section>

        </div>

        {/* RV Category Evaluation */}
        <section id="rv-categories" className="py-16 px-4 bg-[#151A22]/50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">Evaluating Technology by RV Category</h2>

              <div className="relative w-full mb-12 rounded-2xl overflow-hidden">
                <PreloadedHeaderImage 
                  src={rvCategoryComparisonImage}
                  alt="Comprehensive comparison of RV categories showing Class A Motorhome, Class B Campervan, Class C Motorhome, Travel Trailer, and Fifth Wheel with technology ratings and features"
                  className="w-full h-auto"
                  width={1920}
                  height={1080}
                  priority="high"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-[#091020] p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Class A Motorhomes</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Large motorhomes often feature the most comprehensive technology packages.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    These may include integrated entertainment systems and advanced power management.
                  </p>
                </div>

                <div className="bg-[#091020] p-6 rounded-lg border border-gray-700">
                 <h3 className="text-xl font-semibold text-white mb-4">Class B/C Motorhomes</h3>
                 <p className="text-gray-300 mb-4 leading-relaxed">
                   Smaller motorhomes typically focus on efficient space utilisation.
                 </p>
                 <p className="text-gray-300 leading-relaxed">
                   Technology integration may prioritise essential functions over luxury features.
                 </p>
                </div>

                <div className="bg-[#091020] p-6 rounded-lg border border-gray-700">
                 <h3 className="text-xl font-semibold text-white mb-4">Travel Trailers and Fifth Wheels</h3>
                 <p className="text-gray-300 mb-4 leading-relaxed">
                   Towable RVs increasingly offer technology packages comparable to motorhomes.
                 </p>
                 <p className="text-gray-300 leading-relaxed">
                   Power management becomes particularly important without an engine alternator.
                 </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Considerations by Usage Type</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#091020] p-6 rounded-lg border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">Weekend Recreation</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Occasional users might prioritise simplicity and reliability over advanced features.
                    </p>
                  </div>

                  <div className="bg-[#091020] p-6 rounded-lg border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">Extended Travel</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Frequent travellers often benefit from robust connectivity and power independence.
                    </p>
                  </div>

                  <div className="bg-[#091020] p-6 rounded-lg border border-gray-700">
                     <h4 className="text-lg font-semibold text-white mb-3">Full Time Living</h4>
                     <p className="text-gray-300 leading-relaxed">
                       Those living in RVs year round typically need the most comprehensive technology solutions.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Dealer Questions */}
        <section id="dealer-questions" className="py-16 px-4 relative">
          <div className="absolute inset-0">
            <PreloadedHeaderImage 
              src={rvDealershipBackground}
              alt="Professional RV dealer consultation showing customers examining RVs in a modern showroom"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              priority="low"
            />
          </div>

          <Container className="relative z-10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">What to Ask Dealers and Manufacturers</h2>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">Connectivity Questions</h3>
                    <ul className="text-[#E2E8FF] space-y-2">
                      <li>• What internet options work in remote locations?</li>
                      <li>• How much data do typical streaming and work activities consume?</li>
                      <li>• What backup connectivity options exist?</li>
                    </ul>
                  </div>

                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">Power Management Questions</h3>
                    <ul className="text-[#E2E8FF] space-y-2">
                      <li>• How long can the system operate without external power?</li>
                      <li>• What appliances can run on battery power?</li>
                      <li>• How quickly do batteries recharge from different sources?</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">Control Systems Questions</h3>
                    <ul className="text-[#E2E8FF] space-y-2">
                      <li>• What training is provided on digital systems?</li>
                      <li>• How do you override automatic systems if needed?</li>
                      <li>• What ongoing software updates are available?</li>
                    </ul>
                  </div>

                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">Support and Service Questions</h3>
                    <ul className="text-[#E2E8FF] space-y-2">
                      <li>• Which dealers can service these technology systems?</li>
                      <li>• What warranty coverage applies to electronic components?</li>
                      <li>• How do you troubleshoot common issues?</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <ExternalLinkButton 
                  href="https://www.rvt.com/dealersearch.php" 
                  variant="default" 
                  size="lg"
                >
                  Find Local Dealers
                </ExternalLinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* Navigation to Next Page */}
        <section className="py-16 px-4 bg-gradient-to-br from-[#151A22]/80 to-[#091020]/60">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#091020] to-[#151A22] p-8 rounded-2xl border border-[#5B9BD5]/30 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                  Continue Your Research Journey
                </h3>
                <p className="text-[#E2E8FF] text-center mb-8">
                  Learn about research strategies, technology trade-offs, and making informed decisions
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/rv-technology-guide">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10">
                      <ChevronLeft className="mr-2 h-5 w-5" />
                      Back to Overview
                    </Button>
                  </Link>
                  
                  <Link to="/rv-technology-guide/research-decisions">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5]">
                      Research & Decisions
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
        
        <ScrollToTopButton />
      </div>
    </Layout>
  );
};

export default RVTechnologyGuideControlSystems;
