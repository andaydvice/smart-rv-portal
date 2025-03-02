import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Printer, Save, RotateCcw, CheckSquare, FileText } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
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
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [notes, setNotes] = useState({
    general: '',
    storageContact: '',
    emergencyContact: '',
    returnPreparation: ''
  });
  
  useEffect(() => {
    const savedData = localStorage.getItem('rv-storage-checklist');
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProgress(parsed.progress || {});
        
        if (parsed.startDate) {
          setStartDate(new Date(parsed.startDate));
        }
        
        if (parsed.endDate) {
          setEndDate(new Date(parsed.endDate));
        }
        
        if (parsed.savedAt) {
          setLastSavedAt(parsed.savedAt);
        }
        
        if (parsed.notes) {
          setNotes(parsed.notes);
        }
      } catch (error) {
        console.error('Error loading saved checklist data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const autoSaveData = () => {
      const currentTime = new Date().toISOString();
      
      const saveData = {
        progress,
        startDate,
        endDate,
        notes,
        savedAt: currentTime
      };
      
      console.log("Auto-saving data:", saveData);
      localStorage.setItem('rv-storage-checklist', JSON.stringify(saveData));
      setLastSavedAt(currentTime);
    };
    
    autoSaveData();
  }, [progress, startDate, endDate, notes.general, notes.storageContact, notes.emergencyContact, notes.returnPreparation]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setProgress(prev => ({...prev, [id]: checked}));
  };

  const handleNotesChange = (field: string, value: string) => {
    console.log(`Handling notes change for ${field}:`, value);
    setNotes(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      return updated;
    });
  };

  const handleReset = () => {
    setProgress({});
    setStartDate(new Date());
    setEndDate(undefined);
    setLastSavedAt(null);
    setNotes({
      general: '',
      storageContact: '',
      emergencyContact: '',
      returnPreparation: ''
    });
    
    localStorage.removeItem('rv-storage-checklist');
    
    toast({
      title: "Progress Reset",
      description: "Your checklist has been reset to default state.",
    });
  };

  const handleSaveProgress = () => {
    const currentTime = new Date().toISOString();
    
    const saveData = {
      progress,
      startDate,
      endDate,
      notes,
      savedAt: currentTime
    };
    
    localStorage.setItem('rv-storage-checklist', JSON.stringify(saveData));
    setLastSavedAt(currentTime);
    
    toast({
      title: "Progress Saved",
      description: "Your checklist progress has been saved successfully.",
      variant: "default",
    });
  };

  const handlePrint = () => {
    window.print();
    
    toast({
      title: "Printing",
      description: "Sending checklist to printer...",
    });
  };

  const totalItems = 50;
  const completedItems = Object.values(progress).filter(val => val).length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  const getLastSavedMessage = () => {
    if (!lastSavedAt) return "";
    
    const savedDate = new Date(lastSavedAt);
    return `Last auto-saved: ${savedDate.toLocaleTimeString()}`;
  };

  return (
    <div className="min-h-screen bg-[#080F1F] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="border-gray-700 bg-[#091020] shadow-xl overflow-hidden">
          <CardHeader className="border-b border-gray-700 pb-6 bg-gradient-to-r from-[#0c1219] to-[#131a2a]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <CardTitle className="text-3xl font-bold text-white mb-2">COMPLETE GUIDE TO RV STORAGE PREPARATION</CardTitle>
                <CardDescription className="text-xl text-[#E2E8FF] font-light">Interactive Checklist for Extended Indoor Storage</CardDescription>
              </div>
              <div className="text-[#5B9BD5] font-bold text-xl">SMART RV</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2 bg-[#151A22] hover:bg-[#1d2532] hover:text-white text-white border-gray-700 
                  focus:text-white active:text-white focus:bg-[#1d2532] active:bg-[#1d2532] focus:border-[#5B9BD5] active:border-[#5B9BD5]"
                  onClick={handleSaveProgress}
                >
                  <Save size={16} className="text-[#5B9BD5]" />
                  Save Progress
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 bg-[#151A22] hover:bg-[#1d2532] hover:text-white text-white border-gray-700
                  focus:text-white active:text-white focus:bg-[#1d2532] active:bg-[#1d2532] focus:border-[#5B9BD5] active:border-[#5B9BD5]"
                  onClick={handlePrint}
                >
                  <Printer size={16} className="text-[#5B9BD5]" />
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 bg-[#151A22] hover:bg-[#1d2532] hover:text-white text-white border-gray-700
                  focus:text-white active:text-white focus:bg-[#1d2532] active:bg-[#1d2532] focus:border-[#5B9BD5] active:border-[#5B9BD5]"
                  onClick={handleReset}
                >
                  <RotateCcw size={16} className="text-[#5B9BD5]" />
                  Reset
                </Button>
              </div>
              
              <div className="flex items-center justify-between gap-3 ml-auto">
                {lastSavedAt && (
                  <span className="text-xs text-[#E2E8FF] italic mr-3">
                    {getLastSavedMessage()}
                  </span>
                )}
                <div className="flex items-center gap-3 bg-[#151A22] py-2 px-3 rounded-md border border-gray-700">
                  <CheckSquare size={18} className="text-[#10B981]" />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#E2E8FF]">Completion</span>
                    <span className="text-[#10B981] font-bold">{completionPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs defaultValue="rv-info" className="space-y-8">
              <TabsList className="bg-[#151A22] mb-8 flex justify-between py-8 px-4 w-full">
                <ChecklistTabTrigger value="rv-info" icon="FileText" iconColor="#60A5FA" label="RV Info" />
                <ChecklistTabTrigger value="exterior" icon="ExternalLink" iconColor="#10B981" label="Exterior" />
                <ChecklistTabTrigger value="interior" icon="Home" iconColor="#F59E0B" label="Interior" />
                <ChecklistTabTrigger value="plumbing" icon="Droplet" iconColor="#3B82F6" label="Plumbing" />
                <ChecklistTabTrigger value="electrical" icon="Zap" iconColor="#EF4444" label="Electrical" />
                <ChecklistTabTrigger value="mechanical" icon="Settings" iconColor="#8B5CF6" label="Mechanical" />
                <ChecklistTabTrigger value="tires" icon="Truck" iconColor="#EC4899" label="Tires" />
                <ChecklistTabTrigger value="pest" icon="Bug" iconColor="#14B8A6" label="Pest Control" />
                <ChecklistTabTrigger value="security" icon="ShieldCheck" iconColor="#F97316" label="Security" />
                <ChecklistTabTrigger value="notes" icon="FileText" iconColor="#6366F1" label="Notes" />
              </TabsList>

              <div className="bg-[#0c1219] rounded-xl p-6 shadow-inner border border-gray-800">
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
                  <NotesTab 
                    notes={notes} 
                    onNotesChange={handleNotesChange} 
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoragePreparationChecklist;
