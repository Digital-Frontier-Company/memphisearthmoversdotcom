
import { CheckCircle } from "lucide-react";

const HourlyRentalProcess = () => {
  return (
    <section id="process" className="mem-section bg-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          How Our Hourly Rental Works
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative pl-12 md:pl-16">
            <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-mem-blue text-white font-bold text-lg">1</span>
            <div className="mem-card p-6">
              <h3 className="text-xl font-bold mb-2">Call or click</h3>
              <p className="text-white/80">Lock in your window with as little as 4-hour notice.</p>
            </div>
          </div>
          
          <div className="relative pl-12 md:pl-16">
            <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-mem-blue text-white font-bold text-lg">2</span>
            <div className="mem-card p-6">
              <h3 className="text-xl font-bold mb-2">We dispatch the right truck class</h3>
              <p className="text-white/80">
                (Tri-axle, quad, or pup trailer) based on load weight and site conditions. Average articulated dump-truck rental in Memphis starts at ≈ $1,748/day, but our hourly option lets you pay <em>just</em> for truck time on-site.
              </p>
            </div>
          </div>
          
          <div className="relative pl-12 md:pl-16">
            <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-mem-blue text-white font-bold text-lg">3</span>
            <div className="mem-card p-6">
              <h3 className="text-xl font-bold mb-2">On-site safety brief</h3>
              <p className="text-white/80">
                Our crew follows OSHA back-over and load-secure protocols.
              </p>
            </div>
          </div>
          
          <div className="relative pl-12 md:pl-16">
            <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-mem-blue text-white font-bold text-lg">4</span>
            <div className="mem-card p-6">
              <h3 className="text-xl font-bold mb-2">Digital load tickets</h3>
              <p className="text-white/80">
                Emailed in real time for crystal-clear reporting (TDOT requires ticket retention on public projects).
              </p>
            </div>
          </div>
          
          <div className="relative pl-12 md:pl-16">
            <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-mem-blue text-white font-bold text-lg">5</span>
            <div className="mem-card p-6">
              <h3 className="text-xl font-bold mb-2">Pay after wheels stop</h3>
              <p className="text-white/80">
                Minimum 2-hour billing, then in 15-minute increments. Typical Mid-South rates run $85–$130/hr plus fuel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HourlyRentalProcess;
