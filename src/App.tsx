
import { RouterProvider } from '@/components/router/RouterProvider';
import { AuthProvider } from '@/components/auth/AuthContext';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <AuthProvider>
      <RouterProvider />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
