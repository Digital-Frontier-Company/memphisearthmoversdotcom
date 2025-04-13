
import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mem-container py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-mem-blue">Memphis Earth Movers</h1>
        </div>
        <a 
          href="tel:9015551234" 
          className="flex items-center gap-2 text-mem-darkGray hover:text-mem-blue transition-colors"
        >
          <Phone size={20} />
          <span className="font-semibold hidden sm:inline">Call Now: 901-555-1234</span>
          <span className="font-semibold sm:hidden">Call Now</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
