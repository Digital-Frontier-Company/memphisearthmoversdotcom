
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

const CallToAction = () => {
  const handleScrollToQuoteForm = () => {
    // If we're not on the homepage, navigate there first
    if (window.location.pathname !== '/') {
      window.location.href = '/#quoteForm';
      return;
    }
    
    // If we're already on the homepage, just scroll to the quote form
    const quoteFormElement = document.getElementById('quoteForm');
    if (quoteFormElement) {
      scroll.scrollTo(quoteFormElement.offsetTop, {
        duration: 800,
        smooth: true,
      });
    }
  };
  
  return (
    <section className="mem-section bg-mem-blue text-white">
      <div className="mem-container text-center">
        <h2 className="text-white mb-4">Ready to Move Your Project Forward?</h2>
        
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Get a fast, free quote from Memphis Earth Movers today. Experience hassle-free hauling so you can focus on getting the job done.
        </p>
        
        <button
          onClick={handleScrollToQuoteForm}
          className="bg-white text-mem-blue font-bold py-3 px-8 rounded-md hover:bg-mem-offWhite transition-colors duration-300 inline-block text-lg mb-8"
        >
          Get My Free Quote Now
        </button>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          <a href="tel:9014611011" className="flex items-center gap-2 text-white hover:text-mem-offWhite transition-colors">
            <Phone size={20} />
            <span className="font-semibold">Call: (901)461-1011</span>
          </a>
          
          <a href="mailto:David@memphisearthmovers.com" className="flex items-center gap-2 text-white hover:text-mem-offWhite transition-colors">
            <Mail size={20} />
            <span className="font-semibold">Email: David@memphisearthmovers.com</span>
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
