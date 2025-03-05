
import React from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';

const StoragePreparationChecklistPage: React.FC = () => {
  return (
    <div className="storage-preparation-checklist bg-[#080F1F] min-h-screen">
      <Navbar />
      <StoragePreparationChecklist />
    </div>
  );
};

export default StoragePreparationChecklistPage;
