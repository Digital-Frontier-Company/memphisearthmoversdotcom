
import { Truck, Package, Construction, TreePalm } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ServicesSection = () => {
  return <section className="mem-section bg-mem-darkNavy relative" itemScope itemType="https://schema.org/Service">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white" itemProp="name">Our Services at a Glance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mem-card border-t-4 border-mem-babyBlue group relative overflow-hidden" itemScope itemType="https://schema.org/Service">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Truck size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white" itemProp="name">Dump Truck Rental & Hauling</h3>
                <p itemProp="description">Our fleet of well-maintained dump trucks is available for hourly or project-based hauling, complete with skilled drivers to ensure efficient operation and timely delivery.</p>
                <meta itemProp="areaServed" content="Memphis, DeSoto County" />
              </div>
            </div>
            
            <div className="mt-4 h-44 overflow-hidden rounded-md">
              <img alt="Dump truck on construction site" src="/lovable-uploads/00805ab4-523b-4bc1-895d-2ab713bd4905.jpg" className="w-full h-full transition-transform group-hover:scale-105 object-contain" itemProp="image" />
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-babyBlue group relative overflow-hidden" itemScope itemType="https://schema.org/Service">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Package size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white" itemProp="name">Construction Material Delivery</h3>
                <p itemProp="description">We supply and deliver high-quality materials including dirt, sand, and gravel exactly when you need them, helping to keep your project running smoothly without delays.</p>
                <meta itemProp="areaServed" content="Memphis, DeSoto County" />
              </div>
            </div>
            
            <div className="mt-4 h-64 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="h-full">
                <img src="/lovable-uploads/2b84ef25-7937-40d5-9463-edeace1c28a6.png" alt="Construction materials being loaded into dump truck" className="w-full h-full object-contain transition-transform group-hover:scale-105" itemProp="image" />
              </AspectRatio>
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-babyBlue group relative overflow-hidden" itemScope itemType="https://schema.org/Service">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Construction size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white" itemProp="name">Asphalt Millings Sales</h3>
                <p itemProp="description">Our cost-effective, eco-friendly asphalt millings are perfect for creating stable driveways and lots. We can deliver and spread on-site for a complete solution.</p>
                <meta itemProp="areaServed" content="Memphis, DeSoto County" />
              </div>
            </div>
            
            <div className="mt-4 h-64 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="h-full">
                <img alt="Excavator loading asphalt millings into dump truck" className="w-full h-full object-cover object-top transition-transform group-hover:scale-105" src="/lovable-uploads/82428262-43e6-4392-ad27-bed7e991e644.jpg" itemProp="image" />
              </AspectRatio>
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-babyBlue group relative overflow-hidden" itemScope itemType="https://schema.org/Service">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <TreePalm size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white" itemProp="name">Landscaping & DIY Projects</h3>
                <p itemProp="description">No job is too small. We cater to homeowners and landscapers with the same level of professionalism, delivering materials for your residential projects on schedule.</p>
                <meta itemProp="areaServed" content="Memphis, DeSoto County" />
              </div>
            </div>
            
            <div className="mt-4 h-64 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="h-full">
                <img alt="Landscaping project with dirt delivery" className="w-full h-full object-contain transition-transform group-hover:scale-105" src="/lovable-uploads/b4d1af33-2f11-4fbc-9a5f-d4f124c661e4.jpg" itemProp="image" />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ServicesSection;
