
import { Truck, Package, Construction, TreePalm } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ServicesSection = () => {
  return (
    <section className="mem-section bg-mem-offWhite">
      <div className="mem-container">
        <h2 className="text-center mb-12 text-mem-blue">Our Services at a Glance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mem-card border-t-4 border-mem-blue group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Truck size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-mem-blue">Dump Truck Rental & Hauling</h3>
                <p>Our fleet of well-maintained dump trucks is available for hourly or project-based hauling, complete with skilled drivers to ensure efficient operation and timely delivery.</p>
              </div>
            </div>
            
            <div className="mt-4 h-44 overflow-hidden rounded-md">
              <img 
                src="https://images.unsplash.com/photo-1581094790087-b41e26a67095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Dump truck on construction site" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-blue group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Package size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-mem-blue">Construction Material Delivery</h3>
                <p>We supply and deliver high-quality materials including dirt, sand, and gravel exactly when you need them, helping to keep your project running smoothly without delays.</p>
              </div>
            </div>
            
            <div className="mt-4 h-44 overflow-hidden rounded-md">
              <img 
                src="https://images.unsplash.com/photo-1518384401463-d3876163c195?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Construction materials" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-blue group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <Construction size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-mem-blue">Asphalt Millings Sales</h3>
                <p>Our cost-effective, eco-friendly asphalt millings are perfect for creating stable driveways and lots. We can deliver and spread on-site for a complete solution.</p>
              </div>
            </div>
            
            <div className="mt-4 h-64 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="h-full">
                <img 
                  src="/lovable-uploads/3fef74f1-6fb1-492d-8b4d-11b40b1abd21.png" 
                  alt="Asphalt milling machine" 
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                />
              </AspectRatio>
            </div>
          </div>
          
          <div className="mem-card border-t-4 border-mem-blue group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-3 bg-mem-blue text-white rounded-full">
                  <TreePalm size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-mem-blue">Landscaping & DIY Projects</h3>
                <p>No job is too small. We cater to homeowners and landscapers with the same level of professionalism, delivering materials for your residential projects on schedule.</p>
              </div>
            </div>
            
            <div className="mt-4 h-64 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="h-full">
                <img 
                  src="/lovable-uploads/7713a843-e930-4591-a487-959cb1eac6fe.png" 
                  alt="Landscaping project with dirt delivery" 
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

