
import { Truck, Construction, Package, TreePalm } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ServicesList = () => {
  return (
    <section id="services" className="mem-section py-16 bg-white">
      <div className="mem-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mem-darkNavy">Our Dump Truck Services</h2>
          <p className="text-mem-darkGray max-w-3xl mx-auto">
            We provide a comprehensive range of dump truck and material hauling services to meet your project needs, whether you're a contractor, landscaper, or homeowner.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mem-service-card group">
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Truck size={24} />
                </div>
                <h3 className="text-xl font-bold text-mem-darkNavy">Hourly Dump Truck Rental</h3>
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
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  $125/hour (3-hour minimum)
                </li>
              </ul>
              <div className="mt-auto">
                <AspectRatio ratio={16 / 10} className="rounded-md overflow-hidden">
                  <img 
                    src="/lovable-uploads/3d2e0caa-8367-4da4-85ed-a7c9599175fb.png"
                    alt="Dump truck being loaded with excavator"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          <div className="mem-service-card group">
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Construction size={24} />
                </div>
                <h3 className="text-xl font-bold text-mem-darkNavy">Asphalt Millings & Gravel</h3>
              </div>
              <p className="text-mem-darkGray mb-3">
                We supply and deliver high-quality asphalt millings and gravel for driveways, parking lots, and construction bases. Perfect for creating stable, cost-effective surfaces.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  $400 delivery within 15 miles of Memphis
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Environmentally friendly options
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Professional spreading available
                </li>
              </ul>
              <div className="mt-auto">
                <AspectRatio ratio={16 / 10} className="rounded-md overflow-hidden">
                  <img 
                    src="/lovable-uploads/5c31bd27-ead3-4cd3-880d-b43b999cebd1.png"
                    alt="Asphalt millings pile with excavator"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          <div className="mem-service-card group">
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Package size={24} />
                </div>
                <h3 className="text-xl font-bold text-mem-darkNavy">Material Delivery</h3>
              </div>
              <p className="text-mem-darkGray mb-3">
                We deliver a variety of construction materials including dirt, sand, gravel, and limestone directly to your job site or home, saving you time and ensuring quality.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Custom pricing based on material
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Quality materials sourced locally
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Residential & commercial deliveries
                </li>
              </ul>
              <div className="mt-auto">
                <AspectRatio ratio={16 / 10} className="rounded-md overflow-hidden">
                  <img 
                    src="/lovable-uploads/11a0b045-104b-4209-a7eb-a517c9ee8d09.png"
                    alt="Dump truck delivering materials"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          <div className="mem-service-card group">
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <TreePalm size={24} />
                </div>
                <h3 className="text-xl font-bold text-mem-darkNavy">Driveway & Lot Solutions</h3>
              </div>
              <p className="text-mem-darkGray mb-3">
                Perfect for homeowners and businesses needing durable, cost-effective driveway and parking lot solutions. We deliver and install asphalt millings for long-lasting results.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Complete driveway installations
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Pothole repairs and lot resurfacing
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Professional grading services
                </li>
              </ul>
              <div className="mt-auto">
                <AspectRatio ratio={16 / 10} className="rounded-md overflow-hidden">
                  <img 
                    src="/lovable-uploads/8d3ba62a-6f5b-44ff-81e6-4199a6a18d46.png"
                    alt="Completed asphalt millings driveway"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
