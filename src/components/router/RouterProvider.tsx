
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";

// Create the router from the routes array
const router = createBrowserRouter(routes);

const RouterProvider = () => {
  console.log('RouterProvider - Available Routes:', router.routes);
  
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
