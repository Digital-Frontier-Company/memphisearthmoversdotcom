
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesPricing from "@/components/services/ServicesPricing";
import ServicesFaq from "@/components/services/ServicesFaq"; 
import ServicesFaqSchema from "@/components/services/ServicesFaqSchema";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import ServicesBreadcrumbs from "@/components/services/ServicesBreadcrumbs";
import LocalBusinessSchema from "@/components/shared/LocalBusinessSchema";

// BreadcrumbList Schema
const BreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.memphisearthmovers.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Memphis Dump Truck Services",
      "item": "https://www.memphisearthmovers.com/dump-truck-services"
    }
  ]
};


const Services = () => {
  return (
    <div className="min-h-screen flex flex-col morphing-grid-bg">
      <LocalBusinessSchema 
        page="services"
        pageSpecificDesc="Affordable Memphis dump truck services with same-day availability. Hourly dump trucks for Memphis contractors and homeowners - fully licensed hauling for any size project." 
        url="https://www.memphisearthmovers.com/dump-truck-services"
      />
      
      <Helmet>
        <title>Memphis Dump Truck Services | Hourly & Project Rates</title>
        <meta name="description" content="Memphis dump trucks for rent with experienced drivers. Hourly rates from $125 with flexible scheduling for contractors and homeowners. Serving Memphis and DeSoto County." />
        <script type="application/ld+json">
          {JSON.stringify(BreadcrumbSchema)}
        </script>
      </Helmet>
      
      <ServicesFaqSchema />
      
      <Header />
      
      <main className="flex-grow">
        <ServicesHero />
        <ServicesBreadcrumbs />
        <ServicesList />
        <ServicesPricing />
        <ServicesFaq />
        <CallToAction />
      </main>
      
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Services;
