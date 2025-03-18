
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import AppRoutes from "@/routes/routes";

// Create the router from the routes component
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />
  }
]);

const RouterProvider = () => {
  console.log('RouterProvider - Available Routes:', router.routes);
  
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
