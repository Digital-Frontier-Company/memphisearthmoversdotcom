
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
