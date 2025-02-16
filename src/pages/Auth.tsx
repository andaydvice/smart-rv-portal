
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForms } from '@/components/auth/AuthForms';
import { useAuth } from '@/components/auth/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get the page user tried to visit before being redirected to login
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // Redirect to original destination if user is already authenticated
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Welcome to Smart RV Living
        </h1>
        <AuthForms onSuccess={() => navigate(from)} />
      </div>
    </div>
  );
};

export default Auth;
