
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
  "name": "Memphis Dump Truck Services and Rentals",
  "serviceType": "Dump Truck Rental and Material Delivery",
  "areaServed": {
    "@type": "City",
    "name": "Memphis",
    "sameAs": "https://en.wikipedia.org/wiki/Memphis,_Tennessee"
  },
  "provider": {
    "@type": "LocalBusiness",
    "name": "Memphis Earth Movers",
    "telephone": "(901) 461-1011",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Memphis",
      "addressRegion": "TN",
      "addressCountry": "US"
    }
  },
  "offers": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Hourly Dump Truck Rental in Memphis"
      },
      "price": "125",
      "priceCurrency": "USD",
      "description": "Hourly dump truck rental with experienced operator in Memphis, TN"
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Asphalt Millings Delivery in Memphis"
      },
      "price": "400",
      "priceCurrency": "USD",
      "description": "Asphalt millings delivery within 15 miles of Memphis"
    }
  ],
  "description": "Professional dump truck services, material hauling, and delivery in Memphis and DeSoto County. Hourly dump truck rentals and project-based solutions available.",
  "image": "/lovable-uploads/3d2e0caa-8367-4da4-85ed-a7c9599175fb.png",
  "keywords": "Memphis dump trucks, dump truck rental Memphis, Memphis dump truck services, material hauling Memphis, gravel delivery Memphis, asphalt millings Memphis, construction dump trucks Memphis"
};

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Memphis Dump Truck Rentals & Services | $125/Hr | Memphis Earth Movers</title>
        <meta name="description" content="Memphis' top-rated dump truck services - Hourly rentals from $125, material hauling & delivery across Memphis and DeSoto County. Reliable local dump trucks when you need them." />
        <meta name="keywords" content="memphis dump truck, dump trucks memphis, memphis dump truck rental, dump truck services memphis, memphis construction hauling, gravel delivery memphis, asphalt millings memphis" />
        <meta name="geo.region" content="US-TN" />
        <meta name="geo.placename" content="Memphis" />
        <link rel="canonical" href="https://memphis-earthmovers.com/dump-truck-services" />
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
