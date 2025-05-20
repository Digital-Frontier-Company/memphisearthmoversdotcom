
import React from 'react';
import { CheckCircle, Truck, ThumbsUp, MapPin } from "lucide-react";
import { Link } from "react-scroll";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const SolutionSection = () => {
  return <section className="mem-section bg-mem-darkNavy relative" itemScope itemType="https://schema.org/Service">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="mem-container">
        <h2 className="text-center mb-12 text-white" itemProp="name">The MEM Solution: Hauling You Can Count On</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="grid grid-cols-1 gap-8">
            <div className="rounded-lg overflow-hidden shadow-[0_0_15px_rgba(77,210,255,0.3)] border border-mem-babyBlue/20">
              <AspectRatio ratio={16 / 9}>
                <img 
                  alt="Memphis Earth Movers tri-axle dump truck on highway providing reliable hauling services" 
                  src="/lovable-uploads/5f5ed940-bb93-40f8-8281-aea0d6b01ee5.png" 
                  className="w-full h-full object-cover"
                  width="1200"
                  height="800"
                  itemProp="image" 
                />
              </AspectRatio>
            </div>
            <div className="rounded-lg overflow-hidden shadow-[0_0_15px_rgba(77,210,255,0.3)] border border-mem-babyBlue/20">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src="/lovable-uploads/424d3eda-d37f-40d8-b639-aa7b135c6608.png" 
                  alt="Memphis Earth Movers logo with tri-state stars and dump trucks on construction site background" 
                  className="w-full h-full object-cover"
                  width="1200"
                  height="800"
                />
              </AspectRatio>
            </div>
            <div className="rounded-lg overflow-hidden shadow-[0_0_15px_rgba(77,210,255,0.3)] border border-mem-babyBlue/20">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src="/lovable-uploads/41664ffa-417f-40a0-b614-a41a9a9bb667.png" 
                  alt="Memphis Earth Movers model dump truck with white cab and green dumping bed for precision material delivery" 
                  className="w-full h-full object-contain"
                  width="1200"
                  height="800"
                />
              </AspectRatio>
            </div>
          </div>
          
          <div className="space-y-6 bg-mem-darkNavy/80 p-6 rounded-lg shadow-[0_0_15px_rgba(77,210,255,0.5)] border border-mem-babyBlue/30 backdrop-blur-sm" itemProp="description">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle size={28} className="text-mem-babyBlue mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">On-Time, Every Time</h3>
                <p>We value your timeline and understand that punctuality is critical in construction. Our team is committed to delivering when promised.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Truck size={28} className="text-mem-babyBlue mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">One-Stop Shop</h3>
                <p>From gravel and sand to dirt and asphalt millings - we provide all the materials you need with one simple call.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <ThumbsUp size={28} className="text-mem-babyBlue mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Professional Crew</h3>
                <p>Our courteous, experienced drivers ensure safe and efficient hauling on every job.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <MapPin size={28} className="text-mem-babyBlue mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
                <p>With deep knowledge of Memphis and surrounding areas, we navigate efficiently to meet your project's location needs.</p>
              </div>
            </div>
            
            <meta itemProp="serviceType" content="Dump Trucks, Earth Moving, Gravel Delivery, Construction Hauling" />
            <meta itemProp="areaServed" content="Memphis, DeSoto County, Shelby County" />
            <meta itemProp="provider" content="Memphis Earth Movers" />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="quoteForm" smooth={true} duration={500} className="mem-btn-primary shadow-[0_0_10px_rgba(77,210,255,0.4)]">
            Request Your Quote Now
          </Link>
        </div>
      </div>
    </section>;
};

export default SolutionSection;
