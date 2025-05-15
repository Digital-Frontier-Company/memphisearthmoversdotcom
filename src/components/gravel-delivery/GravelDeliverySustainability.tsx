
import { Leaf, DollarSign } from "lucide-react";

const GravelDeliverySustainability = () => {
  return (
    <section id="sustainability" className="mem-section bg-mem-blue text-white">
      <div className="mem-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Sustainability &amp; Cost Savings
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <div className="flex flex-col items-center text-center p-6 bg-mem-darkNavy/30 rounded-lg">
              <DollarSign size={48} className="mb-4 text-mem-babyBlue" />
              <h3 className="text-xl font-semibold mb-2">Cost Effective</h3>
              <p>Save an average of <strong>$1,200 per 15-ton load</strong> compared to fresh hot-mix</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-mem-darkNavy/30 rounded-lg">
              <Leaf size={48} className="mb-4 text-mem-babyBlue" />
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p>Lower greenhouse-gas output by up to 20% with recycled materials</p>
            </div>
          </div>
          
          <p className="text-xl text-center mb-4">
            Using recycled asphalt saves contractors an average of <strong>$1,200 per 15-ton load</strong>
            compared with fresh hot-mix, while lowering greenhouse-gas output by up to
            20%.
          </p>
          
          <p className="text-center">
            That's money and carbon you keep out of the landfill.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GravelDeliverySustainability;
