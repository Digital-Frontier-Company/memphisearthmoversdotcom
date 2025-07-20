import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, DollarSign } from "lucide-react";

const PricingTransparencyBlock = () => {
  const [hours, setHours] = useState<number>(4);

  const ourRate = 125;
  const competitorRate = 225;
  const savings = (competitorRate - ourRate) * hours;
  const totalCost = ourRate * hours;
  const competitorCost = competitorRate * hours;

  return (
    <section className="mem-section bg-mem-darkNavy">
      <div className="mem-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            43% Less Than Memphis Competitors
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            See exactly how much you save with transparent hourly pricing
          </p>
        </div>

        {/* Pricing Comparison Table */}
        <div className="mem-card max-w-5xl mx-auto mb-12 overflow-x-auto">
          <div className="min-w-full">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-mem-babyBlue/30">
                  <th className="text-left py-4 px-4 font-semibold">Service Type</th>
                  <th className="text-center py-4 px-4 font-semibold text-mem-babyBlue">Memphis Earth Movers</th>
                  <th className="text-center py-4 px-4 font-semibold">Competitors</th>
                  <th className="text-center py-4 px-4 font-semibold text-green-400">Your Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4">Hourly Rate</td>
                  <td className="text-center py-4 px-4 text-mem-babyBlue font-bold">$125/hour</td>
                  <td className="text-center py-4 px-4">$200-250/hour</td>
                  <td className="text-center py-4 px-4 text-green-400 font-bold">Save $75-125/hour</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4">Minimum Hours</td>
                  <td className="text-center py-4 px-4 text-mem-babyBlue font-bold">2 hours</td>
                  <td className="text-center py-4 px-4">4-6 hours</td>
                  <td className="text-center py-4 px-4 text-green-400 font-bold">More Flexibility</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4">CDL Driver</td>
                  <td className="text-center py-4 px-4 text-mem-babyBlue font-bold">Included</td>
                  <td className="text-center py-4 px-4">+$50/hour</td>
                  <td className="text-center py-4 px-4 text-green-400 font-bold">Save $50/hour</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Fuel</td>
                  <td className="text-center py-4 px-4 text-mem-babyBlue font-bold">Included</td>
                  <td className="text-center py-4 px-4">Extra charge</td>
                  <td className="text-center py-4 px-4 text-green-400 font-bold">Save $40-60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Calculator */}
        <div className="mem-card max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="h-8 w-8 text-mem-babyBlue" />
            <h3 className="text-2xl font-bold text-white">Project Cost Calculator</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                How many hours do you need?
              </label>
              <Input
                type="number"
                min="2"
                value={hours}
                onChange={(e) => setHours(Math.max(2, parseInt(e.target.value) || 2))}
                className="mem-input text-lg"
                placeholder="Enter hours"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-mem-babyBlue/10 p-6 rounded-lg border border-mem-babyBlue/30">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-mem-babyBlue" />
                  <span className="text-mem-babyBlue font-medium">Memphis Earth Movers</span>
                </div>
                <div className="text-3xl font-bold text-white">${totalCost}</div>
                <div className="text-white/70">for {hours} hours</div>
              </div>

              <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-red-400" />
                  <span className="text-red-400 font-medium">Competitors</span>
                </div>
                <div className="text-3xl font-bold text-white">${competitorCost}</div>
                <div className="text-white/70">for {hours} hours</div>
              </div>
            </div>

            <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/30 text-center">
              <div className="text-green-400 font-medium mb-1">Your Total Savings</div>
              <div className="text-4xl font-bold text-green-400">${savings}</div>
              <div className="text-white/70">Save {Math.round(((competitorCost - totalCost) / competitorCost) * 100)}% on this project</div>
            </div>

            <div className="text-center">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg">
                Lock In This ${ourRate}/Hour Rate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTransparencyBlock;