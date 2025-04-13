
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="mem-section bg-gray-100">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          <Star className="h-10 w-10 inline-block mr-3 text-mem-blue" />
          What Our Clients Say
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <blockquote className="mem-card">
            <p className="text-lg italic mb-4">"Every other company we tried sent clunkers and clueless drivers. Memphis Earth Movers actually runs like a real business. Reliable. Professional. On time. Every time."</p>
            <footer className="font-bold">– Jeff S., Site Supervisor</footer>
          </blockquote>
          
          <blockquote className="mem-card">
            <p className="text-lg italic mb-4">"They helped us stay on schedule and under budget. Can't say that about most rental crews."</p>
            <footer className="font-bold">– Erica R., Construction Project Manager</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
