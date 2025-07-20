import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Weight, Users, DollarSign, ChevronDown, ChevronUp } from "lucide-react";

const EquipmentSpecifications = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>("10-yard");

  const truckSpecs = [
    {
      id: "10-yard",
      name: "10-Yard Dump Truck",
      payload: "10-12 tons",
      bestFor: "Residential projects, small excavations",
      cdlRequired: "No (under 26,000 lbs)",
      hourlyRate: 125,
      features: [
        "Perfect for driveways and small sites",
        "Backup camera and safety equipment",
        "GPS tracking for accurate timing",
        "Professional CDL driver included"
      ],
      specs: {
        length: "22 feet",
        width: "8 feet",
        height: "11 feet",
        capacity: "10 cubic yards",
        weight: "23,000 lbs GVWR"
      }
    },
    {
      id: "15-yard",
      name: "15-Yard Dump Truck",
      payload: "15-18 tons",
      bestFor: "Commercial sites, road construction",
      cdlRequired: "Yes (Class B)",
      hourlyRate: 145,
      features: [
        "Ideal for medium commercial projects",
        "Enhanced hydraulic system",
        "DOT compliant for highway use",
        "Experienced Class B CDL driver"
      ],
      specs: {
        length: "26 feet",
        width: "8.5 feet",
        height: "12 feet",
        capacity: "15 cubic yards",
        weight: "33,000 lbs GVWR"
      }
    },
    {
      id: "20-yard",
      name: "20-Yard Dump Truck",
      payload: "20-25 tons",
      bestFor: "Major excavation, quarry work",
      cdlRequired: "Yes (Class B)",
      hourlyRate: 165,
      features: [
        "Heavy-duty for large projects",
        "Reinforced hydraulic systems",
        "Multiple safety features",
        "Veteran CDL driver with 10+ years"
      ],
      specs: {
        length: "28 feet",
        width: "8.5 feet",
        height: "13 feet",
        capacity: "20 cubic yards",
        weight: "46,000 lbs GVWR"
      }
    }
  ];

  const toggleExpanded = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="mem-section bg-mem-blue/80">
      <div className="mem-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Choose Your Equipment
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Professional-grade dump trucks with experienced CDL drivers for any project size
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {truckSpecs.map((truck) => (
            <Card 
              key={truck.id} 
              className={`mem-card transition-all duration-300 cursor-pointer ${
                expandedCard === truck.id ? 'ring-2 ring-mem-babyBlue' : ''
              }`}
              onClick={() => toggleExpanded(truck.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-mem-babyBlue/20">
                    <Truck className="h-12 w-12 text-mem-babyBlue" />
                  </div>
                </div>
                <CardTitle className="text-xl text-white mb-2">{truck.name}</CardTitle>
                <CardDescription className="text-white/80">
                  {truck.payload} payload capacity
                </CardDescription>
                <div className="flex justify-center mt-2">
                  <Badge variant={truck.cdlRequired.includes("No") ? "secondary" : "default"} 
                         className="bg-mem-babyBlue/20 text-mem-babyBlue border-mem-babyBlue/30">
                    {truck.cdlRequired.includes("No") ? "No CDL Required" : "CDL Required"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-mem-babyBlue" />
                    <span className="text-3xl font-bold text-mem-babyBlue">${truck.hourlyRate}</span>
                    <span className="text-white/70">/hour</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">{truck.bestFor}</p>
                </div>

                <div className="flex items-center justify-center text-white/70">
                  {expandedCard === truck.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                  <span className="ml-1 text-sm">
                    {expandedCard === truck.id ? "Less Details" : "More Details"}
                  </span>
                </div>

                {expandedCard === truck.id && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    <div>
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Weight className="h-4 w-4 text-mem-babyBlue" />
                        Key Features
                      </h4>
                      <ul className="space-y-1">
                        {truck.features.map((feature, index) => (
                          <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                            <span className="text-mem-babyBlue mt-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-mem-babyBlue" />
                        Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-white/70">Length:</div>
                        <div className="text-white">{truck.specs.length}</div>
                        <div className="text-white/70">Width:</div>
                        <div className="text-white">{truck.specs.width}</div>
                        <div className="text-white/70">Capacity:</div>
                        <div className="text-white">{truck.specs.capacity}</div>
                        <div className="text-white/70">GVWR:</div>
                        <div className="text-white">{truck.specs.weight}</div>
                      </div>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                  Reserve This Truck
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/90 text-lg mb-4">
            All trucks include professional CDL drivers, fuel, and insurance
          </p>
          <Button className="bg-mem-babyBlue hover:bg-mem-babyBlue/80 text-mem-darkNavy font-bold px-8 py-4 text-lg">
            Get Custom Quote for Multiple Trucks
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSpecifications;