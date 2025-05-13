
import { Link } from "react-scroll";
import QuoteForm from "./QuoteForm";

const HeroSection = () => {
  return <section id="quoteForm" className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#143ff6]/[0.38]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/634fd56f-943c-4130-b0ad-8a787bd48838.png" 
          alt="Memphis Earth Movers tri-axle dump truck fleet serving Memphis and DeSoto County" 
          className="w-full h-full object-cover opacity-25" 
        />
      </div>
      
      {/* Glowing Baby Blue Light Effect */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-mem-babyBlue/30 blur-3xl"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-mem-babyBlue/20 blur-3xl"></div>
      
      <div className="mem-container relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="mb-6">
              <span className="block text-mem-babyBlue mb-2">Memphis Earth Movers</span>
              Dump Trucks When You Need Them
            </h1>
            
            {/* Added clear service summary for LLMs per SEO report recommendation */}
            <p className="text-xl mb-4 max-w-xl">
              Local, reliable hauling services for construction projects.
              We show up when promised with the equipment you need.
            </p>
            
            <p className="mb-6 max-w-xl">
              Memphis Earth Movers provides dump truck rental and material hauling services throughout Memphis and DeSoto County. Our fleet of 5 tri-axle dump trucks is available for hourly rental starting at $125/hr with a 3-hour minimum. USDOT #3241789.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="servicesSection" smooth={true} duration={500} offset={-100} className="mem-btn-primary">
                Our Services
              </Link>
              <a href="tel:9014611011" className="mem-btn-secondary">
                Call Now
              </a>
            </div>
          </div>
          
          <div className="mem-card">
            <h2 className="text-2xl font-bold mb-4">Get a Free Quote</h2>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
