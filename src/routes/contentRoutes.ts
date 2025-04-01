
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorDisplay from "../components/error/ErrorDisplay";

// Import page components
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Technology from "../pages/Technology";
import Contact from "../pages/Contact";
import Documentation from "../pages/Documentation";
import CompleteDocumentation from "../pages/documentation/CompleteDocumentation";

export const contentRoutes: RouteObject[] = [
  {
    path: "/technology",
    element: React.createElement(Technology),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Technology page not found", statusCode: 404} 
    })
  },
  {
    path: "/contact",
    element: React.createElement(Contact),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Contact page not found", statusCode: 404} 
    })
  },
  {
    path: "/blog",
    element: React.createElement(Blog),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Blog page not found", statusCode: 404} 
    })
  },
  {
    path: "/blog/:slug",
    element: React.createElement(BlogPost),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Blog post not found", statusCode: 404} 
    })
  },
  {
    path: "/documentation",
    element: React.createElement(Documentation),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Documentation page not found", statusCode: 404} 
    })
  },
  {
    path: "/documentation/complete",
    element: React.createElement(CompleteDocumentation),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Complete Documentation page not found", statusCode: 404} 
    })
  }
];

export default contentRoutes;
