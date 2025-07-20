import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Clock } from "lucide-react";

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-mem-darkNavy/95 backdrop-blur-sm border-b border-mem-babyBlue/30 shadow-lg transition-all duration-300">
      <div className="mem-container">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-6">
            <a 
              href="tel:9014611011" 
              className="flex items-center gap-2 text-white hover:text-mem-babyBlue transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-semibold">(901) 461-1011</span>
            </a>
            
            <div className="hidden md:flex items-center gap-2 text-mem-babyBlue">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">3 Trucks Available Today</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-white/90 text-sm">
              Starting at <span className="text-mem-babyBlue font-bold">$125/hour</span>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6">
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;