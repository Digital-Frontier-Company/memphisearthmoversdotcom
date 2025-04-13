
import { Lock } from "lucide-react";
import QuoteForm from "./QuoteForm";

const HeroSection = () => {
  return (
    <section className="relative bg-mem-blue text-white py-16 md:py-24">
      <div 
        className="absolute inset-0 bg-black/40 bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/1dbfa978-2fa2-4d7f-a3eb-5c028c5614f6.png')",
          backgroundBlendMode: "overlay"
        }}
      ></div>
      <div className="mem-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Fast, Reliable Hauling for Your Construction Needs
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Serving Memphis with dump truck rentals, gravel delivery, and asphalt millings – on schedule and on budget.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
                <span className="text-white font-semibold">Licensed & Insured</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
                <span className="text-white font-semibold">20+ Years Experience</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
                <span className="text-white font-semibold">★★★★★ Rated</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-mem-blue mb-4">Get a FREE Quote</h3>
            <QuoteForm />
            <div className="flex items-center justify-center mt-4 text-sm text-mem-darkGray">
              <Lock size={14} className="mr-1" />
              <span>Your information is kept private.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
