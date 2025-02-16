
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForms } from '@/components/auth/AuthForms';
import { useAuth } from '@/components/auth/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to home if user is already authenticated
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Welcome to Smart RV Living
        </h1>
        <AuthForms onSuccess={() => navigate('/')} />
      </div>
    </div>
  );
};

export default Auth;
