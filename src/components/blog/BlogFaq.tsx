
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How often should I check for updates on the Memphis Earth Movers blog?",
    answer: "We recommend checking our blog monthly for new articles about construction materials, dump truck services, and helpful guides for your projects in the Memphis area."
  },
  {
    question: "Can I request a topic to be covered on your blog?",
    answer: "Absolutely! We welcome topic suggestions from our customers. Simply reach out through our contact page with your ideas, and we'll consider them for future blog posts."
  },
  {
    question: "Do you provide advice on specific construction projects through your blog?",
    answer: "Our blog provides general guidance and information. For specific project advice, we recommend contacting us directly for a consultation tailored to your unique needs."
  }
];

const BlogFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white">Memphis Earth Movers Blog - FAQ</h2>
        
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

export default BlogFaq;
