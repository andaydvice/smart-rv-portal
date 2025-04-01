
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorDisplay from "../components/error/ErrorDisplay";

import MapIconDemo from "../pages/MapIconDemo";
import ScheduleDemo from "../pages/ScheduleDemo";
import MapFacilityDemo from "../pages/MapFacilityDemo";

export const demoRoutes: RouteObject[] = [
  {
    path: "/map-icon-demo",
    element: <MapIconDemo />,
    errorElement: <ErrorDisplay error={{message: "Map Icon Demo page not found", statusCode: 404}} />
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
    errorElement: <ErrorDisplay error={{message: "Schedule Demo page not found", statusCode: 404}} />
  },
  {
    path: "/facility-map-demo",
    element: <MapFacilityDemo />,
    errorElement: <ErrorDisplay error={{message: "Facility Map Demo page not found", statusCode: 404}} />
  }
];

export default demoRoutes;
