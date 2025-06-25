
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface NavigationProps {
  isScrolled: boolean;
}

const Navigation = ({ isScrolled }: NavigationProps) => {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <Link to="/" className="text-mem-darkNavy hover:text-mem-blue transition-colors">
        Home
      </Link>
      
      <div className="relative group">
        <button className="text-mem-darkNavy hover:text-mem-blue transition-colors flex items-center">
          Services <ChevronDown size={16} className="ml-1" />
        </button>
        <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <Link 
            to="/dump-truck-services" 
            className="block px-4 py-2 text-mem-darkNavy hover:bg-mem-gray transition-colors"
          >
            All Services
          </Link>
          <Link 
            to="/services/dump-truck-hauling" 
            className="block px-4 py-2 text-mem-darkNavy hover:bg-mem-gray transition-colors"
          >
            Dump Truck Hauling
          </Link>
          <Link 
            to="/services/site-clearing" 
            className="block px-4 py-2 text-mem-darkNavy hover:bg-mem-gray transition-colors"
          >
            Site Clearing
          </Link>
          <Link 
            to="/services/aggregate-delivery" 
            className="block px-4 py-2 text-mem-darkNavy hover:bg-mem-gray transition-colors"
          >
            Aggregate Delivery
          </Link>
          <Link 
            to="/hourly-dump-truck-rental" 
            className="block px-4 py-2 text-mem-darkNavy hover:bg-mem-gray transition-colors"
          >
            Hourly Rentals
          </Link>
          <Link 
            to="/memphis-gravel-delivery" 
            className="block px-4 py-2 text-mem-darkNavy hover:bg-mem-gray transition-colors"
          >
            Gravel Delivery
          </Link>
        </div>
      </div>
      
      <Link to="/gravel-calculator" className="text-mem-darkNavy hover:text-mem-blue transition-colors">
        Calculator
      </Link>
      <Link to="/about-us" className="text-mem-darkNavy hover:text-mem-blue transition-colors">
        About
      </Link>
      <Link to="/blog" className="text-mem-darkNavy hover:text-mem-blue transition-colors">
        Blog
      </Link>
      <Link to="/contact" className="text-mem-darkNavy hover:text-mem-blue transition-colors">
        Contact
      </Link>
      
      <div className="relative group">
        <button className="text-mem-darkNavy hover:text-mem-blue transition-colors flex items-center">
          Drivers <ChevronDown size={16} className="ml-1" />
        </button>
        <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <Link 
            to="/drivers" 
            className="block px-4 py-2 text-mem-darkNavy hover:bg-mem-gray transition-colors"
          >
            Driver Login
          </Link>
          <Link 
            to="/admin" 
            className="block px-4 py-2 text-mem-darkNavy hover:bg-mem-gray transition-colors"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
