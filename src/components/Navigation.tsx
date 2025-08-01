import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
interface NavigationProps {
  isScrolled: boolean;
}
const Navigation = ({
  isScrolled
}: NavigationProps) => {
  return <nav className="hidden lg:flex items-center space-x-8">
      <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-lg">
        Home
      </Link>
      
      <div className="relative group">
        <button className="text-blue-600 hover:text-blue-700 transition-colors flex items-center font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-lg">
          Services <ChevronDown size={16} className="ml-1" />
        </button>
        <div className="absolute top-full left-0 bg-white shadow-2xl rounded-lg py-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out z-50 border border-mem-babyBlue/20 backdrop-blur-sm">
          <Link to="/dump-truck-services" className="block px-4 py-3 text-mem-darkNavy hover:bg-gradient-to-r hover:from-mem-babyBlue/10 hover:to-mem-blue/10 transition-all duration-200 transform hover:translate-x-2 rounded-md mx-2">
            All Services
          </Link>
          <Link to="/services/dump-truck-hauling" className="block px-4 py-3 text-mem-darkNavy hover:bg-gradient-to-r hover:from-mem-babyBlue/10 hover:to-mem-blue/10 transition-all duration-200 transform hover:translate-x-2 rounded-md mx-2">
            Dump Truck Hauling
          </Link>
          <Link to="/services/site-clearing" className="block px-4 py-3 text-mem-darkNavy hover:bg-gradient-to-r hover:from-mem-babyBlue/10 hover:to-mem-blue/10 transition-all duration-200 transform hover:translate-x-2 rounded-md mx-2">
            Site Clearing
          </Link>
          <Link to="/services/aggregate-delivery" className="block px-4 py-3 text-mem-darkNavy hover:bg-gradient-to-r hover:from-mem-babyBlue/10 hover:to-mem-blue/10 transition-all duration-200 transform hover:translate-x-2 rounded-md mx-2">
            Aggregate Delivery
          </Link>
          <Link to="/hourly-dump-truck-rental" className="block px-4 py-3 text-mem-darkNavy hover:bg-gradient-to-r hover:from-mem-babyBlue/10 hover:to-mem-blue/10 transition-all duration-200 transform hover:translate-x-2 rounded-md mx-2">
            Hourly Rentals
          </Link>
          <Link to="/memphis-gravel-delivery" className="block px-4 py-3 text-mem-darkNavy hover:bg-gradient-to-r hover:from-mem-babyBlue/10 hover:to-mem-blue/10 transition-all duration-200 transform hover:translate-x-2 rounded-md mx-2">
            Gravel Delivery
          </Link>
        </div>
      </div>
      
      <Link to="/gravel-calculator" className="text-blue-600 hover:text-blue-700 transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-lg">
        Calculator
      </Link>
      <Link to="/about-us" className="text-blue-600 hover:text-blue-700 transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-lg">
        About
      </Link>
      <Link to="/blog" className="text-blue-600 hover:text-blue-700 transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-lg">
        Blog
      </Link>
      <Link to="/contact" className="text-blue-600 hover:text-blue-700 transition-colors font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-lg">
        Contact
      </Link>
      
      <div className="relative group">
        <button className="text-blue-600 hover:text-blue-700 transition-colors flex items-center font-bold drop-shadow-[1px_1px_1px_rgb(30,58,138)] text-lg">
          Drivers <ChevronDown size={16} className="ml-1" />
        </button>
        <div className="absolute top-full left-0 bg-white shadow-2xl rounded-lg py-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out z-50 border border-mem-babyBlue/20 backdrop-blur-sm">
          <Link to="/drivers" className="block px-4 py-3 text-mem-darkNavy hover:bg-gradient-to-r hover:from-mem-babyBlue/10 hover:to-mem-blue/10 transition-all duration-200 transform hover:translate-x-2 rounded-md mx-2">
            Driver Login
          </Link>
          <Link to="/admin" className="block px-4 py-3 text-mem-darkNavy hover:bg-gradient-to-r hover:from-mem-babyBlue/10 hover:to-mem-blue/10 transition-all duration-200 transform hover:translate-x-2 rounded-md mx-2">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>;
};
export default Navigation;