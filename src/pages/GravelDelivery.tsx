
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
import FaqSchema from "@/components/shared/FaqSchema";

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

// FAQ data
const gravelFaqs = [
  {
    question: "How many square feet will 15 tons of milled asphalt cover?",
    answer: "At a 3-inch compacted depth, one 15-ton load covers about 1,350 square feet—roughly a 15 by 90 foot driveway."
  },
  {
    question: "Can I order limestone or river rock instead?",
    answer: "Yes. Select any aggregate from local pits and we will haul it at our standard hourly truck rate plus the pit's ticket price."
  },
  {
    question: "What does the spreading service include?",
    answer: "Our spreading service provides a skid-steer with a 6-foot box blade and an experienced operator who laser grades to ±½ inch and compacts with the truck tires."
  },
  {
    question: "Is there a fuel surcharge?",
    answer: "Fuel is included in the $400 milled asphalt special. Surcharges apply only on custom hauls if regional diesel prices exceed the DOE baseline by ten cents per gallon or more."
  },
  {
    question: "How do I prep my site for delivery?",
    answer: "Ensure overhead clearance of 20 feet and a dump path at least 12 feet wide. Additional prep guidance is provided during the pre-haul confirmation call."
  }
];

const GravelDelivery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LocalBusinessSchema 
        page="gravel-delivery" 
        pageSpecificDesc="Memphis gravel delivery service - 15-ton loads of recycled asphalt, limestone, or gravel delivered anywhere in Memphis for just $400. Fast and reliable service." 
        url="https://www.memphisearthmovers.com/memphis-gravel-delivery"
      />
      
      <FaqSchema 
        faqs={gravelFaqs}
        url="https://www.memphisearthmovers.com/memphis-gravel-delivery"
      />
      
      <Helmet>
        <title>Memphis Gravel Delivery | 15 Ton Loads for $400</title>
        <meta name="description" content="Affordable Memphis gravel delivery - 15-ton loads of crushed stone, limestone, or recycled asphalt delivered for $400. Memphis dump trucks with spreading service available." />
        <meta name="keywords" content="Memphis gravel delivery, milled asphalt Memphis, stone delivery Memphis, gravel spreading Memphis, recycled asphalt, $400 gravel delivery, 15-ton gravel load, Memphis Earth Movers" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Memphis Gravel Delivery | 15 Ton Loads for $400" />
        <meta property="og:description" content="Affordable gravel delivery in Memphis - 15-ton loads of milled asphalt or stone delivered for just $400. Professional spreading available." />
        <meta property="og:image" content="/lovable-uploads/202e6254-cec8-4b88-92cb-512591a16ed5.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Memphis Gravel Delivery | 15 Ton Loads for $400" />
        <meta name="twitter:description" content="Affordable gravel delivery in Memphis - 15-ton loads of milled asphalt or stone delivered for just $400. Professional spreading available." />
        <meta name="twitter:image" content="/lovable-uploads/202e6254-cec8-4b88-92cb-512591a16ed5.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(BreadcrumbSchema)}
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
