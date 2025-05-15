
import { Check } from "lucide-react";

const HourlyRentalBenefits = () => {
  return (
    <section id="benefits" className="mem-section bg-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Why Hourly Dump-Truck Rental Beats Buying or Long-Term Leases
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="mem-card p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-mem-babyBlue/20 p-2 mt-1 flex-shrink-0">
                <Check className="h-5 w-5 text-mem-babyBlue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Pay only for active hauling time</h3>
                <p className="text-white/80">
                  No idle equipment costs eating your margin (average ownership costs run $70–$120/hr).
                </p>
              </div>
            </div>
          </div>
          
          <div className="mem-card p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-mem-babyBlue/20 p-2 mt-1 flex-shrink-0">
                <Check className="h-5 w-5 text-mem-babyBlue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Scale up for project peaks</h3>
                <p className="text-white/80">
                  Without tying up capital—equipment rental revenue across the U.S. is projected to grow 5%+ through 2025 as contractors favor flexible fleets.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mem-card p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-mem-babyBlue/20 p-2 mt-1 flex-shrink-0">
                <Check className="h-5 w-5 text-mem-babyBlue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Skip the permit headaches</h3>
                <p className="text-white/80">
                  Our CDL-certified drivers manage TDOT oversize/overweight requirements on your behalf.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mem-card p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-mem-babyBlue/20 p-2 mt-1 flex-shrink-0">
                <Check className="h-5 w-5 text-mem-babyBlue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Meet surge demand in Memphis' $14B construction pipeline</h3>
                <p className="text-white/80">
                  Without the cost of new trucks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HourlyRentalBenefits;
