
import React from 'react';
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
import { format } from "date-fns";
import { CalendarIcon, Printer, Save, RotateCcw } from "lucide-react";

const StoragePreparationChecklist: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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
                <TabsTrigger value="plumbing" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Plumbing
                </TabsTrigger>
                <TabsTrigger value="electrical" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Electrical
                </TabsTrigger>
                <TabsTrigger value="mechanical" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Mechanical
                </TabsTrigger>
                <TabsTrigger value="tires" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Tires
                </TabsTrigger>
                <TabsTrigger value="pest" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
                  Pest Control
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white">
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
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
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
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
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
                        <Checkbox id="wash" className="mt-1" />
                        <Label htmlFor="wash" className="text-gray-300">
                          Wash exterior thoroughly, including roof, sides, and undercarriage
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="bugs" className="mt-1" />
                        <Label htmlFor="bugs" className="text-gray-300">
                          Remove all bugs, tree sap, and road tar
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="awnings" className="mt-1" />
                        <Label htmlFor="awnings" className="text-gray-300">
                          Clean awnings and allow to dry completely before retracting
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="uv" className="mt-1" />
                        <Label htmlFor="uv" className="text-gray-300">
                          Apply UV protectant to rubber seals and gaskets
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="steps" className="mt-1" />
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
                        <Checkbox id="seals" className="mt-1" />
                        <Label htmlFor="seals" className="text-gray-300">
                          Inspect and reseal any roof or sidewall seams that show signs of cracking
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="damage" className="mt-1" />
                        <Label htmlFor="damage" className="text-gray-300">
                          Check for and repair any exterior damage (cracks, chips, delamination)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="wax" className="mt-1" />
                        <Label htmlFor="wax" className="text-gray-300">
                          Apply wax to fiberglass or painted surfaces for extended protection
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="plastic" className="mt-1" />
                        <Label htmlFor="plastic" className="text-gray-300">
                          Cover or protect exterior plastic components from UV damage
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="accessories" className="mt-1" />
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
                        <Checkbox id="cover" className="mt-1" />
                        <Label htmlFor="cover" className="text-gray-300">
                          Consider a breathable RV cover designed for indoor storage (prevents dust)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="secure" className="mt-1" />
                        <Label htmlFor="secure" className="text-gray-300">
                          If using a cover, ensure it's properly secured but not tight against surfaces
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="padding" className="mt-1" />
                        <Label htmlFor="padding" className="text-gray-300">
                          Place padding over sharp edges to prevent cover damage
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="vents" className="mt-1" />
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
                        <Checkbox id="int-surfaces" className="mt-1" />
                        <Label htmlFor="int-surfaces" className="text-gray-300">
                          Thoroughly clean all interior surfaces
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="vacuum" className="mt-1" />
                        <Label htmlFor="vacuum" className="text-gray-300">
                          Vacuum and clean all upholstery and carpets
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="cabinets" className="mt-1" />
                        <Label htmlFor="cabinets" className="text-gray-300">
                          Clean and dry all cabinets, drawers, and closets
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="bathroom" className="mt-1" />
                        <Label htmlFor="bathroom" className="text-gray-300">
                          Clean and sanitize bathroom and shower areas
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="fridge" className="mt-1" />
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
                        <Checkbox id="desiccant" className="mt-1" />
                        <Label htmlFor="desiccant" className="text-gray-300">
                          Place desiccant moisture absorbers in multiple locations
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="cabinet-open" className="mt-1" />
                        <Label htmlFor="cabinet-open" className="text-gray-300">
                          Leave cabinet doors and drawers slightly open for air circulation
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="bedding" className="mt-1" />
                        <Label htmlFor="bedding" className="text-gray-300">
                          Remove all bedding and store separately
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="fridge-door" className="mt-1" />
                        <Label htmlFor="fridge-door" className="text-gray-300">
                          Leave refrigerator door propped slightly open (after defrosting)
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="dehumidifier" className="mt-1" />
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
                        <Checkbox id="food" className="mt-1" />
                        <Label htmlFor="food" className="text-gray-300">
                          Remove all food items, including canned goods and spices
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="toiletries" className="mt-1" />
                        <Label htmlFor="toiletries" className="text-gray-300">
                          Remove all toiletries and personal care items
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="perishables" className="mt-1" />
                        <Label htmlFor="perishables" className="text-gray-300">
                          Remove any plants, candles, or perishable decorative items
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="valuables" className="mt-1" />
                        <Label htmlFor="valuables" className="text-gray-300">
                          Remove valuables, electronics, and important documents
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="propane" className="mt-1" />
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

              {/* Display only a few tabs for brevity - additional tabs would follow the same pattern */}
              <TabsContent value="plumbing" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">PLUMBING SYSTEM</h2>
                <p className="text-gray-300">Plumbing system preparation content would go here...</p>
              </TabsContent>
              
              <TabsContent value="electrical" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">ELECTRICAL SYSTEM</h2>
                <p className="text-gray-300">Electrical system preparation content would go here...</p>
              </TabsContent>
              
              <TabsContent value="mechanical" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">ENGINE & MECHANICAL SYSTEMS</h2>
                <p className="text-gray-300">Engine and mechanical systems content would go here...</p>
              </TabsContent>

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
