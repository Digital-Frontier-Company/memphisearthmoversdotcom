
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-mem-darkNavy py-6 border-t border-mem-babyBlue/30 glow-container">
      <div className="mem-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-mem-babyBlue text-lg font-bold mb-3">Memphis Earth Movers</h3>
            <p className="text-white/70 text-sm">
              Professional dump truck services and material hauling in Memphis and DeSoto County.
            </p>
          </div>
          
          <div>
            <h3 className="text-mem-babyBlue text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about-us" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/dump-truck-services" className="text-white/70 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/gravel-calculator" className="text-white/70 hover:text-white transition-colors">Gravel Calculator</Link></li>
              <li><Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-mem-babyBlue text-lg font-bold mb-3">Contact Info</h3>
            <p className="text-white/70 text-sm mb-1">Phone: (901) 461-1011</p>
            <p className="text-white/70 text-sm">Serving Memphis, TN and DeSoto County, MS</p>
          </div>
        </div>
        
        <div className="border-t border-mem-babyBlue/20 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Memphis Earth Movers | 
              <Link to="/blog" className="text-mem-babyBlue ml-1 hover:underline">
                Blog
              </Link>
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-xs">Website by</span>
              <a 
                href="https://digitalfrontier.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Website created by Digital Frontier"
              >
                <img 
                  src="/lovable-uploads/cae5df3f-f8b9-4e67-b2cc-7fffa955342d.png" 
                  alt="Digital Frontier" 
                  className="h-6 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
