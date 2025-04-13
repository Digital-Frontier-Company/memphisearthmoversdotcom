
import { Lock, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import QuoteForm from "./QuoteForm";

const HeroSection = () => {
  return <section className="relative bg-mem-blue text-white py-16 md:py-24" 
    itemScope itemType="https://schema.org/Service">
      <div className="absolute inset-0 bg-black/40 bg-cover bg-center opacity-30" style={{
      backgroundImage: "url('/lovable-uploads/692c96aa-9237-4058-a5a5-19f75bc169e7.png')",
      backgroundBlendMode: "overlay"
    }}></div>
      <div className="mem-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center mx-4 my-[60px]">
          <div className="md:col-span-3">
            <h1 className="text-4xl md:text-5xl font-extra-bold mb-4 text-center md:text-left font-extrabold 
              text-[#060606] 
              drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]
              [-webkit-text-stroke:2px_white]"
              itemProp="name"
            >
              #1 Dump Trucks in Memphis – Rugged, Reliable, Ready When You Are
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6" itemProp="description">
              Serving Memphis and DeSoto County with top-rated dump truck services, gravel delivery, and earth moving solutions – your local experts for construction hauling.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md 
                shadow-[0_0_10px_rgba(255,255,255,0.7)]
                border border-white/30">
                <span className="text-white font-semibold">Licensed & Insured</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md 
                shadow-[0_0_10px_rgba(255,255,255,0.7)]
                border border-white/30">
                <span className="text-white font-semibold">20+ Years Experience</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md 
                shadow-[0_0_10px_rgba(255,255,255,0.7)]
                border border-white/30">
                <span className="text-white font-semibold">★★★★★ Rated</span>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/gravel-calculator" className="bg-white text-mem-blue hover:bg-mem-offWhite transition-colors duration-300 py-3 px-6 rounded-md inline-flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                <span className="font-medium">Free Gravel Calculator</span>
              </Link>
            </div>
            <div className="mt-6 hidden md:block">
              <meta itemProp="areaServed" content="Memphis, DeSoto County, Shelby County, Germantown, Collierville" />
              <meta itemProp="serviceType" content="Dump Truck Services, Gravel Delivery, Earth Moving, Construction Hauling" />
            </div>
          </div>
          <div className="md:col-span-2 bg-white p-6 shadow-lg rounded-xl">
            <h3 className="text-2xl font-bold text-mem-blue mb-4">Get a FREE Quote</h3>
            <QuoteForm />
            <div className="flex items-center justify-center mt-4 text-sm text-mem-darkGray">
              <Lock size={14} className="mr-1" />
              <span>Your information is kept private.</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
