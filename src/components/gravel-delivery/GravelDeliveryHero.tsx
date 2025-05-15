
import { Link } from "react-scroll";

const GravelDeliveryHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#143ff6]/[0.38]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/202e6254-cec8-4b88-92cb-512591a16ed5.png" 
          alt="Memphis dump truck delivering gravel - 15-ton loads for $400 - Memphis Earth Movers gravel delivery service" 
          className="w-full h-full object-cover opacity-25" 
        />
      </div>
      
      {/* Glowing Baby Blue Light Effect */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-mem-babyBlue/30 blur-3xl"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-mem-babyBlue/20 blur-3xl"></div>
      
      <div className="mem-container relative z-10 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-center">
            <span className="block text-mem-babyBlue mb-2">Memphis Gravel Delivery</span>
            <span className="text-mem-babyBlue">15-Ton Loads for Just $400</span>
          </h1>
          
          <p className="text-xl mb-4 max-w-3xl mx-auto text-mem-babyBlue">
            Memphis Earth Movers drops <strong>15-ton truckloads of milled asphalt
            anywhere in the Mid-South for a flat $400*</strong>—then, if you need it leveled, our crew can spread
            it on-site for an additional fee after a quick walk-through.
          </p>
          
          <p className="mb-8 text-sm opacity-80 text-mem-babyBlue">
            *Price covers a 15-ton load of milled asphalt within 25 road-miles of downtown Memphis.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="quote" smooth={true} duration={500} className="mem-btn-primary">
              Lock In My Gravel Date
            </Link>
            <a href="tel:9014611011" className="mem-btn-secondary">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravelDeliveryHero;
