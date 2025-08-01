
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesPricing from "@/components/services/ServicesPricing";
import ServicesFaq from "@/components/services/ServicesFaq"; 
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

// FAQ Schema
const ServicesFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to rent a dump truck in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Memphis Earth Movers offers dump truck rentals starting at $125 per hour with a 3-hour minimum. This includes an experienced operator, fuel, and equipment. Custom pricing is available for longer projects and material deliveries."
      }
    },
    {
      "@type": "Question",
      "name": "What areas of Memphis do you provide dump truck services to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve all of Memphis, TN and DeSoto County, MS with our dump truck services, including Germantown, Collierville, Bartlett, Cordova, Millington, Southaven, Olive Branch, Horn Lake, and surrounding areas."
      }
    },
    {
      "@type": "Question",
      "name": "What materials can your Memphis dump trucks deliver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Memphis dump truck fleet can deliver various materials including crushed gravel, pea gravel, limestone, river rock, sand, asphalt, crushed asphalt (millings), fill dirt, topsoil, and more to your Memphis location."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can I get a Memphis dump truck for my project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For best availability of our Memphis dump trucks, we recommend booking at least 48 hours in advance. Same-day service may be available depending on our schedule. Contact us for your specific Memphis project needs."
      }
    }
  ]
};

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
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
        <script type="application/ld+json">
          {JSON.stringify(ServicesFaqSchema)}
        </script>
      </Helmet>
      
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
