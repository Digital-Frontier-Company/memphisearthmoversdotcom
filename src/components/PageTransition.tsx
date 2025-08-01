import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./ui/loading-spinner";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mem-darkNavy to-mem-blue">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-white/80 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
};

export default PageTransition;