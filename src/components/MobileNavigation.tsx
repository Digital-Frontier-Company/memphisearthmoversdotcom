
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Calculator, Phone, Users, Truck, BookOpen, Clock, Layers, UserCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNavigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    setOpen(false);
  };
  
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 text-blue-600 hover:text-blue-700 transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)]">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white w-[250px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex justify-between items-center">
              <span className="font-bold text-blue-600 drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-lg">Menu</span>
              <button onClick={() => setOpen(false)}>
                <X size={20} className="text-mem-darkGray" />
              </button>
            </div>
            
            <nav className="flex flex-col p-4 gap-2">
              <Link 
                to="/" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              
              <Link 
                to="/about-us" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/about-us') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <Users className="h-4 w-4" />
                About Us
              </Link>
              
              <Link 
                to="/dump-truck-services" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/dump-truck-services') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <Truck className="h-4 w-4" />
                Services
              </Link>
              
              <Link 
                to="/hourly-dump-truck-rental" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/hourly-dump-truck-rental') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <Clock className="h-4 w-4 ml-4" />
                Hourly Truck Rental
              </Link>
              
              <Link 
                to="/memphis-gravel-delivery" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/memphis-gravel-delivery') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <Layers className="h-4 w-4 ml-4" />
                Gravel Delivery
              </Link>
              
              <Link 
                to="/gravel-calculator" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/gravel-calculator') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <Calculator className="h-4 w-4" />
                Gravel Calculator
              </Link>
              
              <Link 
                to="/blog" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/blog') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <BookOpen className="h-4 w-4" />
                Blog
              </Link>
              
              <Link 
                to="/contact" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/contact') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <Phone className="h-4 w-4" />
                Contact
              </Link>
              
              <Link 
                to="/drivers" 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-base ${
                  isActive('/drivers') 
                    ? 'bg-mem-babyBlue/20 text-blue-700' 
                    : 'text-blue-600 hover:bg-mem-babyBlue/10'
                }`}
                onClick={handleLinkClick}
              >
                <UserCheck className="h-4 w-4" />
                Drivers
              </Link>
            </nav>
            
            <div className="mt-auto p-4 border-t">
              <a 
                href="tel:9014611011" 
                className="flex items-center justify-center gap-2 w-full bg-mem-blue text-white py-2 px-4 rounded-md hover:bg-mem-darkBlue transition-colors"
              >
                <Phone size={16} />
                <span className="font-medium">Call Now</span>
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
