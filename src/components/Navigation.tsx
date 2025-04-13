
import { Link, useLocation } from "react-router-dom";
import { Home, Calculator, Phone, Users } from "lucide-react";
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
          <Link to="/" className={`${navigationMenuTriggerStyle()} ${isActive('/') ? 'bg-mem-babyBlue/20 text-mem-babyBlue' : 'text-white'}`}>
            <Home className="mr-1 h-4 w-4" />
            Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/about-us" className={`${navigationMenuTriggerStyle()} ${isActive('/about-us') ? 'bg-mem-babyBlue/20 text-mem-babyBlue' : 'text-white'}`}>
            <Users className="mr-1 h-4 w-4" />
            About Us
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/gravel-calculator" className={`${navigationMenuTriggerStyle()} ${isActive('/gravel-calculator') ? 'bg-mem-babyBlue/20 text-mem-babyBlue' : 'text-white'}`}>
            <Calculator className="mr-1 h-4 w-4" />
            Gravel Calculator
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/contact" className={`${navigationMenuTriggerStyle()} ${isActive('/contact') ? 'bg-mem-babyBlue/20 text-mem-babyBlue' : 'text-white'}`}>
            <Phone className="mr-1 h-4 w-4" />
            Contact
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
