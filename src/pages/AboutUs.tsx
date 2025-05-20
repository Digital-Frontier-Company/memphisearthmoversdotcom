
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutBreadcrumbs from "@/components/about/AboutBreadcrumbs";
import DifferenceSection from "@/components/about/DifferenceSection";
import FrustrationSection from "@/components/about/FrustrationSection";
import ServicesSection from "@/components/about/ServicesSection";
import TestimonialsSection from "@/components/about/TestimonialsSection";
import AboutFaq from "@/components/about/AboutFaq";
import CtaSection from "@/components/about/CtaSection";
import StructuredData from "@/components/about/StructuredData";
import BackToTopButton from "@/components/BackToTopButton";
import { Helmet } from "react-helmet-async";

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
      "name": "About Us",
      "item": "https://memphis-earthmovers.com/about-us"
    }
  ]
};

// FAQ Schema
const AboutFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Memphis Earth Movers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Memphis Earth Movers is a local, family-owned dump truck rental and material hauling company serving Memphis, TN and DeSoto County, MS. We specialize in providing reliable dump trucks, material delivery, and hauling services for contractors, businesses, and homeowners."
      }
    },
    {
      "@type": "Question",
      "name": "How long has Memphis Earth Movers been in business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Memphis Earth Movers has been serving the Memphis area for over 10 years. Our experienced team has deep roots in the local construction industry and understands the unique needs of Memphis projects."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Memphis Earth Movers different from other hauling companies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike other hauling companies in Memphis, we prioritize reliability and communication. We show up when promised, provide transparent pricing without hidden fees, and maintain a fleet of well-maintained dump trucks operated by experienced, professional drivers."
      }
    },
    {
      "@type": "Question",
      "name": "Does Memphis Earth Movers work with both commercial and residential clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we proudly serve both commercial contractors and residential homeowners throughout Memphis with the same level of professionalism and dedication. No project is too large or too small for our Memphis dump truck services."
      }
    }
  ]
};

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Memphis Earth Movers | Local Dump Trucks</title>
        <meta name="description" content="Learn about Memphis Earth Movers and our commitment to reliable dump truck services in Memphis and DeSoto County since 2010." />
        <meta name="keywords" content="Memphis dump truck company, Memphis Earth Movers about, Memphis hauling company, Memphis material delivery company" />
        <script type="application/ld+json">
          {JSON.stringify(BreadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(AboutFaqSchema)}
        </script>
      </Helmet>
      
      <StructuredData />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <AboutHero />
          <AboutBreadcrumbs />
          <DifferenceSection />
          <FrustrationSection />
          <ServicesSection />
          <TestimonialsSection />
          <AboutFaq />
          <CtaSection />
        </main>
        
        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
};

export default AboutUs;
