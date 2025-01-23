import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import { routes } from "@/routes/routes";
import VoiceControl from "@/pages/VoiceControl";

const RouterProvider = () => {
  console.log('Rendering RouterProvider component');
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/voice-control" element={<VoiceControl />} />
        {routes.filter(route => route.path !== '/voice-control').map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;