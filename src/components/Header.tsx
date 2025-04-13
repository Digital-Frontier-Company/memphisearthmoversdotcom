
import { Phone } from "lucide-react";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-mem-darkNavy shadow-md glow-container">
      <div className="mem-container py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/2815d7b7-489c-42c6-a5f2-45c7e47f6371.png" 
            alt="Memphis Earth Movers Logo" 
            className="h-16 md:h-20"
          />
          <img 
            src="/lovable-uploads/7713a843-e930-4591-a487-959cb1eac6fe.png" 
            alt="Memphis Earth Movers Alternative Logo" 
            className="hidden ml-4 h-12 md:h-16"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Navigation />
          <a 
            href="tel:9014611011" 
            className="flex items-center gap-2 text-white hover:text-mem-babyBlue transition-colors"
          >
            <Phone size={20} />
            <span className="font-semibold hidden sm:inline">Call Now: (901) 461-1011</span>
            <span className="font-semibold sm:hidden">Call Now</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
