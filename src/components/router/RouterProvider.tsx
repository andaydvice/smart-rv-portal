import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import { routes } from "@/routes/routes";

const RouterProvider = () => {
  console.log('Rendering RouterProvider component');
  
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;