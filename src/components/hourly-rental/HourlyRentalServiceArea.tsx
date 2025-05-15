
import { MapPin } from "lucide-react";

const HourlyRentalServiceArea = () => {
  return (
    <section id="service-area" className="mem-section bg-mem-blue">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Service Area & Typical Hauls</h2>
        
        <div className="flex items-center justify-center mb-8">
          <MapPin className="h-6 w-6 text-mem-babyBlue mr-2" />
          <p className="text-xl text-white">
            We roll 24/6 from our Collierville hub to job sites across
            <strong className="mx-2">Memphis, Germantown, Bartlett, Arlington, Millington, Olive Branch, Southaven
            and the entire Mid-South region</strong>.
          </p>
        </div>
        
        <p className="text-center text-xl mb-8 text-white/90">
          Typical hourly assignments include:
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="mem-card p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Common Hauls</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/90">
                <div className="rounded-full h-2 w-2 bg-mem-babyBlue"></div>
                <span>3 – 10-yard demo debris runs</span>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <div className="rounded-full h-2 w-2 bg-mem-babyBlue"></div>
                <span>Cut-and-fill earthwork support</span>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <div className="rounded-full h-2 w-2 bg-mem-babyBlue"></div>
                <span>Asphalt millings haul-off</span>
              </li>
            </ul>
          </div>
          
          <div className="mem-card p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Material Delivery</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/90">
                <div className="rounded-full h-2 w-2 bg-mem-babyBlue"></div>
                <span>Gravel & topsoil delivery</span>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <div className="rounded-full h-2 w-2 bg-mem-babyBlue"></div>
                <span>Infrastructure trench backfill</span>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <div className="rounded-full h-2 w-2 bg-mem-babyBlue"></div>
                <span>Storm-cleanup material removal</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HourlyRentalServiceArea;
