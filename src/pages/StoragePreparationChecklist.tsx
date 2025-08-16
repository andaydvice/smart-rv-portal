
import React from 'react';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';
import Layout from "@/components/layout/Layout";
import SEO from "@/components/seo/SEO";
import { organizationSchema, howToSchema, breadcrumbSchema } from "@/components/seo/schemas";

const StoragePreparationChecklistPage: React.FC = () => {
  const checklistSteps = [
    { name: "Clean and Sanitize", text: "Thoroughly clean all surfaces, appliances, and systems before storage" },
    { name: "Drain Water Systems", text: "Completely drain fresh water, gray water, and black water tanks" },
    { name: "Winterize Plumbing", text: "Add antifreeze to prevent freeze damage to pipes and fixtures" },
    { name: "Battery Maintenance", text: "Disconnect or maintain batteries to prevent discharge and damage" },
    { name: "Tire Care", text: "Check tire pressure and use tire covers to prevent UV damage" }
  ];

  return (
    <Layout>
      <SEO
        title="RV Storage Preparation Checklist | Complete Winterization Guide"
        description="Complete RV storage preparation checklist with step-by-step winterization guide. Protect your RV with proper storage techniques and maintenance procedures."
        keywords="RV storage checklist, RV winterization, RV storage preparation, RV maintenance, winter RV storage, RV storage tips"
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/storage-preparation-checklist` : ''}
        ogImage="/og-image.svg"
        ogImageAlt="RV Storage Preparation Checklist Guide"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', url: typeof window !== 'undefined' ? window.location.origin : '' },
            { name: 'Storage Checklist', url: typeof window !== 'undefined' ? `${window.location.origin}/storage-preparation-checklist` : '' }
          ]),
          howToSchema({
            name: "RV Storage Preparation",
            description: "Complete guide to preparing your RV for storage and winterization",
            totalTime: "PT4H",
            steps: checklistSteps
          })
        ]}
      />
      <div className="storage-preparation-checklist flex-grow">
        <StoragePreparationChecklist />
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
