
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-12 md:py-20 relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/9007ab70-c0de-4958-91c6-701bb4ebfd72.png" 
          alt="Memphis Earth Movers - Professional dump truck services in Memphis"
          className="w-full h-full object-cover object-center" 
          width="1500"
          height="800"
        />
        <div className="absolute inset-0 bg-black/55"></div>
      </div>
      
      <div className="mem-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Dump Trucks in Memphis That Show Up. Load Up. And Don't Let You Down.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white">
            Reliable tri-axle dump truck rentals for contractors, builders, and business owners who are tired of the usual BS.
          </p>
          <Link to="/contact" className="mem-btn-primary">
            <Phone className="mr-2 inline h-5 w-5" />
            Book Your Truck Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
