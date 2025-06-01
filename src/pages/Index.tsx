
import { Element } from "react-scroll";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import LocalBusinessSchema from "@/components/shared/LocalBusinessSchema";

// FAQ Schema
const HomeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What areas of Memphis do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve all of Greater Memphis including Shelby, Fayette, and surrounding counties. Our service radius extends approximately 50 miles from downtown Memphis."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can you deliver materials in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We typically schedule Memphis deliveries within 24-48 hours of confirmation. Depending on availability and your Memphis location, same-day service may be possible for urgent needs."
      }
    },
    {
      "@type": "Question",
      "name": "What are your Memphis dump truck rental rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Memphis dump truck rental rates start at $125/hour with a 3-hour minimum. Custom rates are available for longer projects and material deliveries in Memphis and DeSoto County."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle small residential projects in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! No job in Memphis is too small. We work with Memphis homeowners on residential projects like driveway resurfacing, landscaping, and small construction jobs with the same dedication as our larger commercial clients."
      }
    },
    {
      "@type": "Question",
      "name": "Are you licensed and insured in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Memphis Earth Movers is fully licensed and insured in Memphis. We carry comprehensive insurance coverage including liability and workers' compensation to protect all parties involved in the hauling process throughout Memphis and DeSoto County."
      }
    }
  ]
};

const Index = () => {
  const improvedStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Memphis Earth Movers",
    "image": [
      "https://www.memphisearthmovers.com/lovable-uploads/2da56faa-05bd-417c-a73f-07299e0eff7f.png",
      "https://www.memphisearthmovers.com/lovable-uploads/5b59b1da-db52-4b8c-812b-e272aeac8493.png",
      "https://www.memphisearthmovers.com/lovable-uploads/edb19aa6-8735-48cb-8854-e51964558b65.png"
    ],
    "logo": "https://www.memphisearthmovers.com/lovable-uploads/2da56faa-05bd-417c-a73f-07299e0eff7f.png",
    "description": "Memphis Earth Movers provides professional dump truck services, hourly rentals, gravel delivery, and construction material hauling throughout Memphis, TN and DeSoto County, MS.",
    "url": "https://www.memphisearthmovers.com/",
    "telephone": "(901) 461-1011",
    "email": "info@memphisearthmovers.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2455 Corporate Ave",
      "addressLocality": "Memphis",
      "addressRegion": "TN",
      "postalCode": "38132",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.0664,
      "longitude": -89.9311
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Memphis",
        "containedInPlace": {
          "@type": "State",
          "name": "Tennessee"
        }
      },
      {
        "@type": "County", 
        "name": "DeSoto County",
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      },
      {
        "@type": "County",
        "name": "Shelby County", 
        "containedInPlace": {
          "@type": "State",
          "name": "Tennessee"
        }
      }
    ],
    "priceRange": "$$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Check, Credit Card",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/memphisearthmovers/",
      "https://twitter.com/memphisearth",
      "https://www.instagram.com/memphisearthmovers/"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dump Truck Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dump Truck Hauling",
            "description": "Professional material transportation and debris removal with experienced CDL drivers.",
            "serviceType": "Construction Hauling"
          },
          "url": "https://www.memphisearthmovers.com/services/dump-truck-hauling"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Site Clearing",
            "description": "Complete land clearing and site preparation including tree removal and grading.",
            "serviceType": "Land Clearing"
          },
          "url": "https://www.memphisearthmovers.com/services/site-clearing"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aggregate Delivery", 
            "description": "Fast delivery of premium construction materials including gravel, sand, and stone.",
            "serviceType": "Material Delivery"
          },
          "url": "https://www.memphisearthmovers.com/services/aggregate-delivery",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "400",
            "priceCurrency": "USD",
            "unitText": "per 15-ton load"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hourly Dump Truck Rental",
            "description": "Flexible hourly dump truck rentals with professional operators included.",
            "serviceType": "Equipment Rental"
          },
          "url": "https://www.memphisearthmovers.com/hourly-dump-truck-rental",
          "priceSpecification": {
            "@type": "PriceSpecification", 
            "price": "125",
            "priceCurrency": "USD",
            "unitText": "per hour"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LocalBusinessSchema 
        page="home" 
        url="https://www.memphisearthmovers.com/" 
      />
      <Helmet>
        <title>Memphis Dump Trucks | Local Hauling & Gravel Delivery</title>
        <meta name="description" content="Reliable Memphis dump trucks for rent with experienced drivers. Local hauling, gravel delivery, and construction material transport from $125/hr with Memphis' trusted hauling company." />
        <meta name="keywords" content="Memphis dump trucks, dump truck rental Memphis, gravel delivery Memphis, construction hauling, material transport, CDL drivers, Memphis Earth Movers" />
        <link rel="canonical" href="https://www.memphisearthmovers.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Memphis Dump Trucks | Local Hauling & Gravel Delivery" />
        <meta property="og:description" content="Reliable Memphis dump trucks for rent with experienced drivers. Local hauling, gravel delivery, and construction material transport from $125/hr." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.memphisearthmovers.com/" />
        <meta property="og:image" content="https://www.memphisearthmovers.com/lovable-uploads/2da56faa-05bd-417c-a73f-07299e0eff7f.png" />
        <meta property="og:site_name" content="Memphis Earth Movers" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Memphis Dump Trucks | Local Hauling & Gravel Delivery" />
        <meta name="twitter:description" content="Reliable Memphis dump trucks for rent with experienced drivers. Local hauling, gravel delivery, and construction material transport from $125/hr." />
        <meta name="twitter:image" content="https://www.memphisearthmovers.com/lovable-uploads/2da56faa-05bd-417c-a73f-07299e0eff7f.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(HomeFaqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(improvedStructuredData)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <Element name="problemSection">
          <ProblemSection />
        </Element>
        <Element name="solutionSection">
          <SolutionSection />
        </Element>
        <Element name="servicesSection">
          <ServicesSection />
        </Element>
        <TestimonialsSection />
        <Element name="faqSection">
          <FaqSection />
        </Element>
        <CallToAction />
      </main>
      
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;
