
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Scale, DollarSign, Ruler } from "lucide-react";

interface CalculationResultsProps {
  results: {
    area: number;
    volume: number;
    tons: number;
    cost: number;
  };
  materialName: string;
}

const CalculationResults: React.FC<CalculationResultsProps> = ({
  results,
  materialName,
}) => {
  return (
    <div className="space-y-6 pt-4 border-t border-mem-babyBlue/20">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-mem-babyBlue mb-2">Calculation Results</h3>
        <p className="text-white/80 text-sm">Based on your measurements and selections</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-mem-darkNavy/60 border-mem-babyBlue/40 shadow-[0_0_10px_rgba(77,210,255,0.2)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Ruler className="h-5 w-5 text-mem-babyBlue" />
              Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{results.area.toFixed(1)} sq ft</p>
            <p className="text-sm text-white/60 mt-1">Surface area to cover</p>
          </CardContent>
        </Card>
        
        <Card className="bg-mem-darkNavy/60 border-mem-babyBlue/40 shadow-[0_0_10px_rgba(77,210,255,0.2)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="h-5 w-5 text-mem-babyBlue" />
              Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{results.tons.toFixed(1)} tons</p>
            <p className="text-sm text-white/60 mt-1">Of {materialName} needed</p>
          </CardContent>
        </Card>
        
        <Card className="bg-mem-darkNavy/60 border-mem-babyBlue/40 shadow-[0_0_10px_rgba(77,210,255,0.2)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-mem-babyBlue" />
              Estimated Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">${results.cost.toFixed(2)}</p>
            <p className="text-sm text-white/60 mt-1">Material only (delivery extra)</p>
          </CardContent>
        </Card>
        
        <Card className="bg-mem-darkNavy/60 border-mem-babyBlue/40 shadow-[0_0_10px_rgba(77,210,255,0.2)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-mem-babyBlue" />
              Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-white">{Math.ceil(results.tons / 16)} truck{Math.ceil(results.tons / 16) !== 1 ? 's' : ''}</p>
            <p className="text-sm text-white/60 mt-1">Each truck holds ~16 tons</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-mem-darkNavy/40 p-4 rounded-md border border-mem-babyBlue/30">
        <h4 className="text-white font-medium mb-2">Need help with your project?</h4>
        <p className="text-sm text-white/80 mb-4">
          Our team can assist with material selection and delivery scheduling.
          Call us or request a quote for accurate pricing including delivery.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="tel:9014611011" className="mem-btn-primary">
            Call for Assistance
          </a>
          <a href="/contact" className="mem-btn-secondary">
            Request a Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalculationResults;
