
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const QuoteForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Quote request submitted!",
        description: "We'll get back to you within 1 business day.",
      });
      setName("");
      setContact("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-mem-darkGray mb-1">
          Name*
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mem-input"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-mem-darkGray mb-1">
          Phone/Email*
        </label>
        <input
          id="contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="mem-input"
          placeholder="Your phone or email"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-mem-darkGray mb-1">
          How can we help? (Optional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mem-input min-h-[80px]"
          placeholder="Tell us about your project"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-mem-blue hover:bg-mem-darkBlue text-white font-medium py-3 rounded-md transition-colors duration-300"
      >
        {isSubmitting ? "Submitting..." : "Get My Free Quote"}
      </button>
    </form>
  );
};

export default QuoteForm;
