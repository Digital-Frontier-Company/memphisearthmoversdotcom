
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-mem-darkNavy py-6 border-t border-mem-babyBlue/30 glow-container" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="mem-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-mem-babyBlue text-lg font-bold" itemProp="name">Memphis Earth Movers</h3>
            </div>
            <p className="text-white/70 text-sm mb-4" itemProp="description">
              Professional dump truck services and material hauling in Memphis and DeSoto County.
            </p>
            <img 
              src="/lovable-uploads/5851e506-bd41-4c07-aa03-472ffceb9fc1.png" 
              alt="Memphis Earth Movers Logo" 
              className="h-16 md:h-20 w-auto"
              itemProp="logo"
            />
          </div>
          
          <div>
            <h3 className="text-mem-babyBlue text-lg font-bold mb-3">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/dump-truck-hauling" className="text-white/70 hover:text-white transition-colors">Dump Truck Hauling</Link></li>
              <li><Link to="/services/site-clearing" className="text-white/70 hover:text-white transition-colors">Site Clearing</Link></li>
              <li><Link to="/services/aggregate-delivery" className="text-white/70 hover:text-white transition-colors">Aggregate Delivery</Link></li>
              <li><Link to="/hourly-dump-truck-rental" className="text-white/70 hover:text-white transition-colors">Hourly Rentals</Link></li>
              <li><Link to="/memphis-gravel-delivery" className="text-white/70 hover:text-white transition-colors">Gravel Delivery</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-mem-babyBlue text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about-us" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/dump-truck-services" className="text-white/70 hover:text-white transition-colors">All Services</Link></li>
              <li><Link to="/gravel-calculator" className="text-white/70 hover:text-white transition-colors">Gravel Calculator</Link></li>
              <li><Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <h3 className="text-mem-babyBlue text-lg font-bold mb-3">Contact Info</h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>
                <span className="font-semibold">Phone:</span> 
                <span itemProp="telephone"> (901) 461-1011</span>
              </p>
              <div>
                <p className="font-semibold mb-1">Address:</p>
                <p itemProp="streetAddress">2455 Corporate Ave</p>
                <p>
                  <span itemProp="addressLocality">Memphis</span>, 
                  <span itemProp="addressRegion"> TN</span> 
                  <span itemProp="postalCode"> 38132</span>
                </p>
                <p itemProp="addressCountry">United States</p>
              </div>
              <p>
                <span className="font-semibold">Service Area:</span> Memphis, TN & DeSoto County, MS
              </p>
              <p>
                <span className="font-semibold">Hours:</span> Mon-Fri 7AM-5PM, Sat 8AM-12PM
              </p>
            </div>
            <meta itemProp="priceRange" content="$$$" />
            <meta itemProp="email" content="info@memphisearthmovers.com" />
          </div>
        </div>
        
        <div className="border-t border-mem-babyBlue/20 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Memphis Earth Movers | All Rights Reserved | 
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
