import { Check } from "lucide-react";
const DifferenceSection = () => {
  return <section className="mem-section bg-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">What Makes Us Different</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xl md:text-2xl font-bold mb-6">We're Memphis Earth Movers. And we don't miss.</p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-mem-babyBlue mr-2 mt-1 flex-shrink-0" />
                <p className="text-lg"><span className="font-bold">Early arrivals, always.</span> Time is money. We respect both.</p>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-mem-babyBlue mr-2 mt-1 flex-shrink-0" />
                <p className="text-lg"><span className="font-bold">Top-tier tri-axle trucks.</span> Clean, inspected, and ready to haul.</p>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-mem-babyBlue mr-2 mt-1 flex-shrink-0" />
                <p className="text-lg"><span className="font-bold">Professional drivers.</span> Courteous, experienced, and site-smart.</p>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-mem-babyBlue mr-2 mt-1 flex-shrink-0" />
                <p className="text-lg"><span className="font-bold">No breakdowns. No bullshit.</span></p>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-mem-babyBlue mr-2 mt-1 flex-shrink-0" />
                <p className="text-lg"><span className="font-bold">Straightforward pricing.</span> 3-hour minimum, clear costs, no surprises.</p>
              </li>
            </ul>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img alt="Aerial view of dump trucks at work site" className="w-full h-auto" src="/lovable-uploads/6cad0f32-b0d8-4dbd-893b-03a3ac019cfe.png" />
          </div>
        </div>
      </div>
    </section>;
};
export default DifferenceSection;