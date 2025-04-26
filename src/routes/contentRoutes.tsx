import React from "react";
import { RouteObject } from "react-router-dom";

import Technology from "@/pages/Technology";
import ContactUs from "@/pages/ContactUs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AboutUs from "@/pages/AboutUs";
import Careers from "@/pages/Careers";
import Blog from "@/pages/Blog";
import Article from "@/pages/Article";
import ErrorPage from "@/pages/ErrorPage";
import Features from "@/pages/Features";
import SecuritySystem from "@/pages/SecuritySystem";
import SmartKitchen from "@/pages/SmartKitchen";

const contentRoutes: RouteObject[] = [
  {
    path: "/technology",
    element: <Technology />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/careers",
    element: <Careers />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/article/:slug",
    element: <Article />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features",
    element: <Features />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/security-system",
    element: <SecuritySystem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-kitchen",
    element: <SmartKitchen />,
    errorElement: <ErrorPage />,
  },
];

export default contentRoutes;
