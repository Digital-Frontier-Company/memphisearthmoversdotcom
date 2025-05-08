
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesPricing from "@/components/services/ServicesPricing";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

const ServicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Memphis Earth Movers Dump Truck Services",
  "serviceType": "Dump Truck Rental and Material Delivery",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "35.149532",
      "longitude": "-90.048981"
    },
    "geoRadius": "25"
  },
  "provider": {
    "@type": "LocalBusiness",
    "name": "Memphis Earth Movers",
    "telephone": "(901) 461-1011",
    "priceRange": "$$$"
  },
  "offers": {
    "@type": "Offer",
    "price": "125",
    "priceCurrency": "USD",
    "description": "Hourly dump truck rental with experienced operator"
  },
  "description": "Professional dump truck services, material hauling, and delivery in Memphis and DeSoto County. Hourly rentals and project-based solutions available.",
  "image": "/lovable-uploads/3d2e0caa-8367-4da4-85ed-a7c9599175fb.png"
};

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dump Truck Services | Memphis Earth Movers</title>
        <meta name="description" content="Professional dump truck services, material hauling, and delivery in Memphis and DeSoto County. Hourly rentals starting at $125/hour and material delivery from $400." />
        <script type="application/ld+json">
          {JSON.stringify(ServicesStructuredData)}
        </script>
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
