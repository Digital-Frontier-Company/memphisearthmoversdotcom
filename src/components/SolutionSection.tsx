import React from 'react';
import { CheckCircle, Truck, ThumbsUp, MapPin } from "lucide-react";
import { Link } from "react-scroll";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const SolutionSection = () => {
  return <section className="mem-section">
      <div className="mem-container">
        <h2 className="text-center mb-12">The MEM Solution: Hauling You Can Count On</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="grid grid-cols-1 gap-8">
            <div className="rounded-lg overflow-hidden shadow-md">
              <AspectRatio ratio={16 / 9}>
                <img alt="Excavator loading a dump truck with dirt" src="/lovable-uploads/84d27088-1fa3-4738-8bef-587ce32ecb13.jpg" className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <AspectRatio ratio={16 / 9}>
                <img src="/lovable-uploads/cd9550e2-89af-4418-8ee9-79d50c4b551c.png" alt="Asphalt paving operation with dump trucks" className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <AspectRatio ratio={16 / 9}>
                <img src="https://images.squarespace-cdn.com/content/v1/673b6d977cd83470920f6a98/714e3097-3cbc-4041-adba-50543707e261/IMG_0748.JPG?format=2500w" alt="Memphis Earth Movers dump trucks" className="w-full h-full object-contain" />
              </AspectRatio>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle size={28} className="text-mem-blue mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">On-Time, Every Time</h3>
                <p>We value your timeline and understand that punctuality is critical in construction. Our team is committed to delivering when promised.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Truck size={28} className="text-mem-blue mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">One-Stop Shop</h3>
                <p>From gravel and sand to dirt and asphalt millings - we provide all the materials you need with one simple call.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <ThumbsUp size={28} className="text-mem-blue mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Professional Crew</h3>
                <p>Our courteous, experienced drivers ensure safe and efficient hauling on every job.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <MapPin size={28} className="text-mem-blue mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
                <p>With deep knowledge of Memphis and surrounding areas, we navigate efficiently to meet your project's location needs.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="quoteForm" smooth={true} duration={500} className="mem-btn-primary">
            Request Your Quote Now
          </Link>
        </div>
      </div>
    </section>;
};
export default SolutionSection;