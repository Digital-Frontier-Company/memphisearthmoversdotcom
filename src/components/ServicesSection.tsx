
import { Truck, Package, Construction, PalmTree } from "lucide-react";

const ServicesSection = () => {
  return (
    <section className="mem-section bg-mem-offWhite">
      <div className="mem-container">
        <h2 className="text-center mb-12">Our Services at a Glance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mem-card">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Truck size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Dump Truck Rental & Hauling</h3>
                <p>Our fleet of well-maintained dump trucks is available for hourly or project-based hauling, complete with skilled drivers to ensure efficient operation and timely delivery.</p>
              </div>
            </div>
          </div>
          
          <div className="mem-card">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Package size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Construction Material Delivery</h3>
                <p>We supply and deliver high-quality materials including dirt, sand, and gravel exactly when you need them, helping to keep your project running smoothly without delays.</p>
              </div>
            </div>
          </div>
          
          <div className="mem-card">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Construction size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Asphalt Millings Sales</h3>
                <p>Our cost-effective, eco-friendly asphalt millings are perfect for creating stable driveways and lots. We can deliver and spread on-site for a complete solution.</p>
              </div>
            </div>
          </div>
          
          <div className="mem-card">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <PalmTree size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Landscaping & DIY Projects</h3>
                <p>No job is too small. We cater to homeowners and landscapers with the same level of professionalism, delivering materials for your residential projects on schedule.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
