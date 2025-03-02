
import React from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';

const StoragePreparationChecklistPage: React.FC = () => {
  return (
    <div className="storage-preparation-checklist">
      <Navbar />
      <StoragePreparationChecklist />
    </div>
  );
};

export default StoragePreparationChecklistPage;
