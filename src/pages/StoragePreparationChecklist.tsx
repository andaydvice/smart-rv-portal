
import React from 'react';
import Navbar from '@/components/Navbar';
import Layout from '@/components/layout/Layout';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';

const StoragePreparationChecklistPage: React.FC = () => {
  return (
    <Layout>
      <div className="storage-preparation-checklist bg-[#080F1F] min-h-screen">
        <Navbar />
        <StoragePreparationChecklist />
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
