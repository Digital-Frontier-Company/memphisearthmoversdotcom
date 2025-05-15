
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const GravelDeliveryFaq = () => {
  return (
    <section id="faqs" className="mem-section bg-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Gravel Delivery &amp; Spreading—FAQ
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full bg-white rounded-lg overflow-hidden">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-mem-darkNavy font-semibold">
                How many square feet will 15 tons of milled asphalt cover?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50 text-mem-darkGray">
                <p>
                  At a 3-inch compacted depth, one 15-ton load covers about 1,350 sq ft
                  (roughly a 15 ft × 90 ft driveway).
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-mem-darkNavy font-semibold">
                Can I order limestone or river rock instead?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50 text-mem-darkGray">
                <p>
                  Yes—choose any material from Memphis-area pits; we'll haul at our
                  standard $115/hr rate plus pit ticket.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-mem-darkNavy font-semibold">
                What does the spreading service include?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50 text-mem-darkGray">
                <p>
                  A skid-steer with 6-ft box blade plus operator; we laser-grade to
                  ±½ inch and compact with the truck tires.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-mem-darkNavy font-semibold">
                Is there a fuel surcharge?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50 text-mem-darkGray">
                <p>
                  Fuel is baked into the $400 special. Surcharges only apply on
                  custom hauls if diesel exceeds the DOE baseline by ≥10¢/gal.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-mem-darkNavy font-semibold">
                How do I prep my site for delivery?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50 text-mem-darkGray">
                <p>
                  Clear overhead obstructions to 20 ft and grade a dump path at least
                  12 ft wide. We'll advise on the pre-haul call.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="mt-12 text-center" id="quote">
          <h2 className="text-3xl font-bold mb-4">Ready for Fresh Gravel?</h2>
          <p className="mb-6">Hit the button or dial <a href="tel:9014611011" className="text-mem-babyBlue hover:underline">(901) 461-1011</a>. We'll confirm in one business hour.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="mem-btn-primary">
              Claim My $400 Load
            </Link>
            <a href="tel:9014611011" className="mem-btn-secondary">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravelDeliveryFaq;
