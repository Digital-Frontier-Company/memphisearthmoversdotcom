
import { Mail, Phone } from "lucide-react";
import { Link } from "react-scroll";

const CallToAction = () => {
  return (
    <section className="mem-section bg-mem-blue text-white">
      <div className="mem-container text-center">
        <h2 className="text-white mb-4">Ready to Move Your Project Forward?</h2>
        
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Get a fast, free quote from Memphis Earth Movers today. Experience hassle-free hauling so you can focus on getting the job done.
        </p>
        
        <Link
          to="quoteForm"
          smooth={true}
          duration={500}
          className="bg-white text-mem-blue font-bold py-3 px-8 rounded-md hover:bg-mem-offWhite transition-colors duration-300 inline-block text-lg mb-8"
        >
          Get My Free Quote Now
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          <a href="tel:9015551234" className="flex items-center gap-2 text-white hover:text-mem-offWhite transition-colors">
            <Phone size={20} />
            <span className="font-semibold">Call: 901-555-1234</span>
          </a>
          
          <a href="mailto:info@memphisearthmovers.com" className="flex items-center gap-2 text-white hover:text-mem-offWhite transition-colors">
            <Mail size={20} />
            <span className="font-semibold">Email: info@memphisearthmovers.com</span>
          </a>
        </div>
        
        <p className="text-white/90">Hours: Monday-Friday 7am-5pm</p>
        
        <p className="text-white/80 text-sm mt-4">
          No obligation. We respond to all inquiries within 1 business day.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
