
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import CalculatorArea from "@/components/calculator/CalculatorArea";
import MaterialSelector from "@/components/calculator/MaterialSelector";
import CalculationResults from "@/components/calculator/CalculationResults";
import EmailCaptureDialog from "@/components/calculator/EmailCaptureDialog";
import { useToast } from "@/hooks/use-toast";

// Material data with densities in tons per cubic yard
const MATERIALS = [
  { id: "crushed-gravel", name: "Crushed Gravel", density: 1.35, price: 45 },
  { id: "pea-gravel", name: "Pea Gravel", density: 1.25, price: 50 },
  { id: "limestone", name: "Limestone", density: 1.4, price: 55 },
  { id: "river-rock", name: "River Rock", density: 1.3, price: 60 },
  { id: "sand", name: "Sand", density: 1.2, price: 40 },
];

const GravelCalculator = () => {
  const { toast } = useToast();
  const [area, setArea] = useState(0); // in square feet
  const [depth, setDepth] = useState(3); // in inches
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [calculationResults, setCalculationResults] = useState({
    area: 0,
    volume: 0,
    tons: 0,
    cost: 0,
  });

  const handleAreaUpdate = (newArea: number) => {
    setArea(newArea);
  };

  const handleDepthChange = (newDepth: number) => {
    setDepth(newDepth);
  };

  const handleMaterialChange = (materialId: string) => {
    const material = MATERIALS.find(m => m.id === materialId);
    if (material) {
      setSelectedMaterial(material);
    }
  };

  const calculateResults = () => {
    // Convert square feet and inches to cubic yards
    // 1 cubic yard = 27 cubic feet
    // Convert depth from inches to feet first (divide by 12)
    const volumeCubicFeet = area * (depth / 12);
    const volumeCubicYards = volumeCubicFeet / 27;
    
    // Calculate weight in tons based on material density
    const weightInTons = volumeCubicYards * selectedMaterial.density;
    
    // Calculate cost
    const cost = weightInTons * selectedMaterial.price;
    
    setCalculationResults({
      area,
      volume: volumeCubicYards,
      tons: weightInTons,
      cost,
    });
    
    setCalculationComplete(true);
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = (email: string) => {
    // Here we'd normally send this to a backend API
    // For now, we'll just store it in localStorage
    const savedEmails = JSON.parse(localStorage.getItem('calculatorEmails') || '[]');
    savedEmails.push({
      email,
      date: new Date().toISOString(),
      calculation: calculationResults,
      material: selectedMaterial.name,
    });
    localStorage.setItem('calculatorEmails', JSON.stringify(savedEmails));
    
    setShowEmailDialog(false);
    toast({
      title: "Results Ready",
      description: "Your calculation results are now available!",
    });
  };

  return (
    <>
      <Helmet>
        <title>Gravel Calculator | Memphis Earth Movers</title>
        <meta name="description" content="Calculate how much gravel you need for your project with our free gravel calculator. Memphis Earth Movers provides reliable delivery services throughout Memphis." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="mem-section bg-mem-darkNavy">
            <div className="mem-container max-w-4xl">
              <h1 className="text-mem-darkNavy text-center mb-8">
                <span className="text-mem-babyBlue">Interactive </span>
                Gravel Calculator
              </h1>
              <p className="text-mem-darkGray text-center mb-12">
                Draw your project area, adjust material and depth, and get an instant estimate of how much material you need. 
                Perfect for planning driveways, pathways, and landscaping projects.
              </p>
              
              <div className="mem-card p-8">
                <h2 className="text-white text-xl mb-6">Calculate Your Material Needs</h2>
                
                <div className="space-y-8">
                  {/* Step 1: Draw or enter area dimensions */}
                  <div className="space-y-4">
                    <h3 className="text-white text-lg">Step 1: Define Your Area</h3>
                    <p className="text-white/80 mb-4">Draw the shape of your project area or enter the dimensions below:</p>
                    <CalculatorArea onAreaUpdate={handleAreaUpdate} />
                  </div>
                  
                  {/* Step 2: Select material and depth */}
                  <div className="space-y-4">
                    <h3 className="text-white text-lg">Step 2: Select Material & Depth</h3>
                    <MaterialSelector 
                      materials={MATERIALS}
                      selectedMaterial={selectedMaterial.id}
                      depth={depth}
                      onMaterialChange={handleMaterialChange}
                      onDepthChange={handleDepthChange}
                    />
                  </div>
                  
                  {/* Step 3: Calculate button */}
                  <div className="pt-4">
                    <button 
                      className="mem-btn-primary w-full py-4"
                      onClick={calculateResults}
                    >
                      Calculate Materials Needed
                    </button>
                  </div>
                  
                  {/* Results section (only shown after calculation and email capture) */}
                  {calculationComplete && !showEmailDialog && (
                    <CalculationResults 
                      results={calculationResults} 
                      materialName={selectedMaterial.name}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
        <BackToTopButton />
      </div>
      
      <EmailCaptureDialog 
        open={showEmailDialog} 
        onClose={() => setShowEmailDialog(false)} 
        onSubmit={handleEmailSubmit} 
      />
    </>
  );
};

export default GravelCalculator;
