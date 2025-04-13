
import { Phone, Facebook, Twitter, Instagram, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mem-container py-2">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Top navigation with logo in center on desktop */}
          <div className="flex w-full justify-between items-center order-1 md:order-2 md:justify-center md:flex-1">
            {/* Navigation for desktop */}
            <nav className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/services">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Services
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            {/* Logo in center */}
            <div className="flex items-center justify-center md:mx-8">
              <img 
                src="/lovable-uploads/2815d7b7-489c-42c6-a5f2-45c7e47f6371.png" 
                alt="Memphis Earth Movers Logo" 
                className="h-16 md:h-20"
              />
            </div>
            
            {/* Right navigation for desktop */}
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/store">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Store
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/contact">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          {/* Bottom row with phone, social media, and book now button */}
          <div className="flex w-full justify-between items-center mt-2 md:mt-0 order-2 md:order-3">
            {/* Phone number */}
            <div className="flex items-center">
              <a 
                href="tel:9014611011" 
                className="flex items-center gap-2 text-mem-darkGray hover:text-mem-blue transition-colors"
              >
                <Phone size={18} />
                <span className="font-semibold hidden sm:inline">(901)461-1011</span>
              </a>
            </div>
            
            {/* Social media icons */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mem-darkGray hover:text-mem-blue transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mem-darkGray hover:text-mem-blue transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mem-darkGray hover:text-mem-blue transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
            
            {/* Book now button */}
            <div>
              <Button 
                className="bg-mem-blue hover:bg-mem-darkBlue text-white rounded-full"
                size="sm"
              >
                Book now
              </Button>
            </div>
          </div>
          
          {/* Mobile navigation - shown only on small screens */}
          <div className="flex w-full md:hidden justify-center mt-2 order-3">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap justify-center gap-1">
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "py-1 px-2")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/services">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "py-1 px-2")}>
                      Services
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "py-1 px-2")}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/store">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "py-1 px-2")}>
                      Store
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "py-1 px-2")}>
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
      
      {/* Blue wave decoration at bottom */}
      <div className="h-1 w-full bg-gradient-to-r from-mem-blue via-mem-lightBlue to-mem-blue"></div>
    </header>
  );
};

export default Header;
