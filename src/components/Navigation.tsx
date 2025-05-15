
import { Link, useLocation } from "react-router-dom";
import { Home, Calculator, Phone, Users, Truck, BookOpen } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={`${navigationMenuTriggerStyle()} ${isActive('/') ? 'bg-mem-babyBlue/20 text-mem-blue' : 'text-mem-darkNavy'}`}>
            <Home className="mr-1 h-4 w-4" />
            Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/about-us" className={`${navigationMenuTriggerStyle()} ${isActive('/about-us') ? 'bg-mem-babyBlue/20 text-mem-blue' : 'text-mem-darkNavy'}`}>
            <Users className="mr-1 h-4 w-4" />
            About Us
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${isActive('/dump-truck-services') || isActive('/hourly-dump-truck-rental') ? 'bg-mem-babyBlue/20 text-mem-blue' : 'text-mem-darkNavy'}`}>
            <Truck className="mr-1 h-4 w-4" />
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <Link to="/dump-truck-services" className="block p-3 space-y-1 rounded-md hover:bg-slate-100">
                <div className="font-medium">All Dump Truck Services</div>
                <div className="text-sm text-muted-foreground">Overview of our material hauling services</div>
              </Link>
              <Link to="/hourly-dump-truck-rental" className="block p-3 space-y-1 rounded-md hover:bg-slate-100">
                <div className="font-medium">Hourly Dump Truck Rental</div>
                <div className="text-sm text-muted-foreground">Flexible hourly rates with professional CDL drivers</div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/gravel-calculator" className={`${navigationMenuTriggerStyle()} ${isActive('/gravel-calculator') ? 'bg-mem-babyBlue/20 text-mem-blue' : 'text-mem-darkNavy'}`}>
            <Calculator className="mr-1 h-4 w-4" />
            Gravel Calculator
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/blog" className={`${navigationMenuTriggerStyle()} ${isActive('/blog') ? 'bg-mem-babyBlue/20 text-mem-blue' : 'text-mem-darkNavy'}`}>
            <BookOpen className="mr-1 h-4 w-4" />
            Blog
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/contact" className={`${navigationMenuTriggerStyle()} ${isActive('/contact') ? 'bg-mem-babyBlue/20 text-mem-blue' : 'text-mem-darkNavy'}`}>
            <Phone className="mr-1 h-4 w-4" />
            Contact
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
