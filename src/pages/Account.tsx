
import React from "react";
import TwoFactorSettings from "@/components/auth/TwoFactorSettings";

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-12">
      <h1 className="text-3xl font-bold text-white mb-4">Account Settings</h1>
      {/* Insert other account/profile sections as needed here */}
      <TwoFactorSettings />
    </div>
  );
};

export default AccountPage;
