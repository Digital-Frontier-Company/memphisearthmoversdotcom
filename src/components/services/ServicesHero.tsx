
import { Truck } from "lucide-react";

const ServicesHero = () => {
  return (
    <section className="mem-hero-section bg-mem-darkNavy py-16 lg:py-24 relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="mem-container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mem-blue/20 text-mem-babyBlue mb-4">
              <Truck className="h-5 w-5" />
              <span className="font-medium">Professional Hauling Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Dump Truck Services & Material Hauling</h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
              From hourly dump truck rentals to material delivery, we provide reliable hauling solutions for contractors, businesses, and homeowners in Memphis and DeSoto County.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a href="#services" className="mem-button-primary">
                View Our Services
              </a>
              <a href="/contact" className="mem-button-secondary">
                Request a Quote
              </a>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/00805ab4-523b-4bc1-895d-2ab713bd4905.jpg" 
              alt="Memphis Earth Movers dump truck at work site" 
              className="w-full object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
