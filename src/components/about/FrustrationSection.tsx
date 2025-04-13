
import { Clock, Wrench, Truck, Star } from "lucide-react";

const FrustrationSection = () => {
  return (
    <section className="mem-section bg-white">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Why You're Frustrated with Most Rentals</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="mem-card">
            <Clock className="h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Late Arrivals</h3>
            <p>The truck shows up an hour late (if at all), wasting your valuable time and delaying your project.</p>
          </div>
          
          <div className="mem-card">
            <Wrench className="h-10 w-10 text-red-500 mb-4" />
            <p className="text-xl font-bold mb-3">Poor Quality Equipment</p>
            <p>It's held together by duct tape and a prayer, leaving you worried about breakdowns and safety.</p>
          </div>
          
          <div className="mem-card">
            <Truck className="h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Inexperienced Drivers</h3>
            <p>The driver's got no clue where to go, holds up your crew, and kills your productivity.</p>
          </div>
          
          <div className="mem-card">
            <Star className="h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Unexpected Costs</h3>
            <p>And then it breaks down halfway through the job, leaving you holding the bag. But hey, you still get that full invoice, right?</p>
          </div>
        </div>
        
        <div className="mt-12 rounded-lg overflow-hidden shadow-lg">
          <img 
            src="/lovable-uploads/6b9fae30-0565-426c-b400-51dedb816ca0.png"
            alt="Dump truck in action" 
            className="w-full h-auto" 
          />
        </div>
      </div>
    </section>
  );
};

export default FrustrationSection;
