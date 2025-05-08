
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

// BreadcrumbList Schema
const BreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://memphis-earthmovers.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Memphis Dump Truck Services",
      "item": "https://memphis-earthmovers.com/dump-truck-services"
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
