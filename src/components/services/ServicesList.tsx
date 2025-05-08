
import { Truck, Construction, Package, TreePalm } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

const ServicesList = () => {
  return <section id="services" className="mem-section py-16 bg-white">
      <div className="mem-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mem-darkNavy">Memphis Dump Truck Services</h2>
          <p className="text-mem-darkGray max-w-3xl mx-auto">
            We provide a comprehensive range of dump truck rentals and material hauling services throughout Memphis, TN and DeSoto County, MS. Our Memphis-based dump trucks are available for contractors, landscapers, or homeowners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mem-service-card group" itemScope itemType="https://schema.org/Service">
            <meta itemProp="serviceType" content="Dump Truck Rental Memphis" />
            <meta itemProp="areaServed" content="Memphis, TN" />
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Truck size={24} />
                </div>
                <h3 className="text-xl font-bold text-mem-darkNavy" itemProp="name">Hourly Dump Truck Rental in Memphis</h3>
              </div>
              <p className="text-mem-darkGray mb-3" itemProp="description">
                Rent our Memphis-based dump trucks with experienced operators on an hourly basis (3-hour minimum). Perfect for construction sites, demolition projects, and flexible hauling needs throughout the Greater Memphis area.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Experienced Memphis operators included
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Well-maintained dump trucks
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  $125/hour (3-hour minimum)
                </li>
              </ul>
              <div className="mt-auto">
                <AspectRatio ratio={16 / 10} className="rounded-md overflow-hidden">
                  <img 
                    alt="Memphis Earth Movers dump truck being loaded with excavator" 
                    className="object-cover w-full h-full" 
                    src="/lovable-uploads/1826ba6e-c06a-4e61-a5e9-d3b51044eda9.jpg" 
                    itemProp="image"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          <div className="mem-service-card group" itemScope itemType="https://schema.org/Service">
            <meta itemProp="serviceType" content="Asphalt Millings and Gravel Delivery Memphis" />
            <meta itemProp="areaServed" content="Memphis, TN and DeSoto County, MS" />
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Construction size={24} />
                </div>
                <h3 className="text-xl font-bold text-mem-darkNavy" itemProp="name">Asphalt Millings & Gravel Memphis</h3>
              </div>
              <p className="text-mem-darkGray mb-3" itemProp="description">
                We supply and deliver high-quality asphalt millings and gravel for driveways, parking lots, and construction bases in Memphis and DeSoto County. Perfect for creating stable, cost-effective surfaces for Memphis properties.
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
                  Professional spreading available in Memphis areas
                </li>
              </ul>
              <div className="mt-auto">
                <AspectRatio ratio={16 / 10} className="rounded-md overflow-hidden">
                  <img 
                    alt="Asphalt millings pile for Memphis driveways" 
                    className="object-cover w-full h-full" 
                    src="/lovable-uploads/75669d2c-878b-455e-8ca3-1b08055767d9.jpg" 
                    itemProp="image"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          <div className="mem-service-card group" itemScope itemType="https://schema.org/Service">
            <meta itemProp="serviceType" content="Material Delivery Memphis" />
            <meta itemProp="areaServed" content="Memphis, TN" />
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <Package size={24} />
                </div>
                <h3 className="text-xl font-bold text-mem-darkNavy" itemProp="name">Memphis Material Delivery</h3>
              </div>
              <p className="text-mem-darkGray mb-3" itemProp="description">
                Our Memphis dump trucks deliver a variety of construction materials including dirt, sand, gravel, and limestone directly to your Memphis job site or home, saving you time and ensuring quality.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Custom pricing based on material
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Quality materials sourced locally in Memphis
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Memphis residential & commercial deliveries
                </li>
              </ul>
              <div className="mt-auto">
                <AspectRatio ratio={16 / 10} className="rounded-md overflow-hidden">
                  <img 
                    src="/lovable-uploads/11a0b045-104b-4209-a7eb-a517c9ee8d09.png" 
                    alt="Memphis dump truck delivering construction materials" 
                    className="object-cover w-full h-full" 
                    itemProp="image"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          <div className="mem-service-card group" itemScope itemType="https://schema.org/Service">
            <meta itemProp="serviceType" content="Driveway and Parking Lot Solutions Memphis" />
            <meta itemProp="areaServed" content="Memphis, TN and DeSoto County, MS" />
            <div className="p-6 border-t-4 border-mem-babyBlue rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-mem-blue text-white rounded-full mr-3">
                  <TreePalm size={24} />
                </div>
                <h3 className="text-xl font-bold text-mem-darkNavy" itemProp="name">Memphis Driveway & Lot Solutions</h3>
              </div>
              <p className="text-mem-darkGray mb-3" itemProp="description">
                Perfect for Memphis homeowners and businesses needing durable, cost-effective driveway and parking lot solutions. Our Memphis dump trucks deliver and install asphalt millings for long-lasting results across the Memphis area.
              </p>
              <ul className="text-mem-darkGray mb-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Complete driveway installations in Memphis
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Memphis pothole repairs and lot resurfacing
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2 text-mem-blue">✓</span>
                  Professional grading services with our dump trucks
                </li>
              </ul>
              <div className="mt-auto">
                <AspectRatio ratio={16 / 10} className="rounded-md overflow-hidden">
                  <img 
                    src="/lovable-uploads/8d3ba62a-6f5b-44ff-81e6-4199a6a18d46.png" 
                    alt="Completed Memphis asphalt millings driveway" 
                    className="object-cover w-full h-full" 
                    itemProp="image"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-6 text-mem-darkGray max-w-3xl mx-auto">
            Looking for affordable dump truck rental in Memphis? Need materials delivered to your Memphis job site? 
            Memphis Earth Movers has you covered with the most reliable dump trucks in Memphis and DeSoto County.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="mem-btn-primary">
              Request a Quote
            </Link>
            <Link to="/gravel-calculator" className="mem-btn-secondary">
              Calculate Material Needs
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default ServicesList;
