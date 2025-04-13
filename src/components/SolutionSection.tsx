
import { CheckCircle, Truck, ThumbsUp, MapPin } from "lucide-react";
import { Link } from "react-scroll";

const SolutionSection = () => {
  return (
    <section className="mem-section">
      <div className="mem-container">
        <h2 className="text-center mb-12">The MEM Solution: Hauling You Can Count On</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <CheckCircle size={28} className="text-mem-blue mt-1" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">On-Time, Every Time</h3>
              <p>We value your timeline and understand that punctuality is critical in construction. Our team is committed to delivering when promised, so your project stays on schedule.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Truck size={28} className="text-mem-blue mt-1" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">One-Stop Shop</h3>
              <p>From gravel and sand to dirt and asphalt millings - we provide all the materials you need with one simple call. Simplify your supply chain and save valuable time.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <ThumbsUp size={28} className="text-mem-blue mt-1" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Professional Crew</h3>
              <p>Our courteous, experienced drivers ensure safe and efficient hauling. We treat your job site with respect and follow all safety protocols for trouble-free delivery.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <MapPin size={28} className="text-mem-blue mt-1" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Local & Accountable</h3>
              <p>As a Memphis business, our reputation matters. We know the area, understand local requirements, and are fully committed to your satisfaction on every job.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="quoteForm"
            smooth={true}
            duration={500}
            className="mem-btn-primary"
          >
            Request Your Quote Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
