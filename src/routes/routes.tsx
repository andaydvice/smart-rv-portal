import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import ErrorPage from "@/pages/ErrorPage";
import contentRoutes from "./contentRoutes";
import { featureRoutes } from "./featureRoutes";
import utilityRoutes from "./utilityRoutes";
import { modelRoutes } from "./modelRoutes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />
  },
  ...contentRoutes,
  ...featureRoutes,
  ...utilityRoutes,
  ...modelRoutes,
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  }
];