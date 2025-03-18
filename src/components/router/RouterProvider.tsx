
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import AppRoutes from "@/routes/routes";

// Create the router from the routes component
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    // Add a better error element for improved UX
    errorElement: <div className="flex flex-col items-center justify-center h-screen bg-[#080F1F] text-white p-4">
      <h1 className="text-3xl font-bold text-[#F97316] mb-4">Page Not Found</h1>
      <p className="text-lg mb-6">We couldn't find the page you're looking for.</p>
      <a href="/" className="px-4 py-2 bg-[#5B9BD5] text-white rounded-md hover:bg-[#4B8FE3] transition-colors">
        Return to Home
      </a>
    </div>
  }
]);

const RouterProvider = () => {
  console.log('RouterProvider - Available Routes:', router.routes);
  
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
