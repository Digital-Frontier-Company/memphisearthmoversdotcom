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
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-mem-babyBlue/30 max-w-5xl mx-auto mb-12 overflow-x-auto hover:shadow-2xl transition-all duration-300 animate-fade-in">
          <div className="min-w-full">
            <table className="w-full text-mem-darkNavy">
              <thead>
                <tr className="border-b border-mem-blue/20">
                  <th className="text-left py-4 px-4 font-semibold text-mem-darkNavy">Service Type</th>
                  <th className="text-center py-4 px-4 font-semibold text-mem-blue">Memphis Earth Movers</th>
                  <th className="text-center py-4 px-4 font-semibold text-mem-darkNavy">Competitors</th>
                  <th className="text-center py-4 px-4 font-semibold text-green-600">Your Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-mem-darkNavy/10 hover:bg-mem-blue/5 transition-colors">
                  <td className="py-4 px-4 text-mem-darkNavy">Hourly Rate</td>
                  <td className="text-center py-4 px-4 text-mem-blue font-bold">$125/hour</td>
                  <td className="text-center py-4 px-4 text-mem-darkNavy">$200-250/hour</td>
                  <td className="text-center py-4 px-4 text-green-600 font-bold">Save $75-125/hour</td>
                </tr>
                <tr className="border-b border-mem-darkNavy/10 hover:bg-mem-blue/5 transition-colors">
                  <td className="py-4 px-4 text-mem-darkNavy">Minimum Hours</td>
                  <td className="text-center py-4 px-4 text-mem-blue font-bold">2 hours</td>
                  <td className="text-center py-4 px-4 text-mem-darkNavy">4-6 hours</td>
                  <td className="text-center py-4 px-4 text-green-600 font-bold">More Flexibility</td>
                </tr>
                <tr className="border-b border-mem-darkNavy/10 hover:bg-mem-blue/5 transition-colors">
                  <td className="py-4 px-4 text-mem-darkNavy">CDL Driver</td>
                  <td className="text-center py-4 px-4 text-mem-blue font-bold">Included</td>
                  <td className="text-center py-4 px-4 text-mem-darkNavy">+$50/hour</td>
                  <td className="text-center py-4 px-4 text-green-600 font-bold">Save $50/hour</td>
                </tr>
                <tr className="hover:bg-mem-blue/5 transition-colors">
                  <td className="py-4 px-4 text-mem-darkNavy">Fuel</td>
                  <td className="text-center py-4 px-4 text-mem-blue font-bold">Included</td>
                  <td className="text-center py-4 px-4 text-mem-darkNavy">Extra charge</td>
                  <td className="text-center py-4 px-4 text-green-600 font-bold">Save $40-60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Calculator */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-mem-babyBlue/30 max-w-2xl mx-auto hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="h-8 w-8 text-mem-blue" />
            <h3 className="text-2xl font-bold text-mem-darkNavy">Project Cost Calculator</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-mem-darkNavy font-medium mb-2">
                How many hours do you need?
              </label>
              <Input
                type="number"
                min="2"
                value={hours}
                onChange={(e) => setHours(Math.max(2, parseInt(e.target.value) || 2))}
                className="w-full px-4 py-3 border border-mem-blue/30 rounded-md focus:outline-none focus:ring-2 focus:ring-mem-blue bg-white text-mem-darkNavy text-lg transition-all hover:border-mem-blue/60"
                placeholder="Enter hours"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-mem-blue/10 p-6 rounded-lg border border-mem-blue/30 hover:bg-mem-blue/15 transition-all duration-200 hover:scale-105">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-mem-blue" />
                  <span className="text-mem-blue font-medium">Memphis Earth Movers</span>
                </div>
                <div className="text-3xl font-bold text-mem-darkNavy">${totalCost}</div>
                <div className="text-mem-darkNavy/70">for {hours} hours</div>
              </div>

              <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/30 hover:bg-red-500/15 transition-all duration-200 hover:scale-105">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-red-500" />
                  <span className="text-red-500 font-medium">Competitors</span>
                </div>
                <div className="text-3xl font-bold text-mem-darkNavy">${competitorCost}</div>
                <div className="text-mem-darkNavy/70">for {hours} hours</div>
              </div>
            </div>

            <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/30 text-center hover:bg-green-500/15 transition-all duration-200 hover:scale-105">
              <div className="text-green-600 font-medium mb-1">Your Total Savings</div>
              <div className="text-4xl font-bold text-green-600">${savings}</div>
              <div className="text-mem-darkNavy/70">Save {Math.round(((competitorCost - totalCost) / competitorCost) * 100)}% on this project</div>
            </div>

            <div className="text-center">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
                Lock In This ${ourRate}/Hour Rate
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default PricingTransparencyBlock;