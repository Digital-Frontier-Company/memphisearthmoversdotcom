
import { Truck } from "lucide-react";

const ServicesSection = () => {
  return (
    <section className="mem-section bg-white">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          <Truck className="h-10 w-10 inline-block mr-3 text-mem-blue" />
          Services We Offer
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/e04dfed9-65cf-4ef4-a7dd-061bf03a5964.png" 
              alt="Dump truck delivering materials" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="space-y-8">
            <div className="mem-card">
              <h3 className="text-xl font-bold mb-3">Hourly Dump Truck Rentals</h3>
              <p className="mb-4">(3-Hour Minimum)</p>
              <p>Perfect for heavy-duty hauls, demolition support, and site material runs.</p>
            </div>
            
            <div className="mem-card">
              <h3 className="text-xl font-bold mb-3">Gravel Hauling & Delivery</h3>
              <p>Asphalt millings or gravel delivered directly to your home, jobsite, or business. Gravel included in the price.</p>
            </div>
            
            <div className="mem-card">
              <h3 className="text-xl font-bold mb-3">Heavy Hauling</h3>
              <p>Any other Heavy Hauling Needs for the Greater Memphis Area.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
