
import React from "react";
import { RouteObject } from "react-router-dom";

// Import pages
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import BlogIndex from "../pages/BlogIndex";
import Documentation from "../pages/Documentation";
import ScheduleDemo from "../pages/ScheduleDemo";
import RVWeather from "../pages/RVWeather";
import SearchResults from "../pages/SearchResults";

const contentRoutes: RouteObject[] = [
  {
    path: "/blog",
    element: <BlogIndex />,
  },
  {
    path: "/blog/:postId",
    element: <BlogPost />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
];

export default contentRoutes;
