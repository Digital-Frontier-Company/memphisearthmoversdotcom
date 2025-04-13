
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We serve all of Greater Memphis including Shelby, Fayette, and surrounding counties. Our service radius extends approximately 50 miles from downtown Memphis."
  },
  {
    question: "How quickly can you deliver?",
    answer: "We typically schedule deliveries within 24-48 hours of confirmation. Depending on availability and your location, same-day service may be possible for urgent needs."
  },
  {
    question: "What are your rates?",
    answer: "Our rates vary based on material type, quantity, delivery location, and other factors. We provide free, detailed quotes with transparent pricing and no hidden fees. Contact us for a customized quote."
  },
  {
    question: "Do you handle small residential projects?",
    answer: "Absolutely! No job is too small. We work with homeowners on residential projects like driveway resurfacing, landscaping, and small construction jobs with the same dedication as our larger commercial clients."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes, Memphis Earth Movers is fully licensed and insured. We carry comprehensive insurance coverage including liability and workers' compensation to protect all parties involved in the hauling process."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mem-section bg-mem-offWhite">
      <div className="mem-container">
        <h2 className="text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full mem-card flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-left">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-mem-blue flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown size={20} className="text-mem-blue flex-shrink-0 ml-2" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="mt-2 p-4 bg-white rounded-lg border border-mem-gray">
                  <p>{faq.answer}</p>
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
