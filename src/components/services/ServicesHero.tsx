
import { Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
              From $125/hour dump truck rentals to material delivery, we provide reliable hauling solutions for contractors, businesses, and homeowners in Memphis and DeSoto County.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a href="#services" className="mem-btn-primary">
                View Our Services
              </a>
              <Link to="/contact" className="mem-btn-secondary">
                Request a Quote
              </Link>
              <a href="tel:9014611011" className="inline-flex items-center text-white border border-white/40 hover:bg-white/10 transition-colors px-4 py-2 rounded-md">
                <Phone className="mr-2 h-5 w-5" />
                <span>(901) 461-1011</span>
              </a>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-2xl border border-mem-babyBlue/20">
            <img 
              src="/lovable-uploads/3d2e0caa-8367-4da4-85ed-a7c9599175fb.png" 
              alt="Memphis Earth Movers dump truck being loaded with materials" 
              className="w-full object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
