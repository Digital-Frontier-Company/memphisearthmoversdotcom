
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How much does it cost to rent a dump truck in Memphis?",
    answer: "Memphis Earth Movers offers dump truck rentals starting at $125 per hour with a 3-hour minimum. This includes an experienced operator, fuel, and equipment. Custom pricing is available for longer projects and material deliveries."
  },
  {
    question: "What areas of Memphis do you provide dump truck services to?",
    answer: "We serve all of Memphis, TN and DeSoto County, MS with our dump truck services, including Germantown, Collierville, Bartlett, Cordova, Millington, Southaven, Olive Branch, Horn Lake, and surrounding areas."
  },
  {
    question: "What materials can your Memphis dump trucks deliver?",
    answer: "Our Memphis dump truck fleet can deliver various materials including crushed gravel, pea gravel, limestone, river rock, sand, asphalt, crushed asphalt (millings), fill dirt, topsoil, and more to your Memphis location."
  },
  {
    question: "How quickly can I get a Memphis dump truck for my project?",
    answer: "For best availability of our Memphis dump trucks, we recommend booking at least 48 hours in advance. Same-day service may be available depending on our schedule. Contact us for your specific Memphis project needs."
  },
  {
    question: "Do you provide Memphis asphalt millings delivery?",
    answer: "Yes, asphalt millings delivery is one of our most popular services in Memphis. We offer millings at $400 delivered within 15 miles of Memphis, which is an excellent cost-effective option for driveways and parking areas."
  },
  {
    question: "Can I hire a Memphis dump truck for smaller residential projects?",
    answer: "Absolutely! We work with Memphis homeowners on residential projects like driveway resurfacing, landscaping, and backyard renovations. No Memphis project is too small for our dump truck services."
  }
];

const ServicesFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-mem-darkNavy py-16" id="faq">
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

export default ServicesFaq;
