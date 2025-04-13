import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Ruler, SquareStack, Truck, CircleDollarSign, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

const GravelCalculator = () => {
  const { toast } = useToast();
  const [length, setLength] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [depth, setDepth] = useState<number | "">("");
  const [unit, setUnit] = useState("imperial");
  const [material, setMaterial] = useState("gravel");
  const [useCompaction, setUseCompaction] = useState(true);
  const [compactionFactor, setCompactionFactor] = useState(15);
  const [waste, setWaste] = useState(5);
  const [result, setResult] = useState<{
    volume: number;
    volumeUnit: string;
    weight: number;
    weightUnit: string;
  } | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [materialDensities] = useState({
    gravel: { imperial: 105, metric: 1680 }, // lb/ft³ or kg/m³
    "crushed stone": { imperial: 100, metric: 1600 },
    sand: { imperial: 95, metric: 1520 },
    "pea gravel": { imperial: 92, metric: 1470 },
    "limestone": { imperial: 103, metric: 1650 },
    "asphalt": { imperial: 145, metric: 2322 }, // Added asphalt with appropriate density values
  });
  
  const [isOpen, setIsOpen] = useState(false);

  // Calculate the result whenever the inputs change
  useEffect(() => {
    if (length && width && depth) {
      calculateResult();
    }
  }, [length, width, depth, unit, material, useCompaction, compactionFactor, waste]);

  const calculateResult = () => {
    if (!length || !width || !depth) {
      return;
    }

    // Convert all measurements to a common unit
    let calculatedVolume = Number(length) * Number(width) * Number(depth);
    
    // Convert depth from inches to feet for imperial or cm to m for metric
    if (unit === "imperial") {
      calculatedVolume = calculatedVolume / 12; // Convert depth from inches to feet
    } else {
      calculatedVolume = calculatedVolume / 100; // Convert depth from cm to m
    }
    
    // Apply compaction factor if selected
    if (useCompaction) {
      calculatedVolume = calculatedVolume * (1 + compactionFactor / 100);
    }
    
    // Apply waste percentage
    calculatedVolume = calculatedVolume * (1 + waste / 100);
    
    // Calculate weight based on material density
    const density = materialDensities[material as keyof typeof materialDensities][unit as "imperial" | "metric"];
    const calculatedWeight = calculatedVolume * density;
    
    // Set results with appropriate units
    if (unit === "imperial") {
      // Convert cubic feet to cubic yards
      const cubicYards = calculatedVolume / 27;
      // Convert pounds to tons
      const tons = calculatedWeight / 2000;
      
      setResult({
        volume: parseFloat(cubicYards.toFixed(2)),
        volumeUnit: "cubic yards",
        weight: parseFloat(tons.toFixed(2)),
        weightUnit: "tons",
      });
    } else {
      setResult({
        volume: parseFloat(calculatedVolume.toFixed(2)),
        volumeUnit: "cubic meters",
        weight: parseFloat((calculatedWeight / 1000).toFixed(2)),
        weightUnit: "tonnes",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!length || !width || !depth) {
      toast({
        title: "Missing measurements",
        description: "Please enter all required dimensions.",
        variant: "destructive"
      });
      return;
    }
    
    calculateResult();
    setFormSubmitted(true);
  };

  const handleQuoteRequest = () => {
    if (!result) return;
    
    // Save calculator results to sessionStorage to access them in the quote form
    sessionStorage.setItem('calculatorResults', JSON.stringify({
      material,
      volume: `${result.volume} ${result.volumeUnit}`,
      weight: `${result.weight} ${result.weightUnit}`
    }));
    
    // Scroll to quote form or navigate to contact page
    toast({
      title: "Quote request prepared",
      description: "Redirecting you to our quote form...",
    });
    
    // Navigate to the home page and scroll to the quote form
    setTimeout(() => {
      window.location.href = "/#quoteForm";
    }, 1500);
  };

  const getDepthLabel = () => unit === "imperial" ? "Depth (inches)" : "Depth (cm)";
  const getLengthLabel = () => unit === "imperial" ? "Length (feet)" : "Length (meters)";
  const getWidthLabel = () => unit === "imperial" ? "Width (feet)" : "Width (meters)";

  return (
    <div className="min-h-screen flex flex-col" itemScope itemType="https://schema.org/WebApplication">
      <meta itemProp="name" content="Memphis Earth Movers Gravel Calculator" />
      <meta itemProp="description" content="Calculate how much gravel, crushed stone, or sand you need for your construction or landscaping project." />
      <meta itemProp="applicationCategory" content="Calculator" />
      <meta itemProp="operatingSystem" content="Web Browser" />
      
      <Header />
      
      <main className="flex-grow bg-mem-offWhite py-12">
        <div className="mem-container">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-mem-blue hover:text-mem-darkBlue transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-mem-darkGray mb-4" 
              itemProp="headline">
              Gravel Calculator
            </h1>
            <p className="text-lg text-mem-darkGray mb-6" itemProp="abstract">
              Calculate the exact amount of gravel, crushed stone, or sand you need for your construction or landscaping project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1 lg:col-span-2 border-mem-gray shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5 text-mem-blue" />
                  Material Calculator
                </CardTitle>
                <CardDescription>
                  Enter your project dimensions to calculate material needs
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="unit-selector">Measurement Units</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger id="unit-selector" className="w-full">
                        <SelectValue placeholder="Select measurement units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imperial">Imperial (feet/inches)</SelectItem>
                        <SelectItem value="metric">Metric (meters/cm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="length">
                        {getLengthLabel()}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-1 h-4 w-4 inline-block text-mem-darkGray/60" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Enter the length of your project area</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input
                        id="length"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder={unit === "imperial" ? "Length in feet" : "Length in meters"}
                        value={length}
                        onChange={(e) => setLength(e.target.value ? parseFloat(e.target.value) : "")}
                        className="mem-input"
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="width">
                        {getWidthLabel()}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-1 h-4 w-4 inline-block text-mem-darkGray/60" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Enter the width of your project area</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder={unit === "imperial" ? "Width in feet" : "Width in meters"}
                        value={width}
                        onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : "")}
                        className="mem-input"
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="depth">
                        {getDepthLabel()}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-1 h-4 w-4 inline-block text-mem-darkGray/60" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{unit === "imperial" ? "Enter depth in inches" : "Enter depth in centimeters"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input
                        id="depth"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder={unit === "imperial" ? "Depth in inches" : "Depth in cm"}
                        value={depth}
                        onChange={(e) => setDepth(e.target.value ? parseFloat(e.target.value) : "")}
                        className="mem-input"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="material-selector">Material Type</Label>
                    <Select value={material} onValueChange={setMaterial}>
                      <SelectTrigger id="material-selector" className="w-full">
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gravel">Gravel</SelectItem>
                        <SelectItem value="crushed stone">Crushed Stone</SelectItem>
                        <SelectItem value="sand">Sand</SelectItem>
                        <SelectItem value="pea gravel">Pea Gravel</SelectItem>
                        <SelectItem value="limestone">Limestone</SelectItem>
                        <SelectItem value="asphalt">Asphalt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full border rounded-md p-4 bg-white">
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between cursor-pointer">
                        <h4 className="text-sm font-semibold">Advanced Options</h4>
                        <Button variant="ghost" size="sm">
                          {isOpen ? "Hide" : "Show"}
                        </Button>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 mt-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="compaction-toggle">Include Compaction Factor</Label>
                            <p className="text-sm text-muted-foreground">
                              Accounts for material settling after placement
                            </p>
                          </div>
                          <Switch
                            id="compaction-toggle"
                            checked={useCompaction}
                            onCheckedChange={setUseCompaction}
                          />
                        </div>
                        
                        {useCompaction && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="compaction-factor">Compaction Factor: {compactionFactor}%</Label>
                              <span className="text-sm text-muted-foreground">
                                (Typically 15-20%)
                              </span>
                            </div>
                            <Slider
                              id="compaction-factor"
                              value={[compactionFactor]}
                              min={5}
                              max={30}
                              step={1}
                              onValueChange={(values) => setCompactionFactor(values[0])}
                            />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="waste-percentage">Waste Percentage: {waste}%</Label>
                            <span className="text-sm text-muted-foreground">
                              (Typically 5-10%)
                            </span>
                          </div>
                          <Slider
                            id="waste-percentage"
                            value={[waste]}
                            min={0}
                            max={20}
                            step={1}
                            onValueChange={(values) => setWaste(values[0])}
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-mem-blue hover:bg-mem-darkBlue text-white font-medium"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Material Needs
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className={`col-span-1 border-mem-gray shadow-md 
              ${result ? 'bg-mem-blue text-white' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center ${result ? 'text-white' : 'text-mem-darkGray'}`}>
                  <SquareStack className="mr-2 h-5 w-5" />
                  Results
                </CardTitle>
                <CardDescription className={result ? 'text-white/80' : ''}>
                  {result 
                    ? `Your ${material} requirements` 
                    : "Enter your dimensions to see calculation results"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Material Needed:</h3>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
                          <span className="flex items-center">
                            <Truck className="mr-2 h-5 w-5" />
                            Volume:
                          </span>
                          <span className="text-xl font-bold">
                            {result.volume} {result.volumeUnit}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
                          <span className="flex items-center">
                            <CircleDollarSign className="mr-2 h-5 w-5" />
                            Weight:
                          </span>
                          <span className="text-xl font-bold">
                            {result.weight} {result.weightUnit}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/20">
                      <p className="mb-4 text-white/90">
                        Ready to order? Get a free quote for your project with our exact material specifications.
                      </p>
                      
                      <Button
                        onClick={handleQuoteRequest}
                        className="w-full bg-white text-mem-blue hover:bg-mem-offWhite hover:text-mem-darkBlue transition-colors"
                      >
                        Get a Free Quote
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <Calculator className="h-16 w-16 text-mem-gray" />
                    <p className="text-center text-mem-darkGray">
                      Fill out the calculator form to see how much material you'll need for your project.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow border border-mem-gray">
            <h2 className="text-2xl font-bold mb-4">How to Use the Gravel Calculator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Measurement Tips</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Measure the length and width of your area in feet (or meters).</li>
                  <li>Measure the depth you want in inches (or centimeters).</li>
                  <li>For irregularly shaped areas, break down into rectangles and calculate each separately.</li>
                  <li>For circular areas, use the formula: Area = π × radius².</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Material Information</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Gravel: Best for driveways and drainage areas.</li>
                  <li>Crushed Stone: Ideal for paths and construction bases.</li>
                  <li>Sand: Perfect for playground areas and sandboxes.</li>
                  <li>Pea Gravel: Great for walkways and decorative landscaping.</li>
                  <li>Limestone: Used for driveways and construction projects.</li>
                  <li>Asphalt: Ideal for driveways and parking lots.</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Why Use Our Calculator?</h3>
              <p className="mb-4">
                Our calculator helps you avoid common issues like ordering too little material (causing project delays) 
                or too much (wasting money). The compaction and waste factors ensure you get exactly what you need for a 
                successful project.
              </p>
              
              <p>
                After calculating your material needs, our team at Memphis Earth Movers can provide delivery straight to 
                your project site. Our dump trucks can handle any size job in the Memphis and DeSoto County area.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GravelCalculator;
