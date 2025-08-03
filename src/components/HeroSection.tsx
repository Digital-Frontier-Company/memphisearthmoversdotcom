import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import QuoteForm from "./QuoteForm";
import TypewriterEffect from "./TypewriterEffect";
import ThreeDBackground from "./ThreeDBackground";
const HeroSection = () => {
  return <section id="quoteForm" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* 3D Animated Background */}
      <ThreeDBackground />
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/lovable-uploads/46c411d3-46df-46ce-b41b-c4e93a979a22.png" alt="Memphis Earth Movers fleet of dump trucks serving Memphis and DeSoto County" className="w-full h-full object-cover opacity-30 mix-blend-overlay" width="1920" height="1080" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-br from-mem-blue/20 via-mem-babyBlue/30 to-mem-darkNavy/40"></div>
        <div className="absolute inset-0 bg-black/25"></div>
      </div>
      
      <div className="mem-container relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 mb-6 py-0 px-0">
              <h1 className="mb-6 py-0 text-2xl my-0 px-0 mx-0 text-center font-semibold">
                <span className="block text-mem-babyBlue mb-2 font-extrabold mx-0 text-center py-[17px] text-6xl">Memphis Earth Movers</span>
                <span className="bg-gradient-to-r from-black to-mem-babyBlue bg-clip-text text-transparent font-bold text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(96,165,250,0.8)] filter">
                  <TypewriterEffect texts={["Dump Trucks When You Need Them", "Reliable Hauling Services", "Memphis Construction Support", "On-Time Delivery Guaranteed"]} speed={80} deleteSpeed={40} pauseTime={3000} />
                </span>
              </h1>
            </div>
            
            {/* Added clear service summary for LLMs per SEO report recommendation */}
            <p className="text-xl mb-4 max-w-xl">
              Local, reliable hauling services for construction projects.
              We show up when promised with the equipment you need.
            </p>
            
            <p className="mb-6 max-w-xl">
              Memphis Earth Movers provides dump truck rental and material hauling services throughout Memphis and DeSoto County. Our fleet of 5 tri-axle dump trucks is available for hourly rental starting at $125/hr with a 3-hour minimum.
            </p>
            
            <div className="flex flex-wrap gap-4 px-[7px] mx-0 my-[6px] rounded">
              <Link to="servicesSection" smooth={true} duration={500} offset={-100} className="mem-btn-primary hover:shadow-[0_0_20px_rgba(96,165,250,0.6)] transition-all duration-300">
                Our Services
              </Link>
              <RouterLink to="/hourly-dump-truck-rental" className="mem-btn-secondary hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all duration-300">
                Hourly Rental
              </RouterLink>
              <RouterLink to="/memphis-gravel-delivery" className="mem-btn-secondary hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all duration-300">
                Gravel Delivery
              </RouterLink>
              <a href="tel:9014611011" className="mem-btn-secondary hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all duration-300">
                Call Now
              </a>
            </div>
          </div>
          
          <div className="mem-card">
            <h2 className="text-2xl font-bold mb-4">Get a Free Quote</h2>
            <div className="text-center mb-4">
              <RouterLink to="/contact" className="mem-btn-primary hover:shadow-[0_0_20px_rgba(96,165,250,0.6)] transition-all duration-300 inline-block">
                Request Quote Now
              </RouterLink>
            </div>
            <div className="text-white/70 text-sm mb-4">or fill out the form below:</div>
            <QuoteForm />
          </div>
        </div>
        
        {/* Video Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">See Our Fleet in Action</h2>
            <p className="text-white/90 text-lg">Watch how Memphis Earth Movers delivers reliable dump truck services</p>
          </div>
          
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border border-mem-babyBlue/30">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/MR7iQp242f0" title="Memphis Earth Movers - Dump Truck Services" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-full"></iframe>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;