
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Memphis Earth Movers saved our project when we needed 20 loads on short notice. Their team delivered everything on time and we finished the job on schedule thanks to them!",
    name: "John Davis",
    company: "Davis Construction"
  },
  {
    quote: "As a landscaper, I rely on Memphis Earth Movers for consistent material delivery. Always on time and the quality is top-notch. Highly recommend their services!",
    name: "Sarah Johnson",
    company: "Green Space Landscaping"
  },
  {
    quote: "We've used Memphis Earth Movers for multiple projects around the city. Reliable trucks, friendly team, and fair pricing. They've been our go-to hauler for years.",
    name: "Michael Thompson",
    company: "Thompson General Contractors"
  }
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  return (
    <section className="mem-section">
      <div className="mem-container">
        <h2 className="text-center mb-12">Trusted by Contractors & Homeowners Alike</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="mem-card">
            <div className="flex justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            
            <blockquote className="text-xl text-center italic mb-6">
              "{testimonials[current].quote}"
            </blockquote>
            
            <div className="text-center">
              <p className="font-semibold">{testimonials[current].name}</p>
              <p className="text-mem-darkGray">{testimonials[current].company}</p>
            </div>
          </div>
          
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-mem-offWhite transition-colors border border-mem-gray"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-mem-darkGray" />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-mem-offWhite transition-colors border border-mem-gray"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-mem-darkGray" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full mx-1 ${
                i === current ? "bg-mem-blue" : "bg-mem-gray"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="font-semibold">★★★★★ 4.9/5.0 based on 50+ client reviews</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
