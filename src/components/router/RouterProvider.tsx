import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import { routes } from "@/routes/routes";

const RouterProvider = () => {
  console.log('Rendering RouterProvider component');
  
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route) => {
            console.log('Rendering route:', route.path);
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default RouterProvider;