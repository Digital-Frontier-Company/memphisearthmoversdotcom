
import { Link } from "react-router-dom";

const GravelDeliveryRelatedServices = () => {
  return (
    <section className="mem-section bg-gray-100">
      <div className="mem-container">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center text-mem-darkNavy">
            Related Services
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <Link 
              to="/hourly-dump-truck-rental" 
              className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <span className="text-mem-blue font-medium">Hourly Dump-Truck Rental</span>
            </Link>
            
            <Link
              to="/dump-truck-services"
              className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <span className="text-mem-blue font-medium">Heavy Equipment Hauling</span>
            </Link>
            
            <Link 
              to="/dump-truck-services" 
              className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <span className="text-mem-blue font-medium">Finish-Grade Leveling</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravelDeliveryRelatedServices;
