import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
const QuoteForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    contact: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    toast
  } = useToast();
  const validate = () => {
    const newErrors = {
      name: "",
      contact: ""
    };
    let isValid = true;
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!contact.trim()) {
      newErrors.contact = "Phone or email is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Quote request submitted!",
        description: "We'll get back to you within 1 business day."
      });
      setName("");
      setContact("");
      setMessage("");
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };
  return <>
      {isSuccess ? <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mem-babyBlue/20 mb-4">
            <svg className="w-8 h-8 text-mem-babyBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Quote Request Received!</h3>
          <p className="text-white/90">
            Thank you for contacting Memphis Earth Movers. We'll be in touch within 1 business day.
          </p>
        </div> : <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
              Name*
            </label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className={`mem-input ${errors.name ? "border-red-500" : ""}`} placeholder="Your name" disabled={isSubmitting} />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-white/90 mb-1">
              Phone/Email*
            </label>
            <input id="contact" type="text" value={contact} onChange={e => setContact(e.target.value)} className={`mem-input ${errors.contact ? "border-red-500" : ""}`} placeholder="Your phone or email" disabled={isSubmitting} />
            {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
              How can we help? (Optional)
            </label>
            <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} className="mem-input min-h-[80px]" placeholder="Tell us about your project" disabled={isSubmitting} />
          </div>
          
          <button type="submit" disabled={isSubmitting} className="w-full font-medium py-3 rounded-md transition-colors duration-300 flex items-center justify-center text-slate-50 bg-[#0b1ef5]">
            {isSubmitting ? <>
                <Loader className="animate-spin mr-2 h-4 w-4" />
                Submitting...
              </> : "Get My Free Quote"}
          </button>
        </form>}
    </>;
};
export default QuoteForm;