
import { Link } from "react-router-dom";
import { Phone, Clock } from "lucide-react";

const HourlyRentalHero = () => {
  return (
    <section className="bg-gradient-to-b from-mem-darkNavy to-mem-blue py-16 lg:py-24 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="mem-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mem-babyBlue/20 text-mem-babyBlue mb-4">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Flexible Hourly Rates</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hourly Dump-Truck Rental in Memphis, TN—Fast, Flexible, Affordable
            </h1>
            
            <p className="text-xl mb-8 max-w-2xl">
              Need a <strong>licensed dump-truck crew on site within hours</strong>? Memphis Earth Movers delivers
              late-model trucks, pro drivers, and <em>by-the-hour pricing</em> that keeps your
              project on schedule and under budget in Shelby, Fayette, Tipton and DeSoto Counties.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a href="#quote" className="mem-btn-primary">
                Get My Instant Quote
              </a>
              <a href="tel:9014611011" className="inline-flex items-center text-white border border-white/40 hover:bg-white/10 transition-colors px-4 py-2 rounded-md">
                <Phone className="mr-2 h-5 w-5" />
                <span>(901) 461-1011</span>
              </a>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-2xl border border-mem-babyBlue/20">
            <img 
              src="/lovable-uploads/3d2e0caa-8367-4da4-85ed-a7c9599175fb.png" 
              alt="Memphis Earth Movers hourly dump truck rental service" 
              className="w-full object-cover h-auto lg:h-[450px]" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HourlyRentalHero;
