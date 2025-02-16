
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import { routes } from "@/routes/routes";
import ProtectedRoute from "../auth/ProtectedRoute";

const RouterProvider = () => {
  console.log('RouterProvider - Available Routes:', routes.map(route => route.path));
  
  // Define which routes should be protected
  const protectedPaths = [
    '/storage-facilities',
    '/rv-weather',
    '/calculators'
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          console.log('Rendering route:', route.path);
          const isProtected = protectedPaths.includes(route.path);

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                isProtected ? (
                  <ProtectedRoute>
                    <Layout>
                      {route.element}
                    </Layout>
                  </ProtectedRoute>
                ) : (
                  <Layout>
                    {route.element}
                  </Layout>
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
