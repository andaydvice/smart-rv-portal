
import { RouterProvider as ReactRouterProvider } from "react-router-dom";
import { router } from "@/routes/routes";

const RouterProvider = () => {
  console.log('RouterProvider - Available Routes:', router.routes);
  
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
