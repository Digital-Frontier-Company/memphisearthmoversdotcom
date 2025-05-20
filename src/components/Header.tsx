
import { Phone } from "lucide-react";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mem-container py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/2815d7b7-489c-42c6-a5f2-45c7e47f6371.png" 
            alt="Memphis Earth Movers Logo" 
            className="h-16 md:h-20"
          />
          <img 
            src="/lovable-uploads/424d3eda-d37f-40d8-b639-aa7b135c6608.png" 
            alt="Memphis Earth Movers Full Logo with Tri-Axle Dump Trucks and Tennessee Star" 
            className="hidden ml-4 h-12 md:h-16"
            width="240"
            height="80"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Navigation />
          <a 
            href="tel:9014611011" 
            className="flex items-center gap-2 text-mem-darkNavy hover:text-mem-blue transition-colors"
          >
            <Phone size={20} />
            <span className="font-semibold hidden sm:inline">Call Now: (901) 461-1011</span>
            <span className="font-semibold sm:hidden">Call Now</span>
          </a>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
