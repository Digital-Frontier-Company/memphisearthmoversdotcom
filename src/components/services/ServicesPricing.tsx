
import { Truck, Construction, Package } from "lucide-react";

const ServicesPricing = () => {
  return (
    <section className="mem-section py-16 bg-gray-50">
      <div className="mem-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Pricing & Information</h2>
          <p className="text-mem-darkGray max-w-3xl mx-auto">
            We offer competitive rates based on your specific needs and project requirements. Contact us for a personalized quote.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-mem-babyBlue/20 p-4 rounded-lg mb-4 inline-block">
              <Truck className="h-8 w-8 text-mem-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Hourly Dump Truck Rental</h3>
            <div className="text-mem-blue font-bold text-2xl mb-4">From $125/hour</div>
            <p className="text-mem-darkGray mb-2">3-hour minimum requirement</p>
            <ul className="text-sm text-mem-darkGray mb-6 space-y-2">
              <li>✓ Experienced operator included</li>
              <li>✓ Fuel and equipment included</li>
              <li>✓ Local service area coverage</li>
            </ul>
            <a href="/contact" className="mem-button-primary w-full text-center">Request Quote</a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 relative">
            <div className="absolute -top-3 -right-3 bg-mem-blue text-white px-3 py-1 rounded-full text-sm font-bold">Most Popular</div>
            <div className="bg-mem-babyBlue/20 p-4 rounded-lg mb-4 inline-block">
              <Construction className="h-8 w-8 text-mem-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Asphalt Millings Delivery</h3>
            <div className="text-mem-blue font-bold text-2xl mb-4">Custom Pricing</div>
            <p className="text-mem-darkGray mb-2">Based on quantity & location</p>
            <ul className="text-sm text-mem-darkGray mb-6 space-y-2">
              <li>✓ Material + delivery included</li>
              <li>✓ Available spreading services</li>
              <li>✓ Free site assessment</li>
            </ul>
            <a href="/gravel-calculator" className="mem-button-primary w-full text-center">Calculate Needs</a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="bg-mem-babyBlue/20 p-4 rounded-lg mb-4 inline-block">
              <Package className="h-8 w-8 text-mem-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Material Delivery</h3>
            <div className="text-mem-blue font-bold text-2xl mb-4">Various Rates</div>
            <p className="text-mem-darkGray mb-2">Depends on material type</p>
            <ul className="text-sm text-mem-darkGray mb-6 space-y-2">
              <li>✓ Dirt, sand, gravel & more</li>
              <li>✓ Delivery to your location</li>
              <li>✓ Volume discounts available</li>
            </ul>
            <a href="/contact" className="mem-button-primary w-full text-center">Request Quote</a>
          </div>
        </div>
        
        <div className="mt-12 bg-mem-blue/10 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Service Area</h3>
          <p className="mb-4">We proudly serve Memphis, TN and DeSoto County, MS areas. Additional travel fees may apply for locations outside our primary service area.</p>
          <h3 className="text-xl font-bold mb-3">Scheduling Information</h3>
          <p>For best availability, we recommend booking your dump truck service at least 48 hours in advance. Same-day service may be available depending on our schedule.</p>
        </div>
      </div>
    </section>
  );
};

export default ServicesPricing;
