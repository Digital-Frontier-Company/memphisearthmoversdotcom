
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
import AboutFaqSchema from "@/components/about/AboutFaqSchema";
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


const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Memphis Earth Movers | Local Dump Trucks</title>
        <meta name="description" content="Memphis' trusted dump truck company with 10+ years experience. Memphis dump trucks for rent with experienced operators. Family-owned, fully insured, serving Shelby and DeSoto Counties." />
        <meta name="keywords" content="Memphis dump truck company, Memphis Earth Movers about, Memphis hauling company, Memphis material delivery company" />
        <script type="application/ld+json">
          {JSON.stringify(BreadcrumbSchema)}
        </script>
      </Helmet>
      
      <AboutFaqSchema />
      <StructuredData />
      
      <div className="min-h-screen flex flex-col morphing-grid-bg">
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
