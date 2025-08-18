
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import CallToAction from "@/components/CallToAction";
import StickyHeader from "@/components/hourly-rental/StickyHeader";
import EnhancedHero from "@/components/hourly-rental/EnhancedHero";
import PricingTransparencyBlock from "@/components/hourly-rental/PricingTransparencyBlock";
import EquipmentSpecifications from "@/components/hourly-rental/EquipmentSpecifications";
import HourlyRentalBenefits from "@/components/hourly-rental/HourlyRentalBenefits";
import HourlyRentalServiceArea from "@/components/hourly-rental/HourlyRentalServiceArea";
import HourlyRentalProcess from "@/components/hourly-rental/HourlyRentalProcess";
import HourlyRentalSafety from "@/components/hourly-rental/HourlyRentalSafety";
import HourlyRentalWhyUs from "@/components/hourly-rental/HourlyRentalWhyUs";
import HourlyRentalFaq from "@/components/hourly-rental/HourlyRentalFaq";
import HourlyRentalRelatedServices from "@/components/hourly-rental/HourlyRentalRelatedServices";
import HourlyRentalBreadcrumbs from "@/components/hourly-rental/HourlyRentalBreadcrumbs";
import HourlyRentalStructuredData from "@/components/hourly-rental/HourlyRentalStructuredData";
import LocalBusinessSchema from "@/components/shared/LocalBusinessSchema";

const HourlyDumpTruckRentals = () => {
  return (
    <div className="min-h-screen flex flex-col morphing-grid-bg">
      {/* SEO meta tags are handled by HourlyRentalStructuredData component */}
      
      <HourlyRentalStructuredData />
      <LocalBusinessSchema 
        page="hourly-rental" 
        pageSpecificDesc="Save 43% on hourly dump truck rentals in Memphis starting at $125/hr. CDL drivers, fuel, and insurance included. Same-day availability for contractors." 
        url="https://www.memphisearthmovers.com/hourly-dump-truck-rental-memphis"
      />
      
      <StickyHeader />
      <Header />
      
      <main className="flex-grow">
        <EnhancedHero />
        <HourlyRentalBreadcrumbs />
        <PricingTransparencyBlock />
        <EquipmentSpecifications />
        <HourlyRentalBenefits />
        <HourlyRentalServiceArea />
        <HourlyRentalProcess />
        <HourlyRentalSafety />
        <HourlyRentalWhyUs />
        <HourlyRentalRelatedServices />
        <HourlyRentalFaq />
        <CallToAction />
      </main>
      
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default HourlyDumpTruckRentals;
