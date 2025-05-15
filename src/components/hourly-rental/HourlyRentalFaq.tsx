
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import FaqSchema from "@/components/shared/FaqSchema";

const faqs = [
  {
    question: "How much material can your trucks haul per hour?",
    answer: "Our tri-axle fleet moves roughly 15 tons per trip; on short hauls under five miles, that equals up to 75 tons per truck per hour, depending on site conditions."
  },
  {
    question: "Do you supply operators or is it self-drive?",
    answer: "We provide CDL-certified drivers with every rental to keep your project fully insured and OSHA-compliant."
  },
  {
    question: "Can I book night or weekend hours?",
    answer: "Yes. A 20 percent after-hours premium applies for work scheduled 7 p.m.–6 a.m. or on Sundays."
  },
  {
    question: "What if I need multiple trucks?",
    answer: "We can dispatch up to six trucks simultaneously. Request the quantity in your quote form, and availability will be confirmed within 30 minutes."
  },
  {
    question: "Do your rates include fuel?",
    answer: "Fuel is included in our base hourly rate. A surcharge is added only if diesel exceeds the regional DOE baseline by ten cents per gallon or more."
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
