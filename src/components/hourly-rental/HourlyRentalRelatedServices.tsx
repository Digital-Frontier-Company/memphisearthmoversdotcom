
import { Link } from "react-router-dom";

const HourlyRentalRelatedServices = () => {
  const relatedServices = [
    {
      title: "Gravel Delivery & Spreading",
      path: "/memphis-gravel-delivery",
      icon: "🪨"
    },
    {
      title: "Heavy Equipment Hauling",
      path: "/dump-truck-services",
      icon: "🚛"
    },
    {
      title: "Excavation & Land Clearing",
      path: "/dump-truck-services",
      icon: "🏗️"
    }
  ];

  return (
    <section className="py-12 bg-mem-blue/80">
      <div className="mem-container">
        <h3 className="text-2xl font-bold mb-6 text-center">Related Services</h3>
        
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {relatedServices.map((service, index) => (
            <div key={index} className="mem-card p-6 transition-transform hover:scale-105">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-4xl">{service.icon}</span>
                <h4 className="text-lg font-semibold">{service.title}</h4>
                <Link 
                  to={service.path} 
                  className="text-mem-babyBlue hover:text-mem-babyBlue/80 underline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HourlyRentalRelatedServices;
