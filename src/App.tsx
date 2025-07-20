
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEOImagePreloader from "@/components/SEOImagePreloader";
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
            <Route path="/" element={<Index />} />
            <Route path="/gravel-calculator" element={<GravelCalculator />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dump-truck-services" element={<Services />} />
            <Route path="/hourly-dump-truck-rental" element={<HourlyDumpTruckRentals />} />
            <Route path="/hourly-dump-truck-rental-memphis" element={<HourlyDumpTruckRentals />} />
            <Route path="/memphis-gravel-delivery" element={<GravelDelivery />} />
            <Route path="/services/dump-truck-hauling" element={<DumpTruckHauling />} />
            <Route path="/services/site-clearing" element={<SiteClearing />} />
            <Route path="/services/aggregate-delivery" element={<AggregateDelivery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
