
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Who is Memphis Earth Movers?",
    answer: "Memphis Earth Movers is a local, family-owned dump truck rental and material hauling company serving Memphis, TN and DeSoto County, MS. We specialize in providing reliable dump trucks, material delivery, and hauling services for contractors, businesses, and homeowners."
  },
  {
    question: "How long has Memphis Earth Movers been in business?",
    answer: "Memphis Earth Movers has been serving the Memphis area for over 10 years. Our experienced team has deep roots in the local construction industry and understands the unique needs of Memphis projects."
  },
  {
    question: "What makes Memphis Earth Movers different from other hauling companies?",
    answer: "Unlike other hauling companies in Memphis, we prioritize reliability and communication. We show up when promised, provide transparent pricing without hidden fees, and maintain a fleet of well-maintained dump trucks operated by experienced, professional drivers."
  },
  {
    question: "Does Memphis Earth Movers work with both commercial and residential clients?",
    answer: "Yes, we proudly serve both commercial contractors and residential homeowners throughout Memphis with the same level of professionalism and dedication. No project is too large or too small for our Memphis dump truck services."
  },
  {
    question: "What types of projects does Memphis Earth Movers typically work on?",
    answer: "We work on a wide variety of projects throughout Memphis including construction site material hauling, landscape material delivery, driveway and parking lot installations, demolition debris removal, storm cleanup, and much more. Our versatile Memphis dump trucks can handle virtually any hauling need."
  },
  {
    question: "Are Memphis Earth Movers drivers professionally trained?",
    answer: "Absolutely. All of our Memphis dump truck operators are licensed, experienced professionals with extensive training in safe hauling practices and equipment operation. Your project will always be in good hands with our Memphis team."
  }
];

const AboutFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-mem-darkNavy py-16" id="faq">
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white">About Memphis Earth Movers - FAQ</h2>
        
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

export default AboutFaq;
