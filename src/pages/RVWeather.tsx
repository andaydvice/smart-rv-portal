import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { Container } from "@/components/ui/container";
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Calendar, Cloud, Wind, AlertTriangle, Thermometer, Snowflake, MapPin, Flag, Sun } from "lucide-react";

const RVWeather = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Layout>
      {/* Hero Section - Larger image without white tint */}
      <div className="relative w-full h-[600px] md:h-[700px] mb-8 overflow-hidden">
        <img
          src="/lovable-uploads/Luxury_RV_Living-min.jpg"
          alt="RV in scenic location"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent z-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">The Ultimate RV Weather Guide</h1>
          <p className="text-xl text-white drop-shadow-lg mt-2">Plan your travels with confidence</p>
        </div>
      </div>

      <Container>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Why Weather Matters */}
            <section>
              <TypographyH2>Why Weather Matters for RV Travel</TypographyH2>
              <TypographyP>
                Weather impacts every aspect of RV travel - from road conditions and driving safety to comfort 
                at your campsite and the longevity of your vehicle. Understanding how to track, plan for, 
                and respond to weather conditions is essential for every RV owner.
              </TypographyP>
            </section>

            {/* Planning Your Trip */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6 text-connectivity-accent" />
                <TypographyH2>Planning Your Trip Around Weather</TypographyH2>
              </div>
              
              <TypographyH3 className="mt-6">Seasonal Considerations</TypographyH3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h4 className="font-bold mb-2">Spring Travel (March-May)</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Advantages: Smaller crowds, blooming landscapes, moderate temperatures</li>
                    <li>Challenges: Unpredictable rain, potential flooding in some regions</li>
                    <li>Best Regions: Southern states, desert Southwest, coastal areas</li>
                  </ul>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h4 className="font-bold mb-2">Summer Travel (June-August)</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Advantages: Longer daylight hours, access to northern regions and high elevations</li>
                    <li>Challenges: Extreme heat, crowded destinations, higher prices</li>
                    <li>Best Regions: Mountain states, Pacific Northwest, Northern states, Canada</li>
                  </ul>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h4 className="font-bold mb-2">Fall Travel (September-November)</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Advantages: Spectacular foliage, cooler temperatures, fewer crowds</li>
                    <li>Challenges: Variable weather patterns, shorter days</li>
                    <li>Best Regions: New England, Appalachian Mountains, Rocky Mountains</li>
                  </ul>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h4 className="font-bold mb-2">Winter Travel (December-February)</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Advantages: Solitude, unique winter landscapes, lower campground fees</li>
                    <li>Challenges: Cold temperatures, limited campground availability, winterization needs</li>
                    <li>Best Regions: Southwest deserts, Florida, Texas Gulf Coast</li>
                  </ul>
                </Card>
              </div>
              
              <TypographyH3 className="mt-6">Route Planning Tools</TypographyH3>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-bold">Long-Range Forecasts</h4>
                  <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                    <li><a href="https://www.cpc.ncep.noaa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Climate Prediction Center</a> - Offers 6-10 day, 8-14 day, and monthly/seasonal outlooks</li>
                    <li><a href="https://www.accuweather.com/en/weather-forecasts/month" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AccuWeather Long-Range</a> - Monthly forecasts for planning ahead</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold">Historical Weather Data</h4>
                  <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                    <li><a href="https://www.wunderground.com/history" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Weather Underground Historical Data</a></li>
                    <li><a href="https://www.ncdc.noaa.gov/cdo-web/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NOAA Climate Data</a></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Real-Time Weather Monitoring */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="h-6 w-6 text-connectivity-accent" />
                <TypographyH2>Real-Time Weather Monitoring</TypographyH2>
              </div>
              
              <TypographyH3 className="mt-6">Essential Weather Apps</TypographyH3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-bold">Comprehensive Weather Apps</h4>
                  <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                    <li><a href="https://radarscope.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RadarScope</a> - Professional-grade radar data</li>
                    <li><a href="https://www.wunderground.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Weather Underground</a> - Detailed forecasts with PWS network</li>
                    <li><a href="https://weather.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">The Weather Channel</a> - User-friendly with good severe weather alerts</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold">RV-Specific Weather Tools</h4>
                  <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                    <li><a href="https://rvweather.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RV Weather</a> - Weather forecasts specifically for RV routes</li>
                    <li><a href="https://www.windy.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Windy</a> - Essential for monitoring wind conditions</li>
                    <li><a href="https://weatherradioapp.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Weather Radio</a> - NOAA weather radio alerts</li>
                  </ul>
                </div>
              </div>
            </section>
            
            {/* Understanding Weather Alerts */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-connectivity-accent" />
                <TypographyH2>Understanding Weather Alerts</TypographyH2>
              </div>
              
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-[#1a202c] p-2 bg-[#131a2a]">Alert Type</th>
                      <th className="border border-[#1a202c] p-2 bg-[#131a2a]">What It Means</th>
                      <th className="border border-[#1a202c] p-2 bg-[#131a2a]">RV Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#1a202c] p-2 font-bold text-yellow-500">Watch</td>
                      <td className="border border-[#1a202c] p-2">Conditions are favorable for severe weather</td>
                      <td className="border border-[#1a202c] p-2">Monitor closely, prepare for possible relocation</td>
                    </tr>
                    <tr>
                      <td className="border border-[#1a202c] p-2 font-bold text-red-500">Warning</td>
                      <td className="border border-[#1a202c] p-2">Severe weather is imminent or occurring</td>
                      <td className="border border-[#1a202c] p-2">Take immediate protective action</td>
                    </tr>
                    <tr>
                      <td className="border border-[#1a202c] p-2 font-bold text-blue-500">Advisory</td>
                      <td className="border border-[#1a202c] p-2">Less severe but potentially hazardous conditions</td>
                      <td className="border border-[#1a202c] p-2">Use caution, possibly adjust travel plans</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            {/* Weather Hazards for RVers */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Wind className="h-6 w-6 text-connectivity-accent" />
                <TypographyH2>Weather Hazards for RVers</TypographyH2>
              </div>
              
              <div className="space-y-6 mt-4">
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h3 className="font-bold text-lg mb-2">High Winds</h3>
                  <p className="font-bold text-sm mb-2">Risk Level: <span className="text-red-500">Extreme for RVs</span></p>
                  <div>
                    <h4 className="font-bold text-sm">Safety Measures:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Park your RV with the front facing into the wind when possible</li>
                      <li>Retract all slides and awnings</li>
                      <li>Lower TV antennas and satellite dishes</li>
                      <li>Consider relocating to areas with natural windbreaks</li>
                    </ul>
                  </div>
                  <p className="text-sm mt-2"><span className="font-bold">When to Avoid Travel:</span> Sustained winds over 20-25 mph or gusts over 30 mph</p>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h3 className="font-bold text-lg mb-2">Thunderstorms & Lightning</h3>
                  <p className="font-bold text-sm mb-2">Risk Level: <span className="text-yellow-500">High</span></p>
                  <div>
                    <h4 className="font-bold text-sm">Safety Measures:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Avoid parking under trees</li>
                      <li>Unplug shore power during electrical storms</li>
                      <li>Stay inside your RV (Faraday cage effect offers protection)</li>
                      <li>Have a weather radio with alerts</li>
                    </ul>
                  </div>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h3 className="font-bold text-lg mb-2">Flash Floods</h3>
                  <p className="font-bold text-sm mb-2">Risk Level: <span className="text-red-500">Extreme</span></p>
                  <div>
                    <h4 className="font-bold text-sm">Safety Measures:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Never camp in dry washes or low-lying areas</li>
                      <li>Know evacuation routes from your campsite</li>
                      <li>"Turn Around, Don't Drown" - never drive through flooded roads</li>
                      <li>Monitor weather upstream from your location</li>
                    </ul>
                  </div>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h3 className="font-bold text-lg mb-2">Extreme Heat</h3>
                  <p className="font-bold text-sm mb-2">Risk Level: <span className="text-yellow-500">Moderate to High</span></p>
                  <div>
                    <h4 className="font-bold text-sm">Safety Measures:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Use reflective window coverings</li>
                      <li>Park in shaded areas when possible</li>
                      <li>Run air conditioning or use fans strategically</li>
                      <li>Consider portable dehumidifiers in humid climates</li>
                    </ul>
                  </div>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h3 className="font-bold text-lg mb-2">Winter Conditions</h3>
                  <p className="font-bold text-sm mb-2">Risk Level: <span className="text-yellow-500">High</span></p>
                  <div>
                    <h4 className="font-bold text-sm">Safety Measures:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Properly winterize your RV if traveling in freezing temperatures</li>
                      <li>Use RV-specific antifreeze in plumbing systems</li>
                      <li>Insulate water hoses and connections</li>
                      <li>Carry tire chains when required</li>
                      <li>Monitor propane levels for heating</li>
                    </ul>
                  </div>
                </Card>
              </div>
            </section>
            
            {/* Weather-Related RV Maintenance */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Thermometer className="h-6 w-6 text-connectivity-accent" />
                <TypographyH2>Weather-Related RV Maintenance</TypographyH2>
              </div>
              
              <TypographyH3 className="mt-6">Seasonal Checklist</TypographyH3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h4 className="font-bold mb-2">Spring</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Check and reseal roof seams</li>
                    <li>Inspect window and door seals</li>
                    <li>Test air conditioning system</li>
                  </ul>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h4 className="font-bold mb-2">Summer</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Check tire pressure regularly (heat increases pressure)</li>
                    <li>Clean air conditioner filters monthly</li>
                    <li>Inspect awnings and extend/retract mechanisms</li>
                  </ul>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h4 className="font-bold mb-2">Fall</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Check furnace operation</li>
                    <li>Inspect weather stripping</li>
                    <li>Clean and check roof vents</li>
                  </ul>
                </Card>
                
                <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
                  <h4 className="font-bold mb-2">Winter</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Apply RV antifreeze to plumbing if needed</li>
                    <li>Check propane system and detectors</li>
                    <li>Inspect roof for snow load capacity</li>
                  </ul>
                </Card>
              </div>
              
              <TypographyH3 className="mt-6">Weather Impact on RV Systems</TypographyH3>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-[#1a202c] p-2 bg-[#131a2a]">Weather Condition</th>
                      <th className="border border-[#1a202c] p-2 bg-[#131a2a]">Potential Impact</th>
                      <th className="border border-[#1a202c] p-2 bg-[#131a2a]">Preventative Measure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#1a202c] p-2 font-bold">Extreme Heat</td>
                      <td className="border border-[#1a202c] p-2">AC strain, refrigerator failure, tire damage</td>
                      <td className="border border-[#1a202c] p-2">Park in shade, use tire covers, check refrigerator vents</td>
                    </tr>
                    <tr>
                      <td className="border border-[#1a202c] p-2 font-bold">Freezing Temps</td>
                      <td className="border border-[#1a202c] p-2">Plumbing damage, propane regulator issues</td>
                      <td className="border border-[#1a202c] p-2">Winterize systems, insulate connections</td>
                    </tr>
                    <tr>
                      <td className="border border-[#1a202c] p-2 font-bold">High Humidity</td>
                      <td className="border border-[#1a202c] p-2">Mold/mildew growth, electrical issues</td>
                      <td className="border border-[#1a202c] p-2">Use dehumidifiers, check for water intrusion</td>
                    </tr>
                    <tr>
                      <td className="border border-[#1a202c] p-2 font-bold">UV Exposure</td>
                      <td className="border border-[#1a202c] p-2">Rubber/sealant degradation, fading</td>
                      <td className="border border-[#1a202c] p-2">Use UV protectants, cover RV when stored</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* RV Weather Preparedness Checklist */}
            <Card className="p-5 bg-[#131a2a]">
              <div className="flex items-center gap-2 mb-4">
                <Flag className="h-5 w-5 text-connectivity-accent" />
                <h3 className="font-bold text-lg">Weather Preparedness Checklist</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Essential Weather Gear</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="radio" className="w-4 h-4" />
                      <label htmlFor="radio" className="text-sm">NOAA Weather Radio</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="windmeter" className="w-4 h-4" />
                      <label htmlFor="windmeter" className="text-sm">Wind meter/anemometer</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="reflective" className="w-4 h-4" />
                      <label htmlFor="reflective" className="text-sm">Reflective window coverings</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="surge" className="w-4 h-4" />
                      <label htmlFor="surge" className="text-sm">Surge protector for hookups</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="tiedowns" className="w-4 h-4" />
                      <label htmlFor="tiedowns" className="text-sm">Additional tie-downs and stabilizers</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="sealants" className="w-4 h-4" />
                      <label htmlFor="sealants" className="text-sm">Weather-appropriate sealants</label>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Emergency Supplies</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="water" className="w-4 h-4" />
                      <label htmlFor="water" className="text-sm">3-day water supply</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="food" className="w-4 h-4" />
                      <label htmlFor="food" className="text-sm">Non-perishable food</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="flashlight" className="w-4 h-4" />
                      <label htmlFor="flashlight" className="text-sm">Flashlights and batteries</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="firstaid" className="w-4 h-4" />
                      <label htmlFor="firstaid" className="text-sm">First aid kit</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="battery" className="w-4 h-4" />
                      <label htmlFor="battery" className="text-sm">Battery backup for cell phones</label>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" id="maps" className="w-4 h-4" />
                      <label htmlFor="maps" className="text-sm">Paper maps with evacuation routes</label>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            {/* Climate Considerations by Region */}
            <Card className="p-5 bg-[#131a2a]">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-connectivity-accent" />
                <h3 className="font-bold text-lg">Climate Considerations by Region</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-sm">Desert Southwest</h4>
                  <p className="text-xs">Challenges: Extreme heat (100°F+), rapid temperature changes, dusty conditions</p>
                  <p className="text-xs">Best Seasons: October-April</p>
                  <p className="text-xs">Tips: Carry extra water, use reflective covers, check air filters frequently</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm">Pacific Northwest</h4>
                  <p className="text-xs">Challenges: Frequent rain, high humidity, cooler temperatures</p>
                  <p className="text-xs">Best Seasons: July-September</p>
                  <p className="text-xs">Tips: Good waterproofing, dehumidifiers, proper ventilation</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm">Mountain Regions</h4>
                  <p className="text-xs">Challenges: Rapid weather changes, altitude effects, early/late snow</p>
                  <p className="text-xs">Best Seasons: June-September</p>
                  <p className="text-xs">Tips: Layer clothing, prepare for overnight freezes even in summer</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm">Gulf Coast/Florida</h4>
                  <p className="text-xs">Challenges: Hurricane season, high humidity, sudden thunderstorms</p>
                  <p className="text-xs">Best Seasons: November-May</p>
                  <p className="text-xs">Tips: Monitor hurricane forecasts, have evacuation plan</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm">Great Plains</h4>
                  <p className="text-xs">Challenges: Severe thunderstorms, tornadoes, strong winds</p>
                  <p className="text-xs">Best Seasons: September-October, April-May</p>
                  <p className="text-xs">Tips: Know tornado shelter locations, monitor weather alerts carefully</p>
                </div>
              </div>
            </Card>
            
            {/* Weather Resources */}
            <Card className="p-5 bg-[#131a2a]">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="h-5 w-5 text-connectivity-accent" />
                <h3 className="font-bold text-lg">Weather Resources for RVers</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-sm">Online Communities</h4>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    <li><a href="https://www.rvforum.net/forums/rv-trips-travel-planning/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RV Weather Forum</a></li>
                    <li><a href="https://www.irv2.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">iRV2 Weather Discussions</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm">Educational Resources</h4>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    <li><a href="https://www.weather.gov/safety/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NOAA Weather Safety</a></li>
                    <li><a href="https://www.ready.gov/severe-weather" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ready.gov Severe Weather</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm">RV-Specific Weather Courses</h4>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    <li><a href="https://rvlifestyle.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RV Weather Safety Webinars</a></li>
                    <li><a href="https://escapees.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Escapees RV Club Weather Seminars</a></li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <div className="p-4 rounded-lg border border-[#5B9BD5] bg-gradient-to-b from-connectivity-darkBg to-[#151A22]">
              <p className="text-sm italic text-center">
                "Remember: Weather conditions can change rapidly. Always have a backup plan, know your RV's limitations, and prioritize safety over schedules."
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default RVWeather;
