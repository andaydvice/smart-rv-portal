
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import { routes } from "@/routes/routes";

const RouterProvider = () => {
  console.log('RouterProvider - Available Routes:', routes.map(route => route.path));
  
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          console.log('Rendering route:', route.path);
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  {route.element}
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
