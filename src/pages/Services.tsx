
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesPricing from "@/components/services/ServicesPricing";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dump Truck Services | Memphis Earth Movers</title>
        <meta name="description" content="Professional dump truck services, material hauling, and delivery in Memphis and DeSoto County. Hourly rentals and project-based solutions available." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <ServicesHero />
        <ServicesList />
        <ServicesPricing />
        <CallToAction />
      </main>
      
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Services;
