
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How does the Memphis gravel calculator work?",
    answer: "Our Memphis gravel calculator allows you to draw your project area or enter dimensions, select your preferred material, and specify depth. It then calculates the volume in cubic yards and weight in tons needed for your Memphis project, along with an estimated cost."
  },
  {
    question: "What materials can I calculate for my Memphis project?",
    answer: "Our Memphis calculator supports various materials including crushed gravel, pea gravel, limestone, river rock, sand, regular asphalt, and crushed asphalt. Each material has specific density values to provide accurate calculations for your Memphis project."
  },
  {
    question: "Can Memphis Earth Movers deliver the calculated materials?",
    answer: "Yes! After calculating your materials, you can request a delivery quote. Our Memphis dump trucks can deliver all calculated materials directly to your project site throughout Memphis and DeSoto County."
  },
  {
    question: "How accurate is the Memphis gravel calculator?",
    answer: "Our Memphis gravel calculator provides a close estimate based on industry standard density values. For the most precise quote for your Memphis project, we recommend contacting us directly at (901) 461-1011 after using the calculator."
  },
  {
    question: "Do you deliver materials throughout all of Memphis?",
    answer: "Yes, our Memphis dump trucks deliver materials to all areas of Memphis including Germantown, Collierville, Bartlett, Cordova, Millington, and surrounding areas. We also serve DeSoto County including Southaven, Olive Branch, Horn Lake, and Hernando."
  },
  {
    question: "Can I use the calculator for commercial projects in Memphis?",
    answer: "Absolutely! Our Memphis calculator works for projects of all sizes. For large commercial projects, we recommend contacting us directly for volume pricing and to coordinate multiple dump truck deliveries if needed."
  }
];

const CalculatorFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-mem-darkNavy py-16" id="faq">
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white">Memphis Material Calculator FAQ</h2>
        
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
        
        <div className="mt-12 text-center">
          <Link to="/contact" className="mem-btn-primary">
            Contact Memphis Earth Movers
          </Link>
          <Link to="/dump-truck-services" className="mem-btn-secondary ml-4">
            View Memphis Dump Truck Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalculatorFaq;
