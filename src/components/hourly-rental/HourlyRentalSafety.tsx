
import { ShieldCheck } from "lucide-react";

const HourlyRentalSafety = () => {
  const safetyItems = [
    "Backup cameras + audible alarms on every rig (OSHA 29 CFR 1926.601)",
    "Spotter-required policy in blind zones",
    "Body-prop safety locks to prevent unintended bed movement",
    "TDOT-compliant oversize permits & routing when haul roads cross state highways"
  ];

  return (
    <section id="safety" className="mem-section bg-mem-blue">
      <div className="mem-container">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-mem-babyBlue/20">
            <ShieldCheck className="h-16 w-16 text-mem-babyBlue" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Safety & Compliance First—Every Load
        </h2>
        
        <p className="text-xl text-center max-w-3xl mx-auto mb-10 text-white/90">
          Dump-truck operations rank among OSHA's high-hazard construction activities.
          We mitigate risk with:
        </p>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {safetyItems.map((item, index) => (
            <div key={index} className="mem-card p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-mem-babyBlue/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-mem-babyBlue">{index + 1}</span>
                </div>
                <p className="text-center text-white/80">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HourlyRentalSafety;
