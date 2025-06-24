
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log('Header component is rendering');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md min-h-[80px]">
      <div className="mem-container py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/2815d7b7-489c-42c6-a5f2-45c7e47f6371.png" 
            alt="Memphis Earth Movers Logo" 
            className="h-16 md:h-20"
            onError={(e) => console.log('Logo failed to load:', e)}
            onLoad={() => console.log('Logo loaded successfully')}
          />
          <img 
            src="/lovable-uploads/7713a843-e930-4591-a487-959cb1eac6fe.png" 
            alt="Memphis Earth Movers Alternative Logo" 
            className="hidden ml-4 h-12 md:h-16"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Navigation isScrolled={isScrolled} />
          <a 
            href="tel:9015476442" 
            className="flex items-center gap-2 text-mem-darkNavy hover:text-mem-blue transition-colors"
          >
            <Phone size={20} />
            <span className="font-semibold hidden sm:inline">Call Now: 901-547-6442</span>
            <span className="font-semibold sm:hidden">Call Now</span>
          </a>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
