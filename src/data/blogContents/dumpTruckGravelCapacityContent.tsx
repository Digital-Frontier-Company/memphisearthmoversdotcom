import React from "react";
import { Link } from "react-router-dom";

const dumpTruckGravelCapacityContent = <>
  <div className="mb-8">
    <p className="mb-4 text-neutral-50 text-lg">
      Understanding dump truck capacity is crucial for Memphis construction and landscaping projects. Whether you're planning a driveway installation in Midtown or a large development project in Collierville, knowing exactly how much material your truck can carry saves time, money, and ensures project success.
    </p>
    
    <p className="mb-4 text-neutral-50">
      Memphis soil conditions, seasonal weight restrictions, and local delivery logistics all factor into choosing the right truck size for your project. Our comprehensive guide breaks down everything you need to know about dump truck capacities and material calculations for Memphis-area projects.
    </p>
  </div>

  <div className="my-8 rounded-lg overflow-hidden shadow-lg">
    <img src="/lovable-uploads/ac20e5c1-94a4-40ac-ba7c-2650a3defa51.png" alt="Memphis Earth Movers dump truck on highway with company branding" className="w-full h-auto" width="800" height="600" />
  </div>

  <h2 className="text-2xl font-bold mb-4 text-slate-50">Quick-Look Capacity Chart</h2>
  
  <div className="mb-6">
    <div className="overflow-x-auto bg-mem-offWhite rounded-lg p-4 mb-4">
      <table className="w-full text-mem-darkNavy">
        <thead>
          <tr className="border-b border-mem-gray">
            <th className="text-left py-2 px-4 font-bold">Truck Class</th>
            <th className="text-left py-2 px-4 font-bold">Cubic Yards (gravel)</th>
            <th className="text-left py-2 px-4 font-bold">Tons (gravel)*</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-mem-gray/50">
            <td className="py-2 px-4">Standard tandem</td>
            <td className="py-2 px-4">10–12 yd³</td>
            <td className="py-2 px-4">13–17 tons</td>
          </tr>
          <tr className="border-b border-mem-gray/50">
            <td className="py-2 px-4">Super-dump / tri-axle</td>
            <td className="py-2 px-4">14–16 yd³</td>
            <td className="py-2 px-4">18–22 tons</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Articulated off-road</td>
            <td className="py-2 px-4">20–25 yd³</td>
            <td className="py-2 px-4">25–32 tons</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm text-mem-darkGray mt-2">*Gravel weight averages 2,600–3,000 lb per cubic yard.</p>
    </div>
  </div>

  <h2 className="text-2xl font-bold mb-4 text-slate-50">Why Capacity Matters for Memphis Projects</h2>
  
  <div className="mb-6">
    <p className="mb-4 text-slate-50">
      Memphis soil shifts, river humidity adds moisture, and local road-weight limits tighten in wet spring weeks. Understanding exact yardage requirements provides several key benefits:
    </p>
    
    <ul className="list-disc pl-6 mb-4 text-slate-50 space-y-2">
      <li><strong>Fewer trips → lower fuel surcharges:</strong> Maximize each load to reduce transportation costs</li>
      <li><strong>Compliance with Shelby County seasonal weight bans:</strong> Avoid fines and project delays</li>
      <li><strong>Accurate delivery windows:</strong> Keep your crew productive with precise scheduling</li>
    </ul>
    
    <p className="mb-4 text-slate-50">
      For Memphis contractors and homeowners, proper capacity planning can save hundreds of dollars per project while ensuring materials arrive exactly when needed. Our <Link to="/hourly-dump-truck-rental" className="text-mem-blue hover:text-mem-darkBlue underline">hourly dump truck rental</Link> service provides the flexibility to scale operations based on your specific project requirements.
    </p>
  </div>

  <div className="my-8 rounded-lg overflow-hidden shadow-lg">
    <img src="/lovable-uploads/1a037611-d312-407a-b1b7-d598476ba1bf.png" alt="Memphis Earth Movers logo on construction road with dump truck" className="w-full h-auto" width="800" height="600" />
  </div>

  <h2 className="text-2xl font-bold mb-4 text-neutral-50">Standard vs. Super vs. Articulated Dump Trucks</h2>
  
  <div className="mb-6">
    <p className="mb-4 text-neutral-50">
      <strong>Standard tandem trucks</strong> rule city streets; their shorter wheelbase squeezes into Midtown alley projects. These versatile workhorses are perfect for residential driveways, small commercial projects, and urban construction sites where maneuverability matters most.
    </p>
    
    <p className="mb-4 text-neutral-50">
      <strong>Super-dumps</strong> add a trailing axle—perfect for county road resurfacing when you need 16 yards of base stone. The additional axle distributes weight more evenly, allowing for larger payloads while maintaining road compliance.
    </p>
    
    <p className="mb-4 text-neutral-50">
      <strong>Articulated trucks</strong> shine on raw land clearing east of Collierville where job sites are muddy. Their superior traction and stability make them ideal for challenging terrain and large-scale earthmoving operations.
    </p>
    
    <p className="mb-4 text-neutral-50">
      Memphis Earth Movers maintains a diverse fleet to match every project need. Our experienced team helps you select the right equipment for your specific Memphis-area project requirements.
    </p>
  </div>

  <h2 className="text-2xl font-bold mb-4 text-zinc-50">Calculating Your Gravel, Dirt, or Sand Needs</h2>
  
  <div className="mb-6">
    <p className="mb-4 text-zinc-50">
      Accurate material calculations prevent costly overages and project delays. Follow these simple steps:
    </p>
    
    <ol className="list-decimal pl-6 mb-4 text-zinc-50 space-y-2">
      <li><strong>Measure your pad in feet:</strong> length × width × depth (in feet)</li>
      <li><strong>Convert to cubic yards:</strong> divide by 27</li>
      <li><strong>Add 10% contingency</strong> for compaction and settling</li>
    </ol>
    
    <div className="bg-mem-darkBlue/50 p-4 rounded-lg mb-4 border border-mem-blue/30">
      <h4 className="font-bold text-mem-blue mb-2">Example Calculation:</h4>
      <p className="text-zinc-50">
        A 30 × 20 ft driveway, 0.5 ft deep → 30 × 20 × 0.5 = 300 ft³ → 300/27 ≈ 11.1 yd³ → order 12 yd³ to be safe.
      </p>
    </div>
    
    <p className="mb-4 text-zinc-50">
      For more complex calculations, use our <Link to="/gravel-calculator" className="text-mem-blue hover:text-mem-darkBlue underline">gravel calculator</Link> to get precise material estimates for your Memphis project.
    </p>
  </div>

  <h2 className="text-2xl font-bold mb-4 text-slate-50">Comparing Hauling Services in Memphis</h2>
  
  <div className="mb-6">
    <div className="overflow-x-auto bg-mem-offWhite rounded-lg p-4 mb-4">
      <table className="w-full text-mem-darkNavy">
        <thead>
          <tr className="border-b border-mem-gray">
            <th className="text-left py-2 px-4 font-bold">Service</th>
            <th className="text-left py-2 px-4 font-bold">Typical Load Size</th>
            <th className="text-left py-2 px-4 font-bold">Specialty</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-mem-gray/50">
            <td className="py-2 px-4">Memphis Dump Hauling</td>
            <td className="py-2 px-4">12 yd³</td>
            <td className="py-2 px-4">Driveway gravel & sand</td>
          </tr>
          <tr className="border-b border-mem-gray/50">
            <td className="py-2 px-4">River City Haulers</td>
            <td className="py-2 px-4">15 yd³</td>
            <td className="py-2 px-4">Bulk topsoil</td>
          </tr>
          <tr className="bg-mem-blue/10">
            <td className="py-2 px-4 font-bold">Memphis Earth Movers</td>
            <td className="py-2 px-4 font-bold">10–25 yd³</td>
            <td className="py-2 px-4 font-bold">Full-spectrum: rip-rap, pea gravel, fill dirt</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <p className="mb-4 text-slate-50">
      <strong>Pro move:</strong> Bundle material delivery with spoil removal to cut round-trip fees. Our comprehensive <Link to="/dump-truck-services" className="text-mem-blue hover:text-mem-darkBlue underline">dump truck services</Link> handle both incoming materials and outgoing debris for maximum efficiency.
    </p>
  </div>

  <h2 className="text-2xl font-bold mb-4 text-neutral-50">Earth-Mover Trucks & Rental Checklist</h2>
  
  <div className="mb-6">
    <p className="mb-4 text-neutral-50">
      When evaluating Memphis dump truck rentals, ensure these essential features are included:
    </p>
    
    <ul className="list-disc pl-6 mb-4 text-neutral-50 space-y-2">
      <li><strong>CDL driver included?</strong> Professional operators ensure safe, compliant transport</li>
      <li><strong>Insurance certificate</strong> naming your jobsite for complete protection</li>
      <li><strong>Bed liner or tarp system</strong> keeps river-humidity gravel from sticking</li>
      <li><strong>PTO-controlled tailgate</strong>—crucial for controlled material spread</li>
      <li><strong>Rental flexibility:</strong> by the hour or by the load?</li>
    </ul>
    
    <p className="mb-4 text-neutral-50">
      <strong>Need wheels fast?</strong> Memphis truck rental partners like Delta Truck & Trailer offer weekday drop-offs. Call early in summer—inventory vanishes during peak construction season.
    </p>
  </div>

  <h2 className="text-2xl font-bold mb-4 text-zinc-50">Pro Tips for Ordering Landscaping Materials in Memphis</h2>
  
  <div className="mb-6">
    <ul className="list-disc pl-6 mb-4 text-zinc-50 space-y-2">
      <li><strong>Stagger deliveries:</strong> gravel first, mulch last (prevents dusty mulch contamination)</li>
      <li><strong>Ask for "washed" rock</strong> when filling French drains—prevents problematic silt buildup</li>
      <li><strong>Schedule before 3 PM;</strong> I-240 backups add 30+ minutes after rush hour</li>
      <li><strong>Rain in forecast?</strong> Opt for limestone over sandstone—superior drainage performance</li>
    </ul>
    
    <p className="mb-4 text-zinc-50">
      Memphis Earth Movers provides expert guidance on material selection based on local soil conditions and weather patterns. Our team understands Memphis's unique challenges and can recommend the best materials for your specific project needs.
    </p>
  </div>

  <h2 className="text-2xl font-bold mb-4 text-slate-50">Frequently Asked Questions</h2>
  
  <div className="mb-6 space-y-4">
    <div className="bg-mem-darkBlue/50 p-4 rounded-lg border border-mem-blue/30">
      <h4 className="font-bold text-mem-blue mb-2">Q1. How much gravel fits in a dump truck?</h4>
      <p className="text-slate-50">
        A typical Memphis tandem holds 10–12 cubic yards (≈ 14–17 tons). Super-dumps stretch to 16 yd³.
      </p>
    </div>
    
    <div className="bg-mem-darkBlue/50 p-4 rounded-lg border border-mem-blue/30">
      <h4 className="font-bold text-mem-blue mb-2">Q2. What's the heaviest load Memphis road bans allow?</h4>
      <p className="text-slate-50">
        During spring thaw, expect an 18-ton cap on county roads; plan two trips if your order exceeds this limit.
      </p>
    </div>
    
    <div className="bg-mem-darkBlue/50 p-4 rounded-lg border border-mem-blue/30">
      <h4 className="font-bold text-mem-blue mb-2">Q3. Can I rent an earth-mover truck without a CDL?</h4>
      <p className="text-slate-50">
        Most Memphis truck rental companies require a CDL-A driver for anything over 26,001 lb GVWR.
      </p>
    </div>
    
    <div className="bg-mem-darkBlue/50 p-4 rounded-lg border border-mem-blue/30">
      <h4 className="font-bold text-mem-blue mb-2">Q4. Do you deliver landscaping materials other than gravel?</h4>
      <p className="text-slate-50">
        Yes—topsoil, river rock, masonry sand, and recycled asphalt millings are all available for Memphis delivery.
      </p>
    </div>
    
    <div className="bg-mem-darkBlue/50 p-4 rounded-lg border border-mem-blue/30">
      <h4 className="font-bold text-mem-blue mb-2">Q5. How far in advance should I book hauling services?</h4>
      <p className="text-slate-50">
        At least 48 hours for weekday drops; a full week for Saturday delivery slots.
      </p>
    </div>
  </div>

  <div className="my-8 p-6 bg-mem-blue/20 rounded-lg border border-mem-blue/30">
    <h3 className="text-xl font-bold mb-4 text-zinc-50">Ready to Keep Your Project Rolling?</h3>
    <p className="mb-4 text-zinc-50">
      Whether you need precise material calculations, reliable hauling services, or expert advice on Memphis construction challenges, our team is ready to help.
    </p>
    <div className="flex gap-4 flex-wrap">
      <Link to="/contact" className="bg-mem-blue hover:bg-mem-darkBlue text-white px-6 py-3 rounded-lg font-medium transition-colors">
        Request a Quote
      </Link>
      <Link to="/gravel-calculator" className="border border-mem-blue text-mem-blue hover:bg-mem-blue/10 px-6 py-3 rounded-lg font-medium transition-colors">
        Calculate Materials
      </Link>
    </div>
  </div>
</>;

export default dumpTruckGravelCapacityContent;
