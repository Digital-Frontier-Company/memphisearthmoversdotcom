
import { Check } from "lucide-react";

const DifferenceSection = () => {
  return (
    <section className="mem-section bg-gray-100">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">What Makes Us Different</h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-bold mb-6 text-center">We're Memphis Earth Movers. And we don't miss.</p>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
              <p className="text-lg"><span className="font-bold">Early arrivals, always.</span> Time is money. We respect both.</p>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
              <p className="text-lg"><span className="font-bold">Top-tier tri-axle trucks.</span> Clean, inspected, and ready to haul.</p>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
              <p className="text-lg"><span className="font-bold">Professional drivers.</span> Courteous, experienced, and site-smart.</p>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
              <p className="text-lg"><span className="font-bold">No breakdowns. No bullshit.</span></p>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
              <p className="text-lg"><span className="font-bold">Straightforward pricing.</span> 3-hour minimum, clear costs, no surprises.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
