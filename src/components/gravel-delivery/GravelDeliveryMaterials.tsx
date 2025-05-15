
import { Layers } from "lucide-react";

const GravelDeliveryMaterials = () => {
  return (
    <section id="materials" className="mem-section bg-gray-100 text-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-mem-darkNavy">
          Material Options We Deliver
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <Layers size={80} className="text-mem-blue" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-mem-blue">•</span>
                  <span>Milled asphalt <span className="text-mem-blue">(our bestseller)</span></span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-mem-blue">•</span>
                  <span>¾″ limestone (#57)</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-mem-blue">•</span>
                  <span>⅜″ pea gravel</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-mem-blue">•</span>
                  <span>Crusher run / base stone</span>
                </li>
              </ul>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-mem-blue">•</span>
                  <span>River rock 1–3″</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-mem-blue">•</span>
                  <span>Screened topsoil blends</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-mem-blue">•</span>
                  <span>Rip-rap (Class A–C)</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-mem-blue">•</span>
                  <span>Industrial sand</span>
                </li>
              </ul>
            </div>
            
            <p className="mt-6 text-sm text-center text-mem-darkGray">
              All aggregates sourced from pits conforming to OSHA SIC 1442 standards
              for screening and washing operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravelDeliveryMaterials;
