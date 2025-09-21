
import React from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';
import Layout from "@/components/layout/Layout";

const StoragePreparationChecklistPage: React.FC = () => {
  return (
    <Layout>
      <div className="storage-preparation-checklist flex-grow">
        <StoragePreparationChecklist />
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
