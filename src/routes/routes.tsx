import { lazy } from 'react';
import Index from '@/pages/Index';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import Documentation from '@/pages/Documentation';
import Features from '@/pages/Features';
import Models from '@/pages/Models';
import RVWeather from '@/pages/RVWeather';
import ScheduleDemo from '@/pages/ScheduleDemo';
import Technology from '@/pages/Technology';
import Troubleshooting from '@/pages/Troubleshooting';
import VoiceControl from '@/pages/VoiceControl';
import StorageFacilities from '@/pages/StorageFacilities';
import Calculators from '@/pages/Calculators';
import Auth from '@/pages/Auth';

export const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/blog/:id',
    element: <BlogPost />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/documentation',
    element: <Documentation />,
  },
  {
    path: '/features',
    element: <Features />,
  },
  {
    path: '/models',
    element: <Models />,
  },
  {
    path: '/storage-facilities',
    element: <StorageFacilities />,
  },
  {
    path: '/rv-weather',
    element: <RVWeather />,
  },
  {
    path: '/schedule-demo',
    element: <ScheduleDemo />,
  },
  {
    path: '/technology',
    element: <Technology />,
  },
  {
    path: '/troubleshooting',
    element: <Troubleshooting />,
  },
  {
    path: '/voice-control',
    element: <VoiceControl />,
  },
  {
    path: '/calculators',
    element: <Calculators />,
  },
] as const;
