
import { MapPin } from "lucide-react";

const GravelDeliveryServiceArea = () => {
  return (
    <section id="service-area" className="mem-section bg-mem-darkNavy text-white">
      <div className="mem-container">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="p-6 rounded-full bg-mem-blue/20 inline-flex">
                <MapPin size={120} className="text-mem-babyBlue" />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Memphis-Metro Coverage
              </h2>
              
              <p className="text-xl mb-6">
                From <strong>Bartlett to Germantown, Collierville to Southaven</strong>, our Collierville dispatch
                pushes 24/6 coverage across Shelby, Fayette, Tipton &amp; DeSoto Counties.
              </p>
              
              <p>
                Need farther out? We'll quote mileage above 25 road-miles at booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravelDeliveryServiceArea;
