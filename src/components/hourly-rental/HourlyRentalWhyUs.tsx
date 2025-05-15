
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const HourlyRentalWhyUs = () => {
  return (
    <section id="why-us" className="mem-section bg-mem-darkNavy">
      <div className="mem-container">
        <div className="max-w-4xl mx-auto mem-card p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Why Contractors Choose Memphis Earth Movers
          </h2>
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          
          <p className="text-xl text-center mb-8 text-white/90">
            <strong>Local, lean and laser-focused on earthmoving.</strong> With authorized power
            units and a flawless <a href="https://safer.fmcsa.dot.gov" className="text-mem-babyBlue hover:underline">FMCSA safety record</a>,
            we combine big-fleet reliability with neighbor-level service.
            Our average on-time arrival rate last quarter: <strong>97.4%</strong>.
          </p>
          
          <div className="flex justify-center">
            <Link to="/about-us" className="mem-btn-primary bg-mem-babyBlue hover:bg-mem-babyBlue/80">
              Meet the Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HourlyRentalWhyUs;
