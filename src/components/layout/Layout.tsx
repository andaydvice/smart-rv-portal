
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop effect triggered for path:', pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  console.log('Rendering Layout component');
  return (
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
      <ScrollToTop />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
