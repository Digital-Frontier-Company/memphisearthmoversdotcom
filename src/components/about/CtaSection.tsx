
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="mem-section bg-mem-blue text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay z-0">
        <img 
          src="/lovable-uploads/e04dfed9-65cf-4ef4-a7dd-061bf03a5964.png" 
          alt="Dump truck in action" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="mem-container text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Stop Dealing with Delays?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">You've got a job to run. Let us handle the hauling. Book your truck now and get back to what matters — making progress.</p>
        <p className="text-xl mb-8 font-bold">No forms. No waiting. Just trucks that show up and get it done.</p>
        <Link to="/#contact" className="bg-white text-mem-blue font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors inline-flex items-center">
          <Phone className="mr-2 h-5 w-5" />
          Contact Us Now
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
