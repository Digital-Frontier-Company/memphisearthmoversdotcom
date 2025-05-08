
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What areas of Memphis do you serve?",
    answer: "We serve all of Greater Memphis including Shelby, Fayette, and surrounding counties. Our service radius extends approximately 50 miles from downtown Memphis."
  },
  {
    question: "How quickly can you deliver materials in Memphis?",
    answer: "We typically schedule Memphis deliveries within 24-48 hours of confirmation. Depending on availability and your Memphis location, same-day service may be possible for urgent needs."
  },
  {
    question: "What are your Memphis dump truck rental rates?",
    answer: "Our Memphis dump truck rental rates start at $125/hour with a 3-hour minimum. Custom rates are available for longer projects and material deliveries in Memphis and DeSoto County."
  },
  {
    question: "Do you handle small residential projects in Memphis?",
    answer: "Absolutely! No job in Memphis is too small. We work with Memphis homeowners on residential projects like driveway resurfacing, landscaping, and small construction jobs with the same dedication as our larger commercial clients."
  },
  {
    question: "Are you licensed and insured in Memphis?",
    answer: "Yes, Memphis Earth Movers is fully licensed and insured in Memphis. We carry comprehensive insurance coverage including liability and workers' compensation to protect all parties involved in the hauling process throughout Memphis and DeSoto County."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mem-section bg-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white">Memphis Dump Truck Services - Frequently Asked Questions</h2>
        
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
      </div>
    </section>
  );
};

export default FaqSection;
