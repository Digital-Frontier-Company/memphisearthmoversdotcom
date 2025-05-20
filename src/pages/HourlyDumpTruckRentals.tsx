
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import CallToAction from "@/components/CallToAction";
import HourlyRentalHero from "@/components/hourly-rental/HourlyRentalHero";
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
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Memphis Hourly Dump Truck Rental | From $125/hr</title>
        <meta name="description" content="Rent dump trucks in Memphis from $125/hr with a 3-hour minimum. Professional drivers included. Serving Memphis and DeSoto County." />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Memphis Hourly Dump Truck Rental | From $125/hr" />
        <meta property="og:description" content="Rent dump trucks in Memphis from $125/hr with professional drivers included." />
        <meta property="og:image" content="/lovable-uploads/ae1fd2e2-bcfb-4c0b-92d1-5eae9367a0e8.png" />
        <meta property="og:image:alt" content="Memphis Earth Movers modern white tri-axle dump truck for hourly rental with professional drivers" />
        <meta property="og:url" content="https://www.memphisearthmovers.com/hourly-dump-truck-rental" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <HourlyRentalStructuredData />
      <LocalBusinessSchema 
        page="hourly-rental" 
        pageSpecificDesc="Affordable hourly dump truck rentals in Memphis starting at $125/hr with a 3-hour minimum. Experienced drivers and well-maintained equipment." 
        url="https://www.memphisearthmovers.com/hourly-dump-truck-rental"
      />
      
      <Header />
      
      <main className="flex-grow">
        <HourlyRentalHero />
        <HourlyRentalBreadcrumbs />
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
