
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Printer, Save, RotateCcw } from "lucide-react";
import RVInfoTab from './checklist/RVInfoTab';
import ExteriorTab from './checklist/ExteriorTab';
import InteriorTab from './checklist/InteriorTab';
import PlumbingTab from './checklist/PlumbingTab';
import ElectricalTab from './checklist/ElectricalTab';
import MechanicalTab from './checklist/MechanicalTab';
import TiresTab from './checklist/TiresTab';
import PestControlTab from './checklist/PestControlTab';
import SecurityTab from './checklist/SecurityTab';
import NotesTab from './checklist/NotesTab';
import { ChecklistTabTrigger } from './checklist/ChecklistTabTrigger';

const StoragePreparationChecklist: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [progress, setProgress] = useState<{[key: string]: boolean}>({});

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setProgress(prev => ({...prev, [id]: checked}));
  };

  const handleReset = () => {
    setProgress({});
    setStartDate(new Date());
    setEndDate(undefined);
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
              <Button variant="outline" className="gap-2" onClick={handleReset}>
                <RotateCcw size={16} />
                Reset
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs defaultValue="rv-info" className="space-y-8">
              <TabsList className="bg-[#151A22] p-1 mb-8 grid grid-cols-2 md:grid-cols-5 lg:flex">
                <ChecklistTabTrigger value="rv-info" icon="Info" label="RV Info" />
                <ChecklistTabTrigger value="exterior" icon="ExternalLink" label="Exterior" />
                <ChecklistTabTrigger value="interior" icon="Home" label="Interior" />
                <ChecklistTabTrigger value="plumbing" icon="Droplet" label="Plumbing" />
                <ChecklistTabTrigger value="electrical" icon="Zap" label="Electrical" />
                <ChecklistTabTrigger value="mechanical" icon="Settings" label="Mechanical" />
                <ChecklistTabTrigger value="tires" icon="Truck" label="Tires" />
                <ChecklistTabTrigger value="pest" icon="Bug" label="Pest Control" />
                <ChecklistTabTrigger value="security" icon="ShieldCheck" label="Security" />
                <ChecklistTabTrigger value="notes" icon="FileText" label="Notes" />
              </TabsList>

              <TabsContent value="rv-info">
                <RVInfoTab startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
              </TabsContent>

              <TabsContent value="exterior">
                <ExteriorTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
              </TabsContent>

              <TabsContent value="interior">
                <InteriorTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
              </TabsContent>

              <TabsContent value="plumbing">
                <PlumbingTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
              </TabsContent>

              <TabsContent value="electrical">
                <ElectricalTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
              </TabsContent>

              <TabsContent value="mechanical">
                <MechanicalTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
              </TabsContent>

              <TabsContent value="tires">
                <TiresTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
              </TabsContent>

              <TabsContent value="pest">
                <PestControlTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
              </TabsContent>

              <TabsContent value="security">
                <SecurityTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
              </TabsContent>

              <TabsContent value="notes">
                <NotesTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoragePreparationChecklist;
