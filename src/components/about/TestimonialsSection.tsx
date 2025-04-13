
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="mem-section bg-gray-100 relative">
      <div className="absolute inset-0 opacity-10 z-0">
        <img 
          src="/lovable-uploads/17a03914-331b-4e10-82ea-af2d4e3d4ff3.png" 
          alt="Dump trucks on a job site" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="mem-container relative z-10">
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
