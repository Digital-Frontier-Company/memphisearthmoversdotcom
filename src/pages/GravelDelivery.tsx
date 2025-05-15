
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import CallToAction from "@/components/CallToAction";
import GravelDeliveryHero from "@/components/gravel-delivery/GravelDeliveryHero";
import GravelDeliveryBenefits from "@/components/gravel-delivery/GravelDeliveryBenefits";
import GravelDeliveryPricing from "@/components/gravel-delivery/GravelDeliveryPricing";
import GravelDeliveryServiceArea from "@/components/gravel-delivery/GravelDeliveryServiceArea";
import GravelDeliveryProcess from "@/components/gravel-delivery/GravelDeliveryProcess";
import GravelDeliveryMaterials from "@/components/gravel-delivery/GravelDeliveryMaterials";
import GravelDeliverySustainability from "@/components/gravel-delivery/GravelDeliverySustainability";
import GravelDeliveryWhyUs from "@/components/gravel-delivery/GravelDeliveryWhyUs";
import GravelDeliveryFaq from "@/components/gravel-delivery/GravelDeliveryFaq";
import GravelDeliveryBreadcrumbs from "@/components/gravel-delivery/GravelDeliveryBreadcrumbs";
import LocalBusinessSchema from "@/components/shared/LocalBusinessSchema";
import GravelDeliveryRelatedServices from "@/components/gravel-delivery/GravelDeliveryRelatedServices";

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
      "name": "Services",
      "item": "https://www.memphisearthmovers.com/dump-truck-services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Memphis Gravel Delivery",
      "item": "https://www.memphisearthmovers.com/memphis-gravel-delivery"
    }
  ]
};

// FAQ Schema
const GravelDeliveryFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many square feet will 15 tons of milled asphalt cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At a 3-inch compacted depth, one 15-ton load covers about 1,350 sq ft (roughly a 15 ft × 90 ft driveway)."
      }
    },
    {
      "@type": "Question",
      "name": "Can I order limestone or river rock instead?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes—choose any material from Memphis-area pits; we'll haul at our standard $115/hr rate plus pit ticket."
      }
    },
    {
      "@type": "Question",
      "name": "What does the spreading service include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A skid-steer with 6-ft box blade plus operator; we laser-grade to ±½ inch and compact with the truck tires."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a fuel surcharge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fuel is baked into the $400 special. Surcharges only apply on custom hauls if diesel exceeds the DOE baseline by ≥10¢/gal."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prep my site for delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clear overhead obstructions to 20 ft and grade a dump path at least 12 ft wide. We'll advise on the pre-haul call."
      }
    }
  ]
};

const GravelDelivery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LocalBusinessSchema 
        page="gravel-delivery" 
        pageSpecificDesc="Memphis Earth Movers delivers 15-ton loads of gravel, milled asphalt, and stone to Memphis-area locations for a flat $400. Professional spreading services available." 
        url="https://www.memphisearthmovers.com/memphis-gravel-delivery"
      />
      
      <Helmet>
        <title>Memphis Gravel Delivery - 15 Ton Loads for $400 | Memphis Earth Movers</title>
        <meta name="description" content="Memphis Earth Movers delivers 15-ton truckloads of milled asphalt or stone anywhere in the Mid-South for a flat $400. Professional spreading services available." />
        <meta name="keywords" content="Memphis gravel delivery, milled asphalt Memphis, stone delivery Memphis, gravel spreading Memphis, recycled asphalt, $400 gravel delivery, 15-ton gravel load, Memphis Earth Movers" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Memphis Gravel Delivery - 15 Ton Loads for $400 | Memphis Earth Movers" />
        <meta property="og:description" content="Affordable gravel delivery in Memphis - 15-ton loads of milled asphalt or stone delivered for just $400. Professional spreading services available." />
        <meta property="og:image" content="/lovable-uploads/202e6254-cec8-4b88-92cb-512591a16ed5.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Memphis Gravel Delivery - 15 Ton Loads for $400 | Memphis Earth Movers" />
        <meta name="twitter:description" content="Affordable gravel delivery in Memphis - 15-ton loads of milled asphalt or stone delivered for just $400. Professional spreading services available." />
        <meta name="twitter:image" content="/lovable-uploads/202e6254-cec8-4b88-92cb-512591a16ed5.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(BreadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(GravelDeliveryFaqSchema)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <GravelDeliveryHero />
        <GravelDeliveryBreadcrumbs />
        <GravelDeliveryBenefits />
        <GravelDeliveryPricing />
        <GravelDeliveryServiceArea />
        <GravelDeliveryProcess />
        <GravelDeliveryMaterials />
        <GravelDeliverySustainability />
        <GravelDeliveryWhyUs />
        <GravelDeliveryRelatedServices />
        <GravelDeliveryFaq />
        <CallToAction />
      </main>
      
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default GravelDelivery;
