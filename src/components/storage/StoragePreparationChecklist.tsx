
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon, Printer, Save, RotateCcw, Info, ShieldCheck, Bug, Activity, Droplet, Zap, Truck } from "lucide-react";

const StoragePreparationChecklist: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [progress, setProgress] = useState<{[key: string]: boolean}>({});

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setProgress(prev => ({...prev, [id]: checked}));
  };

  return (
    <div className="min-h-screen bg-[#131a2a] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="border-gray-700 bg-[#091020]">
          <CardHeader className="border-b border-gray-700 pb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <CardTitle className="text-3xl font-bold text-white">COMPLETE GUIDE TO RV STORAGE PREPARATION</CardTitle>
                <CardDescription className="text-xl text-gray-300 mt-2">Interactive Checklist for Extended Indoor Storage</CardDescription>
              </div>
              <div className="text-[#60A5FA] font-bold text-xl">SMART RV</div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="gap-2">
                <Save size={16} />
                Save Progress
              </Button>
              <Button variant="outline" className="gap-2">
                <Printer size={16} />
                Print
              </Button>
              <Button variant="outline" className="gap-2">
                <RotateCcw size={16} />
                Reset
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs defaultValue="rv-info" className="space-y-8">
              <TabsList className="bg-[#151A22] p-1 mb-8 grid grid-cols-2 md:grid-cols-5 lg:flex">
                <TabsTrigger value="rv-info" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  RV Info
                </TabsTrigger>
                <TabsTrigger value="exterior" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Exterior
                </TabsTrigger>
                <TabsTrigger value="interior" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Interior
                </TabsTrigger>
                <TabsTrigger value="plumbing" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white flex items-center gap-1">
                  <Droplet className="h-3.5 w-3.5" />
                  Plumbing
                </TabsTrigger>
                <TabsTrigger value="electrical" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" />
                  Electrical
                </TabsTrigger>
                <TabsTrigger value="mechanical" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Mechanical
                </TabsTrigger>
                <TabsTrigger value="tires" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  Tires
                </TabsTrigger>
                <TabsTrigger value="pest" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white flex items-center gap-1">
                  <Bug className="h-3.5 w-3.5" />
                  Pest Control
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Notes
                </TabsTrigger>
              </TabsList>

              {/* RV Information Tab */}
              <TabsContent value="rv-info" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">RV INFORMATION</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="owner" className="text-gray-200">RV Owner</Label>
                      <Input id="owner" className="bg-[#131a2a] border-gray-700" placeholder="Enter owner name" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="model" className="text-gray-200">RV Make/Model</Label>
                      <Input id="model" className="bg-[#131a2a] border-gray-700" placeholder="Enter make and model" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-gray-200">Year</Label>
                      <Input id="year" className="bg-[#131a2a] border-gray-700" placeholder="Enter year" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vin" className="text-gray-200">VIN/Serial Number</Label>
                      <Input id="vin" className="bg-[#131a2a] border-gray-700" placeholder="Enter VIN or serial number" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="length" className="text-gray-200">Length</Label>
                      <Input id="length" className="bg-[#131a2a] border-gray-700" placeholder="Enter length" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date" className="text-gray-200">Storage Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-[#131a2a] border-gray-700"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="end-date" className="text-gray-200">Expected Removal Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-[#131a2a] border-gray-700"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Exterior Preparation Tab */}
              <TabsContent value="exterior" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">EXTERIOR PREPARATION</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Cleaning</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="wash" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("wash", checked as boolean)} />
                        <Label htmlFor="wash" className="text-gray-300">
                          Wash exterior thoroughly, including roof, sides, and undercarriage
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="bugs" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("bugs", checked as boolean)} />
                        <Label htmlFor="bugs" className="text-gray-300">
                          Remove all bugs, tree sap, and road tar
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="awnings" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("awnings", checked as boolean)} />
                        <Label htmlFor="awnings" className="text-gray-300">
                          Clean awnings and allow to dry completely before retracting
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="uv" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("uv", checked as boolean)} />
                        <Label htmlFor="uv" className="text-gray-300">
                          Apply UV protectant to rubber seals and gaskets
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="steps" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("steps", checked as boolean)} />
                        <Label htmlFor="steps" className="text-gray-300">
                          Clean and lube entry steps and slide-out mechanisms
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Inspection & Protection</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="seals" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("seals", checked as boolean)} />
                        <Label htmlFor="seals" className="text-gray-300">
                          Inspect and reseal any roof or sidewall seams that show signs of cracking
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="damage" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("damage", checked as boolean)} />
                        <Label htmlFor="damage" className="text-gray-300">
                          Check for and repair any exterior damage (cracks, chips, delamination)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="wax" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("wax", checked as boolean)} />
                        <Label htmlFor="wax" className="text-gray-300">
                          Apply wax to fiberglass or painted surfaces for extended protection
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="plastic" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("plastic", checked as boolean)} />
                        <Label htmlFor="plastic" className="text-gray-300">
                          Cover or protect exterior plastic components from UV damage
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="accessories" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("accessories", checked as boolean)} />
                        <Label htmlFor="accessories" className="text-gray-300">
                          Remove any exterior accessories that can be detached and store separately
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Covering</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="cover" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("cover", checked as boolean)} />
                        <Label htmlFor="cover" className="text-gray-300">
                          Consider a breathable RV cover designed for indoor storage (prevents dust)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="secure" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("secure", checked as boolean)} />
                        <Label htmlFor="secure" className="text-gray-300">
                          If using a cover, ensure it's properly secured but not tight against surfaces
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="padding" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("padding", checked as boolean)} />
                        <Label htmlFor="padding" className="text-gray-300">
                          Place padding over sharp edges to prevent cover damage
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="vents" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("vents", checked as boolean)} />
                        <Label htmlFor="vents" className="text-gray-300">
                          Ensure any vents or air circulation points aren't completely sealed by the cover
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="exterior-notes" className="text-gray-200">Additional Exterior Notes</Label>
                    <Textarea 
                      id="exterior-notes" 
                      className="bg-[#131a2a] border-gray-700 min-h-[100px]" 
                      placeholder="Enter any additional notes about exterior preparation..." 
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Interior Preparation Tab */}
              <TabsContent value="interior" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">INTERIOR PREPARATION</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Cleaning</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="int-surfaces" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("int-surfaces", checked as boolean)} />
                        <Label htmlFor="int-surfaces" className="text-gray-300">
                          Thoroughly clean all interior surfaces
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="vacuum" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("vacuum", checked as boolean)} />
                        <Label htmlFor="vacuum" className="text-gray-300">
                          Vacuum and clean all upholstery and carpets
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="cabinets" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("cabinets", checked as boolean)} />
                        <Label htmlFor="cabinets" className="text-gray-300">
                          Clean and dry all cabinets, drawers, and closets
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="bathroom" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("bathroom", checked as boolean)} />
                        <Label htmlFor="bathroom" className="text-gray-300">
                          Clean and sanitize bathroom and shower areas
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="fridge" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("fridge", checked as boolean)} />
                        <Label htmlFor="fridge" className="text-gray-300">
                          Clean refrigerator and freezer thoroughly
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Moisture Control</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="desiccant" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("desiccant", checked as boolean)} />
                        <Label htmlFor="desiccant" className="text-gray-300">
                          Place desiccant moisture absorbers in multiple locations
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="cabinet-open" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("cabinet-open", checked as boolean)} />
                        <Label htmlFor="cabinet-open" className="text-gray-300">
                          Leave cabinet doors and drawers slightly open for air circulation
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="bedding" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("bedding", checked as boolean)} />
                        <Label htmlFor="bedding" className="text-gray-300">
                          Remove all bedding and store separately
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="fridge-door" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("fridge-door", checked as boolean)} />
                        <Label htmlFor="fridge-door" className="text-gray-300">
                          Leave refrigerator door propped slightly open (after defrosting)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="dehumidifier" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("dehumidifier", checked as boolean)} />
                        <Label htmlFor="dehumidifier" className="text-gray-300">
                          Consider a dehumidifier for long-term storage in humid climates
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Remove & Store</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="food" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("food", checked as boolean)} />
                        <Label htmlFor="food" className="text-gray-300">
                          Remove all food items, including canned goods and spices
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="toiletries" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("toiletries", checked as boolean)} />
                        <Label htmlFor="toiletries" className="text-gray-300">
                          Remove all toiletries and personal care items
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="perishables" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("perishables", checked as boolean)} />
                        <Label htmlFor="perishables" className="text-gray-300">
                          Remove any plants, candles, or perishable decorative items
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="valuables" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("valuables", checked as boolean)} />
                        <Label htmlFor="valuables" className="text-gray-300">
                          Remove valuables, electronics, and important documents
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="propane" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("propane", checked as boolean)} />
                        <Label htmlFor="propane" className="text-gray-300">
                          Remove propane tanks if facility regulations permit
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interior-notes" className="text-gray-200">Additional Interior Notes</Label>
                    <Textarea 
                      id="interior-notes" 
                      className="bg-[#131a2a] border-gray-700 min-h-[100px]" 
                      placeholder="Enter any additional notes about interior preparation..." 
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Plumbing System Tab (NEWLY IMPLEMENTED) */}
              <TabsContent value="plumbing" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">PLUMBING SYSTEM</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Tanks</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="fresh-water" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("fresh-water", checked as boolean)} />
                        <Label htmlFor="fresh-water" className="text-gray-300">
                          Drain and flush fresh water tank completely
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="waste-tanks" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("waste-tanks", checked as boolean)} />
                        <Label htmlFor="waste-tanks" className="text-gray-300">
                          Empty, flush, and clean black and gray water tanks
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="tank-valves" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("tank-valves", checked as boolean)} />
                        <Label htmlFor="tank-valves" className="text-gray-300">
                          Leave black and gray tank valves open or closed per manufacturer guidelines
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="p-traps" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("p-traps", checked as boolean)} />
                        <Label htmlFor="p-traps" className="text-gray-300">
                          Add RV antifreeze to all p-traps and toilet bowl
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="tank-sensors" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("tank-sensors", checked as boolean)} />
                        <Label htmlFor="tank-sensors" className="text-gray-300">
                          Clean and verify tank level sensors are functioning properly
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Water Heater & Lines</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="water-heater" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("water-heater", checked as boolean)} />
                        <Label htmlFor="water-heater" className="text-gray-300">
                          Turn off water heater and let cool completely before draining
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="drain-heater" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("drain-heater", checked as boolean)} />
                        <Label htmlFor="drain-heater" className="text-gray-300">
                          Drain water heater tank using drain plug (not relief valve)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="bypass" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("bypass", checked as boolean)} />
                        <Label htmlFor="bypass" className="text-gray-300">
                          Set water heater bypass valve to bypass position (if equipped)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="blow-lines" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("blow-lines", checked as boolean)} />
                        <Label htmlFor="blow-lines" className="text-gray-300">
                          Blow out water lines using compressed air (30-40 PSI max)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="antifreeze" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("antifreeze", checked as boolean)} />
                        <Label htmlFor="antifreeze" className="text-gray-300">
                          Use non-toxic RV antifreeze in water system if stored in freezing temperatures
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Fixtures & Appliances</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="faucets" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("faucets", checked as boolean)} />
                        <Label htmlFor="faucets" className="text-gray-300">
                          Open all faucets and drain lines, then close after draining
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="fixtures" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("fixtures", checked as boolean)} />
                        <Label htmlFor="fixtures" className="text-gray-300">
                          Run antifreeze through all fixtures until pink color appears (if winterizing)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="toilet" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("toilet", checked as boolean)} />
                        <Label htmlFor="toilet" className="text-gray-300">
                          Flush toilet and add antifreeze to bowl to prevent trap dry-out
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="ice-maker" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("ice-maker", checked as boolean)} />
                        <Label htmlFor="ice-maker" className="text-gray-300">
                          Disconnect/winterize ice maker and water filtration systems
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="outside-shower" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("outside-shower", checked as boolean)} />
                        <Label htmlFor="outside-shower" className="text-gray-300">
                          Drain and protect exterior shower and utility connections
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="antifreeze-type" className="text-gray-200">Antifreeze Type Used</Label>
                      <Select>
                        <SelectTrigger id="antifreeze-type" className="bg-[#131a2a] border-gray-700">
                          <SelectValue placeholder="Select antifreeze type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None Used</SelectItem>
                          <SelectItem value="rv-propylene">RV Propylene Glycol (Pink)</SelectItem>
                          <SelectItem value="special">Special Formula Antifreeze</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="antifreeze-amount" className="text-gray-200">Antifreeze Quantity Used</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Input 
                          id="antifreeze-amount" 
                          className="bg-[#131a2a] border-gray-700 col-span-2" 
                          placeholder="Amount"
                        />
                        <Select defaultValue="gallons">
                          <SelectTrigger className="bg-[#131a2a] border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gallons">Gallons</SelectItem>
                            <SelectItem value="liters">Liters</SelectItem>
                            <SelectItem value="quarts">Quarts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-opacity-20 bg-blue-900 rounded-md border border-blue-700 mt-4">
                    <div className="flex items-start space-x-3">
                      <Info className="text-blue-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-blue-400 font-medium">Important Water System Note</h4>
                        <p className="text-gray-300 text-sm mt-1">
                          Improperly winterized water systems can suffer expensive freeze damage. For RVs stored in freezing conditions, a professional winterization service is recommended unless you're experienced with the process.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="plumbing-notes" className="text-gray-200">Additional Plumbing Notes</Label>
                    <Textarea 
                      id="plumbing-notes" 
                      className="bg-[#131a2a] border-gray-700 min-h-[100px]" 
                      placeholder="Enter any additional notes about plumbing system preparation..." 
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Electrical System Tab (NEWLY IMPLEMENTED) */}
              <TabsContent value="electrical" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">ELECTRICAL SYSTEM</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Batteries</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="battery-clean" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("battery-clean", checked as boolean)} />
                        <Label htmlFor="battery-clean" className="text-gray-300">
                          Clean battery terminals and connections to prevent corrosion
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="battery-fluid" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("battery-fluid", checked as boolean)} />
                        <Label htmlFor="battery-fluid" className="text-gray-300">
                          Check and top up fluid levels on flooded batteries (if applicable)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="battery-charge" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("battery-charge", checked as boolean)} />
                        <Label htmlFor="battery-charge" className="text-gray-300">
                          Fully charge batteries before disconnecting or storage
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="battery-disconnect" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("battery-disconnect", checked as boolean)} />
                        <Label htmlFor="battery-disconnect" className="text-gray-300">
                          Disconnect batteries or engage battery disconnect switch
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="battery-store" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("battery-store", checked as boolean)} />
                        <Label htmlFor="battery-store" className="text-gray-300">
                          Remove batteries for separate storage if storage area may freeze
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="battery-maintain" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("battery-maintain", checked as boolean)} />
                        <Label htmlFor="battery-maintain" className="text-gray-300">
                          Connect batteries to trickle charger or maintainer if leaving in RV
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-300">Battery Information</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="house-battery-type" className="text-gray-200">House Battery Type</Label>
                        <Select>
                          <SelectTrigger id="house-battery-type" className="bg-[#131a2a] border-gray-700">
                            <SelectValue placeholder="Select battery type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lead-acid">Lead Acid (Flooded)</SelectItem>
                            <SelectItem value="agm">AGM</SelectItem>
                            <SelectItem value="gel">Gel Cell</SelectItem>
                            <SelectItem value="lithium">Lithium</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="house-battery-status" className="text-gray-200">House Battery Status</Label>
                        <Select>
                          <SelectTrigger id="house-battery-status" className="bg-[#131a2a] border-gray-700">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="charged-connected">Charged & Connected to Maintainer</SelectItem>
                            <SelectItem value="charged-disconnected">Charged & Disconnected</SelectItem>
                            <SelectItem value="removed">Removed for Separate Storage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maintainer-type" className="text-gray-200">Battery Maintainer Type</Label>
                        <Input 
                          id="maintainer-type" 
                          className="bg-[#131a2a] border-gray-700" 
                          placeholder="Battery maintainer brand/model"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-300">Solar System (if equipped)</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox id="solar-disconnect" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("solar-disconnect", checked as boolean)} />
                          <Label htmlFor="solar-disconnect" className="text-gray-300">
                            Disconnect or cover solar panels if not needed during storage
                          </Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox id="solar-controller" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("solar-controller", checked as boolean)} />
                          <Label htmlFor="solar-controller" className="text-gray-300">
                            Set solar charge controller to appropriate storage mode
                          </Label>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox id="solar-inspect" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("solar-inspect", checked as boolean)} />
                          <Label htmlFor="solar-inspect" className="text-gray-300">
                            Inspect and clean solar panel surfaces before storage
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Appliances & Electronics</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="breakers" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("breakers", checked as boolean)} />
                        <Label htmlFor="breakers" className="text-gray-300">
                          Turn off all circuit breakers in distribution panel
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="fuses" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("fuses", checked as boolean)} />
                        <Label htmlFor="fuses" className="text-gray-300">
                          Check all fuses are intact and properly seated
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="unplug" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("unplug", checked as boolean)} />
                        <Label htmlFor="unplug" className="text-gray-300">
                          Unplug all electronics not needed during storage
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="tv-antennas" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("tv-antennas", checked as boolean)} />
                        <Label htmlFor="tv-antennas" className="text-gray-300">
                          Lower TV antenna and satellite dish if equipped
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="alarm-test" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("alarm-test", checked as boolean)} />
                        <Label htmlFor="alarm-test" className="text-gray-300">
                          Test carbon monoxide, smoke, and LP detectors; replace batteries
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="screen-protect" className="mt-1" onCheckedChange={(checked) => handleCheckboxChange("screen-protect", checked as boolean)} />
                        <Label htmlFor="screen-protect" className="text-gray-300">
                          Cover screens and displays with soft cloth to prevent dust buildup
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-opacity-20 bg-blue-900 rounded-md border border-blue-700 mt-4">
                    <div className="flex items-start space-x-3">
                      <Info className="text-blue-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-blue-400 font-medium">Electrical System Storage Tip</h4>
                        <p className="text-gray-300 text-sm mt-1">
                          If your storage facility offers shore power and you plan to keep your RV plugged in, consider using a surge protector. For extended storage without power, a solar trickle charger can help maintain battery health while preventing parasitic drain.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="electrical-notes" className="text-gray-200">Additional Electrical Notes</Label>
                    <Textarea 
                      id="electrical-notes" 
                      className="bg-[#131a2a] border-gray-700 min-h-[100px]" 
                      placeholder="Enter any additional notes about electrical system preparation..." 
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Mechanical System Tab (still a placeholder) */}
              <TabsContent value="mechanical" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">ENGINE & MECHANICAL SYSTEMS</h2>
                <p className="text-gray-300">This section will be expanded in the next update to include engine storage procedures, fluids, fuel system preparation, and related mechanical systems preparation guidelines.</p>
              </TabsContent>
              
              {/* Tires & Chassis Tab (placeholder - to be implemented in next update) */}
              <TabsContent value="tires" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">TIRES & CHASSIS</h2>
                <p className="text-gray-300">This section will be expanded in the next update to include tire care, pressure monitoring, chassis preparation, and leveling requirements.</p>
              </TabsContent>
              
              {/* Pest Control Tab (placeholder - to be implemented in next update) */}
              <TabsContent value="pest" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">PEST CONTROL</h2>
                <p className="text-gray-300">This section will be expanded in the next update to include comprehensive pest prevention measures and strategies.</p>
              </TabsContent>
              
              {/* Security Tab (placeholder - to be implemented in next update) */}
              <TabsContent value="security" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">SECURITY</h2>
                <p className="text-gray-300">This section will be expanded in the next update to include security measures, documentation, and monitoring options during storage.</p>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">CUSTOM NOTES & REMINDERS</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300">Use this section for any additional notes, reminders, or special considerations for your specific RV:</p>
                  
                  <Textarea 
                    className="bg-[#131a2a] border-gray-700 min-h-[200px]" 
                    placeholder="Enter your custom notes and reminders here..." 
                  />
                </div>
                
                <div className="pt-6 border-t border-gray-700 mt-8">
                  <p className="text-sm text-gray-400 italic">
                    This interactive checklist was created by Smart RV to help RV owners properly prepare their vehicles for extended indoor storage. 
                    While comprehensive, it may not cover all requirements for your specific RV. Always consult your owner's manual and professional 
                    service technicians for guidance specific to your vehicle.
                  </p>
                  
                  <p className="text-sm text-gray-400 mt-4">
                    © 2025 Smart RV | www.smartrv.com | Premium Indoor RV Storage Solutions
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoragePreparationChecklist;
