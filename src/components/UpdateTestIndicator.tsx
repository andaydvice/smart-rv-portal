import React from 'react';

export const UpdateTestIndicator = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Enhanced console logging
    console.log('%c⚡ UPDATE TEST COMPONENT LOADED ⚡', 
      'background: linear-gradient(45deg, #ff9ff3, #54a0ff); color: white; font-size: 20px; padding: 10px; font-weight: bold;'
    );
    console.log('%cComponent mounted at:', 'color: #5B9BD5; font-size: 16px; font-weight: bold;', new Date().toISOString());

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Fixed top banner */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
        color: 'white',
        padding: '12px',
        textAlign: 'center',
        zIndex: 99999,
        fontSize: '18px',
        fontWeight: 'bold',
        animation: 'colorShift 3s ease-in-out infinite'
      }}>
        ⚡ LOVABLE UPDATE TEST - {currentTime.toLocaleTimeString()} - Version: {Math.random().toFixed(4)} ⚡
      </div>

      {/* Floating corner indicator */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        background: 'rgba(255, 0, 255, 0.9)',
        color: 'white',
        padding: '20px',
        borderRadius: '50%',
        zIndex: 99998,
        fontSize: '24px',
        fontWeight: 'bold',
        animation: 'bounce 2s infinite',
        border: '4px solid #fff',
        boxShadow: '0 0 40px rgba(255, 0, 255, 0.8)'
      }}>
        🎯
      </div>

      <style>{`
        @keyframes colorShift {
          0% { background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4); }
          33% { background: linear-gradient(90deg, #4ecdc4, #45b7d1, #96ceb4, #ff6b6b); }
          66% { background: linear-gradient(90deg, #45b7d1, #96ceb4, #ff6b6b, #4ecdc4); }
          100% { background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-15px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default UpdateTestIndicator;