
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How can I request a quote for dump truck services in Memphis?",
    answer: "You can request a quote for Memphis dump truck services by filling out our online form, calling us at (901) 461-1011, or sending an email. We'll get back to you within 1 business day with pricing for your specific project needs."
  },
  {
    question: "What information do I need to provide for a Memphis dump truck quote?",
    answer: "To provide an accurate quote for Memphis dump truck services, please include your project location, timeline, material type and quantity needed, and any specific requirements. The more details you provide, the more precise our estimate will be."
  },
  {
    question: "How far in advance should I book a Memphis dump truck?",
    answer: "We recommend booking your Memphis dump truck at least 48 hours in advance to ensure availability. For larger projects or multiple trucks, please contact us a week ahead if possible. Same-day service may be available for urgent needs depending on our schedule."
  },
  {
    question: "Do you provide emergency dump truck services in Memphis?",
    answer: "Yes, we understand that urgent situations arise and offer emergency dump truck services throughout Memphis when available. Please call us directly at (901) 461-1011 for immediate assistance with urgent hauling needs."
  }
];

const ContactFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-mem-darkNavy py-16" id="faq">
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white">Memphis Contact & Support FAQ</h2>
        
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

export default ContactFaq;
