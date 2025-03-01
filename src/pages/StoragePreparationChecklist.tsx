
import React from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';

const StoragePreparationChecklistPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <StoragePreparationChecklist />
    </>
  );
};

export default StoragePreparationChecklistPage;
