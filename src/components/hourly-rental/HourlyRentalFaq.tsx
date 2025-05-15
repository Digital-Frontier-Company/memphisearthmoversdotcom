
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import FaqSchema from "@/components/shared/FaqSchema";

const faqs = [
  {
    question: "How much material can your trucks haul per hour?",
    answer: "Our tri-axle fleet moves roughly 15 tons per trip; on short hauls (under 5 mi) that's up to 75 tons per truck per hour, weather and load-site queue permitting."
  },
  {
    question: "Do you supply operators or is it self-drive?",
    answer: "We always supply CDL-certified drivers—no insurance nightmare for you and full OSHA compliance for the site."
  },
  {
    question: "Can I book night or weekend hours?",
    answer: "Absolutely. A 20% after-hours premium applies for runs scheduled between 7 p.m. – 6 a.m. or on Sundays."
  },
  {
    question: "What if I need multiple trucks?",
    answer: "We can scale to six concurrent trucks; simply note the quantity in your quote request and we'll confirm availability within 30 minutes."
  },
  {
    question: "Do your rates include fuel?",
    answer: "Yes—our hourly rate is all-in. A fuel surcharge only applies if diesel exceeds the regional DOE baseline by 10¢/gal or more."
  }
];

const HourlyRentalFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="mem-section bg-mem-blue">
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white">Hourly Dump-Truck Rental—FAQ</h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full bg-mem-blue/20 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-mem-blue/30 transition-colors border border-mem-babyBlue/20"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-left text-white">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-mem-babyBlue flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown size={20} className="text-mem-babyBlue flex-shrink-0 ml-2" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="mt-2 p-4 bg-white/10 rounded-lg border border-mem-gray">
                  <p className="text-white/80">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <FaqSchema 
          faqs={faqs} 
          url="https://www.memphisearthmovers.com/hourly-dump-truck-rental"
        />
      </div>
    </section>
  );
};

export default HourlyRentalFaq;
