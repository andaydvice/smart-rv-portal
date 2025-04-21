import Calculators from "../pages/Calculators";
import Documentation from "../pages/Documentation";
import Weather from "../pages/Weather";
import StorageFacilities from "../pages/StorageFacilities";
import StoragePreparationChecklist from "../pages/StoragePreparationChecklist";
import Contact from "../pages/Contact";
import Troubleshooting from "../pages/Troubleshooting";
import ScheduleDemo from "../pages/ScheduleDemo";
import VoiceControl from "../pages/VoiceControl";
import AccountPage from "@/pages/Account";

const utilityRoutes = [
  {
    path: "/calculators",
    element: <Calculators />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
  {
    path: "/weather",
    element: <Weather />,
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
  },
  {
    path: "/storage-preparation-checklist",
    element: <StoragePreparationChecklist />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
];

export default utilityRoutes;
