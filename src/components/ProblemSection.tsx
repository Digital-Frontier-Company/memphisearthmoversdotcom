
import { Clock, DollarSign, ThumbsDown } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="mem-section bg-mem-offWhite">
      <div className="mem-container">
        <h2 className="text-center mb-12">Still Dealing With Hauling Headaches?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mem-card text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-mem-blue/10 rounded-full">
                <Clock size={30} className="text-mem-blue" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Tired of Late Deliveries?</h3>
            <p>Idle crews & blown schedules cost money. Every minute of delay impacts your bottom line.</p>
          </div>
          
          <div className="mem-card text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-mem-blue/10 rounded-full">
                <DollarSign size={30} className="text-mem-blue" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Unexpected High Costs?</h3>
            <p>Hidden fees & budget surprises hurt profits. You deserve transparent, fair pricing.</p>
          </div>
          
          <div className="mem-card text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-mem-blue/10 rounded-full">
                <ThumbsDown size={30} className="text-mem-blue" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Unreliable Service?</h3>
            <p>No-shows & poor communication cause stress. Your reputation with clients is on the line.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center max-w-3xl mx-auto">
          <p className="text-lg">
            We get it – unreliable hauling services cause chaos on your project. Materials arrive late, projects get delayed, clients get frustrated... It shouldn't be this difficult.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
