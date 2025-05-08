
import { Truck, Construction, Package, MapPin, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPricing = () => {
  return (
    <section className="mem-section py-16 bg-gray-50" id="pricing">
      <div className="mem-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mem-darkNavy">Memphis Dump Truck Pricing</h2>
          <p className="text-mem-darkGray max-w-3xl mx-auto">
            We offer competitive rates for our Memphis dump truck services based on your specific needs and project requirements. Contact us for a personalized quote for your Memphis construction or landscaping project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-mem-babyBlue/20 p-4 rounded-lg mb-4 inline-block">
              <Truck className="h-8 w-8 text-mem-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-mem-darkNavy">Memphis Hourly Dump Truck Rental</h3>
            <div className="text-mem-blue font-bold text-2xl mb-4">$125/hour</div>
            <p className="text-mem-darkGray mb-2">3-hour minimum requirement</p>
            <ul className="text-sm text-mem-darkGray mb-6 space-y-2">
              <li>✓ Memphis experienced operator included</li>
              <li>✓ Fuel and equipment included</li>
              <li>✓ Memphis area coverage</li>
            </ul>
            <Link to="/contact" className="mem-btn-primary w-full text-center">Request Memphis Quote</Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 relative">
            <div className="absolute -top-3 -right-3 bg-mem-blue text-white px-3 py-1 rounded-full text-sm font-bold">Most Popular</div>
            <div className="bg-mem-babyBlue/20 p-4 rounded-lg mb-4 inline-block">
              <Construction className="h-8 w-8 text-mem-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-mem-darkNavy">Memphis Asphalt Millings Delivery</h3>
            <div className="text-mem-blue font-bold text-2xl mb-4">$400</div>
            <p className="text-mem-darkGray mb-2">Within 15 miles of Memphis</p>
            <ul className="text-sm text-mem-darkGray mb-6 space-y-2">
              <li>✓ Material + delivery included</li>
              <li>✓ Available spreading services in Memphis</li>
              <li>✓ Free Memphis site assessment</li>
            </ul>
            <Link to="/gravel-calculator" className="mem-btn-primary w-full text-center">Calculate Memphis Project</Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-mem-babyBlue/20 p-4 rounded-lg mb-4 inline-block">
              <Package className="h-8 w-8 text-mem-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-mem-darkNavy">Memphis Material Delivery</h3>
            <div className="text-mem-blue font-bold text-2xl mb-4">Custom Pricing</div>
            <p className="text-mem-darkGray mb-2">Based on material & Memphis location</p>
            <ul className="text-sm text-mem-darkGray mb-6 space-y-2">
              <li>✓ Memphis dirt, sand, gravel & more</li>
              <li>✓ Delivery to your Memphis location</li>
              <li>✓ Volume discounts available</li>
            </ul>
            <Link to="/contact" className="mem-btn-primary w-full text-center">Request Memphis Quote</Link>
          </div>
        </div>
        
        <div className="mt-12 bg-mem-blue/10 p-6 rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-mem-blue mr-2" />
                <h3 className="text-xl font-bold text-mem-darkNavy">Memphis Service Area</h3>
              </div>
              <p className="mb-4 text-mem-darkGray">We proudly serve Memphis, TN and DeSoto County, MS areas with our fleet of dump trucks. Additional travel fees may apply for locations outside our primary Memphis service area.</p>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-mem-blue mr-2" />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Memphis Scheduling Information</h3>
              </div>
              <p className="text-mem-darkGray">For best availability of our Memphis dump trucks, we recommend booking at least 48 hours in advance. Same-day service may be available depending on our schedule.</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-mem-blue/10">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-mem-blue mr-2" />
              <h3 className="text-xl font-bold text-mem-darkNavy">Why Choose Our Memphis Dump Trucks?</h3>
            </div>
            <p className="mb-4 text-mem-darkGray">Memphis Earth Movers is the trusted choice for Memphis dump truck services. Our team of experienced operators, well-maintained equipment, and commitment to reliability make us the top choice for businesses and homeowners throughout Memphis and DeSoto County.</p>
            <div className="flex justify-center mt-6">
              <Link to="/about-us" className="mem-btn-secondary">Learn About Our Memphis Team</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPricing;
