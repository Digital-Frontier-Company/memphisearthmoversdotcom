
import { Truck, Clock, Package, Construction, TreePalm } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  return <section className="mem-section bg-mem-darkNavy relative" itemScope itemType="https://schema.org/Service">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white" itemProp="name">Our Services at a Glance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mem-card border-t-4 border-mem-babyBlue group relative overflow-hidden" itemScope itemType="https://schema.org/Service">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Clock size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white" itemProp="name">
                  <Link to="/hourly-dump-truck-rental" className="hover:text-mem-babyBlue transition-colors">
                    Hourly Dump Truck Rental
                  </Link>
                </h3>
                <p itemProp="description">Our fleet of well-maintained dump trucks is available for hourly or project-based hauling, complete with skilled CDL drivers to ensure efficient operation and timely delivery.</p>
                <meta itemProp="areaServed" content="Memphis, DeSoto County" />
                <Link to="/hourly-dump-truck-rental" className="inline-block mt-2 text-mem-babyBlue hover:text-white transition-colors">
                  Starting at $125/hr →
                </Link>
              </div>
            </div>
            
            <div className="mt-4 h-44 overflow-hidden rounded-md">
              <Link to="/hourly-dump-truck-rental">
                <img 
                  alt="Memphis tri-axle dump truck ready for rental and hauling at a construction site" 
                  src="/lovable-uploads/5b59b1da-db52-4b8c-812b-e272aeac8493.png" 
                  className="w-full h-full transition-transform group-hover:scale-105 object-contain" 
                  itemProp="image"
                  width="264"
                  height="176"
                  sizes="(max-width: 768px) 100vw, 264px"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-babyBlue group relative overflow-hidden" itemScope itemType="https://schema.org/Service">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Package size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white" itemProp="name">
                  <Link to="/memphis-gravel-delivery" className="hover:text-mem-babyBlue transition-colors">
                    Construction Material Delivery
                  </Link>
                </h3>
                <p itemProp="description">We supply and deliver high-quality materials including dirt, sand, and gravel exactly when you need them, helping to keep your project running smoothly without delays.</p>
                <meta itemProp="areaServed" content="Memphis, DeSoto County" />
              </div>
            </div>
            
            <div className="mt-4 h-64 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="h-full">
                <Link to="/memphis-gravel-delivery">
                  <img 
                    src="/lovable-uploads/2b84ef25-7937-40d5-9463-edeace1c28a6.png" 
                    alt="Construction materials being loaded into Memphis Earth Movers dump truck for delivery" 
                    className="w-full h-full object-contain transition-transform group-hover:scale-105" 
                    itemProp="image"
                    width="305"
                    height="305"
                    sizes="(max-width: 768px) 100vw, 305px"
                    loading="lazy"
                  />
                </Link>
              </AspectRatio>
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-babyBlue group relative overflow-hidden" itemScope itemType="https://schema.org/Service">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Construction size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white" itemProp="name">
                  <Link to="/memphis-gravel-delivery" className="hover:text-mem-babyBlue transition-colors">
                    Asphalt Millings Sales
                  </Link>
                </h3>
                <p itemProp="description">Our cost-effective, eco-friendly asphalt millings are perfect for creating stable driveways and lots. We can deliver and spread on-site for a complete solution.</p>
                <meta itemProp="areaServed" content="Memphis, DeSoto County" />
              </div>
            </div>
            
            <div className="mt-4 h-64 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="h-full">
                <Link to="/memphis-gravel-delivery">
                  <img 
                    alt="Excavator loading asphalt millings into Memphis dump truck for driveway installation" 
                    className="w-full h-full object-cover object-top transition-transform group-hover:scale-105" 
                    src="/lovable-uploads/82428262-43e6-4392-ad27-bed7e991e644.jpg" 
                    itemProp="image"
                    width="542"
                    height="723"
                    sizes="(max-width: 768px) 100vw, 542px"
                    loading="lazy"
                  />
                </Link>
              </AspectRatio>
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-babyBlue group relative overflow-hidden" itemScope itemType="https://schema.org/Service">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <TreePalm size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white" itemProp="name">
                  <Link to="/dump-truck-services" className="hover:text-mem-babyBlue transition-colors">
                    Landscaping & DIY Projects
                  </Link>
                </h3>
                <p itemProp="description">No job is too small. We cater to homeowners and landscapers with the same level of professionalism, delivering materials for your residential projects on schedule.</p>
                <meta itemProp="areaServed" content="Memphis, DeSoto County" />
              </div>
            </div>
            
            <div className="mt-4 h-64 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="h-full">
                <Link to="/dump-truck-services">
                  <img 
                    alt="Landscaping project with topsoil delivery by Memphis Earth Movers dump truck for residential yard" 
                    className="w-full h-full object-contain transition-transform group-hover:scale-105" 
                    src="/lovable-uploads/b4d1af33-2f11-4fbc-9a5f-d4f124c661e4.jpg" 
                    itemProp="image"
                    width="271"
                    height="305"
                    sizes="(max-width: 768px) 100vw, 271px"
                    loading="lazy"
                  />
                </Link>
              </AspectRatio>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Link to="/dump-truck-services" className="mem-btn-primary mr-4">
            View All Services
          </Link>
          <Link to="/hourly-dump-truck-rental" className="mem-btn-secondary">
            Hourly Truck Rental
          </Link>
        </div>
      </div>
    </section>;
};

export default ServicesSection;
