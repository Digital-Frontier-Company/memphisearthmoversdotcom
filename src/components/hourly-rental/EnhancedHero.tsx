import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, Shield, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

const EnhancedHero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-mem-darkNavy via-mem-darkNavy to-mem-blue/80 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/lovable-uploads/b4d1af33-2f11-4fbc-9a5f-d4f124c661e4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="mem-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-mem-babyBlue/20 text-mem-babyBlue border-mem-babyBlue/30 px-3 py-1">
                <Shield className="h-4 w-4 mr-1" />
                Licensed & Insured
              </Badge>
              <Badge className="bg-mem-babyBlue/20 text-mem-babyBlue border-mem-babyBlue/30 px-3 py-1">
                <Clock className="h-4 w-4 mr-1" />
                24/7 Emergency Service
              </Badge>
              <Badge className="bg-mem-babyBlue/20 text-mem-babyBlue border-mem-babyBlue/30 px-3 py-1">
                <Award className="h-4 w-4 mr-1" />
                Local Memphis Company
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Memphis Hourly 
                <span className="text-mem-babyBlue block">Dump Truck</span>
                <span className="block">Rentals</span>
              </h1>
              
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl text-white/90">from</span>
                <span className="text-5xl md:text-6xl font-bold text-mem-babyBlue">$125</span>
                <span className="text-xl md:text-2xl text-white/90">/hour</span>
              </div>
            </div>

            {/* Subheadline */}
            <div className="space-y-3">
              <p className="text-xl md:text-2xl text-white font-semibold">
                43% Less Than Competitors • Same-Day Availability • CDL Drivers Included
              </p>
              <p className="text-lg text-white/90 max-w-lg">
                Professional dump truck rentals with experienced drivers for Memphis contractors. 
                2-hour minimum, transparent pricing, no hidden fees.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg shadow-lg"
              >
                Get Instant Quote
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white bg-gradient-to-r from-blue-700 to-cyan-400 text-white hover:from-blue-800 hover:to-cyan-500 font-semibold px-8 py-4 text-lg"
                asChild
              >
                <a href="tel:9014611011" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call Now: (901) 461-1011
                </a>
              </Button>
            </div>

            {/* Live Availability */}
            <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">
                <span className="text-green-400">3 trucks available</span> for same-day service in Memphis
              </span>
            </div>
          </div>

          {/* Right Column - Hero Image/Stats */}
          <div className="relative">
            <div className="relative glow-container bg-mem-darkNavy/80 p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-mem-babyBlue mb-2">$75-125</div>
                  <div className="text-white/90 text-sm">Saved Per Hour vs Competitors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mem-babyBlue mb-2">2Hr</div>
                  <div className="text-white/90 text-sm">Minimum (Not 4-6 Hours)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mem-babyBlue mb-2">15+</div>
                  <div className="text-white/90 text-sm">Years Serving Memphis</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mem-babyBlue mb-2">24/7</div>
                  <div className="text-white/90 text-sm">Emergency Availability</div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-mem-babyBlue/10 rounded-lg border border-mem-babyBlue/30">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-6 w-6 text-mem-babyBlue" />
                  <span className="text-white font-semibold">What's Included:</span>
                </div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="text-mem-babyBlue">✓</span>
                    Professional CDL driver
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-mem-babyBlue">✓</span>
                    All fuel and insurance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-mem-babyBlue">✓</span>
                    Safety equipment & GPS
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-mem-babyBlue">✓</span>
                    DOT compliance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;