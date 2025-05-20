
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import CalculatorArea from "@/components/calculator/CalculatorArea";
import MaterialSelector from "@/components/calculator/MaterialSelector";
import CalculationResults from "@/components/calculator/CalculationResults";
import EmailCaptureDialog from "@/components/calculator/EmailCaptureDialog";
import CalculatorBreadcrumbs from "@/components/calculator/CalculatorBreadcrumbs";
import CalculatorFaq from "@/components/calculator/CalculatorFaq";
import { useToast } from "@/hooks/use-toast";
import { sendLeadNotification } from "@/utils/mailchimpService";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Material data with densities in tons per cubic yard
const MATERIALS = [
  { id: "crushed-gravel", name: "Crushed Gravel", density: 1.35, price: 45 },
  { id: "pea-gravel", name: "Pea Gravel", density: 1.25, price: 50 },
  { id: "limestone", name: "Limestone", density: 1.4, price: 55 },
  { id: "river-rock", name: "River Rock", density: 1.3, price: 60 },
  { id: "sand", name: "Sand", density: 1.2, price: 40 },
  { id: "asphalt", name: "Regular Asphalt", density: 1.35, price: 65 },
  { id: "crushed-asphalt", name: "Crushed Asphalt", density: 1.35, price: 50 },
];

// BreadcrumbList Schema
const BreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://memphis-earthmovers.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Memphis Gravel Calculator",
      "item": "https://memphis-earthmovers.com/gravel-calculator"
    }
  ]
};

// FAQ Schema
const CalculatorFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the Memphis gravel calculator work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Memphis gravel calculator allows you to draw your project area or enter dimensions, select your preferred material, and specify depth. It then calculates the volume in cubic yards and weight in tons needed for your Memphis project, along with an estimated cost."
      }
    },
    {
      "@type": "Question",
      "name": "What materials can I calculate for my Memphis project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Memphis calculator supports various materials including crushed gravel, pea gravel, limestone, river rock, sand, regular asphalt, and crushed asphalt. Each material has specific density values to provide accurate calculations for your Memphis project."
      }
    },
    {
      "@type": "Question",
      "name": "Can Memphis Earth Movers deliver the calculated materials?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! After calculating your materials, you can request a delivery quote. Our Memphis dump trucks can deliver all calculated materials directly to your project site throughout Memphis and DeSoto County."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the Memphis gravel calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Memphis gravel calculator provides a close estimate based on industry standard density values. For the most precise quote for your Memphis project, we recommend contacting us directly at (901) 461-1011 after using the calculator."
      }
    }
  ]
};

// Calculator Schema
const CalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Memphis Gravel Calculator",
  "applicationCategory": "CalculatorApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Calculate the amount of gravel, limestone, sand, or asphalt millings needed for your Memphis project. Get accurate material estimates and delivery quotes.",
  "publisher": {
    "@type": "Organization",
    "name": "Memphis Earth Movers",
    "url": "https://memphis-earthmovers.com"
  }
};

const GravelCalculator = () => {
  const { toast } = useToast();
  const [area, setArea] = useState(0); // in square feet
  const [depth, setDepth] = useState(3); // in inches
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleEmailSubmit = async (email: string) => {
    setIsSubmitting(true);
    
    try {
      // Send the lead notification via our service
      const success = await sendLeadNotification(
        email, 
        calculationResults,
        selectedMaterial.name
      );
      
      if (success) {
        // Close the dialog and show success message
        setShowEmailDialog(false);
        toast({
          title: "Results Ready",
          description: "Your calculation results are now available!",
        });
      } else {
        throw new Error("Failed to send lead notification");
      }
    } catch (error) {
      console.error("Error processing lead:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Memphis Gravel Calculator | Free Material Estimator</title>
        <meta name="description" content="Calculate Memphis gravel needs with our free estimator. Plan your project with precise material quantities and request delivery from Memphis dump trucks for rent. Save time and money!" />
        <meta name="keywords" content="Memphis gravel calculator, Memphis material calculator, Memphis dump truck delivery, gravel estimator Memphis, Memphis material delivery" />
        <link rel="canonical" href="https://memphis-earthmovers.com/gravel-calculator" />
        <script type="application/ld+json">
          {JSON.stringify(CalculatorSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(BreadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(CalculatorFaqSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="mem-section bg-mem-darkNavy">
            <div className="mem-container max-w-4xl">
              <h1 className="text-white text-center mb-8">
                Memphis Gravel Calculator
              </h1>
              
              {/* Featured Image with Blue Tint Overlay */}
              <div className="relative w-full rounded-lg overflow-hidden mb-8">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <img 
                    src="/lovable-uploads/ec8dc559-f5dd-432a-8666-55a7a4f1491d.png" 
                    alt="Memphis Earth Movers dump truck delivering materials" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div 
                    className="absolute inset-0 bg-mem-blue/30 mix-blend-overlay rounded-lg"
                    aria-hidden="true"
                  ></div>
                </AspectRatio>
              </div>
              
              <p className="text-white/80 text-center mb-4">
                Draw your project area, adjust material and depth, and get an instant estimate of how much material you need. 
                Perfect for planning Memphis driveways, pathways, and landscaping projects.
              </p>
              
              <CalculatorBreadcrumbs />
              
              <div className="mem-card p-8 mt-8">
                <h2 className="text-white text-xl mb-6">Calculate Your Memphis Material Needs</h2>
                
                <div className="space-y-8">
                  {/* Step 1: Draw or enter area dimensions */}
                  <div className="space-y-4">
                    <h3 className="text-white text-lg">Step 1: Define Your Area</h3>
                    <p className="text-white/80 mb-4">Draw the shape of your Memphis project area or enter the dimensions below:</p>
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
                      Calculate Materials for Memphis Delivery
                    </button>
                  </div>
                  
                  {/* Results section (only shown after calculation and email capture) */}
                  {calculationComplete && !showEmailDialog && (
                    <CalculationResults 
                      results={calculationResults} 
                      materialName={selectedMaterial.name}
                    />
                  )}
                  
                  {calculationComplete && !showEmailDialog && (
                    <div className="mt-6 text-center">
                      <Link to="/contact" className="mem-btn-primary">
                        Request Memphis Delivery Quote
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          <CalculatorFaq />
        </main>
        
        <Footer />
        <BackToTopButton />
      </div>
      
      <EmailCaptureDialog 
        open={showEmailDialog} 
        onClose={() => setShowEmailDialog(false)} 
        onSubmit={handleEmailSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default GravelCalculator;
