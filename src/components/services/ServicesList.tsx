
import { Truck, Construction, Package, TreePalm } from "lucide-react";

const ServicesList = () => {
  return (
    <section id="services" className="mem-section py-16 bg-white">
      <div className="mem-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Dump Truck Services</h2>
          <p className="text-mem-darkGray max-w-3xl mx-auto">
            We provide a comprehensive range of dump truck and material hauling services to meet your project needs, whether you're a contractor, landscaper, or homeowner.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="mem-service-card group">
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Truck size={24} />
                </div>
                <h3 className="text-xl font-bold">Hourly Dump Truck Rental</h3>
              </div>
              <p className="text-mem-darkGray mb-3">
                Rent our dump trucks with experienced operators on an hourly basis (3-hour minimum). Perfect for construction sites, demolition projects, and flexible hauling needs.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Experienced operators included
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Well-maintained equipment
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Flexible scheduling options
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mem-service-card group">
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Construction size={24} />
                </div>
                <h3 className="text-xl font-bold">Asphalt Millings & Gravel</h3>
              </div>
              <p className="text-mem-darkGray mb-3">
                We supply and deliver high-quality asphalt millings and gravel for driveways, parking lots, and construction bases. Perfect for creating stable, cost-effective surfaces.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Driveway materials
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Environmentally friendly options
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Accurate estimates with our calculator
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mem-service-card group">
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Package size={24} />
                </div>
                <h3 className="text-xl font-bold">Material Delivery</h3>
              </div>
              <p className="text-mem-darkGray mb-3">
                We deliver a variety of construction materials including dirt, sand, gravel, and limestone directly to your job site or home, saving you time and ensuring quality.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Prompt delivery schedules
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Quality materials sourced locally
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Residential & commercial deliveries
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mem-service-card group">
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <TreePalm size={24} />
                </div>
                <h3 className="text-xl font-bold">Landscaping & DIY Support</h3>
              </div>
              <p className="text-mem-darkGray mb-3">
                Perfect for homeowners and landscaping projects. We deliver smaller quantities of materials for garden beds, yard projects, and DIY landscape renovations.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Homeowner-friendly service
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Weekend delivery available
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Precise material quantity estimates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
