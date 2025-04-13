
import { Truck } from "lucide-react";

const ServicesSection = () => {
  return (
    <section className="mem-section bg-white">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          <Truck className="h-10 w-10 inline-block mr-3 text-mem-blue" />
          Services We Offer
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
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
    </section>
  );
};

export default ServicesSection;
