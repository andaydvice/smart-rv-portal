
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";

interface TabContentProps {
  value: string;
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ value, children }) => {
  return (
    <TabsContent value={value} className="mt-0" style={{ visibility: 'visible' }}>
      {children}
    </TabsContent>
  );
};

export default TabContent;
