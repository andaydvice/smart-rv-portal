
import React from 'react';
import Navbar from '@/components/Navbar';

import Layout from "@/components/layout/Layout";

const StoragePreparationChecklistPage: React.FC = () => {
  return (
    <Layout>
      <div className="storage-preparation-checklist flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-8">Storage Preparation Checklist</h1>
          <p className="text-gray-300">Prepare your RV for storage with our comprehensive checklist.</p>
        </div>
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
