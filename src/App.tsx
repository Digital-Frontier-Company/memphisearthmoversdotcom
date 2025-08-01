
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEOImagePreloader from "@/components/SEOImagePreloader";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import GravelCalculator from "./pages/GravelCalculator";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import HourlyDumpTruckRentals from "./pages/HourlyDumpTruckRentals";
import GravelDelivery from "./pages/GravelDelivery";
import DumpTruckHauling from "./pages/DumpTruckHauling";
import SiteClearing from "./pages/SiteClearing";
import AggregateDelivery from "./pages/AggregateDelivery";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Drivers from "./pages/Drivers";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <SEOImagePreloader />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/gravel-calculator" element={<PageTransition><GravelCalculator /></PageTransition>} />
            <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/dump-truck-services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/hourly-dump-truck-rental" element={<PageTransition><HourlyDumpTruckRentals /></PageTransition>} />
            <Route path="/hourly-dump-truck-rental-memphis" element={<PageTransition><HourlyDumpTruckRentals /></PageTransition>} />
            <Route path="/memphis-gravel-delivery" element={<PageTransition><GravelDelivery /></PageTransition>} />
            <Route path="/services/dump-truck-hauling" element={<PageTransition><DumpTruckHauling /></PageTransition>} />
            <Route path="/services/site-clearing" element={<PageTransition><SiteClearing /></PageTransition>} />
            <Route path="/services/aggregate-delivery" element={<PageTransition><AggregateDelivery /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="/drivers" element={<PageTransition><Drivers /></PageTransition>} />
            <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
