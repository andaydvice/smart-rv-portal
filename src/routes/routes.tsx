import Index from "@/pages/Index";
import ErrorPage from "@/pages/ErrorPage";

export const routes = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  }
];