
import React, { useState } from 'react';
import PremiumNotification from './PremiumNotification';
import { Button } from './button';

const PremiumNotificationDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Show Premium Notification</Button>
      
      {isOpen && (
        <PremiumNotification
          title="Secure Indoor RV Storage LA"
          status="Premium indoor RV storage facility"
          onClose={handleClose}
          showClose={true}
        />
      )}
    </div>
  );
};

export default PremiumNotificationDemo;
