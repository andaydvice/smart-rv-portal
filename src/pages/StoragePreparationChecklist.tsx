
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';
import ChecklistHeroImage from '@/components/storage/checklist/ChecklistHeroImage';
import { Container } from '@/components/ui/container';
import Layout from '@/components/layout/Layout';

const StoragePreparationChecklistPage: React.FC = () => {
  return (
    <Layout>
      <div className="storage-preparation-checklist bg-[#080F1F] min-h-screen">
        <Navbar />
        <ChecklistHeroImage />
        <StoragePreparationChecklist />
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
